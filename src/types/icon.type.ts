import { ICON_LIST } from '@/constants/icon';

export type IconListType = (typeof ICON_LIST)[number];
export type IconExtensionType = 'svg';
export type IconType = Record<IconListType, `/public/assets/icons/${IconListType}.${IconExtensionType}`>;
