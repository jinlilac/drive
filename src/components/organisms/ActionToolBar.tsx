// components/organisms/ActionToolbar.tsx
import Button from '@/components/atoms/Button';
import CheckBox from '@/components/atoms/CheckBox';
import Container from '@/components/atoms/Container';
import Divider from '@/components/atoms/Divider';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import { ICON } from '@/constants/icon';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

export type Action = {
  type: 'star' | 'unstar' | 'folder' | 'delete' | 'restore' | 'permanent-delete' | 'custom'; // 확장 가능한 액션 타입
  label: string;
  icon?: keyof typeof ICON;
  handler: (ids: string[]) => void;
};

export type Props = {
  selectedIds: string[];
  allIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  actions: Action[];
  close: () => void;
};

type IconButtonProps = {
  src: keyof typeof ICON;
  label: string;
  onClick: () => void;
};

const Toolbar = styled(Container.FlexRow)`
  position: absolute;
  width: 100%;
  max-width: 622px;
  top: 4px;
  left: 157px;
  background: ${(props) => props.theme.Colors.gray_100};
  border-radius: 8px;
  padding: 8px 16px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const SelectionInfo = styled(Typography.B2)`
  font-weight: ${(props) => props.theme.Font.fontWeight.semiBold};
  color: white;
`;
const ButtonIcon = styled(Button.Ghost)`
  display: flex;
  gap: 4px;
  padding: 4px 8px;
  align-items: center;
`;
const IconButton = ({ src, label, onClick }: IconButtonProps) => {
  return (
    <ButtonIcon onClick={onClick}>
      <Img src={ICON[src]} />
      <Typography.B2 fontWeight="semiBold" color="gray_10">
        {label}
      </Typography.B2>
    </ButtonIcon>
  );
};

export default function ActionToolbar({ selectedIds, allIds, setSelectedIds, actions, close }: Props) {
  const isAllSelected = selectedIds.length === allIds.length && allIds.length > 0;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < allIds.length;

  // 체크박스 클릭 시 동작
  const handleSelectAll = () => {
    if (isAllSelected || isIndeterminate) {
      setSelectedIds([]); // 모두 해제
    } else {
      setSelectedIds(allIds); // 모두 선택
    }
  };

  return (
    <Toolbar>
      <Container.FlexRow gap="42">
        <Container.FlexRow gap="4" alignItems="center" style={{ minWidth: '73px' }}>
          <CheckBox option="minus" checked={isAllSelected} indeterminate={isIndeterminate} onChange={handleSelectAll} />
          <SelectionInfo>{selectedIds.length}개 선택</SelectionInfo>
        </Container.FlexRow>

        <Container.FlexRow gap="8" justifyContent="center">
          {actions.map((action, index, array) => (
            <Container.FlexRow gap="8" key={action.type} justifyContent="center" alignItems="center">
              <IconButton
                onClick={() => action.handler(selectedIds)}
                src={action.icon as keyof typeof ICON}
                label={action.label}
              />
              {index !== array.length - 1 && <Divider.Col color="gray_10" />}
            </Container.FlexRow>
          ))}
        </Container.FlexRow>
      </Container.FlexRow>
      <ButtonIcon onClick={close}>
        <Img src={ICON['all-clear']} />
      </ButtonIcon>
    </Toolbar>
  );
}
