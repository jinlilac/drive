import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import { STORAGE_INFO } from '@/constants/storage';
import { useAuthStore } from '@/stores/useAuthStore';
import styled from 'styled-components';

const StorageProgressWrap = styled(Container.FlexCol)`
  gap: 12px;
  width: 100%;
  padding: 16px 0;
`;
const BarBackground = styled.div`
  border-radius: 8px;
  width: 100%;
  height: 4px;
  background-color: ${(props) => props.theme.Colors.gray_50};
`;
const BarFill = styled.div<{ percent: number }>`
  border-radius: 8px;
  width: ${({ percent }) => `${percent}%`};
  height: 100%;
  /* transition: width 0.3s; */
  background-color: ${(props) => props.theme.Colors.gray_90};
`;
const Info = styled(Typography.B1)``;

const InfoBox = styled(Container.FlexCol)`
  padding: 16px;
  background-color: ${(props) => props.theme.Colors.gray_20};
  gap: 8px;
`;

const StorageInfoBox = () => {
  const proInfo = STORAGE_INFO.find((item) => item.type === 'pro');
  if (!proInfo) return null;
  return (
    <InfoBox>
      <Typography.B2 fontWeight="medium" color="gray_100">
        {proInfo.highlight}
      </Typography.B2>
      <Container.FlexCol style={{ maxWidth: '204px', flexWrap: 'wrap' }}>
        <Typography.B2 style={{ lineHeight: '130%' }} fontWeight="medium" color="gray_100">
          {proInfo.description}
        </Typography.B2>
      </Container.FlexCol>
      <Typography.B2 fontWeight="semiBold" color="gray_60">
        {proInfo.note}
      </Typography.B2>
    </InfoBox>
  );
};

export default function StorageProgressBar() {
  const { user } = useAuthStore();

  if (!user || user.storageLimit == null || user.storageUsed == null) return null;

  const percent = Math.min(100, Math.round((user.storageUsed / user.storageLimit) * 100));

  const formatSize = (size: number, fractionDigits = 1) => {
    if (size >= 1024 ** 3) return `${(size / 1024 ** 3).toFixed(fractionDigits)}GB`;
    if (size >= 1024 ** 2) return `${(size / 1024 ** 2).toFixed(fractionDigits)}MB`;
    if (size >= 1024) return `${(size / 1024).toFixed(fractionDigits)}KB`;
    return `${size}B`;
  };

  return (
    <StorageProgressWrap>
      <Typography.B1 fontWeight="semiBold" color="gray_90">
        저장용량
      </Typography.B1>
      <BarBackground>
        <BarFill percent={percent} />
      </BarBackground>
      <Info fontWeight="semiBold" color="gray_90">
        {formatSize(user.storageLimit, 0)} 중 {formatSize(user.storageUsed, 1)} 사용
      </Info>
      <StorageInfoBox />
    </StorageProgressWrap>
  );
}
