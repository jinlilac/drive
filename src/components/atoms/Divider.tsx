import theme from '@/styles/theme';
import styled from 'styled-components';

type DividerProps = {
  size?: 'thin' | 'medium';
  color?: keyof (typeof theme)['Colors'];
  height?: 's' | 'm' | 'l';
};

const DefaultDivider = styled.div<DividerProps>`
  border-style: solid;
  border-color: ${({ color }) => theme.Colors[color || 'gray_30']};
`;
const RowDivider = styled(DefaultDivider)`
  width: 100%;
  border-bottom-width: ${({ size }) => (size === 'thin' ? '1px' : '2px')};
`;
const ColDivider = styled(DefaultDivider)`
  max-height: 12px;
  border-left-width: 1px;
  height: 100%;
`;
const Divider = { Row: RowDivider, Col: ColDivider };
export default Divider;
