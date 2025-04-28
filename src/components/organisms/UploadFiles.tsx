import SelectTagFile from '@/components/molecules/SelectTagFile';
import { FileWithTag } from '@/components/templates/Alert.template/UploadFileAlert.template';

type UploadFilesListProps = {
  files: FileWithTag[];
  variant: 'upload' | 'success' | 'failed';
  isPending: boolean;
  onTagSelect: (index: number, tag: string) => void;
  handleDelete: (index: number) => void;
};

export default function UploadFilesList({
  files,
  variant,
  handleDelete,
  onTagSelect,
  isPending,
}: UploadFilesListProps) {
  return files.map(({ file, tag }, index) => {
    return (
      <SelectTagFile
        isPending={isPending}
        key={index}
        index={index}
        variant={variant}
        name={file.name}
        size={file.size}
        tag={tag}
        onTagSelect={onTagSelect}
        handleDelete={() => handleDelete(index)}
      />
    );
  });
}
