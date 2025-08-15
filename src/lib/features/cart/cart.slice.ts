import { createSlice, current } from "@reduxjs/toolkit";
import { setLocalItem } from "@/utils/helper";
import { CartProduct } from "./types";

const products: CartProduct[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products,
    counter: 0,
    coupon: {
      code: "",
      isApplied: false,
      discountValue: 0,
      discountType: "",
    },
    loading: true,
  },
  reducers: {
    addProduct: (state, action) => {
      const existingProducts = current(state.products);

      const isProductExist = existingProducts.find((product) => product.product_id === action.payload._id);

      if (isProductExist && !isProductExist.is_photo_book && !isProductExist.is_wall_painting) {
        const updatedProducts = existingProducts.map((product) => {
          if (product.product_id === action.payload._id) {
            return { ...product, quantity: product.quantity + 1 };
          }

          return product;
        });

        setLocalItem(updatedProducts, "cart");

        state.products = updatedProducts;

        return;
      } else {
        setLocalItem([...state.products, action.payload], "cart");

        state.products = [...state.products, action.payload];

        state.counter = state.counter + 1;
      }
    },
    removeProduct: (state, action) => {
      let newProducts;

      if (action.payload?.local_id) {
        const currentProduct = state.products.find((product) => product.local_id === action.payload.local_id);

        if (currentProduct && currentProduct.quantity > 1) {
          const updatedProducts = state.products.map((product) => {
            if (product.local_id === action.payload.local_id) {
              return { ...product, quantity: product.quantity - 1 };
            }

            return product;
          });

          setLocalItem(updatedProducts, "cart");

          state.products = updatedProducts;

          return;
        } else {
          newProducts = state.products.filter((product) => product.local_id !== action.payload.local_id);

          // reduce cart counter

          state.counter = state.counter - 1;
        }
      } else {
        const currentProduct = state.products.find((product) => product._id === action.payload._id);

        if (currentProduct && currentProduct.quantity > 1) {
          const updatedProducts = state.products.map((product) => {
            if (product._id === action.payload._id) {
              return { ...product, quantity: product.quantity - 1 };
            }

            return product;
          });

          setLocalItem(updatedProducts, "cart");

          state.products = updatedProducts;

          return;
        } else {
          newProducts = state.products.filter((product) => product._id !== action.payload._id);

          // reduce cart counter

          state.counter = state.counter - 1;
        }
      }
      setLocalItem(newProducts, "cart");
      state.products = newProducts;
    },
    addUserProducts: (state, action) => {
      state.products = action.payload;
    },
    initializeCart: (state, action) => {
      state.products = action.payload;
      state.counter = action.payload.length;
    },
    updateCartCounter: (state, action) => {
      state.counter = action.payload;
    },
    setLoadingCart: (state, action) => {
      state.loading = action.payload;
    },

     // Add a new reducer to handle coupon state
    setCoupon: (state, action) => {
      state.coupon = action.payload;
    },
    
    // Add a reducer to clear coupon
    clearCoupon: (state) => {
      state.coupon = {
        code: "",
        isApplied: false,
        discountValue: 0,
        discountType: "",
      };
    }
  },
});

export const cartReducer = cartSlice.reducer;

export const { addProduct, removeProduct, addUserProducts, initializeCart, updateCartCounter, setLoadingCart, setCoupon, clearCoupon } = cartSlice.actions;
