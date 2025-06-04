import { ICON } from '@/constants/icon';

export const MYPAGE_SIDEBAR_ITEMS = {
  계정: [
    {
      label: '프로필',
      path: '/mypage/profile',
      icon: ICON['work-sheet'],
      isReady: true,
    },
    {
      label: '프로젝트 소개',
      path: '/mypage/introduce',
      icon: ICON['mypage-customer'],
      isReady: false,
    },
    {
      label: '공지사항',
      path: '/mypage/notices/list?page=1',
      icon: ICON['mypage-bell'],
      isReady: false,
    },
  ],
  관리: [
    {
      label: '구독 관리',
      path: '/mypage/pricing',
      icon: ICON['mypage-bill-card'],
      isReady: false,
    },
    {
      label: '결제 내역',
      path: '/mypage/pricing/paymenthistory',
      icon: ICON['mypage-bill-list'],
      isReady: false,
    },
  ],
};

export const DELETE_ACCOUNT = [
  '부정 이용 방지를 위해 탈퇴 후 30일 동안 위브에 다시 가입할 수 없습니다.',
  '회원정보 및 서비스 내 저장된 모든 데이터가 삭제되며, 삭제된 데이터는 복구되지 않습니다.',
  '탈퇴 시 보유하신 프로모션 (쿠폰 등)도 사용할 수 없습니다.',
];
