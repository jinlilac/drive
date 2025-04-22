// CardViewWrapper.tsx
import Container from '@/components/atoms/Container';
import { ReactNode } from 'react';

export function CardViewWrapper({ children }: { children: ReactNode }) {
  return (
    <Container.Grid
      columns="6"
      gap="14.4"
      style={{
        width: '100%',
        justifyContent: 'center',
        padding: '12px 0',
      }}
    >
      {children}
    </Container.Grid>
  );
}
