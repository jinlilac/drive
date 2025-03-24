import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import 'pretendard/dist/web/static/pretendard.css';

const GlobalStyle = createGlobalStyle`
${reset};
* {
  box-sizing: border-box;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none; 
}
body{
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  -webkit-text-size-adjust:none;
  overflow: hidden;
  background-color: white;
}
button {
  font:inherit
}
input[type="text"],
input[type="password"],
input[type="submit"],
input[type="search"],
input[type="tel"],
input[type="email"],
html input[type="button"],
input[type="reset"] {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  input:focus {
  outline: none;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-transition: background-color 9999s ease-out;
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
    -webkit-text-fill-color: #fff !important;
}

}
a {
  text-decoration: none;
}
  div::-webkit-scrollbar{
  display: none;
  width: 0;  /* Remove scrollbar space */
  height: 0;
  background: transparent;  /* Optional: just make scrollbar invisible */
  -webkit-appearance: none;
  }
`;
export default GlobalStyle;
