import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  //cart: []

  cart: [
    {
      pizzaId: 12,
      name: 'Margherita',
      qty: 2,
      unitPrice: 16,
      totalPrice: 32
    }
  ]
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload)
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
    },
    increaseItemQty(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload)
      item.qty++
      item.totalPrice = item.qty * item.unitPrice
    },
    decreaseItemQty(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload)
      if (item.qty > 1) {
        item.qty--
        item.totalPrice = item.qty * item.unitPrice
      }
    },
    clearCart(state) {
      state.cart = []
    },
  }
})

export const {addItem, deleteItem, increaseItemQty, decreaseItemQty, clearCart} = cartSlice.actions

export default cartSlice.reducer