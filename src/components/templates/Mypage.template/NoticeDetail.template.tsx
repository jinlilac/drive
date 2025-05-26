import { useGetNoticeDetail } from '@/apis/Notice';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import { NoticeListWrap } from '@/components/templates/Mypage.template/NoticeList.template';
import { useFormatDate } from '@/libs/date';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

const NoticeDetailWrap = styled(Container.FlexCol)`
  max-width: 600px;
  height: calc(100% - 40px);
`;

const ContentBox = styled.pre`
  font-size: ${(props) => props.theme.Font.fontSize.b2};
  font-weight: ${(props) => props.theme.Font.fontWeight.medium};
  color: ${(props) => props.theme.Colors.gray_100};
  line-height: 150%;
  white-space: pre-wrap;
`;

const NoticeNavWrap = styled(NoticeListWrap)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const NoticeNavList = styled(Container.FlexCol)`
  margin-bottom: 80px;
  justify-content: center;
  align-items: center;
`;

type NoticeNavProps = {
  id: number;
  type: 'prev' | 'next';
  title: string;
  createdAt: string;
};

const NoticeNavItem = ({ type, title, createdAt, id }: NoticeNavProps) => {
  return (
    <Link to={`/mypage/notices/${id}`}>
      <NoticeNavWrap>
        <Container.FlexRow gap="16">
          <Typography.B1 fontWeight="semiBold" color="gray_100" style={{ maxWidth: '28px', whiteSpace: 'nowrap' }}>
            {type === 'prev' ? '이전' : '다음'}
          </Typography.B1>
          <Typography.B1
            fontWeight="medium"
            color="gray_100"
            style={{ maxWidth: '481px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
          >
            {title}
          </Typography.B1>
        </Container.FlexRow>
        <Typography.B2 fontWeight="medium" color="gray_60">
          {useFormatDate(createdAt)}
        </Typography.B2>
      </NoticeNavWrap>
    </Link>
  );
};

export default function NoticeDetailTemplate() {
  const { id } = useParams();

  const { data } = useSuspenseQuery(useGetNoticeDetail(Number(id)));
  console.log('data', data);
  const currentNotice = data.data.currentNotice;
  const prevNotice = data.data.beforeNotice;
  const nextNotice = data.data.afterNotice;
  return (
    <NoticeDetailWrap justifyContent="space-between">
      <NoticeDetailWrap gap="32">
        <NoticeListWrap>
          <Typography.T3
            fontWeight="semiBold"
            color="gray_100"
            style={{ whiteSpace: 'pre-wrap', paddingBottom: '8px' }}
          >
            {currentNotice.title}
          </Typography.T3>
          <Typography.B2 fontWeight="medium" color="gray_60">
            {useFormatDate(currentNotice.createdAt)}
          </Typography.B2>
        </NoticeListWrap>
        <ContentBox>{currentNotice.content}</ContentBox>
      </NoticeDetailWrap>
      <NoticeNavList>
        {prevNotice && (
          <NoticeNavItem
            type="prev"
            id={prevNotice.noticeId}
            title={prevNotice.title}
            createdAt={prevNotice.createdAt}
          />
        )}
        {nextNotice && (
          <NoticeNavItem
            type="next"
            id={nextNotice.noticeId}
            title={nextNotice.title}
            createdAt={nextNotice.createdAt}
          />
        )}
        <Link to={`/mypage/notices/list?page=1`}>
          <Button.Stroke style={{ marginTop: '24px', width: '89px', maxHeight: '38px' }} small>
            목록
          </Button.Stroke>
        </Link>
      </NoticeNavList>
    </NoticeDetailWrap>
  );
}
