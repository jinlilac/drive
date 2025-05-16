// components/organisms/ActionToolbar.tsx
import Button from '@/components/atoms/Button';
import CheckBox from '@/components/atoms/CheckBox';
import Container from '@/components/atoms/Container';
import Divider from '@/components/atoms/Divider';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSheetBaseTemplate';
import { ICON } from '@/constants/icon';
import useGetActionBarItem from '@/hooks/useGetActionBarItems';
import useOverlayStore from '@/stores/useOverlayStore';
import { MoreItemAlertType } from '@/types/workspace.type';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

export type Props = {
  selectedIds: string[];
  allIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  close: () => void;
  state: UpdateState;
  setState: Dispatch<SetStateAction<UpdateState>>;
  onFolderClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type IconButtonProps = {
  src: string;
  label: string;
  onClick: (action: string) => void;
};

const Toolbar = styled(Container.FlexRow)`
  position: absolute;
  width: 100%;
  max-width: 622px;
  color: ${(props) => props.theme.Colors.gray_90};
  top: 4px;
  left: 157px;
  background: ${(props) => props.theme.Colors.gray_20};
  border-radius: 8px;
  padding: 8px 16px;
  align-items: center;
  justify-content: space-between;
`;

const SelectionInfo = styled(Typography.B2)`
  font-weight: ${(props) => props.theme.Font.fontWeight.semiBold};
  color: ${(props) => props.theme.Colors.gray_90};
`;
const ButtonIcon = styled(Button.Ghost)`
  display: flex;
  gap: 4px;
  padding: 4px 8px;
  align-items: center;
  position: relative;
`;
const IconButton = ({ src, label, onClick }: IconButtonProps) => {
  return (
    <ButtonIcon onClick={onClick}>
      <Img src={src} />
      <Typography.B2 fontWeight="semiBold" color="gray_90">
        {label}
      </Typography.B2>
    </ButtonIcon>
  );
};

export default function ActionToolbar(props: Props) {
  const { selectedIds, allIds, setSelectedIds, close, onFolderClick, state, setState } = props;
  const isAllSelected = selectedIds.length === allIds.length && allIds.length > 0;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < allIds.length;
  const { openOverlay } = useOverlayStore();

  // 체크박스 클릭 시 동작
  const handleSelectAll = () => {
    if (isAllSelected || isIndeterminate) {
      setSelectedIds([]); // 모두 해제
    } else {
      setSelectedIds(allIds); // 모두 선택
    }
  };
  const handleItemClick = (action: string) => (e: any) => {
    if (action === '폴더로 이동' && onFolderClick) {
      onFolderClick(e);
    } else if (action === '삭제') handleOpenSetState('delete');
    else if (action === '즐겨찾기') handleSetState('starred');
    else if (action === '복원하기') handleSetState('restore');
    else if (action === '영구 삭제') handleOpenSetState('destroy');
    else if (action === '즐겨찾기 제거') handleSetState('unstarred');
  };

  const handleSetState = (menu: MoreItemAlertType) => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
      menu,
      selectedIds,
      defaultName: state.defaultName,
    }));
  };

  const handleOpenSetState = (menu: MoreItemAlertType) => {
    setState((prev) => ({
      ...prev,
      isOpen: true,
      menu,
      selectedIds,
      defaultName: state.defaultName,
    }));
    openOverlay();
  };

  const BAR_ITEMS = useGetActionBarItem();

  return (
    <Toolbar>
      <Container.FlexRow gap="42">
        <Container.FlexRow gap="4" alignItems="center" style={{ minWidth: '73px' }}>
          <CheckBox option="minus" checked={isAllSelected} indeterminate={isIndeterminate} onChange={handleSelectAll} />
          <SelectionInfo>{selectedIds.length}개 선택</SelectionInfo>
        </Container.FlexRow>

        <Container.FlexRow gap="8" justifyContent="center">
          {BAR_ITEMS.map((item, index, array) => (
            <Container.FlexRow
              gap="8"
              key={item.label}
              justifyContent="center"
              alignItems="center"
              style={{ position: 'relative' }}
            >
              <IconButton onClick={handleItemClick(item.label)} src={item.icon} label={item.label} />
              {index !== array.length - 1 && <Divider.Col color="gray_90" />}
            </Container.FlexRow>
          ))}
        </Container.FlexRow>
      </Container.FlexRow>
      <ButtonIcon onClick={close}>
        <Img src={ICON['cross']} />
      </ButtonIcon>
    </Toolbar>
  );
}
