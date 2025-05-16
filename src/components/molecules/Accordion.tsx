import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import { ICON } from '@/constants/icon';
import { ReactNode, useCallback, useRef, useState } from 'react';
import styled, { CSSProperties } from 'styled-components';

type AccordionProps = {
  title: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
};
export type DirectionType = 'top' | 'right' | 'bottom' | 'left';

export type ChevronProps = {
  direction: DirectionType;
};
export const Chevron = styled.div<ChevronProps>`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    transition: all 0.25s ease-in-out;
    transform: ${(p) => p.direction === 'top' && 'rotate(0deg)'};
    transform: ${(p) => p.direction === 'right' && 'rotate(45deg)'};
    transform: ${(p) => p.direction === 'bottom' && 'rotate(-180deg)'};
    transform: ${(p) => p.direction === 'left' && 'rotate(-135deg)'};
  }

  &:hover {
    background-color: ${(props) => props.theme.Colors.gray_20};
    border-radius: 4px;
  }
`;
const AccordionBox = styled.div`
  border: 1px solid ${(props) => props.theme.Colors.gray_40};

  & + & {
    margin-top: -0.125rem;
  }
`;
const Title = styled(Container.FlexRow)`
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  color: ${(props) => props.theme.Colors.gray_100};
`;
const ContentWrapper = styled.div<{ maxHeight: number }>`
  max-height: ${(p) => `${p.maxHeight}px`};
  transition: max-height 0.25s ease-in-out;
  overflow: hidden;
`;
const Content = styled.div`
  border-top: 1px solid ${(props) => props.theme.Colors.gray_40};
  padding: 20px 16px;
  color: ${(props) => props.theme.Colors.gray_100};
  white-space: nowrap;
  cursor: pointer;
`;

export default function Accordion(props: AccordionProps) {
  const { title, children, style } = props;
  const [isExpanded, setExpand] = useState<boolean>();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const contentHeight = isExpanded ? (contentRef.current?.scrollHeight ?? 0) : 0;

  const handleExpandToggle = useCallback(() => {
    setExpand(!isExpanded);
  }, [isExpanded]);
  return (
    <AccordionBox style={style}>
      <Title onClick={handleExpandToggle}>
        {title}
        <Chevron direction={isExpanded ? 'top' : 'bottom'}>
          <Img full src={ICON.chevron} />
        </Chevron>
      </Title>
      <ContentWrapper maxHeight={contentHeight}>
        <Content ref={contentRef}>{children}</Content>
      </ContentWrapper>
    </AccordionBox>
  );
}
