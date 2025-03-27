export const AGREEMENT_OPTIONS = [
  {
    id: 'service-terms',
    label: '서비스 이용 약관에 동의합니다.',
    links: [
      { text: '개인정보 취급방침', contents: '/privacy-policy' },
      { text: '이용약관', contents: '/terms-of-service' },
    ],
    required: true,
  },
  {
    id: 'member-info-terms',
    label: '회원정보 약관에 동의합니다.',
    links: [{ text: '회원 정보 약관', contents: '/member-info-policy' }],
    required: true,
  },
];
