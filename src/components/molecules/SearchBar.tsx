import Overlay from '@/components/atoms/ Overlay';
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
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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
  const { add, remove, get } = useSetSearchParam();
  const [searchTerm, setSearchTerm] = useState(get('name') || '');
  const { openOverlay, closeOverlay } = useOverlayStore();
  const [openUpload, setOpenUpload] = useState<boolean>(false);
  // console.log('searchTerm', searchTerm);
  console.log('onClose', openUpload);
  const onClose = () => {
    setOpenUpload(false);
    closeOverlay();
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
      onClick: () => console.log('폴더 클릭'),
    },
    {
      label: '파일 업로드',
      icon: ICON['upload-file'],
      onClick: () => {
        openOverlay();
        setOpenUpload(true);
      },
    },
  ];

  // 디바운싱 처리 (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.trim()) {
        add([['name', encodeURIComponent(searchTerm)]]);
      } else {
        remove(['name']);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  return (
    <SearchBarWrap>
      <Container.FlexRow gap="16" justifyContent="flex-end" style={{ paddingRight: '8px' }}>
        <Container.FlexRow style={{ position: 'relative' }}>
          <SearchInput
            placeholder="파일 제목을 검색하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
      {openUpload && (
        <>
          <Overlay />
          <UploadFileTemplate onClose={onClose} />
        </>
      )}
    </SearchBarWrap>
  );
}
