import Container from '@/components/atoms/Container';
import { FileSystemType } from '@/types/workspace.type';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSheetBaseTemplate';
import { CardItems } from '@/components/organisms/CardItems';
import { ListItems } from '@/components/organisms/ListItems';
import { Dispatch, SetStateAction } from 'react';
import Typography from '@/components/atoms/Typography';
import styled, { css } from 'styled-components';
import { DRIVE_SHEET_LABEL } from '@/constants/workspace';
import { ItemContainer } from '@/components/templates/WorkSpace.template/StarAndTrash.template/WorkSpaceItem.template';

type WorkSpaceFolderCardTemplateProps = {
  folders: FileSystemType[];
  checked: string[];
  state: UpdateState;
  setState: Dispatch<SetStateAction<UpdateState>>;
  onCheck: (id: string, checked: boolean, path?: string, name?: string) => void;
  viewMode: 'card' | 'list';
};
const SheetBar = styled(Container.Grid)`
  width: 100%;
  gap: 8px;
  grid-template-columns: 52px minmax(320px, auto) 188px 188px 175px 25px;
  background-color: white;
  border-bottom: 1px solid ${(props) => props.theme.Colors.gray_40};
  padding: 16px 8px;
  align-items: center;
`;

export default function WorkSpaceFolderTemplate(props: WorkSpaceFolderCardTemplateProps) {
  const { folders, onCheck, checked, setState, viewMode, state } = props;
  return (
    <ItemContainer viewMode={viewMode} gap="12">
      {viewMode === 'list' && (
        <SheetBar>
          {DRIVE_SHEET_LABEL.map((label) => (
            <Typography.B2 style={{ padding: '7px 0' }} key={label} fontWeight="medium" color="gray_70">
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
            state={state}
            setState={setState}
            onCheck={onCheck}
            isFolder
          />
        ) : (
          <ListItems
            key={folder.fileSystemId}
            content={folder}
            checked={checked.includes(folder.fileSystemId)}
            state={state}
            setState={setState}
            onCheck={onCheck}
            isDrive
            isFolder={!!folder}
          />
        ),
      )}
    </ItemContainer>
  );
}
