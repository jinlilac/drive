import { TagLabelProps } from '@/components/molecules/TagLabel';
import { KorToEngDriveCategory } from '@/types/workspace.type';

export const TAGS: { label: string; color: TagLabelProps['color']; value: KorToEngDriveCategory }[] = [
  { label: '작업지시서', color: 'green', value: KorToEngDriveCategory.작업지시서 },
  { label: '도식화', color: 'orange', value: KorToEngDriveCategory.도식화 },
  { label: '인쇄', color: 'red', value: KorToEngDriveCategory.인쇄 },
  { label: '패턴', color: 'blue', value: KorToEngDriveCategory.패턴 },
  { label: '기타', color: 'gray_80', value: KorToEngDriveCategory.기타 },
];

export const TagsColor = Object.fromEntries(TAGS.map((item) => [item.value, item.color]));

export type FileState = 'pending' | 'success' | 'failed';

export type UnifiedFile = {
  index: number;
  name: string;
  size: number;
  tag: string;
  status: FileState;
  error?: string;
  originalFile?: File;
};
