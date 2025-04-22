import FileList from '@/components/organisms/FileList';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSheetBaseTemplate';
import { WorkSheetItems } from '@/types/worksheet.type';

export const ListItems = ({
  content,
  checked,
  setState,
  onCheck,
}: {
  content: WorkSheetItems;
  checked: boolean;
  setState: React.Dispatch<React.SetStateAction<UpdateState>>;
  onCheck: (id: string, checked: boolean) => void;
}) => <FileList key={content.fileSystemId} {...content} setState={setState} checked={checked} onCheck={onCheck} />;
