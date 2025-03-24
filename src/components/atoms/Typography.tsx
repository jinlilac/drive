import theme from '@/styles/theme';
import { JSX } from 'react';
import styled from 'styled-components';

type TypographyProps = {
  fontWeight?: keyof typeof theme.Font.fontWeight;
  color?: keyof (typeof theme)['Colors'];
  children: React.ReactNode;
};

const createTypographyComponent = (
  tag: keyof JSX.IntrinsicElements,
  fontSize: keyof typeof theme.Font.fontSize,
) => styled(tag)<TypographyProps>`
  font-size: ${theme.Font.fontSize[fontSize]};
  font-weight: ${({ fontWeight }) => theme.Font.fontWeight[fontWeight || 'regular']};
  color: ${({ color }) => theme.Colors[color || 'default']};
`;

const H1 = createTypographyComponent('h1', 'h1');
const H2 = createTypographyComponent('h2', 'h2');
const H3 = createTypographyComponent('h3', 'h3');

const T1 = createTypographyComponent('p', 't1');
const T2 = createTypographyComponent('p', 't2');
const T3 = createTypographyComponent('p', 't3');

const B1 = createTypographyComponent('p', 'b1');
const B2 = createTypographyComponent('p', 'b2');
const B3 = createTypographyComponent('p', 'b3');
const Typography = { H1, H2, H3, T1, T2, T3, B1, B2, B3 };

export default Typography;
