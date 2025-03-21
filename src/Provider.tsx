import Router from '@/Router';
import GlobalStyle from '@/styles/global-styles';
import theme from '@/styles/theme';
import { ThemeProvider } from 'styled-components';

export default function Provider() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}
