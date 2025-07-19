// src/components/MediaSection.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  display: flex; flex-wrap: wrap; justify-content: space-between; padding: 20px;
`;
const Card = styled(Link)`
  flex: 1; min-width: 280px; height: 350px; margin: 10px;
  position: relative; overflow: hidden; border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-decoration: none;
  color: inherit; transition: all 0.5s ease;
  &:hover img { transform: scale(1.05); }
`;
const Img = styled.img`
  width:100%; height:100%; object-fit:cover; transition:transform 0.5s ease;
`;
const Info = styled.div`
  position:absolute; top:0; left:0; width:100%; height:100%;
  background:rgba(0,0,0,0.3); display:flex; align-items:center;
  justify-content:center; color:white; font-weight:600; font-size:20px;
  opacity:0; transition:opacity 0.5s ease; ${Card}:hover & { opacity:1; }
`;
export default function MediaSection({ section }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    publicRequest.get(`/media?section=${section}`)
      .then(res => setItems(res.data))
      .catch(console.error);
  }, [section]);
  return (
    <Container>
      {items.map(i => {
        let to = "#";
        if (section === "categories" && i.cat) to = `/products/${i.cat}`;
        if (section === "popular"    && i.productId) to = `/product/${i.productId}`;
        return <Card key={i._id} to={to}><Img src={i.img} alt={i.title}/>{section!="slider"&&<Info>{i.title}</Info>}</Card>;
      })}
    </Container>
  )}
