import { useGetDrive } from '@/apis/Drive';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Divider from '@/components/atoms/Divider';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import { ICON } from '@/constants/icon';
import { useAuthStore } from '@/stores/useAuthStore';
import { FileSystemListResponseType, FileSystemType, KorToEngDriveCategory } from '@/types/workspace.type';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

type MoveFolderProps = {
  position: { left: number; top: number };
  onClose: () => void;
  onConfirm: (id: string) => void;
  selectedIds: string[];
};

const MoveFolderContainer = styled(Container.FlexCol)<{ left: number; top: number }>`
  padding: 8px 16px;
  background-color: white;
  position: fixed;
  left: ${({ left }) => left - 100}px;
  top: ${({ top }) => top + 22}px;
  width: 100%;
  max-width: 345px;
  gap: 8px;
  border-radius: 8px;
  box-shadow: 1px 1px 16px rgba(0, 0, 0, 0.1);
`;

const TitleWrap = styled(Container.FlexRow)`
  padding-top: 16px;
  padding-bottom: 8px;
`;

const FolderListWrap = styled(Container.FlexRow)<{ disabled?: boolean }>`
  padding: 8px 0;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  user-select: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background-color: ${(props) => props.theme.Colors.gray_20};
  }
`;
type FolderListProps = FileSystemType & {
  onEnter: (folderId: string, name: string) => void;
  selectedIds: string[];
};

const FolderList = (props: FolderListProps) => {
  const { fileSystemId, name, onEnter, selectedIds } = props;
  const isDisabled = selectedIds.includes(fileSystemId);

  return (
    <FolderListWrap id={fileSystemId} onClick={() => !isDisabled && onEnter(fileSystemId, name)} disabled={isDisabled}>
      <Container.FlexRow style={{ padding: '4px 8px' }} alignItems="center" gap="8">
        <Img src={ICON['stroke-folder']} />
        <Typography.B3
          style={{ maxWidth: '158px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
          fontWeight="medium"
          color="gray_100"
        >
          {name}
        </Typography.B3>
      </Container.FlexRow>
      <Button.Ghost
        onClick={(e) => {
          e.stopPropagation();
          if (!isDisabled) {
            onEnter(fileSystemId, name);
          }
        }}
      >
        <Img src={ICON['caret-right']} />
      </Button.Ghost>
    </FolderListWrap>
  );
};

export default function MoveFolder(props: MoveFolderProps) {
  const { position, onClose, onConfirm, selectedIds } = props;

  const { user } = useAuthStore();
  const [currentFolder, setCurrentFolder] = useState<{ parentId: string; pathName: string }>({
    parentId: user?.rootFolder as string,
    pathName: '내 드라이브',
  });

  const { data } = useSuspenseInfiniteQuery(
    useGetDrive({
      category: KorToEngDriveCategory.폴더,
      path: currentFolder.parentId,
      page: 1,
    }),
  );

  const folders = data.pages[0].data as unknown as keyof FileSystemListResponseType;

  const handleEnterFolder = (folderId: string, name: string) => {
    setCurrentFolder({ parentId: folderId, pathName: name });
  };

  const handleGoBack = () => {
    setCurrentFolder({
      parentId: user?.rootFolder as string,
      pathName: '내 드라이브',
    });
  };

  return createPortal(
    <MoveFolderContainer left={position.left} top={position.top}>
      <TitleWrap alignItems="center" justifyContent="space-between">
        <Container.FlexRow gap="4" alignItems="center">
          {currentFolder.pathName !== '내 드라이브' && (
            <Button.Ghost style={{ height: '20px' }} onClick={handleGoBack}>
              <Img src={ICON['caret-left']} />
            </Button.Ghost>
          )}

          <Typography.B2 fontWeight="medium">{currentFolder.pathName}</Typography.B2>
        </Container.FlexRow>
        <Button.Ghost onClick={onClose}>
          <Img src={ICON.cross} />
        </Button.Ghost>
      </TitleWrap>
      <Divider.Row size="thin" />
      {folders.data.length > 0 ? (
        folders.data.map((folder) => (
          <FolderList key={folder.name} {...folder} onEnter={handleEnterFolder} selectedIds={selectedIds} />
        ))
      ) : (
        <Container.FlexCol
          justifyContent="center"
          alignItems="center"
          gap="4"
          style={{ padding: '16px', minHeight: '142px' }}
        >
          <Typography.B3 fontWeight="medium" color="gray_70">
            여기로 이동하거나
          </Typography.B3>
          <Typography.B3 fontWeight="medium" color="gray_70">
            폴더를 추가할 수 있어요.
          </Typography.B3>
        </Container.FlexCol>
      )}
      <Container.FlexCol gap="16" style={{ paddingBottom: '16px' }}>
        <Divider.Row size="thin" />
        <Button.Fill
          style={{ height: '28px' }}
          onClick={() => onConfirm(currentFolder.parentId)}
          disabled={selectedIds.includes(currentFolder.parentId)}
        >
          <Typography.B3 fontWeight="medium" color="gray_10">
            여기로 이동
          </Typography.B3>
        </Button.Fill>
      </Container.FlexCol>
    </MoveFolderContainer>,
    document.body,
  );
}
