import { useUpdateProfile } from '@/apis/SignUp';
import Overlay from '@/components/atoms/Overlay';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Input from '@/components/atoms/Input';
import Typography from '@/components/atoms/Typography';
import Alert from '@/components/molecules/Alert';
import LabelWithInput from '@/components/molecules/LabelWithInput';
import { ICON } from '@/constants/icon';
import { useAuthStore } from '@/stores/useAuthStore';
import useOverlayStore from '@/stores/useOverlayStore';
import { ProfileInput, profileSchema } from '@/types/profile.type';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();
  const { openOverlay, closeOverlay } = useOverlayStore();
  const { updateProfile, isPending } = useUpdateProfile();

  const formValues = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      profileImg: undefined,
    },
    mode: 'onChange',
  });

  const fileInput = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileError, setFileError] = useState<boolean>(false);

  useEffect(() => {
    if (user?.isInitialized) {
      navigate('/sign/outro');
    }
  }, [user?.isInitialized]);

  const handleImageClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const handleCloseAlert = () => {
    closeOverlay();
    setFileError(false);
  };
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 5MB 제한 검증 (5MB = 5 * 1024 * 1024 bytes)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      openOverlay();
      setFileError(true);
      e.target.value = '';
      setPreviewImage(null);
      return;
    }

    setFileError(false); // 오류 초기화
    formValues.setValue('profileImg', file);

    // 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (data: ProfileInput) => {
    if (fileError) return;
    updateProfile(data, {
      onSuccess: (data) => {
        setUser({
          name: data.name,
          profileImg: data.profileImg,
          accessToken: undefined,
          isInitialized: true,
        });
        navigate('sign/outro');
      },
    });

    // 소셜 로그인 시 update 로직
  };

  return (
    <Container.FlexCol
      gap="48"
      justifyContent="center"
      style={{ position: 'relative', minWidth: '480px', height: '100%' }}
    >
      <Container.FlexCol alignItems="center">
        <Typography.T1 style={{ marginBottom: '17px' }} fontWeight="bold" color="gray_200">
          프로필 설정
        </Typography.T1>
        <Typography.B1 style={{ lineHeight: '130%' }} fontWeight="regular" color="gray_70">
          프로필 사진은 회원가입 이후 프로필 설정에서도 등록 가능합니다.
        </Typography.B1>
        <Container.FlexRow>
          <Typography.B1 fontWeight="regular" color="gray_70">
            (사진은&nbsp;
          </Typography.B1>
          <Typography.B1 fontWeight="medium" color="gray_70">
            5MB 이하, 1장
          </Typography.B1>
          <Typography.B1 fontWeight="regular" color="gray_70">
            까지 업로드할 수 있어요.)
          </Typography.B1>
        </Container.FlexRow>
      </Container.FlexCol>
      <FormProvider {...formValues}>
        <form onSubmit={formValues.handleSubmit(handleSubmit)}>
          <Container.FlexRow style={{ marginBottom: '48px', position: 'relative' }} justifyContent="center">
            <Avatar size={168} previewImg={previewImage} />
            <EditImageButton type="button" onClick={handleImageClick}>
              <Img src={ICON['edit-img']} />
            </EditImageButton>
            {/* 숨겨진 파일 입력 필드 */}
            <Input.Default
              type="file"
              name="profileImg"
              ref={fileInput}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </Container.FlexRow>
          <LabelWithInput
            type="text"
            label="이름"
            name="name"
            placeholder="이름을 입력해주세요."
            value={formValues.watch('name')}
            onChange={(e) => formValues.setValue('name', e.target.value)} // 값 업데이트
          />
          <Button.Fill disabled={isPending} type="submit" style={{ maxHeight: '54px', marginTop: '28px' }}>
            완료
          </Button.Fill>
          <Overlay />
        </form>
      </FormProvider>
      {fileError && (
        <Alert type="confirm" confirmLabel="확인" onConfirm={handleCloseAlert}>
          <Container.FlexCol gap="12" alignItems="center" style={{ marginBottom: '12px' }}>
            <Img style={{ width: '64px', marginBottom: '12px' }} src={ICON['upload-failed']} />
            <Typography.T2 fontWeight="bold">이미지를 업로드할 수 없어요</Typography.T2>
            <Container.FlexCol gap="4" alignItems="center">
              <Typography.B1 fontWeight="medium" color="gray_70">
                5MB 이하의 이미지만 프로필로 사용할 수 있어요.
              </Typography.B1>
              <Typography.B1 fontWeight="medium" color="gray_70">
                확인 후 다시 업로드해 주세요.
              </Typography.B1>
            </Container.FlexCol>
          </Container.FlexCol>
        </Alert>
      )}
    </Container.FlexCol>
  );
}
