import styled from 'styled-components';

const BackgroundImage = styled.div<{ src?: string }>`
  background-image: url(${(props) => props.src});
  flex: 1;
  background-size: cover;
  background-position: center;
`;

interface ProductImageProps {
  src?: string;
  alt: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => (
  <BackgroundImage className="background-image" src={src} />
);

export default ProductImage;
