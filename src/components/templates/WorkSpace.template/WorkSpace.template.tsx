import { useObserver } from '@/hooks/useObserver';
import { useEffect, useState } from 'react';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSheetBaseTemplate';
import ActionToolbar from '@/components/organisms/ActionToolBar';
import useToastStore from '@/stores/useToastStore';
import Button from '@/components/atoms/Button';
import { AxiosResponse } from 'axios';
import {
  EngToKorDriveCategory,
  FileSystemAllResponseType,
  FileSystemListResponseType,
  KorToEngDriveCategory,
  MoreItemAlertType,
} from '@/types/workspace.type';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import styled, { keyframes } from 'styled-components';
import { useLocation } from 'react-router-dom';
import Img from '@/components/atoms/Img';
import { ICON } from '@/constants/icon';
import { useDeleteWorkSpace, useDestroyWorkSpace, useRestoreWorkSpace, useUpdateWorkSpace } from '@/apis/WorkSpace';
import WorkSpaceAlertTemplate from '@/components/templates/WorkSpace.template/WorkSpaceAlert.template';
import Toast from '@/components/molecules/Toast';
import LoaderBox from '@/components/molecules/LoaderBox';
import DriveEmptyTemplate from '@/components/templates/WorkSpace.template/Drive.template/DriveEmpty.template';
import MoveFolder from '@/components/organisms/MoveFolder';
import { useAuthStore } from '@/stores/useAuthStore';
import useOverlayStore from '@/stores/useOverlayStore';
import WorkSpaceFolderTemplate from '@/components/templates/WorkSpace.template/WorkSpaceFolderAndItem.template/WorkSpaceFolderTemplate';
import WorkSpaceItemTemplate from '@/components/templates/WorkSpace.template/WorkSpaceFolderAndItem.template/WorkSpaceItem.template';
import { useQuery } from '@tanstack/react-query';
import { useDownLoad, useDownloadStatus } from '@/apis/Drive';

type WorkSpaceTemplateProps = {
  fileSystem: AxiosResponse<FileSystemAllResponseType | FileSystemListResponseType>[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  viewMode: 'list' | 'card';
  currentTab: KorToEngDriveCategory;
};
const WorkSpaceContainer = styled(Container.FlexCol)`
  margin-bottom: 164px;
  margin-top: 24px;
  padding-top: 8px;
  overflow: scroll;
  height: 100%;
`;

const StarredBreadcrumb = styled(Container.FlexRow)`
  position: fixed;
  width: 100%;
  bottom: 24px;
  padding: 12px 8px;
  border-top: ${(props) => `1px ${props.theme.Colors.gray_30} solid`};
  background: white;
`;

const StarredBreadcrumbItemContainer = styled(Container.FlexRow)`
  padding: 0 8px;
  gap: 4px;

  & > p {
    max-width: 100px;
    padding: 5px 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    align-self: center;
  }

  flex-wrap: wrap;
`;
const CategoryTitleTypo = styled(Typography.T3).attrs({ fontWeight: 'semiBold', color: 'gray_100' })``;
const CategoryCountTypo = styled(Typography.B2).attrs({ fontWeight: 'medium', color: 'gray_70' })``;

// 스피너 애니메이션
const spin = keyframes`
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
`;

// 스피너 스타일
const SpinnerWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SpinnerCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #eee;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 16px;
`;

// 스피너 컴포넌트
const Spinner = ({ text }: { text?: string }) => (
  <SpinnerWrapper>
    <SpinnerCircle />
  </SpinnerWrapper>
);

const extractFileSystemPath = (path: string): string[] => {
  return ['내 드라이브', ...path.split('/').slice(1)];
};

export default function WorkSpaceTemplate(props: WorkSpaceTemplateProps) {
  const { fileSystem, hasNextPage, fetchNextPage, viewMode, currentTab } = props;
  const { ref: loaderRef, isShow } = useObserver<HTMLDivElement>();
  const [hasChecked, setHasChecked] = useState(false);
  const [fileSystemPath, setFileSystemPath] = useState<string>('');
  const { pathname } = useLocation();
  const [moveFolderPosition, setMoveFolderPosition] = useState<{ left: number; top: number } | null>(null);
  const [openMoveFolder, setOpenMoveFolder] = useState<boolean>(false);
  const { user, setUser } = useAuthStore();
  const { closeOverlay } = useOverlayStore();

  useEffect(() => {
    if (isShow && hasNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isShow]);

  const [updateState, setUpdateState] = useState<UpdateState>({
    isOpen: false,
    menu: '',
    fileSystemId: '',
    defaultName: '',
    parentId: '',
    selectedIds: [],
  });
  console.log('updateState', updateState);

  useEffect(() => {
    if (updateState.selectedIds.length !== 1) setFileSystemPath('');
  }, [updateState.selectedIds.length]);

  const { updateWorkSpace, isUpdating } = useUpdateWorkSpace();
  const { deleteWorkSpace, isDeleting } = useDeleteWorkSpace();
  const { restoreWorkSpace, isRestoring } = useRestoreWorkSpace();
  const { destroyWorkSpace, isDestroying } = useDestroyWorkSpace();
  // 다운로드 초기 요청 훅 (jobId 혹은 url 획득)
  const { data: downloadData } = useQuery(useDownLoad(updateState.fileSystemId, updateState.menu === 'download'));
  console.log('data => ', downloadData);

  // jobId 상태 관리
  const [downloadJobId, setDownloadJobId] = useState<string>('');
  const [isPulling, setIsPulling] = useState<boolean>(false);

  const downloadFile = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'download';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 1. 다운로드 결과 처리
  useEffect(() => {
    if (!downloadData) return;

    // 폴더인 경우: jobId 저장 → 폴링 시작
    if (downloadData.jobId) {
      setDownloadJobId(downloadData.jobId);
      setIsPulling(true);
    }
    // 파일인 경우: URL 바로 열기
    else if (downloadData) {
      downloadFile(downloadData);
      resetUpdateState();
    }
  }, [downloadData]);

  // 2. jobId 기반 상태 폴링
  const { data: jobStatus } = useQuery(useDownloadStatus(downloadJobId, !!downloadJobId));

  // 3. 폴더 다운로드 완료 시 처리
  useEffect(() => {
    if (jobStatus?.status) {
      console.log('jobStatus ===>', jobStatus);
    } else if (jobStatus && typeof jobStatus === 'string') {
      window.open(jobStatus);
      setIsPulling(false);
      setDownloadJobId('');
      resetUpdateState();
    }
  }, [jobStatus]);

  const handleMoveConfirm = (folderId: string) => {
    updateWorkSpace(
      {
        id: updateState.selectedIds,
        parentId: folderId,
        currentId: user?.currentId,
      },
      {
        onSuccess: () => {
          useToastStore.getState().showToast({
            text: `파일 ${updateState.selectedIds.length}개가 이동되었습니다.`,
            button: <Button.Ghost>실행취소</Button.Ghost>,
          });
          setOpenMoveFolder(false);
        },
      },
    );
    resetUpdateState();
  };

  const resetUpdateState = () => {
    setUpdateState((prev) => ({ ...prev, isOpen: false, menu: '', selectedIds: [], fileSystemId: '' }));
    setHasChecked(false);
    closeOverlay();
  };

  const isPending = isUpdating || isDeleting || isRestoring || isDestroying;

  useEffect(() => {
    if (!updateState.menu || updateState.menu === 'download' || (!updateState.fileSystemId && !updateState.selectedIds))
      return;

    const handleAction = () => {
      const ids = updateState.selectedIds.length > 0 ? updateState.selectedIds : [updateState.fileSystemId];

      switch (updateState.menu) {
        case 'starred':
          updateWorkSpace(
            { id: ids, isStarred: true },
            {
              onSuccess: () => {
                useToastStore.getState().showToast({
                  text: '즐겨찾기에서 추가되었습니다.',
                  button: <Button.Ghost>실행취소</Button.Ghost>,
                });
                resetUpdateState();
              },
            },
          );
          break;

        case 'unstarred':
          updateWorkSpace(
            { id: ids, isStarred: false },
            {
              onSuccess: () => {
                useToastStore.getState().showToast({
                  text: '즐겨찾기에서 제거되었습니다.',
                  button: <Button.Ghost>실행취소</Button.Ghost>,
                });
                resetUpdateState();
              },
            },
          );
          break;

        case 'moveTrash':
          deleteWorkSpace(
            { ids },
            {
              onSuccess: () => {
                useToastStore.getState().showToast({
                  text: '파일이 삭제되었습니다.',
                  button: <Button.Ghost>실행취소</Button.Ghost>,
                });
                resetUpdateState();
              },
            },
          );
          break;

        case 'hardDelete':
          destroyWorkSpace(
            { ids },
            {
              onSuccess: (data) => {
                console.log('data', data);
                setUser({ storageLimit: data?.data.storageLimit, storageUsed: data?.data.storageUsed });
                resetUpdateState();
              },
            },
          );
          break;

        case 'rename':
          updateWorkSpace(
            { id: ids, name: updateState.defaultName },
            {
              onSuccess: () => {
                useToastStore.getState().showToast({
                  text: '파일 이름이 변경되었습니다.',
                  button: <Button.Ghost>실행취소</Button.Ghost>,
                });
                resetUpdateState();
              },
            },
          );
          break;

        case 'restore':
          restoreWorkSpace(
            { ids },
            {
              onSuccess: () => {
                useToastStore.getState().showToast({
                  text: '파일이 복원되었습니다.',
                  button: <Button.Ghost>실행취소</Button.Ghost>,
                });
                resetUpdateState();
              },
            },
          );
          break;
      }
    };

    handleAction();
  }, [updateState.menu, updateState.selectedIds]);

  const handleCheck = (id: string, checked: boolean, path?: string, name?: string) => {
    setUpdateState((prev) => {
      const nextUpdateState = {
        ...prev,
        selectedIds: checked ? [...prev.selectedIds, id] : prev.selectedIds.filter((item) => item !== id),
      };
      if (nextUpdateState.selectedIds.length === 1) setFileSystemPath(path as string);
      if (nextUpdateState.selectedIds.length === 1) nextUpdateState.defaultName = name as string;
      return nextUpdateState;
    });
    if (!hasChecked) setHasChecked(true);
  };

  const allIds = fileSystem.flatMap((item) => {
    const result = [];
    if ('folders' in item.data) {
      result.push(...item.data.folders.map((content) => content.fileSystemId));
      result.push(...item.data.files.map((content) => content.fileSystemId));
    } else if ('data' in item.data) result.push(...item.data.data.map((content) => content.fileSystemId));
    return result;
  });
  return (
    <>
      <WorkSpaceContainer>
        {'folders' in fileSystem[0].data && fileSystem[0].data.folders.length > 0 && (
          <>
            <Container.FlexRow alignItems="baseline" gap="8">
              <CategoryTitleTypo>{EngToKorDriveCategory.folder}</CategoryTitleTypo>
              <CategoryCountTypo>{fileSystem[0].data.folders.length}개</CategoryCountTypo>
            </Container.FlexRow>
            <WorkSpaceFolderTemplate
              folders={fileSystem[0].data.folders}
              state={updateState}
              checked={updateState.selectedIds}
              setState={setUpdateState}
              onCheck={handleCheck}
              viewMode={viewMode}
            />
            <div style={{ marginBottom: '32px' }} />
          </>
        )}
        {(('files' in fileSystem[0].data && fileSystem[0].data.files?.length > 0) ||
          ('count' in fileSystem[0].data && fileSystem[0].data.count > 0)) && (
          <>
            <Container.FlexRow alignItems="baseline" gap="8">
              <CategoryTitleTypo>{EngToKorDriveCategory[currentTab]}</CategoryTitleTypo>
              <CategoryCountTypo>{fileSystem[0].data?.files?.length ?? fileSystem[0].data?.count}개</CategoryCountTypo>
            </Container.FlexRow>
            <WorkSpaceItemTemplate
              state={updateState}
              fileSystem={fileSystem}
              checked={updateState.selectedIds}
              setState={setUpdateState}
              onCheck={handleCheck}
              viewMode={viewMode}
            />
          </>
        )}
        {(fileSystem[0].data.files?.length <= 0 || !fileSystem[0].data.files) &&
          (fileSystem[0].data.folders?.length <= 0 || !fileSystem[0].data.folders) &&
          (fileSystem[0].data?.count <= 0 || !fileSystem[0].data.count) && (
            <Container.FlexCol
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {pathname.includes('drive') ? (
                <DriveEmptyTemplate />
              ) : pathname.includes('trash') ? (
                <Typography.B1 fontWeight="medium" color="gray_70">
                  휴지통이 비어있습니다.
                </Typography.B1>
              ) : pathname.includes('starred') ? (
                <Typography.B1 fontWeight="medium" color="gray_70">
                  즐겨찾기가 비어있습니다.
                </Typography.B1>
              ) : null}
            </Container.FlexCol>
          )}
        {fileSystemPath && !pathname.includes('drive') && (
          <StarredBreadcrumb>
            <StarredBreadcrumbItemContainer>
              {extractFileSystemPath(fileSystemPath).map((value, index, array) => (
                <>
                  <Typography.B2 key={value} color="gray_90" fontWeight="medium">
                    {value}
                  </Typography.B2>
                  {index !== array.length - 1 && (
                    <div style={{ width: '16px', height: '16px', alignSelf: 'center', textAlign: 'center' }}>
                      <Img src={ICON['right-arrow']} />
                    </div>
                  )}
                </>
              ))}
            </StarredBreadcrumbItemContainer>
          </StarredBreadcrumb>
        )}
        <Toast />
      </WorkSpaceContainer>
      {updateState.isOpen && (
        <WorkSpaceAlertTemplate
          menu={updateState.menu as MoreItemAlertType}
          setState={setUpdateState}
          state={updateState}
          isPending={isPending}
        />
      )}
      {hasNextPage && <LoaderBox ref={loaderRef} />}

      {hasChecked && (
        <ActionToolbar
          setState={setUpdateState}
          state={updateState}
          onFolderClick={(e) => {
            const react = e.currentTarget.getBoundingClientRect();
            setMoveFolderPosition({
              left: react.left,
              top: react.bottom,
            });
            setOpenMoveFolder(true);
          }}
          selectedIds={updateState.selectedIds}
          allIds={allIds}
          setSelectedIds={(selectedIds) => {
            setUpdateState((prev) => ({ ...prev, selectedIds: selectedIds as string[] }));
            if (!hasChecked) setHasChecked(true);
          }}
          close={() => {
            setHasChecked(false);
            setUpdateState((prev) => ({ ...prev, selectedIds: [] }));
          }}
        />
      )}
      {openMoveFolder && moveFolderPosition && (
        <MoveFolder
          selectedIds={updateState.selectedIds}
          position={moveFolderPosition}
          onClose={() => setOpenMoveFolder(false)}
          onConfirm={handleMoveConfirm}
        />
      )}
      {isPulling && <Spinner />}
    </>
  );
}
