import Overlay from '@/components/atoms/Overlay';
import Button from '@/components/atoms/Button';
import CheckBox from '@/components/atoms/CheckBox';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Input from '@/components/atoms/Input';
import Typography from '@/components/atoms/Typography';
import Accordion from '@/components/molecules/Accordion';
import Alert from '@/components/molecules/Alert';
import DropdownButton from '@/components/molecules/DropdownButton';
import LabelWithInput from '@/components/molecules/LabelWithInput';
import ProfileCard, { DropBoxItem } from '@/components/molecules/ProfileCard';
import SearchBar from '@/components/molecules/SearchBar';
import FilterBar from '@/components/organisms/FilterBar';
import WorkSheetCard from '@/components/organisms/FileCard';
import { ICON } from '@/constants/icon';
import useOverlayStore from '@/stores/useOverlayStore';
import { WorkSheetItems } from '@/types/worksheet.type';
import camelcaseKeys from 'camelcase-keys';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled, { CSSProperties } from 'styled-components';
import Toast from '@/components/molecules/Toast';
import useToastStore from '@/stores/useToastStore';
import UploadFileTemplate from '@/components/templates/Alert.template/UploadFileAlert.template';
import UploadFileTag from '@/components/molecules/SelectTagFile';
import FolderItem from '@/components/organisms/FolderItem';
import WorkSpaceAlertTemplate from '@/components/templates/WorkSpace.template/WorkSpaceAlert.template';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSheetBaseTemplate';
import { MoreItemAlertType } from '@/types/workspace.type';
import { MORE_ITEMS } from '@/constants/worksheet';
import useGetMoreItems from '@/hooks/useGetMoreItems';
import { STARRED_MORE_ITEMS } from '@/constants/workspace';

const TestLayoutContainer = styled(Container.Grid)`
  height: 100dvh;
  padding: 32px 16px;
  overflow: scroll;
`;
type TestProps = {
  title: string;
  children: React.ReactNode;
  style?: CSSProperties;
};
const Wrapper = (props: TestProps) => {
  const { title, children, style } = props;
  return (
    <Container.FlexCol gap="8">
      <Typography.B1>{title}</Typography.B1>
      <Container.Grid gap="2" style={style}>
        {children}
      </Container.Grid>
    </Container.FlexCol>
  );
};
const MoreItem = styled(DropBoxItem)`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const workSheetResponse = {
  data: [
    {
      worksheetId: '7da0a373-982d-422e-960d-5dc4f83f0566',
      name: '새로운 작업지시서(19)',
      thumbImg: 'https://picsum.photos/200/300?random=1',
      gender: 1,
      category: 1,
      clothes: '반팔',
      requester: 'occaecat commodo culpa proident',
      createdAt: '2025-04-14T07:40:46.000Z',
      updatedAt: '2025-04-14T07:40:46.435Z',
      type: 'worksheet',
      fileSystemId: '7c937c6e-d385-459c-8c56-91e7693780d1',
      fileName: '새로운 작업지시서(19)',
      filePath: '/새로운 작업지시서(19)',
      isStarred: false,
      starredAt: null,
    },
    {
      worksheetId: '75a6e23a-ce34-4bc4-9fad-87c0eb197f45',
      name: '새로운 작업지시서(18)',
      thumbImg: 'https://picsum.photos/200/300?random=1',
      gender: 1,
      category: 1,
      clothes: '반팔',
      requester: 'occaecat commodo culpa proident',
      createdAt: '2025-04-14T07:40:17.000Z',
      updatedAt: '2025-04-14T07:40:17.433Z',
      type: 'worksheet',
      fileSystemId: 'f8a3cab0-564c-42bd-bb89-241bdc836aab',
      fileName: '새로운 작업지시서(18)',
      filePath: '/새로운 작업지시서(18)',
      isStarred: false,
      starredAt: null,
    },
    {
      worksheetId: '34a2bccc-78c4-4eb5-ba9c-7a5ab14ac39e',
      name: '새로운 작업지시서(17)',
      thumbImg: 'https://picsum.photos/200/300?random=1',
      gender: 1,
      category: 1,
      clothes: '반팔',
      requester: 'occaecat commodo culpa proident',
      createdAt: '2025-04-14T07:36:50.000Z',
      updatedAt: '2025-04-14T07:36:50.602Z',
      type: 'worksheet',
      fileSystemId: 'adec4a16-7344-49bf-bdfe-060b3df9cb49',
      fileName: '새로운 작업지시서(17)',
      filePath: '/새로운 작업지시서(17)',
      isStarred: false,
      starredAt: null,
    },
  ],
  count: 22,
};

export default function ComponentTest() {
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const onSubmit = async (data: Record<string, unknown>) => {
    // 성공 상황 시뮬레이션
    if (data.email === 'test@example.com' && data.password === 'password123') {
      alert('인증 성공!');
      setEmailState('이메일 인증 성공');
      setPasswordState('암호 성공');
    } else {
      // 에러 상황 시뮬레이션
      methods.setError('email', { type: 'custom', message: '잘못된 이메일입니다.' });
      methods.setError('password', { type: 'custom', message: '잘못된 비밀번호입니다.' });
    }
  };
  const [checked, setChecked] = useState(false);
  // Alert
  const { openOverlay, closeOverlay } = useOverlayStore();
  const [isAlertOpen, setAlertOpen] = useState(false);

  const handleOpenAlert = () => {
    openOverlay();
    setAlertOpen(true);
  };
  const handleCloseAlert = () => {
    closeOverlay();
    setAlertOpen(false);
  };
  const [state, setState] = useState<UpdateState>({
    isOpen: false,
    menu: '',
    fileSystemId: '',
    defaultName: '',
    parentId: '',
    selectedIds: [],
  });
  const handleSetState = (menu: MoreItemAlertType) => {
    setState((prev) => ({
      ...prev,
      isOpen: true,
      menu: 'delete',
      defaultName: 'name',
      fileSystemId: ['file-456'],
      parentId: 'parent-123',
    }));
  };

  const handleMoreButton = (action: string) => {
    if (action === '이름 바꾸기') handleSetState('name');
    else if (action === '삭제') handleSetState('delete');
    else if (action === '영구 삭제') handleSetState('destroy');
    // else if (action === '다운로드') console.log('다운로드', fileSystemId);
    // else if (action === '즐겨찾기 추가') console.log('즐겨찾기', fileSystemId);
    // else if (action === '즐겨찾기 제거') console.log('즐겨찾기 제거', fileSystemId);
    openOverlay();
  };

  return (
    <TestLayoutContainer columns="3" rows="5">
      <Wrapper title="버튼 컴포넌트">
        <Button.Fill>확인</Button.Fill>
        <Button.Fill disabled>확인</Button.Fill>
        <Button.Stroke>확인</Button.Stroke>
      </Wrapper>
      <Wrapper title="체크 박스 컴포넌트">
        <CheckBox option="default" checked={checked} onChange={() => setChecked(!checked)} />
        <CheckBox
          option="square"
          checked={checked}
          onClick={() => {
            console.log(checked);
            setChecked(!checked);
          }}
        />
        <CheckBox option="circle" checked={checked} onChange={() => setChecked(!checked)} />
      </Wrapper>
      <Wrapper title="인풋 컴포넌트">
        <Input.Default />
      </Wrapper>
      <Wrapper title="폼">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <LabelWithInput
              type="text"
              name="email"
              label="이메일주소"
              placeholder="이메일을 입력해주세요."
              successMessage={emailState}
              icon={
                <Button.Ghost>
                  <Img src={ICON['eye-off']} />
                </Button.Ghost>
              }
            />
            <LabelWithInput
              label="비밀번호"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              successMessage={passwordState}
            />
            <button type="submit">제출</button>
          </form>
        </FormProvider>
      </Wrapper>
      {/* <Wrapper title="Alert 컴포넌트">
        <Container.FlexCol style={{ position: 'relative', minWidth: '480px', height: '100dvh' }}>
          <Button.Fill style={{ maxHeight: '52px' }} onClick={handleOpenAlert}>
            Alert dialog
          </Button.Fill>
          <Overlay />
          <Alert
            type="cancel"
            cancelLabel="취소"
            confirmLabel="확인"
            onConfirm={handleCloseAlert}
            onCancel={handleCloseAlert}
          >
            <Container.FlexCol gap="12" alignItems="center" style={{ marginBottom: '12px' }}>
              <Img style={{ width: '53px' }} src={ICON.confirm} />
              <Typography.T2 fontWeight="bold">비밀번호 재설정 메일을 발송하였습니다.</Typography.T2>
              <Container.FlexCol gap="4" alignItems="center">
                <Typography.B1 fontWeight="medium" color="gray_70">
                  입력하신 메일로 수신하신 링크를 통해
                </Typography.B1>
                <Typography.B1 fontWeight="medium" color="gray_70">
                  비밀번호를 재설정할 수 있습니다.
                </Typography.B1>
              </Container.FlexCol>
            </Container.FlexCol>
          </Alert>
        </Container.FlexCol>
      </Wrapper> */}
      <Wrapper title="아코디언 컴포넌트">
        <Accordion title={<Typography.B1>전체 동의</Typography.B1>}>서비스 이용 약관에 동의합니다.</Accordion>
      </Wrapper>
      <Wrapper title="프로필 카드">
        <ProfileCard />
      </Wrapper>
      <SearchBar />
      <Wrapper title="toast">
        <Button.Fill
          onClick={() =>
            useToastStore.getState().showToast({
              text: 'toast test',
              // center: true,
              button: (
                <Button.Ghost>
                  <Typography.B2 color="gray_50">실행취소</Typography.B2>
                </Button.Ghost>
              ),
            })
          }
        >
          Toast Test
        </Button.Fill>
        <Toast />
      </Wrapper>
      <Wrapper title="uploadFile">
        <DropdownButton isHover icon={<Img src={ICON.more} />}>
          <Container.FlexCol>
            {STARRED_MORE_ITEMS.map((item) => (
              <MoreItem key={item.label} onClick={() => handleMoreButton(item.label)}>
                <Img src={item.icon} />
                {item.label}
              </MoreItem>
            ))}
          </Container.FlexCol>
        </DropdownButton>
        <WorkSpaceAlertTemplate
          menu={state.menu as MoreItemAlertType}
          state={state}
          setState={setState}
          isPending={false}
        />
      </Wrapper>
    </TestLayoutContainer>
  );
}
