import FileList from '@/components/organisms/FileList';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSheetBaseTemplate';
import { WorkSheetItems } from '@/types/worksheet.type';
import { FileSystemType } from '@/types/workspace.type';

export const ListItems = ({
  content,
  checked,
  setState,
  onCheck,
  state,
  isDrive = false,
  isFolder,
}: {
  content: WorkSheetItems | FileSystemType;
  checked: boolean;
  state: UpdateState;
  setState: React.Dispatch<React.SetStateAction<UpdateState>>;
  onCheck: (id: string, checked: boolean, path?: string) => void;
  isDrive?: boolean;
  isFolder: boolean;
}) => (
  <FileList
    key={content.fileSystemId}
    {...content}
    state={state}
    setState={setState}
    checked={checked}
    onCheck={onCheck}
    isDrive={isDrive}
    isFolder={isFolder}
  />
);
