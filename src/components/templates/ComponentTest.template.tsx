import Overlay from '@/components/atoms/ Overlay';
import Button from '@/components/atoms/Button';
import CheckBox from '@/components/atoms/CheckBox';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Input from '@/components/atoms/Input';
import Typography from '@/components/atoms/Typography';
import Accordion from '@/components/molecles/Accordion';
import Alert from '@/components/molecles/Alert';
import DropdownButton from '@/components/molecles/DropdownButton';
import LabelWithInput from '@/components/molecles/LabelWithInput';
import ProfileCard from '@/components/molecles/ProfileCard';
import SearchBar from '@/components/molecles/SearchBar';
import FilterBar from '@/components/organisms/FilterBar';
import WorkSheetCard from '@/components/organisms/FileCard';
import { ICON } from '@/constants/icon';
import useOverlayStore from '@/stores/useOverlayStore';
import { WorkSheetItems } from '@/types/worksheet.type';
import camelcaseKeys from 'camelcase-keys';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled, { CSSProperties } from 'styled-components';
import Toast from '@/components/molecles/Toast';
import useToastStore from '@/stores/useToastStore';

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
//* 작업지시서 목록 목업 데이터
// const workSheetResponse = {
//   data: [
//     {
//       worksheet_id: 'ffc0249e-e8b9-42a0-bd87-ca96c0706fbf',
//       title: '새로운 작업지시서',
//       thumb_img: `https://picsum.photos/200/300?random=1`,
//       gender: 1,
//       category: 1,
//       clothes: '반팔',
//       requester: 'dolore Lorem exercitation ea',
//       created_at: '2025-04-11T04:13:35.000Z',
//       updated_at: '2025-04-11T04:13:35.403Z',
//       is_starred: false,
//       starred_at: null,
//       is_deleted: false,
//       deleted_at: null,
//     },
//     {
//       worksheet_id: '58409e40-3815-4c77-a719-d90c3676a61c',
//       title: '새로운 작업지시서',
//       thumb_img: `https://picsum.photos/200/300?random=2`,
//       gender: 1,
//       category: 1,
//       clothes: '반팔',
//       requester: 'dolore Lorem exercitation ea',
//       created_at: '2025-04-11T04:13:52.000Z',
//       updated_at: '2025-04-11T04:13:52.884Z',
//       is_starred: false,
//       starred_at: null,
//       is_deleted: false,
//       deleted_at: null,
//     },
//     {
//       worksheet_id: '1e70a56b-222b-46a0-ac2b-5387f866ae1d',
//       title: '새로운 작업지시서2',
//       thumb_img: `https://picsum.photos/200/300?random=3`,
//       gender: 1,
//       category: 1,
//       clothes: '반팔',
//       requester: 'dolore Lorem exercitation ea',
//       created_at: '2025-04-11T04:15:59.000Z',
//       updated_at: '2025-04-11T04:15:59.663Z',
//       is_starred: false,
//       starred_at: null,
//       is_deleted: false,
//       deleted_at: null,
//     },
//   ],
//   count: 3,
// };
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

  const transformedData = camelcaseKeys(workSheetResponse, { deep: true });
  console.log('카멜 케이스 변환', transformedData);

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
      <Wrapper title="Alert 컴포넌트">
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
      </Wrapper>
      <Wrapper title="아코디언 컴포넌트">
        <Accordion title={<Typography.B1>전체 동의</Typography.B1>}>서비스 이용 약관에 동의합니다.</Accordion>
      </Wrapper>
      <Wrapper title="프로필 카드">
        <ProfileCard />
      </Wrapper>
      <SearchBar />
      {/* <Wrapper title="FilterBar">
        <FilterBar
          title="작업지시서"
          filter={
            <Container.FlexRow gap="16">
              <DropdownButton
                isHover={false}
                icon={
                  <Container.FlexRow gap="4" alignItems="center">
                    <Typography.B2>성별 전체</Typography.B2>
                    <ToggleButton />
                  </Container.FlexRow>
                }
              >
                뭐
              </DropdownButton>
              <DropdownButton
                isHover={false}
                icon={
                  <Container.FlexRow gap="4" alignItems="center">
                    <Typography.B2>성별 전체</Typography.B2>
                    <ToggleButton />
                  </Container.FlexRow>
                }
              >
                뭐
              </DropdownButton>
              <DropdownButton
                isHover={false}
                icon={
                  <Container.FlexRow gap="4" alignItems="center">
                    <Typography.B2>성별 전체</Typography.B2>
                    <ToggleButton />
                  </Container.FlexRow>
                }
              >
                뭐
              </DropdownButton>
            </Container.FlexRow>
          }
          onClickList={() => console.log('리스트 클릭')}
          onClickCard={() => console.log('카드 클릭')}
        />
      </Wrapper>
      <Wrapper title="카드" style={{ display: 'flex', gap: '4px', position: 'relative', maxHeight: '242px' }}>
        {transformedData.data.map((data) => (
          <WorkSheetCard label="WIIVE" color="green" key={data.worksheetId} {...data} />
        ))}
      </Wrapper> */}
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
    </TestLayoutContainer>
  );
}
