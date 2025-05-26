import Container from '@/components/atoms/Container';
import styled from 'styled-components';

const PaginationWrap = styled(Container.FlexRow)`
  gap: 12px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PageButton = styled.button<{ active: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: ${({ active, theme }) => (active ? theme.Colors.gray_100 : 'transparent')};
  color: ${({ active, theme }) => (active ? '#fff' : theme.Colors.gray_100)};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  cursor: pointer;
  font-size: ${(props) => props.theme.Font.fontSize.b2};
`;

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  perPage: number;
  onChange: (page: number) => void;
}

export function Pagination({ currentPage, totalCount, perPage, onChange }: PaginationProps) {
  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <PaginationWrap>
      {Array.from({ length: totalPages }, (_, idx) => (
        <PageButton key={idx + 1} active={currentPage === idx + 1} onClick={() => onChange(idx + 1)}>
          {idx + 1}
        </PageButton>
      ))}
    </PaginationWrap>
  );
}
