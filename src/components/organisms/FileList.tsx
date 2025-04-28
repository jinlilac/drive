import CheckBox from '@/components/atoms/CheckBox';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import DropdownButton from '@/components/molecles/DropdownButton';
import { DropBoxItem } from '@/components/molecles/ProfileCard';
import TagLabel, { TagLabelProps } from '@/components/molecles/TagLabel';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSheetBaseTemplate';
import { ICON } from '@/constants/icon';
import { CATEGORY_FILTERS, GENDER_FILTERS, MORE_ITEMS } from '@/constants/worksheet';
import getCustomRelativeTime from '@/libs/date';
import useOverlayStore from '@/stores/useOverlayStore';
import { WorkSheetItems } from '@/types/worksheet.type';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { EngToKorDriveCategory, FileSystemType, KorToEngDriveCategory } from '@/types/workspace.type';
import { TagsColor } from '@/constants/drive';
import { FolderListResponse } from '@/types/file.type';

const ListWrap = styled(Container.Grid)<{ checked: boolean; isDrive: boolean }>`
  border-bottom: 1px solid ${(props) => props.theme.Colors.gray_30};
  padding: 8px;
  gap: 8px;
  align-items: center;
  grid-template-columns: ${({ isDrive }) =>
    isDrive ? '40px auto 120px 120px 200px 40px' : '28px 320px 320px 320px 320px 191px 25px'};

  background-color: ${(props) => (props.checked ? props.theme.Colors.gray_30 : props.theme.Colors.gray_10)};

  &:hover {
    background-color: ${(props) => props.theme.Colors.gray_20};
  }
`;
const CheckboxContainer = styled.div<{ checked: boolean }>`
  opacity: 0;
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
  width: 100%;
  height: 100%;
  max-width: 48px;
  min-height: 48px;
  border: 1px solid ${(props) => props.theme.Colors.gray_30};
`;

export default function FileList(
  props: (WorkSheetItems | FileSystemType) &
    TagLabelProps & {
      setState: Dispatch<SetStateAction<UpdateState>>;
      checked: boolean;
      onCheck: (id: string, checked: boolean) => void;
      isDrive: boolean;
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
    isDrive = false,
  } = props;
  const { openOverlay } = useOverlayStore();
  const genderLabel =
    'gender' in props ? (GENDER_FILTERS.find((f) => f.value === props.gender)?.label ?? '성별 전체') : '';
  const categoryLabel =
    'category' in props ? (CATEGORY_FILTERS.find((f) => f.value === props.category)?.label ?? '카테고리 전체') : '';

  const handleMoreButton = (action: string) => {
    if (action === '이름 바꾸기') {
      setState((prev) => ({
        ...prev,
        isOpen: true,
        defaultName: name,
        fileSystemId,
        parentId,
      }));

      openOverlay();
    } else if (action === '삭제') {
      handleDelete();
    }
  };
  const handleDelete = () => {
    console.log('삭제');
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheck(fileSystemId, e.target.checked);
  };
  return (
    <ListWrap id={worksheetId} checked={checked} isDrive={isDrive}>
      <CheckboxContainer checked={checked}>
        <CheckBox option="default" checked={checked} onChange={handleCheckboxChange} />
      </CheckboxContainer>
      <Container.FlexRow gap="16" style={{ maxWidth: '320px', flex: 1 }} alignItems="center">
        <ThumbImg>
          <Img
            full
            fit="fill"
            src={thumbImg?.startsWith('https') ? thumbImg : `${import.meta.env.VITE_PROFILE_IMG_URL}/${thumbImg}`}
            onError={({ currentTarget }) => (currentTarget.style.display = 'none')}
            onLoad={({ currentTarget }) => (currentTarget.style.display = 'block')}
          />
        </ThumbImg>
        <Typography.B2
          fontWeight="semiBold"
          color="gray_100"
          style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
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
      {
        <TagLabel
          label={type === 'worksheet' ? '작업지시서' : EngToKorDriveCategory[(tag as KorToEngDriveCategory) ?? 'etc']}
          color={TagsColor[(tag as KorToEngDriveCategory) ?? 'etc']}
          wiive={type === 'worksheet'}
        />
      }
      <Typography.B2 fontWeight="medium" color="gray_90">
        {type === 'file' ? `.${mimetype}` : '-'}
      </Typography.B2>
      <Typography.B2 fontWeight="medium" color="gray_90">
        {getCustomRelativeTime(updatedAt)}
      </Typography.B2>
      <DropdownButton isHover icon={<Img src={ICON.more} />}>
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
