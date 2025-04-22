import FileCard from '@/components/organisms/FileCard';
import { UpdateState } from '@/components/templates/WorkSpace.tempplate/WorkSheetBaseTemplate';
import { WorkSheetItems } from '@/types/worksheet.type';

export const CardItems = ({
  content,
  checked,
  setState,
  onCheck,
}: {
  content: WorkSheetItems;
  checked: boolean;
  setState: React.Dispatch<React.SetStateAction<UpdateState>>;
  onCheck: (id: string, checked: boolean) => void;
}) => <FileCard key={content.fileSystemId} {...content} setState={setState} checked={checked} onCheck={onCheck} />;
