import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import { ICON } from '@/constants/icon';
import Typography from '@/components/atoms/Typography';

type AlertTempProps = {
  type?: keyof typeof ICON;
  title: string;
  content: string;
  subContent?: string;
};

function AlertTemplate(props: AlertTempProps) {
  const { type, title, content, subContent } = props;

  return (
    <Container.FlexCol gap="12" alignItems="center" style={{ marginBottom: '12px' }}>
      <Img style={{ width: '53px' }} src={ICON[type || 'confirm']} />
      <Typography.T2 fontWeight="bold" color="gray_100">
        {title}
      </Typography.T2>
      <Container.FlexCol gap="4" alignItems="center">
        <Typography.B1 fontWeight="medium" color="gray_70">
          {content}
        </Typography.B1>
        <Typography.B1 fontWeight="medium" color="gray_70">
          {subContent}
        </Typography.B1>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}

export default AlertTemplate;
// import Container from '@/components/atoms/Container';
// import Img from '@/components/atoms/Img';
// import { ICON } from '@/constants/icon';
// import Typography from '@/components/atoms/Typography';

// function EmailAuthAlertTemplate() {
//   return (
//     <Container.FlexCol gap="12" alignItems="center" style={{ marginBottom: '12px' }}>
//       <Img style={{ width: '53px' }} src={ICON.confirm} />
//       <Typography.T2 fontWeight="bold" color="gray_100">
//         이메일 인증 번호를 발송하였습니다.
//       </Typography.T2>
//       <Container.FlexCol gap="4" alignItems="center">
//         <Typography.B1 fontWeight="medium" color="gray_70">
//           입력하신 메일로 수신하신 번호를 확인 후
//         </Typography.B1>
//         <Typography.B1 fontWeight="medium" color="gray_70">
//           인증 번호를 입력하여 인증을 완료하세요.
//         </Typography.B1>
//       </Container.FlexCol>
//     </Container.FlexCol>
//   );
// }

// export default EmailAuthAlertTemplate;
