import { CSSProperties } from 'react';
import styled from 'styled-components';

type ContainerProps = {
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  gap?: string;
  columns?: string;
  rows?: string;
};
const DefaultContainer = styled.div<ContainerProps>`
  display: flex;
  justify-content: ${({ justifyContent = 'flex-start' }) => justifyContent};
  align-items: ${({ alignItems = 'stretch' }) => alignItems};
  gap: ${({ gap }) => gap && `${gap}px`};
`;
const RowContainer = styled(DefaultContainer)`
  display: flex;
  flex-direction: row;
`;
const ColContainer = styled(DefaultContainer)`
  display: flex;
  flex-direction: column;
`;
const GridContainer = styled.div<ContainerProps>`
  display: grid;
  gap: ${({ gap }) => gap && `${gap}px`};
  grid-template-columns: ${({ columns }) => columns && `repeat(${columns},1fr)`};
  grid-template-rows: ${({ rows }) => rows && `repeat(${rows},1fr)`};
`;

const Container = { FlexRow: RowContainer, FlexCol: ColContainer, Grid: GridContainer, Container: DefaultContainer };
export default Container;
