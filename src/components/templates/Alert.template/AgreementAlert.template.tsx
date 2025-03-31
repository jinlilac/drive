import { AGREEMENT_OPTIONS } from '@/constants/agreements';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import styled from 'styled-components';

type AgreementAlertTemplateProps = {
  firstIndex: number;
  secondIndex: number;
};

const AgreementAlertContainer = styled(Container.FlexCol)`
  position: relative;
  max-height: 530px;
  margin-bottom: 18px;
`;

const AgreementAlertTitle = styled(Typography.T2)`
  position: absolute;
  width: 100%;
  text-align: center;
`;

const AgreementAlertContent = styled(Typography.B2)`
  white-space: pre-line;
  overflow: auto;
  margin-top: 36px;
`;

export default function AgreementAlertTemplate(props: AgreementAlertTemplateProps) {
  const { firstIndex, secondIndex } = props;
  const { text, contents } = AGREEMENT_OPTIONS[firstIndex].links[secondIndex];
  return (
    <AgreementAlertContainer gap="12">
      <AgreementAlertTitle fontWeight={'bold'}>{text}</AgreementAlertTitle>
      <AgreementAlertContent>{contents}</AgreementAlertContent>
    </AgreementAlertContainer>
  );
}
