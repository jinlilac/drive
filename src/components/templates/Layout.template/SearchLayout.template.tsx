import Container from '@/components/atoms/Container';
import Divider from '@/components/atoms/Divider';
import SearchBar from '@/components/molecules/SearchBar';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

const WorkSpaceBar = styled(Container.FlexCol)`
  width: 100%;
  padding: 24px 16px;
`;
export default function SearchLayoutTemplate() {
  return (
    <WorkSpaceBar gap="16" style={{ width: 'calc(100% - 300px)', flex: '1' }}>
      <Container.FlexCol gap="16" alignItems="flex-end">
        <SearchBar />
        <Divider.Row size="thin" />
      </Container.FlexCol>
      <Outlet />
    </WorkSpaceBar>
  );
}
