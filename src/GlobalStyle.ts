import { ThemeProps, createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

const GlobalStyle = createGlobalStyle<ThemeProps<Theme>>`
  body {
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.colors.bg};
    color: ${(props) => props.theme.colors.text};
    font-family: "elza-text", sans-serif;
  }
`;

export default GlobalStyle;
