import { ICON } from '@/constants/icon';
import { KorToEngDriveCategory } from '@/types/workspace.type';

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

export const DRIVE_CATEGORY = [
  { label: '전체', name: KorToEngDriveCategory.전체 },
  { label: '폴더', name: KorToEngDriveCategory.폴더 },
  { label: '작업지시서', name: KorToEngDriveCategory.WIIVE },
  { label: '작업지시서', name: KorToEngDriveCategory.작업지시서 },
  { label: '도식화', name: KorToEngDriveCategory.도식화 },
  { label: '원단', name: KorToEngDriveCategory.원단 },
  { label: '패턴', name: KorToEngDriveCategory.패턴 },
  { label: '인쇄', name: KorToEngDriveCategory.인쇄 },
  { label: '기타', name: KorToEngDriveCategory.기타 },
];

export const DRIVE_SHEET_LABEL = ['', '이름', '파일 유형', '파일 형식', '수정일시', ''];
