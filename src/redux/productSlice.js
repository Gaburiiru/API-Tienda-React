import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  title: null,
  price: null,
  description: null,
  category: null,
  image: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { id, title, price, description, category, image } = action.payload;
      state.id = id;
      state.title = title;
      state.price = price;
      state.description = description;
      state.category = category;
      state.image = image;
    },
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
