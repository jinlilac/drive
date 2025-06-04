import { Dispatch, SetStateAction } from 'react';
import { FileSystemAllResponseType, FileSystemListResponseType } from '@/types/workspace.type';
import { AxiosResponse } from 'axios';
import Container from '@/components/atoms/Container';
import styled, { css } from 'styled-components';
import { CardItems } from '@/components/organisms/CardItems';
import { ListItems } from '@/components/organisms/ListItems';
import Typography from '@/components/atoms/Typography';
import { DRIVE_SHEET_LABEL } from '@/constants/workspace';
import { UpdateState } from '@/components/templates/WorkSpace.template/WorkSpace.template';

type WorkSpaceStarAndTrashTemplateProps = {
  fileSystem: AxiosResponse<FileSystemAllResponseType | FileSystemListResponseType>[];
  checked: string[];
  state: UpdateState;
  setState: Dispatch<SetStateAction<UpdateState>>;
  onCheck: (id: string, checked: boolean, path?: string) => void;
  viewMode: 'card' | 'list';
};

function isFileSystemAllResponseType(
  data: FileSystemAllResponseType | FileSystemListResponseType,
): data is FileSystemAllResponseType {
  return 'files' in data;
}
const SheetBar = styled(Container.Grid)`
  width: 100%;
  gap: 8px;
  grid-template-columns: 52px minmax(320px, auto) 188px 188px 175px 25px;
  background-color: white;
  border-bottom: 1px solid ${(props) => props.theme.Colors.gray_40};
  padding: 16px 8px;
  align-items: center;
`;

export const ItemContainer = styled(Container.Grid)<{ viewMode: 'card' | 'list' }>`
  padding-top: 16px;
  ${({ viewMode }) =>
    viewMode === 'card'
      ? css`
          column-gap: 14.4px;
          row-gap: 24px;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          @media (min-width: 1920px) {
            grid-template-columns: repeat(auto-fit, minmax(250px, max-content));
          }
        `
      : css`
          display: flex;
          flex-direction: column;
        `}
`;

export default function WorkSpaceItemTemplate(props: WorkSpaceStarAndTrashTemplateProps) {
  const { fileSystem, checked, onCheck, setState, viewMode, state } = props;
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
      {fileSystem.map((item) => {
        const { data } = item;
        if (isFileSystemAllResponseType(data)) {
          return data.files.map((content) =>
            viewMode === 'card' ? (
              <CardItems
                state={state}
                key={content.fileSystemId}
                content={content}
                checked={checked.includes(content.fileSystemId)}
                setState={setState}
                onCheck={onCheck}
                isFolder={content.type === 'folder'}
              />
            ) : (
              <ListItems
                key={content.fileSystemId}
                content={content}
                state={state}
                checked={checked.includes(content.fileSystemId)}
                setState={setState}
                onCheck={onCheck}
                isDrive
                isFolder={content.type === 'folder'}
              />
            ),
          );
        } else {
          return data.data.map((content) =>
            viewMode === 'card' ? (
              <CardItems
                key={content.fileSystemId}
                content={content}
                checked={checked.includes(content.fileSystemId)}
                state={state}
                setState={setState}
                onCheck={onCheck}
                isFolder={content.type === 'folder'}
              />
            ) : (
              <ListItems
                key={content.fileSystemId}
                content={content}
                checked={checked.includes(content.fileSystemId)}
                state={state}
                setState={setState}
                onCheck={onCheck}
                isDrive
                isFolder={content.type === 'folder'}
              />
            ),
          );
        }
      })}
    </ItemContainer>
  );
}
