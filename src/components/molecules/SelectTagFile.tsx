import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import UploadingBox from '@/components/atoms/Uploading';
import SelectBox from '@/components/molecules/SelectedBox';
import TagLabel from '@/components/molecules/TagLabel';
import { TAGS } from '@/constants/drive';
import { ICON } from '@/constants/icon';
import { formatFileSize } from '@/libs/formatBytes';
import styled from 'styled-components';

type SelectTagFileProps = {
  index: number;
  name: string;
  size: number;
  tag: string;
  isPending: boolean;
  variant: 'upload' | 'success' | 'failed';

  onTagSelect: (index: number, tag: string) => void;
  handleDelete: (index: number) => void;
};

const FileListContainer = styled(Container.FlexRow)`
  outline: 1px solid ${(props) => props.theme.Colors.gray_50};
  border-radius: 8px;
  padding: 12px 16px;
  justify-content: space-between;
  align-items: flex-start;
`;
const TagOptions = TAGS.map((tag) => ({
  label: <TagLabel label={tag.label} color={tag.color} />,
  value: tag.value as string,
}));

const Completed = () => {
  return (
    <Container.FlexRow gap="4">
      <Img src={ICON['success-upload']} />
      <Typography.B3 fontWeight="medium" color="gray_90">
        Completed
      </Typography.B3>
    </Container.FlexRow>
  );
};

const Uploading = () => {
  return (
    <Container.FlexRow gap="4" alignItems="center" justifyContent="center">
      <UploadingBox />
      <Typography.B3 fontWeight="medium" color="gray_90">
        Uploading....
      </Typography.B3>
    </Container.FlexRow>
  );
};

const Failed = () => {
  return (
    <Container.FlexRow gap="4">
      <Img src={ICON['failed-error']} />
      <Typography.B3 fontWeight="medium" color="gray_90">
        Failed
      </Typography.B3>
    </Container.FlexRow>
  );
};

export default function SelectTagFile(props: SelectTagFileProps) {
  const { name, size, index, handleDelete, onTagSelect, tag, variant, isPending } = props;

  return (
    <FileListContainer>
      <Container.FlexCol gap="8">
        <Typography.B1
          fontWeight="semiBold"
          color="gray_100"
          style={{
            minWidth: '200px',
            maxWidth: '200px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {name}
        </Typography.B1>
        <Container.FlexRow>
          <Typography.B3 fontWeight="medium" color="gray_70">
            {formatFileSize(size)}
          </Typography.B3>
          {(variant !== 'upload' || isPending) && (
            <Typography.B3 fontWeight="medium" color="gray_70">
              ・
            </Typography.B3>
          )}
          {isPending && <Uploading />}
          {variant === 'success' && <Completed />}
          {variant === 'failed' && <Failed />}
        </Container.FlexRow>
      </Container.FlexCol>
      <Container.FlexRow justifyContent="space-between" style={{ flex: 1, paddingLeft: '60px' }}>
        <SelectBox
          style={{ padding: '0' }}
          options={TagOptions}
          value={tag}
          onChange={(value) => {
            console.log(value);
            onTagSelect(index, value as string);
          }}
          padding={8}
        />
        <Button.Ghost onClick={() => handleDelete(index)}>
          <Img src={ICON.clear} />
        </Button.Ghost>
      </Container.FlexRow>
    </FileListContainer>
  );
}
