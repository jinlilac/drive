import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Input from '@/components/atoms/Input';
import Typography from '@/components/atoms/Typography';
import LabelWithInput from '@/components/molecles/LabelWithInput';
import { ICON } from '@/constants/icon';
import { useAuthStore } from '@/stores/useAuthStore';
import React, { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

const EditImageButton = styled(Button.Ghost)`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 0;
  right: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProfileTemplate() {
  const { user } = useAuthStore();
  const formValues = useForm({});
  const fileInput = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onClickImg = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // 서버 업로드 로직
    const formData = new FormData();
    formData.append('profile', file);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    // 회원가입, 이메일 로그인 시
    // 소셜 로그인 시 update 로직
  };

  return (
    <Container.FlexCol gap="48">
      <Container.FlexCol gap="17" alignItems="center">
        <Typography.T1 fontWeight="bold" color="gray_200">
          프로필 설정
        </Typography.T1>
        <Typography.B1 fontWeight="medium" color="gray_70">
          프로필 사진은 회원가입 이후 프로필 설정에서도 등록 가능합니다.
        </Typography.B1>
      </Container.FlexCol>
      <FormProvider {...formValues}>
        <form onSubmit={formValues.handleSubmit(onSubmit)}>
          <Container.FlexRow style={{ marginBottom: '48px', position: 'relative' }} justifyContent="center">
            <Avatar src={previewImage || user?.profile} />
            <EditImageButton type="button" onClick={onClickImg}>
              <Img src={ICON['edit-img']} />
            </EditImageButton>
            {/* 숨겨진 파일 입력 필드 */}
            <Input.Default
              type="file"
              ref={fileInput}
              onChange={onChangeImage}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </Container.FlexRow>
          <LabelWithInput
            type="text"
            label="이름"
            name="name"
            placeholder="이름을 입력해주세요."
            value={user?.name || undefined}
          />
          <Button.Fill type="submit" style={{ maxHeight: '54px', marginTop: '28px' }}>
            완료
          </Button.Fill>
        </form>
      </FormProvider>
    </Container.FlexCol>
  );
}
