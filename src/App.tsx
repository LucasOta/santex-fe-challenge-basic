import { ThemeProvider } from 'styled-components';
import Header from './components/header';
import ProductList from './components/product-list';
import GlobalStyle from './GlobalStyle';
import { darkTheme } from './theme';

const App = () => (
  <ThemeProvider theme={darkTheme}>
    <GlobalStyle />
    <Header />
    <div>
      <ProductList />
    </div>
  </ThemeProvider>
);

export default App;
