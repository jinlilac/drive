import Overlay from '@/components/atoms/Overlay';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import { ICON } from '@/constants/icon';
import useOverlayStore from '@/stores/useOverlayStore';
import useUploadFileStore from '@/stores/useUploadFileStore';
import { styled } from 'styled-components';
import { useSetSearchParam } from '@/hooks/useSearchParam';

const EmptyDriveWrap = styled(Container.FlexCol)`
  padding: 16px 0;
  height: 100%;
  width: 100%;
  flex: 1;
`;

const CreatedUpload = styled(Button.Fill)`
  max-width: 172px;
  max-height: 44px;
  gap: 8px;
`;
export default function DriveEmptyTemplate() {
  const { openUploadFile } = useUploadFileStore();
  const { openOverlay } = useOverlayStore();
  const { get } = useSetSearchParam();

  const handleCreateFile = () => {
    openOverlay();
    openUploadFile();
  };
  return (
    <EmptyDriveWrap justifyContent="center" alignItems="center" gap="16">
      <Overlay />
      {get('search') ? (
        <Typography.B1 fontWeight="medium" color="gray_70">
          검색결과가 없습니다.
        </Typography.B1>
      ) : (
        <>
          <Container.FlexCol justifyContent="center" alignItems="center" gap="8">
            <Typography.B1 fontWeight="medium" color="gray_70">
              업로드 된 파일이 없습니다.
            </Typography.B1>
            <Typography.B1 fontWeight="medium" color="gray_70">
              파일을 업로드하여 작업을 효율적으로 관리해보세요.
            </Typography.B1>
          </Container.FlexCol>
          <CreatedUpload onClick={handleCreateFile}>
            <Img src={ICON.plus} />
            <Typography.B2 fontWeight="semiBold" color="gray_10">
              새 파일 업로드하기
            </Typography.B2>
          </CreatedUpload>
        </>
      )}
    </EmptyDriveWrap>
  );
}
