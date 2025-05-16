import { useUploadFile } from '@/apis/Drive';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import UploadingBox from '@/components/atoms/Uploading';
import UploadFilesList from '@/components/organisms/UploadFiles';
import { ICON } from '@/constants/icon';
import { useAuthStore } from '@/stores/useAuthStore';
import useOverlayStore from '@/stores/useOverlayStore';
import useUploadFileStore from '@/stores/useUploadFileStore';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

export type FileWithTag = {
  file: File;
  tag: string;
};

const UploadFileContainer = styled(Container.FlexCol)`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  padding: 24px 42px;
  background-color: white;
  border-radius: 8px;
  min-width: 650px;
  gap: 24px;
  z-index: 99999;
`;
const TitleWrap = styled(Container.FlexCol)`
  gap: 8px;
`;
const DropZone = styled.div<{ isDragging: boolean }>`
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  outline: 2px dashed;
  outline-color: ${(props) => (props.isDragging ? props.theme.Colors.gray_100 : props.theme.Colors.gray_50)};
  padding: 35px;
  border-radius: 8px;
`;

const FindFile = styled.label`
  border: 1px solid ${(props) => props.theme.Colors.gray_50};
  padding: 10px 16px;
  font-size: ${(props) => props.theme.Font.fontSize.b3};
  font-weight: ${(props) => props.theme.Font.fontWeight.semiBold};
  color: ${(props) => props.theme.Colors.gray_80};
  border-radius: 6px;
  cursor: pointer;
`;

const ReloadButton = styled(Button.Ghost)`
  display: flex;
  gap: 4px;
`;

export default function UploadFileTemplate() {
  const { isOpenUploadFile, closeUploadFile } = useUploadFileStore();
  const { closeOverlay } = useOverlayStore();

  const methods = useForm();
  const [files, setFiles] = useState<FileWithTag[]>([]);
  const [failedFiles, setFailedFiles] = useState<FileWithTag[]>([]);
  const [successFiles, setSuccessFiles] = useState<FileWithTag[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthStore();
  const { uploadFiles, isUploading } = useUploadFile();
  const isComplete = files.length === 0 && successFiles.length > 0;
  const handleComplete = () => {
    closeUploadFile();
    closeOverlay();
    setSuccessFiles([]);
    setFailedFiles([]);
    setFiles([]);
  };

  const handleFindFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // ✅ 기존 선택 초기화
      fileInputRef.current.click();
    }
  };
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      tag: 'etc',
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    e.target.value = ''; // ✅ 동일 파일 재선택 가능하도록 초기화
  };

  const handleDropFiles = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
      file,
      tag: 'etc',
    }));
    setFiles((prev) => [...prev, ...newFiles]);

    setIsDragging(false);
  };

  const handleDragIn = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOut = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDeleteFile = (variant: 'upload' | 'success' | 'failed') => (index: number) => {
    if (variant === 'success') setSuccessFiles((prev) => prev.filter((_, i) => i !== index));
    else if (variant === 'failed') setFailedFiles((prev) => prev.filter((_, i) => i !== index));
    else setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTagSelect = (index: number, selectedTag: string) => {
    setFiles((prev) => prev.map((item, i) => (i === index ? { ...item, tag: selectedTag } : item)));
  };
  useEffect(() => {
    const label = dragRef.current;
    if (!label) return;

    const handlers = {
      dragenter: handleDragIn,
      dragleave: handleDragOut,
      dragover: handleDragOver,
      drop: handleDropFiles,
    };

    Object.entries(handlers).forEach(([event, handler]) => {
      label.addEventListener(event, handler as EventListener);
    });
    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        label.removeEventListener(event, handler as EventListener);
      });
    };
  }, [isOpenUploadFile, dragRef]);

  const handleUpload = () => {
    const formData = new FormData();

    formData.append('userId', user?.userId as string);
    formData.append('parentId', user?.currentId as string);

    files.forEach((f) => formData.append('tags', f.tag));

    // 파일 추가 (file1, file2... 형식)
    files.forEach(({ file }, index) => {
      formData.append(`file${index + 1}`, file);
    });

    // API 호출
    uploadFiles(formData, {
      onSuccess: (response) => {
        response.forEach((value) => {
          if (!value.success) setFailedFiles((prev) => [...prev, files[value.index]]);
          else setSuccessFiles((prev) => [...prev, files[value.index]]);
        });
        setFiles([]);
      },
    });
  };

  const handleReTry = () => {
    if (failedFiles.length === 0) return;

    const formData = new FormData();
    formData.append('userId', user?.userId as string);
    formData.append('parentId', user?.currentId as string);

    failedFiles.forEach((f) => formData.append('tags', f.tag));
    failedFiles.forEach(({ file }, index) => {
      formData.append(`file${index + 1}`, file);
    });

    uploadFiles(formData, {
      onSuccess: (response) => {
        const newFailed: FileWithTag[] = [];
        const newSuccess: FileWithTag[] = [];

        response.forEach((value) => {
          const targetFile = failedFiles[value.index];
          if (!value.success) {
            newFailed.push(targetFile);
          } else {
            newSuccess.push(targetFile);
          }
        });

        // 상태 업데이트
        setFailedFiles((prev) => prev.filter((f) => !failedFiles.includes(f)).concat(newFailed));
        setSuccessFiles((prev) => [...prev, ...newSuccess]);
      },
    });
  };
  if (!isOpenUploadFile) return null;

  return (
    <UploadFileContainer>
      <FormProvider {...methods}>
        <TitleWrap>
          <Container.FlexRow justifyContent="space-between" alignItems="center">
            <Typography.T2 fontWeight="bold">파일 업로드 ({files.length})</Typography.T2>
            <Button.Ghost style={{ width: '20px' }} onClick={handleComplete}>
              <Img full src={ICON.clear} />
            </Button.Ghost>
          </Container.FlexRow>
          <Typography.B2 fontWeight="medium" color="gray_70">
            원하는 파일을 선택하여 업로드하세요.
          </Typography.B2>
        </TitleWrap>
        <>
          <DropZone isDragging={isDragging} ref={dragRef} aria-label="파일 드래그 영역" onChange={handleDropFiles}>
            <Img style={{ width: '28px' }} src={ICON['upload-file']} />
            <Container.FlexCol gap="8" alignItems="center">
              <Typography.B1 fontWeight="semiBold" color="gray_90">
                파일을 선택하거나 여기로 끌어다 놓으세요
              </Typography.B1>
              <Typography.B2 fontWeight="medium" color="gray_70">
                JPEG, PNG, PDF, DXF and up to 1GB
              </Typography.B2>
            </Container.FlexCol>
            <FindFile htmlFor="fileUpload" onClick={handleFindFileClick}>
              파일 찾기
            </FindFile>
          </DropZone>
          <input type="file" id="fileUpload" style={{ display: 'none' }} multiple onChange={handleFileInputChange} />
        </>
        <form onSubmit={methods.handleSubmit(handleUpload)}>
          <Container.FlexCol gap="12" style={{ maxHeight: '350px', overflow: 'auto', padding: '1px' }}>
            {files.length > 0 && (
              <UploadFilesList
                files={files}
                variant="upload"
                isPending={isUploading}
                onTagSelect={handleTagSelect}
                handleDelete={handleDeleteFile('upload')}
              />
            )}
            {successFiles.length > 0 && (
              <UploadFilesList
                files={successFiles}
                variant="success"
                isPending={isUploading}
                onTagSelect={handleTagSelect}
                handleDelete={handleDeleteFile('success')}
              />
            )}
            {failedFiles.length > 0 && (
              <>
                <Container.FlexRow justifyContent="space-between" style={{ marginTop: '24px' }}>
                  <Typography.B2 fontWeight="semiBold" color="gray_100">
                    업로드 실패 ({failedFiles.length})
                  </Typography.B2>
                  <ReloadButton onClick={handleReTry}>
                    <Img src={ICON.reload} />
                    <Typography.B2 fontWeight="semiBold" color="gray_100">
                      재시도
                    </Typography.B2>
                  </ReloadButton>
                </Container.FlexRow>
                <UploadFilesList
                  files={failedFiles}
                  variant="failed"
                  isPending={isUploading}
                  onTagSelect={handleTagSelect}
                  handleDelete={handleDeleteFile('failed')}
                />
              </>
            )}
          </Container.FlexCol>
          <Button.Fill
            type={isComplete ? 'button' : 'submit'}
            disabled={isUploading || (files.length === 0 && !(files.length === 0 && successFiles.length > 0))}
            style={{ maxHeight: '46px', marginTop: '24px' }}
            onClick={isComplete ? handleComplete : undefined}
          >
            {isUploading ? (
              <UploadingBox size={20} />
            ) : files.length === 0 && successFiles.length > 0 ? (
              '완료'
            ) : (
              '업로드하기'
            )}
          </Button.Fill>
        </form>
      </FormProvider>
    </UploadFileContainer>
  );
}
