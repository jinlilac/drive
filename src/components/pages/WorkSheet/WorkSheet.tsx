import Container from '@/components/atoms/Container';
import styled from 'styled-components';
import FilterBar from '@/components/organisms/FilterBar';
import { APPAREL_TYPES, CATEGORY_FILTERS, GENDER_FILTERS, SHEET_LABEL } from '@/constants/worksheet';
import { useState } from 'react';
import { WorkSheetListType, WorkSheetResponseType } from '@/types/worksheet.type';
import { useGetWorkSheet } from '@/apis/WorkSheet';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useSetSearchParam } from '@/hooks/useSearchParam';
import SelectBox from '@/components/molecules/SelectedBox';
import Typography from '@/components/atoms/Typography';
import WorkSheetBaseTemplate from '@/components/templates/WorkSpace.template/WorkSheetBaseTemplate';
import { CardViewWrapper } from '@/components/atoms/CardViewWrapper';
import { CardItems } from '@/components/organisms/CardItems';
import { ListItems } from '@/components/organisms/ListItems';
import { ListViewWrapper } from '@/components/atoms/ListViewWrapper';
import { FileSystemAllResponseType, FileSystemListResponseType } from '@/types/workspace.type';

const WorkSheetWork = styled(Container.FlexCol)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;
const SheetBar = styled(Container.Grid)`
  width: 100%;
  gap: 8px;
  grid-template-columns: 28px 320px 320px 320px 320px 191px;
  background-color: white;
  border-bottom: 1px solid ${(props) => props.theme.Colors.gray_40};
  padding: 23px 8px;
  align-items: center;
  margin-top: 16px;
`;

export default function WorkSheet() {
  const { add, remove, get } = useSetSearchParam();
  const viewMode = get('view') === 'list' ? 'list' : 'card';
  const [filters, setFilters] = useState<WorkSheetListType>({
    page: 1,
    gender: get('gender') ? Number(get('gender')) : undefined,
    category: get('category') ? Number(get('category')) : undefined,
    clothes: get('clothes') || undefined,
    name: get('name') || undefined,
  });
  // 필터 선택 핸들러
  const handleFilter = (type: 'gender' | 'category' | 'clothes', value: number | string | undefined, label: string) => {
    // "전체" 선택 시 해당 파라미터 제거
    if (label.includes('전체')) {
      setFilters((prev) => ({ ...prev, [type]: undefined }));
      remove([type]);
    } else {
      setFilters((prev) => ({ ...prev, [type]: value }));
      add([[type, String(value)]]);
    }
  };

  const handleViewMode = (mode: 'card' | 'list') => {
    add([['view', mode]]);
  };

  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery(useGetWorkSheet(filters));

  return (
    <WorkSheetWork>
      <>
        <FilterBar
          title="작업지시서"
          count={data.pages[0].data.count}
          filter={
            <Container.FlexRow gap="16" style={{ width: '100%' }}>
              {/* 성별 필터 */}
              <SelectBox
                options={GENDER_FILTERS}
                value={filters.gender ?? GENDER_FILTERS[0].value}
                onChange={(value, label) => handleFilter('gender', value as number, label as string)}
              />
              {/* 카테고리 필터 */}
              <SelectBox
                options={CATEGORY_FILTERS}
                value={filters.category ?? CATEGORY_FILTERS[0].value}
                onChange={(value, label) => handleFilter('category', value as number, label as string)}
              />
              {/* 의류 필터 */}
              <SelectBox
                options={APPAREL_TYPES}
                value={filters.clothes ?? APPAREL_TYPES[0].value}
                onChange={(value, label) => handleFilter('clothes', value as string, label as string)}
              />
            </Container.FlexRow>
          }
          onClickList={() => handleViewMode('list')}
          onClickCard={() => handleViewMode('card')}
          isListActive={viewMode === 'list'}
          isCardActive={viewMode === 'card'}
        />
      </>
      {viewMode === 'card' && (
        <WorkSheetBaseTemplate
          worksheets={data?.pages as AxiosResponse<WorkSheetResponseType>[]}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          renderItem={CardItems}
          Wrapper={CardViewWrapper}
        />
      )}
      {viewMode === 'list' && (
        <>
          <SheetBar columns="7">
            <div />
            {SHEET_LABEL.map((label) => (
              <Typography.B2 key={label} fontWeight="medium" color="gray_70">
                {label}
              </Typography.B2>
            ))}
          </SheetBar>
          <WorkSheetBaseTemplate
            worksheets={data?.pages as AxiosResponse<FileSystemAllResponseType | FileSystemListResponseType>[]}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            renderItem={ListItems}
            Wrapper={ListViewWrapper}
          />
        </>
      )}
    </WorkSheetWork>
  );
}
