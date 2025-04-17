import { usePatchWorkSheet } from '@/apis/WorkSheet';
import Overlay from '@/components/atoms/ Overlay';
import Container from '@/components/atoms/Container';
import Input from '@/components/atoms/Input';
import Typography from '@/components/atoms/Typography';
import Alert from '@/components/molecles/Alert';
import LoaderBox from '@/components/molecles/LoaderBox';
import FileList from '@/components/organisms/FileList';
import WorkSheetEmptyTemplate from '@/components/templates/WorkSpace.tempplate/WorkSheetEmpty.template';
import { WorkSheetTemplateProps } from '@/components/templates/WorkSpace.tempplate/WrokSheet.template';
import { useObserver } from '@/hooks/useObserver';
import useOverlayStore from '@/stores/useOverlayStore';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { styled } from 'styled-components';

const RenameWrap = styled(Container.FlexCol)`
  width: 100%;
`;

const RenameInput = styled(Input.Default)`
  background-color: white;
  border: 1px solid ${(props) => props.theme.Colors.gray_200};
`;

export default function WorkSheetListTemplate(props: WorkSheetTemplateProps) {
  const { worksheets, hasNextPage, fetchNextPage } = props;
  const { ref: loaderRef, isShow } = useObserver<HTMLDivElement>();

  useEffect(() => {
    if (isShow && hasNextPage) fetchNextPage();
  }, [isShow]);

  const { closeOverlay } = useOverlayStore();
  const [renameState, setRenameState] = useState({
    isOpen: false,
    fileSystemId: '',
    defaultName: '',
    parentId: '',
  });

  const formValue = useForm({
    defaultValues: { rename: renameState.defaultName },
  });
  useEffect(() => {
    formValue.reset({ rename: renameState.defaultName });
  }, [renameState.defaultName]);

  const { patchWorkSheet, isPending } = usePatchWorkSheet();
  // 이름 바꾸기 제출 시
  const onSubmit = (data: { rename: string }) => {
    const payload = {
      id: [renameState.fileSystemId],
      name: [data.rename],
      parentId: [renameState.parentId],
      isStarred: [false],
    };
    patchWorkSheet(payload);
    setRenameState({
      isOpen: false,
      fileSystemId: '',
      defaultName: '',
      parentId: '',
    });
  };
  if (worksheets[0].data.count > 0)
    return (
      <Container.FlexCol gap="12" style={{ overflowY: 'scroll', padding: '12px 0' }}>
        {worksheets.map((item) =>
          item.data.data.map((content) => <FileList key={content.name} {...content} setState={setRenameState} />),
        )}
        {renameState.isOpen && (
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
                setRenameState({ isOpen: false, fileSystemId: '', defaultName: '', parentId: '' });
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
                      value={renameState.defaultName}
                      onChange={(e) =>
                        setRenameState((prev) => ({
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
      </Container.FlexCol>
    );
  if (worksheets[0].data.count === 0) return <WorkSheetEmptyTemplate />;
}
