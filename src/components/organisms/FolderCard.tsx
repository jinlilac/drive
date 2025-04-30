import CheckBox from '@/components/atoms/CheckBox';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import DropdownButton from '@/components/molecles/DropdownButton';
import { DropBoxItem } from '@/components/molecles/ProfileCard';
import { TagLabelProps } from '@/components/molecles/TagLabel';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSheetBaseTemplate';
import { ICON } from '@/constants/icon';
import useOverlayStore from '@/stores/useOverlayStore';
import { FolderListResponse } from '@/types/file.type';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { FileSystemType, MoreItemType } from '@/types/workspace.type';
import useGetMoreItems from '@/hooks/useGetMoreItems';

const CardContainer = styled(Container.FlexRow)<{ checked: boolean }>`
  width: 240px;
  gap: 8px;
  padding: 4px;
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

export default function FolderCard(
  props: FileSystemType &
    TagLabelProps & {
      setState: Dispatch<SetStateAction<UpdateState>>;
      checked: boolean;
      onCheck: (id: string, checked: boolean, path?: string) => void;
    } & Partial<FolderListResponse>,
) {
  const { name, setState, fileSystemId, path, childrenCount, parentId, checked, onCheck } = props;
  const { openOverlay } = useOverlayStore();

  const handleMoreButton = (action: string) => {
    if (action === '이름 바꾸기') handleSetState('name');
    else if (action === '삭제') handleSetState('delete');
    else if (action === '영구 삭제') handleSetState('destroy');
    else if (action === '다운로드') console.log('다운로드', fileSystemId);
    else if (action === '즐겨찾기 추가') console.log('즐겨찾기', fileSystemId);
    else if (action === '즐겨찾기 제거') console.log('즐겨찾기 제거', fileSystemId);
    openOverlay();
  };
  const handleSetState = (menu: MoreItemType) => {
    setState((prev) => ({
      ...prev,
      isOpen: true,
      menu,
      defaultName: name,
      fileSystemId,
      parentId,
    }));
  };

  const handleCheckboxChange = (path: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheck(fileSystemId, e.target.checked, path);
  };

  const MORE_ITEMS = useGetMoreItems();
  return (
    <CardContainer id={fileSystemId} checked={checked}>
      <CheckboxContainer checked={checked}>
        <CheckBox option="default" checked={checked} onChange={handleCheckboxChange(path)} />
      </CheckboxContainer>
      <Container.FlexRow style={{ width: '48px', height: '48px', padding: '12px' }}>
        <Img fit="fill" src={ICON['folder-gray']} />
      </Container.FlexRow>
      <Container.FlexCol gap="8" style={{ flex: 1, padding: '4px' }}>
        <TitleWrap>
          <Title fontWeight="semiBold" color="gray_100">
            {name}
          </Title>
        </TitleWrap>
        <SubtitleWrap gap="4" alignItems="center">
          <Typography.B3 fontWeight="medium" color="gray_70">
            {childrenCount}개
          </Typography.B3>
        </SubtitleWrap>
      </Container.FlexCol>
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
    </CardContainer>
  );
}
