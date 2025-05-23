import { useGetNotices } from '@/apis/Notice';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import { useSetSearchParam } from '@/hooks/useSearchParam';
import { useFormatDate } from '@/libs/date';
import { NoticeItem, NoticeListResponseType } from '@/types/notice.type';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const NoticeWrap = styled(Container.FlexCol)`
  padding-left: 16px;
`;

const NoticeListWrap = styled(Container.FlexCol)`
  padding: 24px 0;
  gap: 8px;
  border-bottom: 1px solid ${(props) => props.theme.Colors.gray_30};
  box-sizing: border-box;
`;

const NoticeListItem = (props: NoticeItem) => {
  const { title, createdAt, noticeId } = props;
  return (
    <NoticeListWrap id="noticeId">
      <Typography.B1 fontWeight="medium" color="gray_100">
        {title}
      </Typography.B1>
      <Typography.B2 fontWeight="medium" color="gray_60">
        {useFormatDate(createdAt)}
      </Typography.B2>
    </NoticeListWrap>
  );
};

export default function NoticeListTemplate() {
  // const { get } = useSetSearchParam();
  // const page = Number(get('page'));

  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery(useGetNotices());

  // const noticeItems = data.pages[0].data.data;
  const noticeItems: NoticeListResponseType[] = data.pages.flatMap((page) => page.data);

  console.log('noticeItems ??', noticeItems[0].data);

  return (
    <NoticeWrap gap="32">
      <Typography.T1 fontWeight="semiBold" color="gray_100">
        공지사항
      </Typography.T1>
      <Container.FlexCol>
        {noticeItems[0].data.map((notice) => (
          <NoticeListItem key={notice.noticeId} {...notice} />
        ))}
      </Container.FlexCol>
    </NoticeWrap>
  );
}
