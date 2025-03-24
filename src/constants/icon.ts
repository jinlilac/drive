import { IconType } from '@/types/icon.type';

const DEFAULT_PATH = '/public/assets/icons/';

export const ICON_LIST = [
  'logo-stitch',
  'circle-check-off',
  'circle-check',
  'square-check-off',
  'square-check',
] as const;

export const ICON = ICON_LIST.reduce((acc, item) => {
  acc[item] = `${DEFAULT_PATH}${item}.svg`;
  return acc;
}, {} as IconType);
