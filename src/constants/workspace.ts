import { ICON } from '@/constants/icon';

// 메뉴 아이템 상수 정의
export const MENU_ITEMS = [
  {
    label: '프로필',
    path: '/mypage',
  },
  {
    label: '공지사항',
    path: '/notices',
  },
  {
    label: '1:1 문의하기',
    path: '/inquiry',
  },
] as const;

// 타입 정의 (자동 추론 가능)
export type MenuItem = (typeof MENU_ITEMS)[number];

export const SIDEBAR_ITEMS = [
  {
    label: '작업지시서',
    path: '/workspace/work-sheet',
    icon: ICON['work-sheet'],
  },
  {
    label: '내드라이브',
    path: '/workspace/drive',
    icon: ICON.drive,
  },
  {
    label: '즐겨찾기',
    path: '/workspace/starred',
    icon: ICON['stroke-star'],
  },
  {
    label: '휴지통',
    path: '/workspace/trash',
    icon: ICON.trash,
  },
];
