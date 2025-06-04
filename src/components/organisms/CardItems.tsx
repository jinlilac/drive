import FileCard from '@/components/organisms/FileCard';
import { WorkSheetItems } from '@/types/worksheet.type';
import { FileSystemType } from '@/types/workspace.type';
import FolderCard from '@/components/organisms/FolderCard';
import { Dispatch, SetStateAction } from 'react';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSpace.template';

export const CardItems = ({
  content,
  checked,
  state,
  setState,
  onCheck,
  isFolder = false,
}: {
  content: WorkSheetItems | FileSystemType;
  checked: boolean;
  state: UpdateState;
  setState: Dispatch<SetStateAction<UpdateState>>;
  onCheck: (id: string, checked: boolean, path?: string, name?: string) => void;
  isFolder?: boolean;
}) => {
  return isFolder ? (
    <FolderCard
      key={content.fileSystemId}
      {...(content as FileSystemType)}
      state={state}
      setState={setState}
      checked={checked}
      onCheck={onCheck}
    />
  ) : (
    <FileCard
      key={content.fileSystemId}
      {...content}
      setState={setState}
      state={state}
      checked={checked}
      onCheck={onCheck}
    />
  );
};
