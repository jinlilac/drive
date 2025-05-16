import Container from '@/components/atoms/Container';
import styled from 'styled-components';
import FilterBar from '@/components/organisms/FilterBar';
import { useEffect, useState } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useSetSearchParam } from '@/hooks/useSearchParam';
import { FileSystemAllResponseType, FileSystemListResponseType, KorToEngDriveCategory } from '@/types/workspace.type';
import CategoryTab from '@/components/organisms/CategoryTab';
import { AxiosResponse } from 'axios';
import WorkSpaceStarAndTrashTemplate from '@/components/templates/WorkSpace.template/WorkSpace.template';
import { useGetTrash } from '@/apis/Trash';

const WorkSpaceContainer = styled(Container.FlexCol)`
  width: 100%;
  height: 100%;
  padding: 0 8px;
  position: relative;
`;

export default function Trash() {
  const { add, get } = useSetSearchParam();
  const viewMode = get('view') === 'list' ? 'list' : 'card';
  const [filters, setFilters] = useState(() => ({
    category: get('category') as KorToEngDriveCategory,
    page: Number(get('page')),
  }));

  useEffect(() => {
    setFilters({
      category: get('category') as KorToEngDriveCategory,
      page: Number(get('page')),
    });
  }, [get('category'), get('page')]);

  const handleViewMode = (mode: 'card' | 'list') => {
    add([['view', mode]]);
  };

  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery(useGetTrash(filters));
  return (
    <WorkSpaceContainer>
      <FilterBar
        title="휴지통"
        onClickList={() => handleViewMode('list')}
        onClickCard={() => handleViewMode('card')}
        isListActive={viewMode === 'list'}
        isCardActive={viewMode === 'card'}
      />
      <CategoryTab
        currentTab={filters.category}
        setCurrentTab={(category) => {
          add([['category', category]]);
        }}
      />
      <WorkSpaceStarAndTrashTemplate
        fileSystem={data?.pages as AxiosResponse<FileSystemAllResponseType | FileSystemListResponseType>[]}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        viewMode={viewMode}
        currentTab={filters.category}
      />
    </WorkSpaceContainer>
  );
}
