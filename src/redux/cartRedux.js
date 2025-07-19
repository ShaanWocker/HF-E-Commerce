import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
  const existingProduct = state.products.find(
    (item) =>
      item._id === action.payload._id &&
      item.color === action.payload.color &&
      item.size === action.payload.size
  );

  if (existingProduct) {
    existingProduct.quantity += action.payload.quantity;
  } else {
    // Ensure you push the full product details
    state.products.push({
      _id: action.payload._id,
      title: action.payload.title,
      price: action.payload.price,
      img: action.payload.img,
      color: action.payload.color,
      size: action.payload.size,
      quantity: action.payload.quantity,
      stock: action.payload.stock,
    });
    }
    state.quantity = state.products.reduce((sum, item) => sum + item.quantity, 0);
    state.total = state.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    removeProduct: (state, action) => {
      const productToRemove = state.products.find((p) => p._id === action.payload);
      if (productToRemove) {
        state.products = state.products.filter((p) => p._id !== action.payload);
        state.quantity -= 1;
        state.total -= productToRemove.price * productToRemove.quantity;
      }
    },
    increaseQuantity: (state, action) => {
    const product = state.products.find(
        (item) =>
        item._id === action.payload._id &&
        item.color === action.payload.color &&
        item.size === action.payload.size
    );
    if (product && product.quantity < product.stock) {
        product.quantity += 1;
    }
    state.quantity = state.products.reduce((sum, item) => sum + item.quantity, 0);
    state.total = state.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },

    decreaseQuantity: (state, action) => {
    const product = state.products.find(
        (item) =>
        item._id === action.payload._id &&
        item.color === action.payload.color &&
        item.size === action.payload.size
    );
    if (product && product.quantity > 1) {
        product.quantity -= 1;
    }
    state.quantity = state.products.reduce((sum, item) => sum + item.quantity, 0);
    state.total = state.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  },
});

export const {
  addProduct,
  clearCart,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
