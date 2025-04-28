import { TagLabelProps } from '@/components/molecules/TagLabel';

export const TAGS: { label: string; color: TagLabelProps['color']; value: string }[] = [
  { label: '작업지시서', color: 'green', value: 'worksheet' },
  { label: '도식화', color: 'orange', value: 'schematic' },
  { label: '인쇄', color: 'red', value: 'print' },
  { label: '패턴', color: 'blue', value: 'pattern' },
  { label: '기타', color: 'gray_80', value: 'etc' },
];

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
