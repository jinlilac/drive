// DropdownMenuPortal.tsx
import { createPortal } from 'react-dom';

export default function DropdownMenuPortal({ children }: { children: React.ReactNode }) {
  const el = document.getElementById('dropdown-root') || document.body;
  return createPortal(children, el);
}
