import { IconType } from '@/types/icon.type';

const DEFAULT_PATH = '/public/assets/icons/';

export const ICON_LIST = [
  'logo-stitch',
  'circle-check-off',
  'circle-check',
  'square-check-off',
  'square-check',
  'eye-on',
  'eye-off',
  'mark-red',
  'mark-green',
  'confirm',
  'wiive-logo',
  'chevron',
  'chevron-right',
  'google-logo',
  'kakao-logo',
  'naver-logo',
  'edit-img',
  'upload-failed',
] as const;

export const ICON = ICON_LIST.reduce((acc, item) => {
  acc[item] = `${DEFAULT_PATH}${item}.svg`;
  return acc;
}, {} as IconType);
