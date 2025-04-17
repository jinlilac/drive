import Container from '@/components/atoms/Container';
import Divider from '@/components/atoms/Divider';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import DropdownButton from '@/components/molecles/DropdownButton';
import { DropBoxItem } from '@/components/molecles/ProfileCard';
import TagLabel, { TagLabelProps } from '@/components/molecles/TagLabel';
import { ICON } from '@/constants/icon';
import { MORE_ITEMS } from '@/constants/worksheet';
import getCustomRelativeTime from '@/libs/date';
import useOverlayStore from '@/stores/useOverlayStore';
import { WorkSheetItems } from '@/types/worksheet.type';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const CardContainer = styled(Container.FlexCol)`
  width: 100%;
  gap: 8px;
  padding: 16px;
  flex-shrink: 0;
  border-radius: 8px;
  background-color: ${(props) => props.theme.Colors.gray_20};
  &:hover {
    background-color: ${(props) => props.theme.Colors.gray_30};
  }
`;
const TitleWrap = styled(Container.FlexRow)`
  justify-content: space-between;
  align-items: center;
`;
const Title = styled(Typography.B1)`
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
  props: WorkSheetItems &
    TagLabelProps & {
      setState: Dispatch<
        SetStateAction<{ isOpen: boolean; defaultName: string; fileSystemId: string; parentId: string }>
      >;
    },
) {
  const { worksheetId, createdAt, thumbImg, name, label, color, type, setState, fileSystemId, parentId } = props;
  const { openOverlay, closeOverlay } = useOverlayStore();

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
    <CardContainer id={worksheetId}>
      <div style={{ backgroundColor: 'white', minHeight: '142px', maxHeight: '142px', overflow: 'hidden' }}>
        <Img
          full
          fit="fill"
          src={thumbImg?.startsWith('https') ? thumbImg : `${import.meta.env.VITE_PROFILE_IMG_URL}/${thumbImg}`}
          onError={({ currentTarget }) => (currentTarget.style.display = 'none')}
          onLoad={({ currentTarget }) => (currentTarget.style.display = 'block')}
        />
      </div>
      <Container.FlexCol gap="8" style={{ padding: '4px 0' }}>
        <TitleWrap>
          <Title fontWeight="semiBold" color="gray_100">
            {name}
          </Title>
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
        </TitleWrap>
        <SubtitleWrap gap="4" alignItems="center">
          <TagLabel label={type === 'worksheet' ? '작업지시서' : ''} color={'green'} />
          <Divider.Col color="gray_70" />
          <Typography.B3 fontWeight="medium" color="gray_70">
            {getCustomRelativeTime(createdAt)}
          </Typography.B3>
        </SubtitleWrap>
      </Container.FlexCol>
    </CardContainer>
  );
}
