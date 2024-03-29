import styled from 'styled-components';

const StyledHeader = styled.div`
  background-color: ${(props) => props.theme.colors.danger};
`;

export function Header() {
  return (
    <StyledHeader>
      <header>
        <img
          src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
          alt="logo"
        />
        <div>$ 0</div>
      </header>
    </StyledHeader>
  );
}
