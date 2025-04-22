// ListViewWrapper.tsx
import Container from '@/components/atoms/Container';
import { ReactNode } from 'react';

export function ListViewWrapper({ children }: { children: ReactNode }) {
  return (
    <Container.FlexCol gap="12" style={{ overflowY: 'scroll', padding: '12px 0' }}>
      {children}
    </Container.FlexCol>
  );
}
