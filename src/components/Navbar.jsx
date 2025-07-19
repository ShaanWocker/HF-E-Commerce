import React, { useState, useEffect, useRef } from "react";
import { Search, ShoppingCartOutlined, Delete } from "@material-ui/icons";
import styled from "styled-components";
import { Badge } from "@material-ui/core";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import { logoutStart } from "../redux/userRedux";
import {
  clearCart,
  removeProduct
} from "../redux/cartRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 10px", flexDirection: "column", alignItems: "flex-start" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ width: "100%", marginBottom: "10px" })};
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })};
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "100px" })};
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ width: "100%", textAlign: "left" })};
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "20px" })};
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  ${mobile({ flexWrap: "wrap", justifyContent: "flex-start", gap: "5px", width: "100%" })};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 15px;
  padding: 5px 10px;
  border: 1px solid teal;
  border-radius: 5px;
  transition: all 0.3s ease;
  &:hover {
    background-color: teal;
    color: white;
  }
  ${mobile({ fontSize: "12px", marginLeft: "0" })};
`;

const CartWrapper = styled.div`
  position: relative;
`;

const CartDropdown = styled.div`
  opacity: ${(props) => (props.open ? 1 : 0)};
  transform: translateY(${(props) => (props.open ? "0" : "-10px")});
  pointer-events: ${(props) => (props.open ? "auto" : "none")};
  position: absolute;
  top: 35px;
  right: 0;
  width: 280px;
  background-color: white;
  border: 1px solid lightgray;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: 10px;
  font-size: 14px;
  color: black;
  transition: all 0.3s ease-in-out;
  ${mobile({ width: "90vw", right: "0" })};
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CartImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin-right: 10px;
`;

const MiniCartButton = styled.button`
  margin-top: 10px;
  padding: 8px;
  width: 100%;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-weight: bold;
`;

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const total = useSelector((state) => state.cart.total);
  const cartProducts = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout()(dispatch);
    dispatch(logoutStart());
    dispatch(clearCart());
    navigate("/");
  };

  const handleRemoveItem = (id) => {
    dispatch(removeProduct(id));
  };

  const itemCount = cartProducts.length;

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>HONEY FLORAL</Logo>
        </Center>
        <Right>
          {user ? (
            <>
              <MenuItem style={{ fontWeight: 500, color: "#444", border: "none" }}>
                Hello, {user?.username || "User"}
              </MenuItem>
              <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
            </>
          ) : (
            <>
              <StyledLink to="/register"><MenuItem>REGISTER</MenuItem></StyledLink>
              <StyledLink to="/login"><MenuItem>SIGN IN</MenuItem></StyledLink>
            </>
          )}

          <CartWrapper ref={dropdownRef}>
            <MenuItem style={{ border: "none" }} onClick={() => setDropdownOpen(!dropdownOpen)}>
              <Badge badgeContent={itemCount} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
            <CartDropdown open={dropdownOpen}>
              {cartProducts.length > 0 ? (
                <>
                  {cartProducts.map((item) => (
                    <CartItem key={item._id}>
                      <CartImage src={item.img} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500 }}>{item.title}</div>
                        <div>Qty: {item.quantity}</div>
                      </div>
                      <Delete onClick={() => handleRemoveItem(item._id)} style={{ cursor: "pointer" }} />
                    </CartItem>
                  ))}
                  <div style={{ fontWeight: "bold", marginTop: "5px" }}>Total: R {total}</div>
                  <MiniCartButton onClick={() => navigate("/cart")}>Go to Cart</MiniCartButton>
                </>
              ) : (
                <div>Your cart is empty.</div>
              )}
            </CartDropdown>
          </CartWrapper>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
