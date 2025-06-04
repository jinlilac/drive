export const GENDER_FILTERS = [
  { label: '성별 전체', value: undefined },
  { label: '남성', value: 1 },
  { label: '여성', value: 2 },
  { label: '아동', value: 3 },
  { label: '기타', value: 0 },
] as const;

export type GenderFilter = (typeof GENDER_FILTERS)[number];

export const CATEGORY_FILTERS = [
  { label: '카테고리 전체', value: undefined },
  { label: '상의', value: 1 },
  { label: '하의', value: 2 },
  { label: '기타', value: 0 },
] as const;

export type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

export const APPAREL_TYPES = [
  { label: '의류 전체', value: '의류 전체' },
  { label: '긴바지', value: '긴바지' },
  { label: '긴소매셔츠', value: '긴소매셔츠' },
  { label: '긴소매티셔츠', value: '긴소매티셔츠' },
  { label: '레깅스', value: '레깅스' },
  { label: '롱스커트', value: '롱스커트' },
  { label: '롱원피스', value: '롱원피스' },
  { label: '미니스커트', value: '미니스커트' },
  { label: '민소매셔츠', value: '민소매셔츠' },
  { label: '민소매티셔츠', value: '민소매티셔츠' },
  { label: '반바지', value: '반바지' },
  { label: '반소매셔츠', value: '반소매셔츠' },
  { label: '반소매티셔츠', value: '반소매티셔츠' },
  { label: '베스트', value: '베스트' },
  { label: '숏원피스', value: '숏원피스' },
  { label: '자켓', value: '자켓' },
  { label: '점퍼', value: '점퍼' },
  { label: '치마', value: '치마' },
  { label: '카디건', value: '카디건' },
  { label: '코트', value: '코트' },
  { label: '패딩', value: '패딩' },
  { label: '후드셔츠', value: '후드셔츠' },
  { label: '후드집업', value: '후드집업' },
  { label: '후드티셔츠', value: '후드티셔츠' },
] as const;

export const SHEET_LABEL = ['이름', '작업 유형', '의뢰처', '파일 유형', '수정일시'];
