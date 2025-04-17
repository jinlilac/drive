import CheckBox from '@/components/atoms/CheckBox';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import DropdownButton from '@/components/molecles/DropdownButton';
import { DropBoxItem } from '@/components/molecles/ProfileCard';
import TagLabel, { TagLabelProps } from '@/components/molecles/TagLabel';
import { ICON } from '@/constants/icon';
import { CATEGORY_FILTERS, GENDER_FILTERS, MORE_ITEMS } from '@/constants/worksheet';
import getCustomRelativeTime from '@/libs/date';
import useOverlayStore from '@/stores/useOverlayStore';
import { WorkSheetItems } from '@/types/worksheet.type';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const ListWrap = styled(Container.Grid)`
  border-bottom: 1px solid ${(props) => props.theme.Colors.gray_30};
  padding: 8px;
  gap: 8px;
  align-items: center;
  grid-template-columns: 28px 320px 320px 320px 320px 191px 25px;

  &:hover {
    background-color: ${(props) => props.theme.Colors.gray_20};
  }
`;
const CheckboxContainer = styled.div`
  opacity: 0;
  transition: opacity 0.2s;

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
  props: WorkSheetItems &
    TagLabelProps & {
      setState: Dispatch<
        SetStateAction<{ isOpen: boolean; defaultName: string; fileSystemId: string; parentId: string }>
      >;
    },
) {
  const {
    worksheetId,
    createdAt,
    updatedAt,
    thumbImg,
    name,
    type,
    setState,
    fileSystemId,
    parentId,
    gender,
    category,
    clothes,
    requester,
  } = props;
  const { openOverlay } = useOverlayStore();
  const genderLabel = GENDER_FILTERS.find((f) => f.value === gender)?.label ?? '성별 전체';
  const categoryLabel = CATEGORY_FILTERS.find((f) => f.value === category)?.label ?? '카테고리 전체';

  const handleMoreButton = (action: string) => {
    if (action === '이름 바꾸기') {
      setState({
        isOpen: true,
        defaultName: name,
        fileSystemId,
        parentId,
      });

      openOverlay();
    } else if (action === '삭제') {
      handleDelete();
    }
  };
  const handleDelete = () => {
    console.log('삭제');
  };
  return (
    <ListWrap id={worksheetId}>
      <CheckboxContainer>
        <CheckBox option="default" />
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
      <Container.FlexRow style={{ maxWidth: '320px', flex: 1 }}>
        <Typography.B2 fontWeight="medium" color="gray_90">
          {`${genderLabel} ・ ${categoryLabel} ・ ${clothes} `}
        </Typography.B2>
      </Container.FlexRow>
      <Typography.B2
        style={{ maxWidth: '300px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
        fontWeight="medium"
        color="gray_90"
      >
        {requester}
      </Typography.B2>
      <TagLabel label={type === 'worksheet' ? '작업지시서' : ''} color={'green'} />
      <Typography.B2 fontWeight="medium" color="gray_90">
        {getCustomRelativeTime(updatedAt) || getCustomRelativeTime(createdAt)}
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
