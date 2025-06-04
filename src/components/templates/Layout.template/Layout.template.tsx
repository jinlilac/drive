import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import { ICON } from '@/constants/icon';
import { ComponentProps } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const LayoutContainer = styled(Container.Grid)<ComponentProps<'div'>>`
  min-width: 1024px;
  height: 100dvh;
  grid-template-columns: repeat(2, 1fr);
`;
const BgContainer = styled(Container.FlexCol)`
  position: relative;
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-image: url('/assets/imgs/bg-main-layout.webp');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const OutletContainer = styled(Container.FlexRow)`
  justify-content: center;
  flex: 1;
  align-items: center;
`;
export default function LayoutTemplate() {
  return (
    <LayoutContainer>
      <BgContainer>
        <Img src={ICON['drive-logo']} />
      </BgContainer>
      <Container.FlexCol style={{ flex: '1' }}>
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </Container.FlexCol>
    </LayoutContainer>
  );
}
