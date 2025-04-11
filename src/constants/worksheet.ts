import { ICON } from '@/constants/icon';

export const GENDER_FILTERS = [
  { label: '성별 전체', value: 0 },
  { label: '남성', value: 1 },
  { label: '여성', value: 2 },
  { label: '아동', value: 3 },
  { label: '기타', value: 4 },
] as const;

export type GenderFilter = (typeof GENDER_FILTERS)[number];

export const CATEGORY_FILTERS = [
  { label: '카테고리 전체', value: 0 },
  { label: '상의', value: 1 },
  { label: '하의', value: 2 },
  { label: '기타', value: 3 },
] as const;

export type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

export const APPAREL_TYPES = [
  '의류 전체',
  '긴바지',
  '긴소매셔츠',
  '긴소매티셔츠',
  '레깅스',
  '롱스커트',
  '롱원피스',
  '미니스커트',
  '민소매셔츠',
  '민소매티셔츠',
  '반바지',
  '반소매셔츠',
  '반소매티셔츠',
  '베스트',
  '숏원피스',
  '자켓',
  '점퍼',
  '치마',
  '카디건',
  '코트',
  '패딩',
  '후드셔츠',
  '후드집업',
  '후드티셔츠',
] as const;
export type ClothingItem = (typeof APPAREL_TYPES)[number];

export const MORE_ITEMS = [
  { label: '이름 바꾸기', icon: ICON['more-edit'] },
  { label: '삭제', icon: ICON['more-trash'] },
];
