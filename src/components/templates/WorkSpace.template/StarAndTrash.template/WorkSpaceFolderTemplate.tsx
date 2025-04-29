import Container from '@/components/atoms/Container';
import { FileSystemType } from '@/types/workspace.type';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSheetBaseTemplate';
import { CardItems } from '@/components/organisms/CardItems';
import { ListItems } from '@/components/organisms/ListItems';
import { Dispatch, SetStateAction } from 'react';
import Typography from '@/components/atoms/Typography';
import styled from 'styled-components';
import { DRIVE_SHEET_LABEL } from '@/constants/workspace';

type WorkSpaceFolderCardTemplateProps = {
  folders: FileSystemType[];
  checked: string[];
  setState: Dispatch<SetStateAction<UpdateState>>;
  onCheck: (id: string, checked: boolean) => void;
  viewMode: 'card' | 'list';
};
const SheetBar = styled(Container.Grid)`
  width: 100%;
  gap: 8px;
  grid-template-columns: 52px minmax(320px, auto) 188px 188px 175px 25px;
  background-color: white;
  border-bottom: 1px solid ${(props) => props.theme.Colors.gray_40};
  padding: 23px 8px;
  align-items: center;
  margin-top: 16px;
`;
export default function WorkSpaceFolderTemplate(props: WorkSpaceFolderCardTemplateProps) {
  const { folders, onCheck, checked, setState, viewMode } = props;
  return (
    <Container.FlexCol style={{ margin: '16px 0' }} gap="12">
      {viewMode === 'list' && (
        <SheetBar>
          {DRIVE_SHEET_LABEL.map((label) => (
            <Typography.B2 key={label} fontWeight="medium" color="gray_70">
              {label}
            </Typography.B2>
          ))}
        </SheetBar>
      )}
      {folders.map((folder) =>
        viewMode === 'card' ? (
          <CardItems
            key={folder.fileSystemId}
            content={folder}
            checked={checked.includes(folder.fileSystemId)}
            setState={setState}
            onCheck={onCheck}
            isFolder
          />
        ) : (
          <ListItems
            key={folder.fileSystemId}
            content={folder}
            checked={checked.includes(folder.fileSystemId)}
            setState={setState}
            onCheck={onCheck}
            isDrive
          />
        ),
      )}
    </Container.FlexCol>
  );
}
