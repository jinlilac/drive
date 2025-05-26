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

export type AfterNotice = {
  createdAt: string;
  noticeId: number;
  title: string;
};

export type BeforeNotice = {
  createdAt: string;
  noticeId: number;
  title: string;
};

export type CurrentNotice = {
  content: string;
  createdAt: string;
  noticeId: number;
  title: string;
  updatedAt: string;
  visible: boolean;
};

export type NoticeDetail = {
  afterNotice: AfterNotice;
  beforeNotice: BeforeNotice;
  currentNotice: CurrentNotice;
};
