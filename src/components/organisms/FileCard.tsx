import CheckBox from '@/components/atoms/CheckBox';
import Container from '@/components/atoms/Container';
import Divider from '@/components/atoms/Divider';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import DropdownButton from '@/components/molecules/DropdownButton';
import { DropBoxItem } from '@/components/molecules/ProfileCard';
import TagLabel, { TagLabelProps } from '@/components/molecules/TagLabel';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSheetBaseTemplate';
import { ICON } from '@/constants/icon';
import getCustomRelativeTime from '@/libs/date';
import useOverlayStore from '@/stores/useOverlayStore';
import { FolderListResponse } from '@/types/file.type';
import { WorkSheetItems } from '@/types/worksheet.type';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import {
  KorToEngDriveCategory,
  FileSystemType,
  EngToKorDriveCategory,
  MoreItemAlertType,
} from '@/types/workspace.type';
import { TagsColor } from '@/constants/drive';
import useGetMoreItems from '@/hooks/useGetMoreItems';

const CardContainer = styled(Container.FlexCol)<{ checked: boolean }>`
  width: 100%;
  max-width: 300px;
  height: 242px;
  gap: 8px;
  padding: 16px;
  flex-shrink: 0;
  border-radius: 8px;
  background-color: ${(props) => (props.checked ? props.theme.Colors.gray_30 : props.theme.Colors.gray_20)};
  &:hover {
    background-color: ${(props) => props.theme.Colors.gray_30};
  }
  position: relative;
`;
const CheckboxContainer = styled.div<{ checked: boolean }>`
  position: absolute;
  top: 8px;
  left: 8px;
  transition: opacity 0.2s;
  opacity: ${(props) => (props.checked ? 1 : 0)};

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;
const TitleWrap = styled(Container.FlexRow)`
  justify-content: space-between;
  align-items: center;
`;
const Title = styled(Typography.B1)`
  line-height: 130%;
  max-width: 152px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const SubtitleWrap = styled(Container.FlexRow)``;

const MoreItem = styled(DropBoxItem)`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export default function FileCard(
  props: (WorkSheetItems | FileSystemType) &
    TagLabelProps & {
      state: UpdateState;
      setState: Dispatch<SetStateAction<UpdateState>>;
      checked: boolean;
      onCheck: (id: string, checked: boolean, path?: string, name?: string) => void;
    } & Partial<FolderListResponse>,
) {
  const {
    worksheetId,
    updatedAt,
    thumbImg,
    name,
    type,
    setState,
    fileSystemId,
    parentId,
    checked,
    onCheck,
    mimetype,
    tag,
    isStarred,
    storagePath,
    state,
  } = props;
  const { openOverlay } = useOverlayStore();

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
  return (
    <CardContainer id={fileSystemId} checked={checked}>
      <CheckboxContainer checked={checked}>
        <CheckBox option="default" checked={checked} onChange={handleCheckboxChange(props?.path ?? '', name)} />
      </CheckboxContainer>
      <div style={{ backgroundColor: 'white', minHeight: '142px', maxHeight: '142px', overflow: 'hidden' }}>
        <Img
          full
          style={{ height: '100%' }}
          fit="contain"
          src={`${import.meta.env.VITE_IMG_URL}/${storagePath}`}
          onError={({ currentTarget }) => (currentTarget.style.display = 'none')}
          onLoad={({ currentTarget }) => (currentTarget.style.display = 'block')}
        />
      </div>
      <Container.FlexCol gap="8" style={{ padding: '4px 0' }}>
        <TitleWrap>
          <Title fontWeight="semiBold" color="gray_100">
            {name}
          </Title>
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
        </TitleWrap>
        <SubtitleWrap gap="4" alignItems="center">
          <TagLabel
            label={EngToKorDriveCategory[(tag as KorToEngDriveCategory) ?? 'etc']}
            color={TagsColor[(tag as KorToEngDriveCategory) ?? 'etc']}
            // wiive={type === 'worksheet'}
          />
          <Divider.Col color="gray_70" />
          <Typography.B3 fontWeight="medium" color="gray_70">
            {type === 'worksheet' && updatedAt && getCustomRelativeTime(updatedAt)}
            {type === 'file' && mimetype}
          </Typography.B3>
        </SubtitleWrap>
      </Container.FlexCol>
    </CardContainer>
  );
}
