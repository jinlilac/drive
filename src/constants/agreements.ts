export const AGREEMENT_OPTIONS = [
  {
    id: 'service-terms',
    label: '서비스 이용 약관에 동의합니다.',
    links: [
      { text: '개인정보 취급방침', href: '/privacy-policy' },
      { text: '이용약관 자세히 보기', href: '/terms-of-service' },
    ],
    required: true,
  },
  {
    id: 'member-info-terms',
    label: '회원정보 약관에 동의합니다.',
    links: [{ text: '자세히보기', href: '/member-info-policy' }],
    required: true,
  },
];
