import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Input from '@/components/atoms/Input';
import Typography from '@/components/atoms/Typography';
import { ICON } from '@/constants/icon';
import { useSetSearchParam } from '@/hooks/useSearchParam';
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

export default function SearchBar() {
  const { add, remove, get } = useSetSearchParam();
  const [searchTerm, setSearchTerm] = useState(get('name') || '');
  // console.log('searchTerm', searchTerm);

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
        <UploadButton>
          <Img src={ICON.plus} />
          <Typography.B2 fontWeight="semiBold">새 파일 추가</Typography.B2>
        </UploadButton>
      </Container.FlexRow>
    </SearchBarWrap>
  );
}
