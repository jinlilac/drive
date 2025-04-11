import Typography from '@/components/atoms/Typography';
import theme from '@/styles/theme';
import styled from 'styled-components';

export type TagLabelProps = {
  label: string;
  color?: keyof (typeof theme)['Colors'];
};

const Label = styled.div<Omit<TagLabelProps, 'label'>>`
  background-color: ${({ color }) => {
    const baseColor = theme.Colors[color || 'gray_80'];
    return baseColor.includes('#') ? `${baseColor}1A` : baseColor; // HEX 색상 + 투명도
  }};
  height: 100%;
  max-height: 20px;
  border-radius: 4px;
  padding: 4px 8px;
`;

export default function TagLabel(props: TagLabelProps) {
  const { color, label } = props;
  return (
    <Label color={color}>
      <Typography.B3 fontWeight="medium" color={color}>
        {label}
      </Typography.B3>
    </Label>
  );
}
