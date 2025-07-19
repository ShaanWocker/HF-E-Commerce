import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover img {
    transform: scale(1.1);
    opacity: 0.8;
  }

  &:hover ${'' /* overlay effect */} div {
    background-color: rgba(0, 0, 0, 0.2);
  }

  &:hover button {
    transform: scale(1.05);
    background-color: black;
    color: white;
  }

  ${mobile({ height: "30vh" })};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  transition: all 0.5s ease;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  transition: opacity 0.5s ease;
`;

const Button = styled.button`
  ...
  opacity: 0.9;

  ${Container}:hover & {
    opacity: 1;
  }
`;



const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat || ""}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
