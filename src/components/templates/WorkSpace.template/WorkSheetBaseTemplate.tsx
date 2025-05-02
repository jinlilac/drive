// WorkSheetBaseTemplate.tsx
import { usePatchWorkSheet } from '@/apis/WorkSheet';
import Overlay from '@/components/atoms/ Overlay';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Input from '@/components/atoms/Input';
import Typography from '@/components/atoms/Typography';
import Alert from '@/components/molecules/Alert';
import LoaderBox from '@/components/molecules/LoaderBox';
import Toast from '@/components/molecules/Toast';
import ActionToolbar, { Action } from '@/components/organisms/ActionToolBar';
import WorkSheetEmptyTemplate from '@/components/templates/WorkSpace.template/WorkSheetEmpty.template';
import { useObserver } from '@/hooks/useObserver';
import useOverlayStore from '@/stores/useOverlayStore';
import useToastStore from '@/stores/useToastStore';
import { WorkSheetItems, WorkSheetResponseType } from '@/types/worksheet.type';
import { AxiosResponse } from 'axios';
import { useEffect, useState, ReactNode, ComponentType, Dispatch, SetStateAction } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

// 1. UpdateState 타입 정의
export type UpdateState = {
  isOpen: boolean;
  menu?: string;
  fileSystemId: string;
  defaultName: string;
  parentId: string;
  selectedIds: string[];
};

export type WorkSheetTemplateProps = {
  worksheets: AxiosResponse<WorkSheetResponseType>[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  renderItem: (args: {
    content: WorkSheetItems;
    checked: boolean;
    setState: Dispatch<SetStateAction<UpdateState>>;
    onCheck: (id: string, checked: boolean) => void;
  }) => ReactNode;
  Wrapper: ComponentType<{ children: ReactNode }>;
};

const RenameWrap = styled(Container.FlexCol)`
  width: 100%;
`;

const RenameInput = styled(Input.Default)`
  background-color: white;
  border: 1px solid ${(props) => props.theme.Colors.gray_200};
`;

export default function WorkSheetBaseTemplate(props: WorkSheetTemplateProps) {
  const { worksheets, hasNextPage, fetchNextPage, renderItem, Wrapper } = props;
  const { ref: loaderRef, isShow } = useObserver<HTMLDivElement>();
  const [hasChecked, setHasChecked] = useState(false);

  const allIds = worksheets.flatMap((item) =>
    item.data.data.map((content) => content.fileSystemId ?? content.worksheetId),
  );

  useEffect(() => {
    if (isShow && hasNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isShow]);

  const { closeOverlay } = useOverlayStore();
  const [updateState, setUpdateState] = useState<UpdateState>({
    isOpen: false,
    fileSystemId: '',
    defaultName: '',
    parentId: '',
    selectedIds: [],
  });

  const formValue = useForm({
    defaultValues: { rename: updateState.defaultName },
  });
  useEffect(() => {
    formValue.reset({ rename: updateState.defaultName });
  }, [formValue, updateState.defaultName]);

  const { patchWorkSheet, isPending } = usePatchWorkSheet();

  const actions: Action[] = [
    {
      type: 'star',
      label: '즐겨찾기',
      icon: 'star-white', // ICON 객체의 key
      handler: (ids: string[]) => {
        console.log('starred', ids);
        patchWorkSheet(
          {
            id: ids,
            isStarred: ids.map(() => true),
          },
          {
            onSuccess: () =>
              useToastStore.getState().showToast({
                text: '즐겨찾기에 추가되었습니다.',
                button: <Button.Ghost>실행취소</Button.Ghost>,
              }),
          },
        );
        setUpdateState((prev) => ({ ...prev, selectedIds: [] }));
        setHasChecked(false);
      },
    },
    {
      type: 'folder',
      label: '폴더로 이동',
      icon: 'folder-white', // ICON 객체의 key
      handler: (ids: string[]) => {
        console.log('folder', ids);
        // patchWorkSheet({
        //   id: ids,
        //   isStarred: ids.map(() => true),
        // });
        // setUpdateState((prev) => ({ ...prev, selectedIds: [] }));
      },
    },
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

  if (worksheets[0].data.count > 0)
    return (
      <Wrapper>
        {worksheets.map((item) =>
          item.data.data.map((content) =>
            renderItem({
              content,
              checked: updateState.selectedIds.includes(content.fileSystemId ?? content.fileSystemId),
              setState: setUpdateState,
              onCheck: handleCheck,
            }),
          ),
        )}
        {updateState.isOpen && (
          <>
            <Overlay />
            <Alert
              style={{ alignItems: 'flex-start' }}
              type="cancel"
              cancelLabel="취소"
              confirmLabel="확인"
              onConfirm={formValue.handleSubmit(onSubmit)}
              onCancel={() => {
                closeOverlay();
                setUpdateState({ isOpen: false, fileSystemId: '', defaultName: '', parentId: '', selectedIds: [] });
              }}
            >
              <RenameWrap gap="24">
                <Typography.T2 fontWeight="bold" color="gray_100">
                  이름 바꾸기
                </Typography.T2>
                <FormProvider {...formValue}>
                  <form>
                    <RenameInput
                      disabled={isPending}
                      type="text"
                      value={updateState.defaultName}
                      onChange={(e) =>
                        setUpdateState((prev) => ({
                          ...prev,
                          defaultName: e.target.value,
                        }))
                      }
                      name="rename"
                      autoFocus
                      onFocus={(event) => event.target.select()}
                    />
                  </form>
                </FormProvider>
              </RenameWrap>
            </Alert>
          </>
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
      </Wrapper>
    );
  if (worksheets[0].data.count === 0) return <WorkSheetEmptyTemplate />;
}
