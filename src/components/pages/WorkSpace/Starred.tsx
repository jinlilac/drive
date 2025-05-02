import Container from '@/components/atoms/Container';
import styled from 'styled-components';
import FilterBar from '@/components/organisms/FilterBar';
import { useState } from 'react';
import { WorkSheetListType } from '@/types/worksheet.type';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useSetSearchParam } from '@/hooks/useSearchParam';
import { FileSystemAllResponseType, FileSystemListResponseType, KorToEngDriveCategory } from '@/types/workspace.type';
import { useGetStarred } from '@/apis/Starred';
import CategoryTab from '@/components/organisms/CategoryTab';
import { AxiosResponse } from 'axios';
import WorkSpaceStarAndTrashTemplate from '@/components/templates/WorkSpace.template/WorkSpaceStarAndTrash.template';

const WorkSpaceContainer = styled(Container.FlexCol)`
  width: 100%;
  height: 100%;
  padding: 0 8px;
  position: relative;
`;

export default function Starred() {
  const { add, get } = useSetSearchParam();
  const viewMode = get('view') === 'list' ? 'list' : 'card';
  const [currentTab, setCurrentTab] = useState<KorToEngDriveCategory>(KorToEngDriveCategory.전체);
  const [filters, _setFilters] = useState<WorkSheetListType>({
    page: 1,
    name: get('name') || undefined,
  });
  // 필터 선택 핸들러

  const handleViewMode = (mode: 'card' | 'list') => {
    add([['view', mode]]);
  };

  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery(useGetStarred(filters, currentTab));
  return (
    <WorkSpaceContainer>
      <FilterBar
        title="즐겨찾기"
        onClickList={() => handleViewMode('list')}
        onClickCard={() => handleViewMode('card')}
        isListActive={viewMode === 'list'}
        isCardActive={viewMode === 'card'}
      />
      <CategoryTab currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <WorkSpaceStarAndTrashTemplate
        fileSystem={data?.pages as AxiosResponse<FileSystemAllResponseType | FileSystemListResponseType>[]}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        viewMode={viewMode}
        currentTab={currentTab}
      />
    </WorkSpaceContainer>
  );
}
