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
    dark: string;
  };
}

const darkTheme: Theme = {
  colors: {
    bg: '#121212',
    fg: '#f8f9fa',
    text: '#FFFFFF',
    primary: '#0d6efd',
    secondary: '#6c757d',
    success: '#198754',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#0dcaf0',
    light: '#f8f9fa',
    dark: '#343a40',
  },
};

export { darkTheme };
