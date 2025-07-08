import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethods";
import styled from "styled-components";
import { clearCart } from "../redux/cartRedux";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const OrderSummary = styled.div`
  margin-top: 20px;
  width: 90%;
  max-width: 600px;
`;

const ProductItem = styled.div`
  margin: 10px 0;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`;

const GoHomeButton = styled.button`
  padding: 10px 20px;
  margin-top: 30px;
  font-weight: bold;
  cursor: pointer;
`;

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = location.state?.paypalData;
  const cart = location.state?.cart;
  const currentUser = useSelector((state) => state.user.currentUser);

  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total,
          address: data?.payer?.address || {},
        });
        setOrderId(res.data._id);
        dispatch(clearCart());
      } catch (err) {
        console.error("Failed to create order", err);
      }
    };

    if (data && cart && currentUser) {
      createOrder();
    }
  }, [cart, data, currentUser, dispatch]);

  return (
    <Container>
      {orderId ? (
        <>
          <h1>Order Created Successfully!</h1>
          <p>Your order number is: <strong>{orderId}</strong></p>

          {data?.payer && (
            <div>
              <p>Payer Name: {data.payer.name.given_name} {data.payer.name.surname}</p>
              <p>Email: {data.payer.email_address}</p>
            </div>
          )}

          <OrderSummary>
            <h3>Order Summary:</h3>
            {cart.products.map((product) => (
              <ProductItem key={product._id}>
                <p><strong>{product.title}</strong></p>
                <p>Quantity: {product.quantity}</p>
                <p>Price per item: R {product.price}</p>
                <p>Total: R {product.price * product.quantity}</p>
              </ProductItem>
            ))}
            <h4>Total Paid: R {cart.total}</h4>
          </OrderSummary>
        </>
      ) : (
        <h1>Success! Your order is being processed...</h1>
      )}
      <GoHomeButton onClick={() => navigate("/")}>
        Go to Homepage
      </GoHomeButton>
    </Container>
  );
};

export default Success;
