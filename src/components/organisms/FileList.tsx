import CheckBox from '@/components/atoms/CheckBox';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import DropdownButton from '@/components/molecules/DropdownButton';
import { DropBoxItem } from '@/components/molecules/ProfileCard';
import TagLabel, { TagLabelProps } from '@/components/molecules/TagLabel';
import { ICON } from '@/constants/icon';
import { CATEGORY_FILTERS, GENDER_FILTERS } from '@/constants/worksheet';
import { useFormatDate } from '@/libs/date';
import useOverlayStore from '@/stores/useOverlayStore';
import { WorkSheetItems } from '@/types/worksheet.type';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import styled from 'styled-components';
import {
  EngToKorDriveCategory,
  FileSystemType,
  KorToEngDriveCategory,
  MoreItemAlertType,
} from '@/types/workspace.type';
import { TagsColor } from '@/constants/drive';
import { FolderListResponse } from '@/types/file.type';
import useGetMoreItems from '@/hooks/useGetMoreItems';
import { useAuthStore } from '@/stores/useAuthStore';
import { useSetSearchParam } from '@/hooks/useSearchParam';
import { useLocation, useNavigate } from 'react-router-dom';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSpace.template';

const ListWrap = styled(Container.Grid)<{ checked: boolean; isDrive: boolean }>`
  border-bottom: 1px solid ${(props) => props.theme.Colors.gray_30};
  padding: 8px;
  gap: 8px;
  align-items: center;
  grid-template-columns: ${({ isDrive }) =>
    isDrive ? '52px auto 188px 188px 175px 25px' : '28px 320px 320px 320px 320px 191px 25px'};

  background-color: ${(props) => (props.checked ? props.theme.Colors.gray_30 : props.theme.Colors.gray_10)};

  &:hover {
    background-color: ${(props) => props.theme.Colors.gray_20};
  }
`;
const CheckboxContainer = styled.div<{ checked: boolean }>`
  transition: opacity 0.2s;
  opacity: ${(props) => (props.checked ? 1 : 0)};

  ${ListWrap}:hover & {
    opacity: 1;
  }
`;
const MoreItem = styled(DropBoxItem)`
  display: flex;
  gap: 4px;
  align-items: center;
`;
const ThumbImg = styled.div`
  width: 48px;
  height: 48px;
  border: 1px solid ${(props) => props.theme.Colors.gray_30};
`;

export default function FileList(
  props: (WorkSheetItems | FileSystemType) &
    TagLabelProps & {
      state: UpdateState;
      setState: Dispatch<SetStateAction<UpdateState>>;
      checked: boolean;
      onCheck: (id: string, checked: boolean, path?: string, name?: string) => void;
      isDrive: boolean;
      isFolder: boolean;
    } & Partial<FolderListResponse>,
) {
  const {
    updatedAt,
    name,
    type,
    setState,
    fileSystemId,
    parentId,
    checked,
    onCheck,
    mimetype,
    isStarred,
    tag,
    isDrive = false,
    isFolder,
    state,
    storagePath,
  } = props;
  const { openOverlay } = useOverlayStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const genderLabel =
    'gender' in props ? (GENDER_FILTERS.find((f) => f.value === props.gender)?.label ?? '성별 전체') : '';
  const categoryLabel =
    'category' in props ? (CATEGORY_FILTERS.find((f) => f.value === props.category)?.label ?? '카테고리 전체') : '';

  const handleSetState = (menu: MoreItemAlertType) => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
      menu,
      defaultName: name,
      fileSystemId,
      parentId,
    }));
  };
  const handleOpenSetState = (menu: MoreItemAlertType) => {
    setState((prev) => ({
      ...prev,
      isOpen: true,
      menu,
      defaultName: name,
      fileSystemId,
      parentId,
    }));
    openOverlay();
  };

  const handleMoreButton = (action: string) => {
    if (action === '이름 바꾸기') handleOpenSetState('name');
    else if (action === '삭제') handleOpenSetState('delete');
    else if (action === '영구 삭제') handleOpenSetState('destroy');
    else if (action === '다운로드') handleSetState('download');
    else if (action === '즐겨찾기 추가') handleSetState('starred');
    else if (action === '즐겨찾기 제거') handleSetState('unstarred');
    else if (action === '복원하기') handleSetState('restore');
  };

  const handleCheckboxChange = (path: string, name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheck(fileSystemId, e.target.checked, path, name);
  };
  const MORE_ITEMS = useGetMoreItems(isStarred);
  const { setUser } = useAuthStore();
  const { add } = useSetSearchParam();

  const handleDoubleClick = (id: string) => (e: MouseEvent<HTMLDivElement>) => {
    if (!isFolder) return;
    e.stopPropagation();
    setUser({
      currentId: id,
      currentFolderName: name,
    });
    add([
      ['name', name],
      ['path', id],
    ]);
    if (!pathname.startsWith('/workspace/drive'))
      navigate(`/workspace/drive?page=1&path=${id}&category=all&name=${name}`);
  };

  return (
    <ListWrap checked={checked} isDrive={isDrive} onDoubleClick={handleDoubleClick(fileSystemId)}>
      <CheckboxContainer checked={checked}>
        <CheckBox option="default" checked={checked} onChange={handleCheckboxChange(props?.path ?? '', name)} />
      </CheckboxContainer>
      <Container.FlexRow gap="16" style={{ maxWidth: '320px', flex: 1 }} alignItems="center">
        <ThumbImg>
          {isFolder ? (
            <Img full fit="fill" style={{ padding: '8px' }} src={ICON['drive-folder']} />
          ) : (
            <Img
              full
              fit="fill"
              src={`${import.meta.env.VITE_IMG_URL}/${storagePath}`}
              onError={({ currentTarget }) => (currentTarget.style.display = 'none')}
              onLoad={({ currentTarget }) => (currentTarget.style.display = 'block')}
            />
          )}
        </ThumbImg>
        <Typography.B2
          fontWeight="semiBold"
          color="gray_100"
          style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', minWidth: '256px' }}
        >
          {name}
        </Typography.B2>
      </Container.FlexRow>
      {!isDrive && 'clothes' in props && (
        <Container.FlexRow style={{ maxWidth: '320px', flex: 1 }}>
          <Typography.B2 fontWeight="medium" color="gray_90">
            {`${genderLabel} ・ ${categoryLabel} ・ ${props.clothes} `}
          </Typography.B2>
        </Container.FlexRow>
      )}
      {!isDrive && 'requester' in props && (
        <Typography.B2
          style={{ maxWidth: '300px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
          fontWeight="medium"
          color="gray_90"
        >
          {props.requester}
        </Typography.B2>
      )}
      {isFolder ? (
        '-'
      ) : (
        <div style={{ maxWidth: '68px' }}>
          <TagLabel
            label={type === 'worksheet' ? '작업지시서' : EngToKorDriveCategory[(tag as KorToEngDriveCategory) ?? 'etc']}
            color={TagsColor[(tag as KorToEngDriveCategory) ?? 'etc']}
            wiive={type === 'worksheet'}
          />
        </div>
      )}
      {type !== 'worksheet' && (
        <Typography.B2 fontWeight="medium" color="gray_90">
          {type === 'file' ? `.${mimetype}` : '-'}
        </Typography.B2>
      )}
      <Typography.B2 fontWeight="medium" color="gray_90">
        {useFormatDate(updatedAt)}
      </Typography.B2>
      <DropdownButton
        disabled={state.selectedIds.length > 0}
        isHover={state.selectedIds.length === 0}
        icon={<Img src={ICON.more} />}
      >
        <Container.FlexCol>
          {MORE_ITEMS.map((item) => (
            <MoreItem key={item.label} onClick={() => handleMoreButton(item.label)}>
              <Img src={item.icon} />
              {item.label}
            </MoreItem>
          ))}
        </Container.FlexCol>
      </DropdownButton>
    </ListWrap>
  );
}
