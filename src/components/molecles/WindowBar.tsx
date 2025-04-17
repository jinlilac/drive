import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import { ICON } from '@/constants/icon';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const WindowBarContainer = styled(Container.FlexRow)`
  width: 100%;
  background-color: ${(props) => props.theme.Colors.gray_30};
  align-items: center;
  border-bottom: 0.5px solid ${(props) => props.theme.Colors.gray_50};
`;
const HomeButton = styled(Link)`
  display: flex;
  justify-content: center;
  background-color: white;
  min-height: 36px;
  min-width: 40px;
  border-right: 0.5px solid ${(props) => props.theme.Colors.gray_50};
  border-left: 0.5px solid ${(props) => props.theme.Colors.gray_50};
`;

export default function WindowBar() {
  return (
    <WindowBarContainer>
      <Img style={{ padding: '0 16px' }} src={ICON['mark-green']} />
      <HomeButton to={'/'}>
        <Img src={ICON.home} />
      </HomeButton>
    </WindowBarContainer>
  );
}
