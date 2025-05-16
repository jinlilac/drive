import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import theme from '@/styles/theme';
import styled, { css } from 'styled-components';

export type TagLabelProps = {
  label?: string;
  color?: keyof (typeof theme)['Colors'];
  wiive?: boolean;
};

const Label = styled(Container.FlexRow)<Omit<TagLabelProps, 'label'>>`
  background-color: ${({ color }) => {
    const baseColor = theme.Colors[color || 'gray_80'];
    return baseColor.includes('#') ? `${baseColor}1A` : baseColor; // HEX 색상 + 투명도
  }};
  background: ${({ wiive }) => wiive && 'linear-gradient(to right, #63239b1a, #dd65aa1a)'};
  height: 100%;
  max-height: 20px;
  border-radius: 4px;
  padding: 4px 8px;
  justify-content: center;
`;

const Typo = styled(Typography.B3)<{ wiive: boolean }>`
${({ wiive }) =>
  wiive &&
  css`
    background: linear-gradient(to right, #63239b, #dd65aa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  `}}
`;

export default function TagLabel(props: TagLabelProps) {
  const { color, label, wiive = false } = props;
  return (
    <Label color={color} wiive={wiive}>
      <Typo fontWeight="medium" color={color} wiive={wiive}>
        {wiive ? 'wiive' : label}
      </Typo>
    </Label>
  );
}
