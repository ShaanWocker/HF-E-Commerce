import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
  ${mobile({ padding: "0px", flexDirection: "column" })};
`;

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch media images with section 'categories'
        const res = await axios.get("http://localhost:5000/api/media?section=categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories images:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem
          key={item._id}
          item={{
            img: item.img,
            title: item.title,
            cat: item.cat,
          }}
        />
      ))}
    </Container>
  );
};

export default Categories;
