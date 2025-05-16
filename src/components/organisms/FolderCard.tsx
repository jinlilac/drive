import CheckBox from '@/components/atoms/CheckBox';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import DropdownButton from '@/components/molecules/DropdownButton';
import { DropBoxItem } from '@/components/molecules/ProfileCard';
import { TagLabelProps } from '@/components/molecules/TagLabel';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSheetBaseTemplate';
import { ICON } from '@/constants/icon';
import useOverlayStore from '@/stores/useOverlayStore';
import { FolderListResponse } from '@/types/file.type';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import styled from 'styled-components';
import { FileSystemType, MoreItemAlertType } from '@/types/workspace.type';
import useGetMoreItems from '@/hooks/useGetMoreItems';
import { useAuthStore } from '@/stores/useAuthStore';
import { useSetSearchParam } from '@/hooks/useSearchParam';
import { useLocation, useNavigate } from 'react-router-dom';

const CardContainer = styled(Container.FlexRow)<{ checked: boolean }>`
  gap: 8px;
  padding: 4px;
  flex-shrink: 0;
  border-radius: 8px;
  background-color: ${(props) => (props.checked ? props.theme.Colors.gray_30 : props.theme.Colors.gray_20)};
  &:hover {
    background-color: ${(props) => props.theme.Colors.gray_30};
  }
  position: relative;
  align-items: center;
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
      state: UpdateState;
      setState: Dispatch<SetStateAction<UpdateState>>;
      checked: boolean;
      onCheck: (id: string, checked: boolean, path?: string, name?: string) => void;
    } & Partial<FolderListResponse>,
) {
  const { name, setState, fileSystemId, path, childrenCount, parentId, checked, onCheck, isStarred, state } = props;

  const { openOverlay } = useOverlayStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleMoreButton = (action: string) => {
    if (action === '이름 바꾸기') handleOpenSetState('name');
    else if (action === '삭제') handleOpenSetState('delete');
    else if (action === '영구 삭제') handleOpenSetState('destroy');
    else if (action === '다운로드') handleSetState('download');
    else if (action === '즐겨찾기 추가') handleSetState('starred');
    else if (action === '즐겨찾기 제거') handleSetState('unstarred');
    else if (action === '복원하기') handleSetState('restore');
  };

  const handleSetState = (menu: MoreItemAlertType) => {
    console.log('menu', menu);
    setState((prev) => ({
      ...prev,
      isOpen: false,
      menu,
      defaultName: name,
      parentId,
      selectedIds: [fileSystemId],
    }));
  };

  const handleOpenSetState = (menu: MoreItemAlertType) => {
    setState((prev) => ({
      ...prev,
      isOpen: true,
      menu,
      defaultName: name,
      parentId,
      selectedIds: [fileSystemId],
    }));
    openOverlay();
  };

  const handleCheckboxChange = (path: string, name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheck(fileSystemId, e.target.checked, path, name);
  };

  const MORE_ITEMS = useGetMoreItems(isStarred);
  const { setUser } = useAuthStore();
  const { add } = useSetSearchParam();

  const handleDoubleClick = (id: string) => (e: MouseEvent<HTMLDivElement>) => {
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
    <CardContainer id={fileSystemId} checked={checked} onDoubleClick={handleDoubleClick(fileSystemId)}>
      <CheckboxContainer checked={checked}>
        <CheckBox option="default" checked={checked} onChange={handleCheckboxChange(path, name)} />
      </CheckboxContainer>
      <Container.FlexRow alignItems="center" style={{ width: '48px', height: '48px', padding: '9px' }}>
        <Img full fit="fill" src={ICON['folder-gray']} />
      </Container.FlexRow>
      <Container.FlexCol justifyContent="center" gap="8" style={{ flex: 1, padding: '4px' }}>
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
      <DropdownButton
        disabled={state.selectedIds.length > 0}
        isHover={state.selectedIds.length === 0}
        icon={<Img style={{ padding: '13px' }} src={ICON.more} />}
      >
        <Container.FlexCol gap="16">
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
