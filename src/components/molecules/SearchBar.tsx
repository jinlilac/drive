import { usePostFolder } from '@/apis/Drive';
import Overlay from '@/components/atoms/Overlay';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Divider from '@/components/atoms/Divider';
import Img from '@/components/atoms/Img';
import Input from '@/components/atoms/Input';
import Typography from '@/components/atoms/Typography';
import Alert from '@/components/molecules/Alert';
import DropdownButton from '@/components/molecules/DropdownButton';
import { DropBoxItem } from '@/components/molecules/ProfileCard';
import UploadFileTemplate from '@/components/templates/Alert.template/UploadFileAlert.template';
import { ICON } from '@/constants/icon';
import { useSetSearchParam } from '@/hooks/useSearchParam';
import useOverlayStore from '@/stores/useOverlayStore';
import useUploadFileStore from '@/stores/useUploadFileStore';
import { KeyboardEvent, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SearchBarWrap = styled(Container.FlexRow)`
  width: 100%;
  max-height: 48px;
  justify-content: flex-end;
  flex-shrink: 0;
`;
const SearchInput = styled(Input.Default)`
  background-color: ${(props) => props.theme.Colors.gray_20};
  padding-left: 48px;
  &::placeholder {
    font-size: ${(props) => props.theme.Font.fontSize.b2};
    color: ${(props) => props.theme.Colors.gray_60};
  }
  min-width: 391px;
`;
const SearchIcon = styled(Img)`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: 16px;
`;
const ClearButton = styled(Button.Ghost)`
  max-width: 16px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 16px;
`;
const UploadButton = styled(Button.Fill)`
  max-width: 124px;
  gap: 8px;
  padding: 16px;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.Colors.gray_90};
`;
const ButtonItem = styled(DropBoxItem)`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export default function SearchBar() {
  const { remove, get } = useSetSearchParam();
  const [searchTerm, setSearchTerm] = useState(get('search') ?? '');
  const { openOverlay, closeOverlay } = useOverlayStore();
  const [createFolder, setCreateFolder] = useState<boolean>(false);
  const { openUploadFile } = useUploadFileStore();
  const navigate = useNavigate();

  const formValue = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  });
  const { addFolder, isPending } = usePostFolder();

  const {
    handleSubmit,
    register,
    formState: { isValid, dirtyFields },
  } = formValue;

  const onAddFolder = (data: { name: string }) => {
    addFolder(
      { name: data.name },
      {
        onSuccess: () => {
          setCreateFolder(false);
          closeOverlay();
        },
      },
    );
  };

  // 드롭다운 메뉴 항목
  const menuItems = [
    {
      label: '작업지시서',
      icon: ICON['work-sheet'],
      onClick: () => console.log('작업지시서'),
    },
    {
      label: '폴더',
      icon: ICON['folder-add'],
      onClick: () => {
        formValue.reset();
        openOverlay();
        setCreateFolder(true);
      },
    },
    {
      label: '파일 업로드',
      icon: ICON['upload-file'],
      onClick: () => {
        openOverlay();
        openUploadFile();
      },
    },
  ];

  const handleSearch = (search: string) => {
    navigate(`/workspace/drive?page=1&category=all&name=내 드라이브&search=${search}`);
  };

  return (
    <SearchBarWrap>
      <Container.FlexRow gap="16" justifyContent="flex-end" style={{ paddingRight: '8px' }}>
        <Container.FlexRow style={{ position: 'relative' }}>
          <SearchInput
            placeholder="파일 제목을 검색하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                // 검색 실행 함수 호출
                handleSearch(searchTerm);
              }
            }}
          />
          <SearchIcon src={ICON.search} />
          {searchTerm && (
            <ClearButton
              onClick={() => {
                setSearchTerm('');
                remove(['name']);
              }}
              aria-label="검색어 지우기"
            >
              <Img src={ICON.clear} />
            </ClearButton>
          )}
        </Container.FlexRow>
        <DropdownButton
          icon={
            <UploadButton>
              <Img src={ICON.plus} />
              <Typography.B2 fontWeight="semiBold">새 항목 추가</Typography.B2>
            </UploadButton>
          }
        >
          <Container.FlexCol gap="16">
            {menuItems.slice(0, 2).map((item) => (
              <ButtonItem key={item.label} onClick={item.onClick}>
                <Img src={item.icon} />
                {item.label}
              </ButtonItem>
            ))}
            <Divider.Row />
            {menuItems.slice(2, 3).map((item) => (
              <ButtonItem key={item.label} onClick={item.onClick}>
                <Img src={item.icon} />
                {item.label}
              </ButtonItem>
            ))}
          </Container.FlexCol>
        </DropdownButton>
      </Container.FlexRow>
      <Overlay closeOnClick={false} />
      <UploadFileTemplate />
      {createFolder && (
        <Alert
          style={{ alignItems: 'flex-start' }}
          type="cancel"
          cancelLabel="취소"
          confirmLabel="확인"
          disabled={!isValid || !dirtyFields.name}
          strokeColor
          onConfirm={handleSubmit(onAddFolder)}
          onCancel={() => {
            closeOverlay();
            setCreateFolder(false);
            formValue.reset();
          }}
        >
          <Container.FlexCol gap="24" style={{ width: '100%' }}>
            <Typography.T2 fontWeight="bold" color="gray_100">
              폴더 만들기
            </Typography.T2>
            <FormProvider {...formValue}>
              <form>
                <Input.Default
                  placeholder="폴더명을 입력해주세요."
                  disabled={isPending}
                  type="text"
                  autoFocus
                  onKeyDown={(e: KeyboardEvent) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSubmit(onAddFolder)();
                    }
                  }}
                  onFocus={(event) => event.target.select()}
                  {...register('name', {
                    required: '폴더명을 입력해주세요',
                    validate: (value) => value.trim().length > 0 || '공백만 입력할 수 없습니다',
                  })}
                />
              </form>
            </FormProvider>
          </Container.FlexCol>
        </Alert>
      )}
    </SearchBarWrap>
  );
}
