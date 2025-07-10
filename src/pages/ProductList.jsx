import { COLORS, SIZES } from "../data";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from"../responsive";
import { useLocation } from "react-router";
import { useState } from "react";

const Container = styled.div`

`;

const Title = styled.h1`
    margin: 20px;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    margin: 20px;
    ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })};
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px 80px;
    ${mobile({ marginRight: "0px" })};
`;

const Select = styled.select`
    padding: 10px;
    margin: 20px;
    ${mobile({ margin: "10px 0px"})};
`;

const Option = styled.option`

`;

const ProductList = () => {

    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [filter, setFilters] = useState({});
    const [sort, setSort] = useState("newest");

    const handleFilters = (e) => {

        const value = e.target.value;

        setFilters({
            ...filter,
            [e.target.name]: value,
        });
    };

    console.log(filter)

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                        <Select name="color" onChange={handleFilters}>
                            <Option disabled>Color</Option>
                            {COLORS.map((color) => (
                                <Option key={color.toLowerCase()}>{color}</Option>
                            ))}
                            </Select>

                            <Select name="size" onChange={handleFilters}>
                            <Option disabled>Size</Option>
                            {SIZES.map((size) => (
                                <Option key={size}>{size}</Option>
                            ))}
                            </Select>

                    </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                        <Select onChange={e => setSort(e.target.value)}>
                            <Option value="newest">New</Option>
                            <Option value="asc">Price (asc)</Option>
                            <Option value="desc">Price (desc)</Option>
                        </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filter} sort={sort}/>
            <Newsletter/>
            <Footer/>
        </Container>
    );
};

export default ProductList;
