// src/components/Product.jsx
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons";

const Container = styled(Link)`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease;
  text-decoration: none;     /* remove underline */
  color: inherit;            /* inherit text/icon color */
  cursor: pointer;

  &:hover img {
    transform: scale(1.05);
    opacity: 0.85;
  }

  &:hover {
    background-color: #e0f7fa;
  }

  opacity: ${(props) => (props.outOfStock ? 0.5 : 1)};
  pointer-events: ${(props) => (props.outOfStock ? "none" : "auto")};
`;

const Info = styled.div`
  opacity: 0;
  /* ...rest unchanged... */
`;

const Circle = styled.div`/* ... */`;
const Image = styled.img`
  height: 75%;
  z-index: 2;
  transform: scale(1);
  transition: transform 0.5s ease, opacity 0.5s ease;
`;
const Icon   = styled.div`/* ... */`;
const OutOfStockLabel = styled.div`/* ... */`;

export default function Product({ item }) {
  const isOutOfStock = item.inStock === 0;

  return (
    <Container
      to={`/product/${item._id}`}     // <-- use the Link’s `to` prop
      outOfStock={isOutOfStock}
    >
      {isOutOfStock && <OutOfStockLabel>OUT OF STOCK</OutOfStockLabel>}
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon><ShoppingCartOutlined/></Icon>
        <Icon><FavoriteBorderOutlined/></Icon>
      </Info>
    </Container>
  );
}