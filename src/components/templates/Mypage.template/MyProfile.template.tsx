import { useUpdateProfile } from '@/apis/SignUp';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Input from '@/components/atoms/Input';
import Overlay from '@/components/atoms/Overlay';
import Typography from '@/components/atoms/Typography';
import LabelWithInput from '@/components/molecules/LabelWithInput';
import DeleteAccountAlert from '@/components/templates/Alert.template/DeleteAccountAlert.template';
import { useAuthStore } from '@/stores/useAuthStore';
import useOverlayStore from '@/stores/useOverlayStore';
import { ProfileInput, profileSchema } from '@/types/profile.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

const ProfileWrap = styled(Container.FlexCol)`
  width: 100%;
  max-width: 600px;
  height: 100%;
  padding: 8px 0;
  padding-left: 16px;
  gap: 16px;
`;
const ProfileImgWrap = styled(Container.FlexRow)`
  gap: 16px;
  padding: 16px;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.Colors.gray_20};
`;
const EditNameWrap = styled(Container.FlexCol)`
  gap: 24px;
`;
const EditProfileWrap = styled(Container.FlexCol)`
  padding: 8px 0;
`;

const ButtonWrap = styled(Container.FlexRow)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-top: 42px;
`;

export type DeleteAccountState = {
  isOpen: boolean;
  hasChecked: boolean;
  content: string;
};

// type ProfileImgProps = {
//   userName?: string;
//   imgurl?: string;
//   previewImage?: string | null;
//   onDelete: () => void;
//   onUploadClick: () => void;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   fileInputRef: React.RefObject<HTMLInputElement>;
//   onApply: () => void;
//   canApply: boolean;
// };

// const ProfileImg = ({ userName, imgurl }: { userName?: string; imgurl?: string }) => {
//   return (
//     <ProfileImgWrap>
//       <Avatar src={imgurl} size={80} />
//       <Typography.T3 style={{ minWidth: '324px' }} fontWeight="semiBold" color="gray_100">
//         {userName}
//       </Typography.T3>
//       <Button.Ghost>
//         <Typography.B2 fontWeight="medium" color="gray_70">
//           사진삭제
//         </Typography.B2>
//       </Button.Ghost>
//       <Button.Ghost>
//         <Typography.B2 fontWeight="medium" color="blue">
//           사진 업로드
//         </Typography.B2>
//       </Button.Ghost>
//     </ProfileImgWrap>
//   );
// };

export default function MyProfileTemplate() {
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const { openOverlay } = useOverlayStore();
  const { user, setUser } = useAuthStore();
  const { updateProfile, isPending } = useUpdateProfile();

  const [deleteAccount, setDeleteAccount] = useState<DeleteAccountState>({
    isOpen: false,
    hasChecked: false,
    content: '',
  });
  const formValues = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      profileImg: user?.profileImg || undefined,
    },
    mode: 'all',
  });
  const {
    formState: { isDirty },
  } = formValues;

  const handleWithdraw = () => {
    openOverlay();
    setOpenWithdraw(true);
    // setDeleteAccount((prev) => ({
    //   ...prev,
    //   isOpen: true,
    // }));
  };
  const fileInput = useRef<HTMLInputElement | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 5MB 제한 검증 (5MB = 5 * 1024 * 1024 bytes)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      openOverlay();
      e.target.value = '';
      setPreviewImage(null);
      return;
    }

    formValues.setValue('profileImg', file, { shouldDirty: true });

    // 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  const handleImageClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  // 사진 삭제
  const handleDeleteImage = () => {
    setPreviewImage(null);
    formValues.setValue('profileImg', undefined, { shouldDirty: true });
    if (fileInput.current) fileInput.current.value = '';
  };

  const onSubmit = (data: ProfileInput) => {
    console.log('data --->', data);
    const { profileImg, ...rest } = data;
    const payload = profileImg ? { ...rest, profileImg } : rest;
    updateProfile(payload, {
      onSuccess: (data) => {
        setUser({
          name: data.name,
          profileImg: data.profileImg as string,
        });
      },
    });
  };

  return (
    <FormProvider {...formValues}>
      <ProfileWrap>
        <form onSubmit={formValues.handleSubmit(onSubmit, (error) => console.log(error))}>
          <EditProfileWrap gap="16">
            <Typography.T1 fontWeight="semiBold" color="gray_100">
              프로필
            </Typography.T1>
            <ProfileImgWrap>
              <Avatar previewImg={previewImage} size={80} />
              <Typography.T3 style={{ minWidth: '324px' }} fontWeight="semiBold" color="gray_100">
                {user?.name}
              </Typography.T3>
              <Button.Ghost onClick={handleDeleteImage}>
                <Typography.B2 fontWeight="medium" color="gray_70">
                  사진 삭제
                </Typography.B2>
              </Button.Ghost>
              <Button.Ghost type="button" onClick={handleImageClick}>
                <Typography.B2 fontWeight="medium" color="blue">
                  사진 업로드
                </Typography.B2>
              </Button.Ghost>
              <Input.Default
                type="file"
                name="profileImg"
                ref={fileInput}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </ProfileImgWrap>
          </EditProfileWrap>
          <EditNameWrap>
            <LabelWithInput
              type="text"
              style={{ backgroundColor: 'white', border: '1px solid #2f2f2f' }}
              label="이름"
              color="gray_100"
              name="name"
              placeholder="이름을 입력해주세요."
            />
            <LabelWithInput type="text" label="이메일" color="gray_100" name="email" value={user?.email} disabled />
          </EditNameWrap>

          <ButtonWrap>
            <Button.Ghost onClick={handleWithdraw}>
              <Typography.B2 fontWeight="semiBold" color="gray_70" style={{ textDecorationLine: 'underline' }}>
                위브 탈퇴하기
              </Typography.B2>
            </Button.Ghost>
            <Button.Fill
              type="submit"
              style={{ maxWidth: '124px', maxHeight: '44px' }}
              disabled={isPending || !isDirty}
            >
              <Typography.B2 fontWeight="medium">변경사항 저장</Typography.B2>
            </Button.Fill>
          </ButtonWrap>
          {openWithdraw && (
            <>
              <Overlay />
              <DeleteAccountAlert
                onClose={() => setOpenWithdraw(false)}
                state={deleteAccount}
                setState={setDeleteAccount}
              />
            </>
          )}
        </form>
      </ProfileWrap>
    </FormProvider>
  );
}
