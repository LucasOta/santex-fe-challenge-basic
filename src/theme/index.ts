export interface Theme {
  colors: {
    bg: string;
    fg: string;
    text: string;
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    light: string;
    gray: string;
    dark: string;
    black: string;
  };
}

const darkTheme: Theme = {
  colors: {
    gray: '#8b919a',
    bg: '#111',
    fg: '#f8f9fa',
    text: '#FFFFFF',
    primary: '#db76ec',
    secondary: '#f8674c',
    success: '#198754',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#0dcaf0',
    light: '#f8f9fa',
    dark: '#343a40',
    black: '#000',
  },
};

export { darkTheme };
