import Container from '../atoms/Container';
import Button from '@/components/atoms/Button';
import { DRIVE_CATEGORY } from '@/constants/workspace';
import Typography from '@/components/atoms/Typography';
import { KorToEngDriveCategory } from '@/types/workspace.type';
import { MouseEvent } from 'react';
import styled from 'styled-components';
import { useSetSearchParam } from '@/hooks/useSearchParam';

type CategoryTabProps = {
  currentTab: KorToEngDriveCategory;
  setCurrentTab: (category: KorToEngDriveCategory) => void;
};

const TabButton = styled(Button.Ghost)<{ isActive: boolean }>`
  display: inline-flex;
  gap: 4px;
  align-items: center;
  opacity: ${(props) => (props.isActive ? '100%' : '40%')};
  color: ${(props) => props.theme.Colors.gray_100};
`;

export default function CategoryTab(props: CategoryTabProps) {
  const { currentTab, setCurrentTab } = props;
  const { add } = useSetSearchParam();

  const onClickTab = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    setCurrentTab(id as KorToEngDriveCategory);
    add([['category', id as KorToEngDriveCategory]]);
  };
  return (
    <Container.FlexRow gap="32" alignItems={'center'} style={{ marginTop: '16px' }}>
      {DRIVE_CATEGORY.map((value) => (
        <TabButton id={value.name} onClick={onClickTab} key={`${value.name}_tab`} isActive={currentTab === value.name}>
          <Typography.B1 fontWeight={'semiBold'}>{value.label}</Typography.B1>
          {/* {value.name === 'wiive' && <TagLabel wiive={true} />} */}
        </TabButton>
      ))}
    </Container.FlexRow>
  );
}
