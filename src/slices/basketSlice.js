import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {

      const item = {...action.payload}
      const itemIndex = state.items.findIndex(({id}) => id === item.id)
      if (itemIndex === -1) {
        item.count = 1
        state.items = [
          ...state.items,
          item
        ]
      } else {
        state.items[itemIndex].count++
      }

   
    },
    removeOneFromBasket: (state, action) => {
      const {id} = action.payload
      const itemIndex = state.items.findIndex(({id: itemId}) => itemId === id)
      if (state.items[itemIndex].count <= 1) {
       state.items = state.items.filter((_, index) => index !== itemIndex)
      } else {
        state.items[itemIndex].count--
      }
      
    },
    removeAllFromBasket: (state, action) => {
      const {id} = action.payload
      state.items = state.items
      .filter(({id: itemId}) => itemId !== id)
    }
  },
});

export const { addToBasket, removeOneFromBasket, removeAllFromBasket } = basketSlice.actions;


export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total, {price, count}) => {
  total += price * count
  return total
}, 0)

export default basketSlice.reducer;
