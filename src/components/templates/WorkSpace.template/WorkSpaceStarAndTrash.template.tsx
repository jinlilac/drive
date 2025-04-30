import { useObserver } from '@/hooks/useObserver';
import { useEffect, useState } from 'react';
import useOverlayStore from '@/stores/useOverlayStore';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSheetBaseTemplate';
import { FormProvider, useForm } from 'react-hook-form';
import { usePatchWorkSheet } from '@/apis/WorkSheet';
import ActionToolbar, { Action } from '@/components/organisms/ActionToolBar';
import useToastStore from '@/stores/useToastStore';
import Button from '@/components/atoms/Button';
import { AxiosResponse } from 'axios';
import {
  FileSystemAllResponseType,
  FileSystemListResponseType,
  EngToKorDriveCategory,
  KorToEngDriveCategory,
} from '@/types/workspace.type';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import styled from 'styled-components';
import WorkSpaceFolderTemplate from '@/components/templates/WorkSpace.template/StarAndTrash.template/WorkSpaceFolderTemplate';
import WorkSpaceItemTemplate from '@/components/templates/WorkSpace.template/StarAndTrash.template/WorkSpaceItem.template';
import Overlay from '@/components/atoms/ Overlay';
import Alert from '@/components/molecles/Alert';
import LoaderBox from '@/components/molecles/LoaderBox';
import Toast from '@/components/molecles/Toast';
import { useLocation } from 'react-router-dom';
import WorkSpaceAlertTemplate from '@/components/templates/WorkSpace.template/WorkSpaceAlert.template';

type WorkSpaceStarAndTrashTemplateProps = {
  fileSystem: AxiosResponse<FileSystemAllResponseType | FileSystemListResponseType>[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  viewMode: 'list' | 'card';
  currentTab: KorToEngDriveCategory;
};
const CategoryTitleTypo = styled(Typography.T3).attrs({ fontWeight: 'semiBold', color: 'gray_100' })``;
const CategoryCountTypo = styled(Typography.B2).attrs({ fontWeight: 'medium', color: 'gray_70' })``;

const RenameInput = styled(Input.Default)`
  background-color: white;
  border: 1px solid ${(props) => props.theme.Colors.gray_200};
`;

export default function WorkSpaceStarAndTrashTemplate(props: WorkSpaceStarAndTrashTemplateProps) {
  const { fileSystem, hasNextPage, fetchNextPage, viewMode, currentTab } = props;
  const { ref: loaderRef, isShow } = useObserver<HTMLDivElement>();
  const [hasChecked, setHasChecked] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isShow && hasNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isShow]);

  const [updateState, setUpdateState] = useState<UpdateState>({
    isOpen: false,
    fileSystemId: '',
    defaultName: '',
    parentId: '',
    selectedIds: [],
  });
  useEffect(() => {
    formValue.reset({ rename: updateState.defaultName });
  }, [formValue, updateState.defaultName]);

  const { patchWorkSheet, isPending } = usePatchWorkSheet();

  const actions: Action[] = [
    {
      type: 'star',
      label: '즐겨찾기 제거',
      icon: 'star-white', // ICON 객체의 key
      handler: (ids: string[]) => {
        patchWorkSheet(
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
        setUpdateState((prev) => ({ ...prev, selectedIds: [] }));
        setHasChecked(false);
      },
    },
    // {
    //   type: 'folder',
    //   label: '폴더로 이동',
    //   icon: 'folder-white', // ICON 객체의 key
    //   handler: (ids: string[]) => {
    //     console.log('folder', ids);
    //     // patchWorkSheet({
    //     //   id: ids,
    //     //   isStarred: ids.map(() => true),
    //     // });
    //     // setUpdateState((prev) => ({ ...prev, selectedIds: [] }));
    //   },
    // },
    {
      type: 'delete',
      label: '삭제',
      icon: 'trash-white',
      handler: (ids: string[]) => {
        console.log('trash', ids);
        // patchWorkSheet({
        //   id: ids,
        //   isDeleted: ids.map(() => true),
        // });
        // setUpdateState((prev) => ({ ...prev, selectedIds: [] }));
      },
    },
    // 필요시 다른 액션 추가
  ];

  const onSubmit = (data: { rename: string }) => {
    const payload = {
      id: [updateState.fileSystemId],
      name: [data.rename],
      parentId: [updateState.parentId],
      isStarred: [false],
    };
    patchWorkSheet(payload);
    setUpdateState({
      isOpen: false,
      fileSystemId: '',
      defaultName: '',
      parentId: '',
      selectedIds: [],
    });
  };
  const handleCheck = (id: string, checked: boolean) => {
    setUpdateState((prev) => ({
      ...prev,
      selectedIds: checked ? [...prev.selectedIds, id] : prev.selectedIds.filter((item) => item !== id),
    }));
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
      <Container.FlexCol style={{ paddingTop: '32px' }}>
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
                flex: 1,
                marginTop: '300px',
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
      </Container.FlexCol>
      {updateState.isOpen && (
        <WorkSpaceAlertTemplate
          menu={updateState.menu}
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
          actions={actions}
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
