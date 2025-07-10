import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { mobile } from "../responsive";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ padding: "10px" })};
`;

const MediaCard = styled.div`
  flex: 1;
  min-width: 280px;
  margin: 10px;
  height: 350px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 20px;
`;

const PopularMedia = () => {
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/media?section=popular");
        setPopularItems(res.data);
      } catch (err) {
        console.error("Failed to fetch popular media:", err);
      }
    };
    fetchPopular();
  }, []);

  return (
    <Container>
      {popularItems.map((item) => (
        <MediaCard key={item._id}>
          <Image src={item.img} alt={item.title} />
          <Info>{item.title}</Info>
        </MediaCard>
      ))}
    </Container>
  );
};

export default PopularMedia;
