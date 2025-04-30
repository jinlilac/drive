import { useObserver } from '@/hooks/useObserver';
import { useEffect, useState } from 'react';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSheetBaseTemplate';
import ActionToolbar, { Action } from '@/components/organisms/ActionToolBar';
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
import styled from 'styled-components';
import WorkSpaceFolderTemplate from '@/components/templates/WorkSpace.template/StarAndTrash.template/WorkSpaceFolderTemplate';
import WorkSpaceItemTemplate from '@/components/templates/WorkSpace.template/StarAndTrash.template/WorkSpaceItem.template';
import LoaderBox from '@/components/molecles/LoaderBox';
import Toast from '@/components/molecles/Toast';
import { useLocation } from 'react-router-dom';
import Img from '@/components/atoms/Img';
import { ICON } from '@/constants/icon';
import { useDeleteWorkSpace, useDestroyWorkSpace, useRestoreWorkSpace, useUpdateWorkSpace } from '@/apis/WorkSpace';
import WorkSpaceAlertTemplate from '@/components/templates/WorkSpace.template/WorkSpaceAlert.template';

type WorkSpaceStarAndTrashTemplateProps = {
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

const extractFileSystemPath = (path: string): string[] => {
  return ['내 드라이브', ...path.split('/').slice(1)];
};

export default function WorkSpaceStarAndTrashTemplate(props: WorkSpaceStarAndTrashTemplateProps) {
  const { fileSystem, hasNextPage, fetchNextPage, viewMode, currentTab } = props;
  const { ref: loaderRef, isShow } = useObserver<HTMLDivElement>();
  const [hasChecked, setHasChecked] = useState(false);
  const [fileSystemPath, setFileSystemPath] = useState<string>('');
  const { pathname } = useLocation();

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
  useEffect(() => {
    if (updateState.selectedIds.length !== 1) setFileSystemPath('');
  }, [updateState.selectedIds.length]);

  const { updateWorkSpace, isUpdating } = useUpdateWorkSpace();
  const { deleteWorkSpace, isDeleting } = useDeleteWorkSpace();
  const { restoreWorkSpace, isRestoring } = useRestoreWorkSpace();
  const { destroyWorkSpace, isDestroying } = useDestroyWorkSpace();

  const resetUpdateState = () => {
    setUpdateState((prev) => ({ ...prev, selectedIds: [] }));
    setHasChecked(false);
  };

  const isPending = isUpdating || isDeleting || isRestoring || isDestroying;
  const starredActions: Action[] = [
    {
      type: 'star',
      label: '즐겨찾기 제거',
      icon: 'star-white', // ICON 객체의 key
      handler: (ids: string[]) => {
        updateWorkSpace(
          {
            id: ids,
            isStarred: ids.map(() => false),
          },
          {
            onSuccess: () =>
              useToastStore.getState().showToast({
                text: '즐겨찾기에서 제거되었습니다.',
                button: <Button.Ghost>실행취소</Button.Ghost>,
              }),
          },
        );
        resetUpdateState();
      },
    },
    {
      type: 'delete',
      label: '삭제',
      icon: 'trash-white',
      handler: (ids: string[]) => {
        deleteWorkSpace(
          { ids },
          {
            onSuccess: () =>
              useToastStore.getState().showToast({
                text: '즐겨찾기에서 제거되었습니다.',
                button: <Button.Ghost>실행취소</Button.Ghost>,
              }),
          },
        );
        resetUpdateState();
      },
    },
  ];

  const trashAction: Action[] = [
    {
      type: 'restore',
      label: '복원하기',
      icon: 'restore',
      handler: (ids: string[]) => {
        restoreWorkSpace({ ids });
        resetUpdateState();
      },
    },
    {
      type: 'permanent-delete',
      label: '영구 삭제',
      icon: 'permanent-trash',
      handler: (ids: string[]) => {
        destroyWorkSpace({ ids });
        resetUpdateState();
      },
    },
  ];

  const handleCheck = (id: string, checked: boolean, path?: string) => {
    setUpdateState((prev) => {
      const nextUpdateState = {
        ...prev,
        selectedIds: checked ? [...prev.selectedIds, id] : prev.selectedIds.filter((item) => item !== id),
      };
      if (nextUpdateState.selectedIds.length === 1) setFileSystemPath(path);
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
              <Typography.B1 fontWeight="medium" color="gray_70">
                {`${pathname.includes('trash') ? '휴지통이' : '즐겨찾기가'} 비어있습니다.`}
              </Typography.B1>
            </Container.FlexCol>
          )}
        {fileSystemPath && (
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
      {/* 3. ActionToolbar 적용 (선택된 게 있을 때만 표시) */}
      {hasChecked && (
        <ActionToolbar
          selectedIds={updateState.selectedIds}
          allIds={allIds}
          setSelectedIds={(selectedIds) => {
            setUpdateState((prev) => ({ ...prev, selectedIds: selectedIds as string[] }));
            if (!hasChecked) setHasChecked(true);
          }}
          actions={pathname.includes('trash') ? trashAction : starredActions}
          close={() => {
            setHasChecked(false);
            setUpdateState((prev) => ({ ...prev, selectedIds: [] }));
          }}
        />
      )}
      <Toast />
    </>
  );
}
