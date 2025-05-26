import { useGetNotices } from '@/apis/Notice';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import { Pagination } from '@/components/molecules/Pagination';
import { useSetSearchParam } from '@/hooks/useSearchParam';
import { useFormatDate } from '@/libs/date';
import { NoticeItem, NoticeListResponseType } from '@/types/notice.type';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NoticeWrap = styled(Container.FlexCol)`
  /* padding-left: 16px; */
  position: relative;
  width: 100%;
  height: calc(100% - 40px);
  max-width: 600px;
`;

export const NoticeListWrap = styled(Container.FlexCol)`
  padding: 24px 0;
  min-width: 600px;
  width: 100%;
  gap: 8px;
  border-bottom: 1px solid ${(props) => props.theme.Colors.gray_30};
  box-sizing: border-box;
`;

const NoticeListItem = (props: NoticeItem) => {
  const { title, createdAt, noticeId } = props;
  return (
    <Link to={`/mypage/notices/${noticeId}`}>
      <NoticeListWrap id="noticeId">
        <Typography.B1
          fontWeight="medium"
          color="gray_100"
          style={{ maxWidth: '600px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
          {title}
        </Typography.B1>
        <Typography.B2 fontWeight="medium" color="gray_60">
          {useFormatDate(createdAt)}
        </Typography.B2>
      </NoticeListWrap>
    </Link>
  );
};

export default function NoticeListTemplate() {
  const { get, add } = useSetSearchParam();
  const page = Number(get('page') || 1);

  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery(useGetNotices(page));

  const noticeItems: NoticeListResponseType[] = data.pages.flatMap((page) => page.data);

  const totalCount = noticeItems[0].count;

  console.log('noticeItems ??', noticeItems[0].data);
  const handlePageChange = (newPage: number) => {
    add([['page', String(newPage)]]);
  };

  return (
    <NoticeWrap>
      {totalCount > 0 ? (
        <>
          <Container.FlexCol>
            {noticeItems[0].data.map((notice) => (
              <NoticeListItem key={notice.noticeId} {...notice} />
            ))}
          </Container.FlexCol>
          <Pagination currentPage={page} totalCount={totalCount} perPage={9} onChange={handlePageChange} />
        </>
      ) : (
        <Typography.B1>공지사항이 비었습니다.</Typography.B1>
      )}
    </NoticeWrap>
  );
}
