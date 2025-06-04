import { TagLabelProps } from '@/components/molecules/TagLabel';
import { KorToEngDriveCategory } from '@/types/workspace.type';

export const TAGS: { label: string; color: TagLabelProps['color']; value: KorToEngDriveCategory }[] = [
  { label: 'Type A', color: 'green', value: KorToEngDriveCategory['Type A'] },
  { label: 'Type B', color: 'orange', value: KorToEngDriveCategory['Type B'] },
  { label: 'Type C', color: 'purple', value: KorToEngDriveCategory['Type C'] },
  { label: 'Type D', color: 'red', value: KorToEngDriveCategory['Type D'] },
  { label: 'Type E', color: 'blue', value: KorToEngDriveCategory['Type E'] },
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
