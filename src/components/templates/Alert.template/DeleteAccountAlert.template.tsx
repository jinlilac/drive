import Button from '@/components/atoms/Button';
import CheckBox from '@/components/atoms/CheckBox';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Input from '@/components/atoms/Input';
import Typography from '@/components/atoms/Typography';
import { DeleteAccountState } from '@/components/templates/Mypage.template/MyProfile.template';
import { ICON } from '@/constants/icon';
import { DELETE_ACCOUNT } from '@/constants/mypage';
import { useAuthStore } from '@/stores/useAuthStore';
import { Dispatch, SetStateAction, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

type DeleteAccountAlertProps = {
  onClose: () => void;
  state: DeleteAccountState;
  setState: Dispatch<SetStateAction<DeleteAccountState>>;
};

const DeleteAccountWrap = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: absolute;
  background-color: white;
  border-radius: 8px;
  z-index: 1000;
  width: 100%;
  max-width: 620px;
  padding: 24px 42px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  gap: 32px;
  color: ${(props) => props.theme.Colors.gray_100};
`;
const AlertHeader = styled(Container.FlexRow)`
  line-height: 130%;
`;

const NoticeWrap = styled(Container.FlexCol)``;

const NoticeAgreement = styled(Container.FlexRow)``;

const ButtonWrap = styled(Container.FlexRow)`
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  max-height: 48px;
`;
const FeedbackWrap = styled(Container.FlexCol)``;
const FeedbackInput = styled.textarea`
  width: 100%;
  height: 168px;
  padding: 16px;
  background-color: ${(props) => props.theme.Colors.gray_20};
  border-radius: 8px;
  font-size: ${(props) => props.theme.Font.fontSize.b2};
  font-weight: ${(props) => props.theme.Font.fontWeight.medium};
  border: none;
  color: ${(props) => props.theme.Colors.gray_100};
  line-height: 130%;
  resize: none;
  &::placeholder {
    color: ${(props) => props.theme.Colors.gray_70};
  }
  &:hover {
    background-color: ${(props) => props.theme.Colors.gray_10};
    color: ${(props) => props.theme.Colors.gray_100};
    border: 1px solid ${(props) => props.theme.Colors.fill};
    outline: none;
  }
  &:focus {
    background-color: ${(props) => props.theme.Colors.gray_10};
    color: ${(props) => props.theme.Colors.gray_100};
    border: 1px solid ${(props) => props.theme.Colors.fill};
    outline: none;
  }
  &:disabled {
    &::placeholder {
      color: ${(props) => props.theme.Colors.gray_20};
    }
    outline: none;
  }
`;

export default function DeleteAccountAlert(props: DeleteAccountAlertProps) {
  const { state, setState, onClose } = props;
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { user } = useAuthStore();
  const formValue = useForm({});
  return (
    <FormProvider {...formValue}>
      <DeleteAccountWrap>
        <Container.FlexCol gap="24">
          <AlertHeader justifyContent="space-between">
            <Typography.T3 fontWeight="bold">
              {user?.name}님, <br />
              정말 계정을 삭제하시겠습니까?
            </Typography.T3>
            <Button.Ghost onClick={onClose}>
              <Img src={ICON.cross} />
            </Button.Ghost>
          </AlertHeader>
          <NoticeWrap gap="12">
            <Typography.T3 fontWeight="semiBold">탈퇴 시 유의사항</Typography.T3>
            <Container.FlexCol gap="4">
              {DELETE_ACCOUNT.map((notice) => (
                <Container.FlexRow gap="8" alignItems="center" key={notice}>
                  <Img src={ICON.radio} />
                  <Typography.B2 fontWeight="medium" color="gray_80">
                    {notice}
                  </Typography.B2>
                </Container.FlexRow>
              ))}
            </Container.FlexCol>
          </NoticeWrap>
          <NoticeAgreement alignItems="center" gap="8">
            <CheckBox option="square" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
            <Typography.B2 fontWeight="semiBold" color="gray_90">
              유의 사항을 모두 확인하였으며, 이에 동의합니다.
            </Typography.B2>
          </NoticeAgreement>
        </Container.FlexCol>
        <FeedbackWrap gap="24">
          <Container.FlexCol gap="12">
            <Typography.T3 fontWeight="bold">떠나시는 이유를 알려주세요.</Typography.T3>
            <FeedbackInput
              maxLength={200}
              placeholder="소중한 피드백을 담아 더 나은 서비스로 보답 드리도록 하겠습니다.(최대 200자)"
            />
          </Container.FlexCol>
          <ButtonWrap>
            <Button.Stroke small style={{ width: 'auto', padding: '15px 36px' }}>
              취소
            </Button.Stroke>
            <Button.Fill disabled={!isChecked} small style={{ width: 'auto', padding: '15px 36px' }}>
              회원탈퇴
            </Button.Fill>
          </ButtonWrap>
        </FeedbackWrap>
      </DeleteAccountWrap>
    </FormProvider>
  );
}
