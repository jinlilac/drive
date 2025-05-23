export type NoticeItem = {
  content?: string;
  createdAt?: string;
  noticeId?: number;
  title?: string;
  updatedAt?: string;
  visible?: boolean;
};

export type NoticeListResponseType = {
  count: number;
  data: NoticeItem[];
};
