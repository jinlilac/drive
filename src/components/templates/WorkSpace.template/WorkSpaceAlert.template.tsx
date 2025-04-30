import Overlay from '@/components/atoms/ Overlay';
import Alert from '@/components/molecles/Alert';
import Typography from '@/components/atoms/Typography';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Container from '@/components/atoms/Container';
import Input from '@/components/atoms/Input';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSheetBaseTemplate';
import useOverlayStore from '@/stores/useOverlayStore';

type WorkSpaceAlertTemplateProps = {
  menu: 'name' | 'delete' | 'destroy';
  state: UpdateState;
  setState: Dispatch<SetStateAction<UpdateState>>;
  isPending: boolean;
};

const RenameWrap = styled(Container.FlexCol)`
  width: 100%;
`;

const RenameInput = styled(Input.Default)`
  background-color: white;
  border: 1px solid ${(props) => props.theme.Colors.gray_200};
`;

enum CONFIRM {
  name = '확인',
  delete = '휴지통으로 이동',
  destroy = '영구삭제',
}

export default function WorkSpaceAlertTemplate(props: WorkSpaceAlertTemplateProps) {
  const { menu, state, setState, isPending } = props;
  const { closeOverlay } = useOverlayStore();

  const formValue = useForm({
    defaultValues: { rename: state.defaultName },
  });
  useEffect(() => {
    formValue.reset({ rename: state.defaultName });
  }, [formValue]);
  const onSubmit = (data: { rename: string }) => {
    const payload = {
      id: [state.fileSystemId],
      name: [data.rename],
      parentId: [state.parentId],
      isStarred: [false],
    };
    // patchWorkSheet(payload);
    setState({
      isOpen: false,
      fileSystemId: '',
      defaultName: '',
      parentId: '',
      selectedIds: [],
    });
  };
  return (
    <>
      <Overlay />
      <Alert
        style={{ alignItems: 'flex-start' }}
        type="cancel"
        cancelLabel="취소"
        confirmLabel={CONFIRM[menu]}
        onConfirm={formValue.handleSubmit(onSubmit)}
        onCancel={() => {
          closeOverlay();
          setState({ isOpen: false, fileSystemId: '', defaultName: '', parentId: '', selectedIds: [] });
        }}
        redConfirm={menu === 'destroy'}
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
                value={state.defaultName}
                onChange={(e) =>
                  setState((prev) => ({
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
  );
}
