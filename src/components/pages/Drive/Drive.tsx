import { useGetDrive } from '@/apis/Drive';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import CategoryTab from '@/components/organisms/CategoryTab';
import FilterBar from '@/components/organisms/FilterBar';
import { WorkSpaceContainer } from '@/components/pages/WorkSpace/Starred';
import WorkSpaceTemplate from '@/components/templates/WorkSpace.template/WorkSpace.template';
import { ICON } from '@/constants/icon';
import { useSetSearchParam } from '@/hooks/useSearchParam';
import { useAuthStore } from '@/stores/useAuthStore';
import { FileSystemAllResponseType, FileSystemListResponseType, KorToEngDriveCategory } from '@/types/workspace.type';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const BreadCrumb = styled(Container.FlexRow)`
  width: 100%;
  padding-top: 16px;
  background: white;
`;

const BreadCrumbContainer = styled(Container.FlexRow)`
  gap: 4px;

  & > p {
    max-width: 100px;
    padding: 5px 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    align-self: center;
  }

  flex-wrap: wrap;
`;
const BreadCrumbLink = styled(Link)`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export default function Drive() {
  const { add, get } = useSetSearchParam();
  const viewMode = get('view') === 'list' ? 'list' : 'card';
  const [title, setTitle] = useState(get('name'));
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [filters, setFilters] = useState(() => ({
    category: get('category') as KorToEngDriveCategory,
    path: get('path') as string,
    page: Number(get('page')),
    search: get('search'),
  }));

  useEffect(() => {
    setTitle(get('name'));
    setFilters({
      category: get('category') as KorToEngDriveCategory,
      path: get('path') as string,
      page: Number(get('page')),
      search: get('search'),
    });
  }, [get('category'), get('path'), get('page'), get('name'), get('search')]);

  const handleViewMode = (mode: 'card' | 'list') => {
    add([['view', mode]]);
  };
  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery(useGetDrive(filters));
  useEffect(() => {
    if ('count' in data.pages[0].data && data?.pages[0].data?.count === -2) {
      navigate(`/workspace/drive?page=1&category=all&path=${user?.rootFolder}`);
    }
  }, [data, navigate, user?.rootFolder]);
  const responseData = data.pages[0].data;
  const { setUser } = useAuthStore();

  function isAllResponseType(
    data: FileSystemAllResponseType | FileSystemListResponseType | { count: number },
  ): data is FileSystemAllResponseType {
    return 'idPath' in data && 'path' in data;
  }
  let fileSystemPath = '';
  let fileSystemId = '';

  if (isAllResponseType(responseData)) {
    fileSystemPath = responseData.path;
    fileSystemId = responseData.idPath;
  }

  const extractFileSystemPath = (path: string): string[] => {
    return ['내 드라이브', ...path.split('/').slice(1)];
  };
  const extractFileSystemId = (idPath: string): string[] => {
    return [...idPath.split('/').slice(1)];
  };

  const pathArr = extractFileSystemPath(fileSystemPath);
  const idArr = extractFileSystemId(fileSystemId);

  return (
    <WorkSpaceContainer>
      <Container.FlexCol gap="8">
        {fileSystemPath && fileSystemId && (
          <BreadCrumb>
            <BreadCrumbContainer>
              {pathArr.map((value, index, array) => {
                const idPathForLink = idArr[index];

                return (
                  <BreadCrumbLink
                    to={`/workspace/drive?page=1&path=${idPathForLink}&category=all&name=${encodeURIComponent(value)}&view=${viewMode}`}
                    key={value}
                    onClick={() =>
                      setUser({
                        currentId: idPathForLink,
                      })
                    }
                  >
                    <Typography.B2 fontWeight="medium" color="gray_90">
                      {value}
                    </Typography.B2>
                    {index !== array.length - 1 && (
                      <div style={{ width: '16px', height: '16px', alignSelf: 'center', textAlign: 'center' }}>
                        <Img src={ICON['right-arrow']} />
                      </div>
                    )}
                  </BreadCrumbLink>
                );
              })}
            </BreadCrumbContainer>
          </BreadCrumb>
        )}

        <FilterBar
          title={title}
          onClickCard={() => handleViewMode('card')}
          onClickList={() => handleViewMode('list')}
          isCardActive={viewMode === 'card'}
          isListActive={viewMode === 'list'}
        />
      </Container.FlexCol>
      <CategoryTab
        currentTab={filters.category}
        setCurrentTab={(category) => {
          add([['category', category]]);
        }}
      />
      <WorkSpaceTemplate
        fileSystem={data.pages as AxiosResponse<FileSystemAllResponseType | FileSystemListResponseType>[]}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        viewMode={viewMode}
        currentTab={filters.category}
      />
    </WorkSpaceContainer>
  );
}
