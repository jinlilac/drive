import FileCard from '@/components/organisms/FileCard';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSheetBaseTemplate';
import { WorkSheetItems } from '@/types/worksheet.type';
import { FileSystemType } from '@/types/workspace.type';
import FolderCard from '@/components/organisms/FolderCard';

export const CardItems = ({
  content,
  checked,
  setState,
  onCheck,
  isFolder = false,
}: {
  content: WorkSheetItems | FileSystemType;
  checked: boolean;
  setState: React.Dispatch<React.SetStateAction<UpdateState>>;
  onCheck: (id: string, checked: boolean) => void;
  isFolder?: boolean;
}) => {
  return isFolder ? (
    <FolderCard
      key={content.fileSystemId}
      {...(content as FileSystemType)}
      setState={setState}
      checked={checked}
      onCheck={onCheck}
    />
  ) : (
    <FileCard key={content.fileSystemId} {...content} setState={setState} checked={checked} onCheck={onCheck} />
  );
};
