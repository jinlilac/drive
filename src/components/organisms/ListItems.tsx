import FileList from '@/components/organisms/FileList';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSheetBaseTemplate';
import { WorkSheetItems } from '@/types/worksheet.type';
import { FileSystemType } from '@/types/workspace.type';

export const ListItems = ({
  content,
  checked,
  setState,
  onCheck,
  isDrive = false,
}: {
  content: WorkSheetItems | FileSystemType;
  checked: boolean;
  setState: React.Dispatch<React.SetStateAction<UpdateState>>;
  onCheck: (id: string, checked: boolean, path?: string) => void;
  isDrive?: boolean;
}) => (
  <FileList
    key={content.fileSystemId}
    {...content}
    setState={setState}
    checked={checked}
    onCheck={onCheck}
    isDrive={isDrive}
  />
);
