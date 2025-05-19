import Overlay from '@/components/atoms/Overlay';
import Alert from '@/components/molecules/Alert';
import Typography from '@/components/atoms/Typography';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Container from '@/components/atoms/Container';
import Input from '@/components/atoms/Input';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSheetBaseTemplate';
import useOverlayStore from '@/stores/useOverlayStore';
import { MoreItemAlertType } from '@/types/workspace.type';

type WorkSpaceAlertTemplateProps = {
  menu: MoreItemAlertType;
  state: UpdateState;
  setState: Dispatch<SetStateAction<UpdateState>>;
  isPending: boolean;
};

const AlertTempWrap = styled(Container.FlexCol)<{ isLeft: boolean }>`
  width: 100%;
  align-items: ${({ isLeft }) => (isLeft ? 'stretch' : 'center')};
`;

const RenameInput = styled(Input.Default)`
  background-color: white;
  border: 1px solid ${(props) => props.theme.Colors.gray_200};
`;

enum CONFIRM {
  name = '확인',
  delete = '휴지통으로 이동',
  destroy = '영구삭제',
  download = '다운로드',
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

  const onConfirm = formValue.handleSubmit(() => {
    if (menu === 'name') {
      setState((prev) => ({
        ...prev,
        menu: 'rename',
        selectedIds: state.selectedIds,
      }));
    } else if (menu === 'delete') {
      setState((prev) => ({
        ...prev,
        menu: 'moveTrash',
        selectedIds: state.selectedIds,
      }));
    } else if (menu === 'destroy') {
      setState((prev) => ({
        ...prev,
        menu: 'hardDelete',
        selectedIds: state.selectedIds,
      }));
    }
  });

  const getMessage = () => {
    if (menu === 'name') return '이름 바꾸기';
    if (menu === 'destroy') return '영구 삭제 하시겠습니까?';
    if (menu === 'delete') {
      return state.selectedIds.length >= 2
        ? `${state.selectedIds.length}개 항목을 휴지통으로 이동하시겠습니까?`
        : '휴지통으로 이동하시겠습니까?';
    }
    return '';
  };

  return (
    <>
      <Overlay />
      <Alert
        style={{ alignItems: 'flex-start' }}
        type="cancel"
        cancelLabel="취소"
        confirmLabel={CONFIRM[menu]}
        onConfirm={onConfirm}
        onCancel={() => {
          closeOverlay();
          setState({ isOpen: false, fileSystemId: '', defaultName: '', parentId: '', selectedIds: [] });
        }}
        redConfirm={menu === 'destroy'}
      >
        <AlertTempWrap gap="24" isLeft={menu === 'name'}>
          <Typography.T2 fontWeight="bold" color="gray_100">
            {getMessage()}
          </Typography.T2>
          {menu === 'name' && (
            <FormProvider {...formValue}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.stopPropagation();
                      onConfirm();
                    }
                  }}
                  name="rename"
                  autoFocus
                  onFocus={(event) => event.target.select()}
                />
              </form>
            </FormProvider>
          )}
          <Container.FlexCol alignItems="center" gap="4">
            {menu === 'delete' && (
              <>
                {state.selectedIds.length >= 2 ? (
                  <Typography.B1 fontWeight="regular">
                    이동한 항목은 14일 이내에 휴지통에서 복원할 수 있으며,
                  </Typography.B1>
                ) : (
                  <Typography.B1 fontWeight="regular">
                    {`'${state.defaultName}' 항목이 휴지통으로 이동되며,`}
                  </Typography.B1>
                )}
                <Typography.B1 fontWeight="regular">14일 후에는 완전 삭제됩니다.</Typography.B1>
              </>
            )}

            {menu === 'destroy' && (
              <>
                <Typography.B1 fontWeight="regular">
                  {`'${state.defaultName}' 항목이 영구적으로 삭제되며,`}
                </Typography.B1>
                <Typography.B1 fontWeight="regular">이후 복원은 불가능 합니다.</Typography.B1>
              </>
            )}
          </Container.FlexCol>
        </AlertTempWrap>
      </Alert>
    </>
  );
}
