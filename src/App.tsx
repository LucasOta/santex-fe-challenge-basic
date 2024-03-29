import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { darkTheme } from './theme';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <Header></Header>
      <div>
        <ProductList></ProductList>
      </div>
    </ThemeProvider>
  );
}

export default App;
