import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import { ICON } from '@/constants/icon';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

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

const ToolTipContainer = styled(Container.FlexRow)`
  display: inline-block;
  width: 100%;
  align-self: center;
  position: relative;
  z-index: 10;
`;
const ToolTipIcon = styled(Img).attrs({ src: ICON['exclamation-mark'] })`
  width: 18px;
  height: 18px;
`;

const ToolTip = styled(Typography.B2)`
  display: inline;
  font-weight: ${(props) => props.theme.Font.fontWeight.medium};
  position: absolute;
  top: 100%;
  left: 100%;
  width: max-content;
  padding: 12px 16px;
  transform: translateX(-18px);
  color: ${(props) => props.theme.Colors.gray_90};
  border-radius: 8px;
  background-color: ${(props) => props.theme.Colors.gray_20};
  opacity: 0;
  transition: opacity 0.2s;
  ${ToolTipIcon}:hover + & {
    opacity: 1;
  }
`;

export default function FilterBar(props: FilterBarProps) {
  const { title, filter, count, onClickList, onClickCard, isListActive, isCardActive } = props;
  const { pathname } = useLocation();
  return (
    <BarWrap>
      <Container.FlexRow alignItems="flex-end" gap="8">
        <Typography.T1 style={{ whiteSpace: 'nowrap' }} fontWeight="bold" color="gray_100">
          {title}
        </Typography.T1>
        {pathname.includes('trash') && (
          <ToolTipContainer>
            <ToolTipIcon />
            <ToolTip>
              휴지통에 있는 항목은{' '}
              <strong style={{ display: 'inline', fontWeight: 'bold' }}>14일 후 자동으로 영구 삭제</strong>
              {''}됩니다.
            </ToolTip>
          </ToolTipContainer>
        )}
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
