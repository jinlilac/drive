import Container from '@/components/atoms/Container';
import { ReactNode } from 'react';
import styled, { CSSProperties } from 'styled-components';

type SideBarProps = {
  header?: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
};

const SideBarWrap = styled(Container.FlexCol)`
  min-width: 300px;
  padding: 0 16px;
  border-right: 1px solid ${(props) => props.theme.Colors.gray_30};
`;
const SideBarHeader = styled.div`
  padding-top: 24px;
`;

export default function SideBar({ header, children, style }: SideBarProps) {
  return (
    <SideBarWrap style={style}>
      {header && <SideBarHeader>{header}</SideBarHeader>}
      {children}
    </SideBarWrap>
  );
}
