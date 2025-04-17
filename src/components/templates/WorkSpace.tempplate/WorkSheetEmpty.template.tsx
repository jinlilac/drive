import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import { ICON } from '@/constants/icon';
import { styled } from 'styled-components';

const EmptyWorkSheetWrap = styled(Container.FlexCol)`
  padding: 16px 0;
  height: 100%;
  width: 100%;
  flex: 1;
`;

const CreatedWorkSheet = styled(Button.Fill)`
  max-width: 172px;
  max-height: 44px;
  gap: 8px;
`;
export default function WorkSheetEmptyTemplate() {
  return (
    <EmptyWorkSheetWrap justifyContent="center" alignItems="center" gap="16">
      <Container.FlexCol justifyContent="center" alignItems="center" gap="8">
        <Typography.B1 fontWeight="medium" color="gray_70">
          작업 중인 작업지시서가 없습니다.
        </Typography.B1>
        <Typography.B1 fontWeight="medium" color="gray_70">
          새 작업지시서를 생성하고 작업을 시작해보세요.
        </Typography.B1>
      </Container.FlexCol>
      <CreatedWorkSheet>
        <Img src={ICON.plus} />
        <Typography.B2 fontWeight="semiBold" color="gray_10">
          새 작업지시서 만들기
        </Typography.B2>
      </CreatedWorkSheet>
    </EmptyWorkSheetWrap>
  );
}
