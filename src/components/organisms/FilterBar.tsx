import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import { ICON } from '@/constants/icon';
import { ReactNode } from 'react';
import styled from 'styled-components';

type FilterBarProps = {
  title: string;
  count?: number;
  filter?: ReactNode;
  onClickList: () => void;
  onClickCard: () => void;
  isListActive: boolean;
  isCardActive: boolean;
};

const BarWrap = styled(Container.FlexRow)`
  justify-content: space-between;
  padding: 12px 0;
  max-height: 48px;
  align-items: center;
  /* position: fixed; */
  /* top: 141px; */
  /* right: 16px; */
  /* left: 316px; */
  background-color: white;
`;
const FilterWrap = styled(Container.FlexRow)`
  width: 100%;
`;

const FilterButton = styled(Button.Ghost)<{ isActive: boolean }>`
  flex: 1;
  max-height: 24px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #f1f1f1;
  }
  background-color: ${(props) => (props.isActive ? '#F3F2F2' : '')};
`;

export default function FilterBar(props: FilterBarProps) {
  const { title, filter, count, onClickList, onClickCard, isListActive, isCardActive } = props;
  return (
    <BarWrap>
      <Container.FlexRow alignItems="flex-end" gap="8">
        <Typography.T1 style={{ whiteSpace: 'nowrap' }} fontWeight="bold" color="gray_100">
          {title}
        </Typography.T1>
        {count && (
          <Typography.B2 style={{ whiteSpace: 'nowrap' }} fontWeight="medium" color="gray_70">
            {count}개
          </Typography.B2>
        )}
      </Container.FlexRow>
      <Container.FlexRow gap="16">
        <FilterWrap>{filter}</FilterWrap>
        <Container.FlexRow gap="12" alignItems="center">
          <FilterButton onClick={onClickList} isActive={isListActive}>
            <Img src={ICON.list} />
          </FilterButton>
          <FilterButton onClick={onClickCard} isActive={isCardActive}>
            <Img src={ICON.card} />
          </FilterButton>
        </Container.FlexRow>
      </Container.FlexRow>
    </BarWrap>
  );
}
