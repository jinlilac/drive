import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    Colors: {
      // system
      error: '#F03D21';
      fill: '#1B1B1B';
      success: '#287D3C';
      error_bg: '#FEEFEF';
      success_bg: '#EDF9F0';
      // grayscale
      gray_10: '#FFFFFF';
      gray_20: '#F8F8F8';
      gray_30: '#F3F2F2';
      gray_40: '#E9E8E7';
      gray_50: '#D7D7D5';
      gray_60: '#B5B5B5';
      gray_70: '#8A8A8A';
      gray_80: '#6B6B6B';
      gray_90: '#4A4A4A';
      gray_100: '#2F2F2F';
      gray_200: '#1B1B1B';

      // keycolor
      red: '#FF7262';
      blue: '#08B7FF';
      purple: '#A259FF';
      green: '#0ACF83';
      dark: '#10130C';
      default: 'inherit';
    };
    Font: {
      fontWeight: {
        bold: '600';
        semiBold: '500';
        medium: '400';
        regular: '300';
      };
      fontSize: {
        h1: '2.25rem';
        h2: '2rem';
        h3: '1.75rem';
        t1: '1.5rem';
        t2: '1.25rem';
        t3: '1.125rem';
        b1: '1rem';
        b2: '0.875rem';
        b3: '0.75rem';
      };
    };
    BorderRadius: {
      '4': '0.25rem';
      '8': '0.5rem';
      '12': '0.75rem';
      '16': '1rem';
    };
  }
}
