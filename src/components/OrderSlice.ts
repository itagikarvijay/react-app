import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { placeOrder } from '../thunks/OrderThunk';

interface OrderDetails {
    productId: number;
    quantity: number;
    price: number;
}

interface OrderState {
    id: number | null;
    OrderDetails: OrderDetails | null;
    loading: boolean;
    error: string | null;
    login: boolean;
}

const initialState: OrderState = {
    id: null as number | null,
    OrderDetails: null as OrderDetails | null,
    loading: false,
    error: null as string | null,
    login: false
};

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        order: (state, action: PayloadAction<OrderState>) => {
            console.log('Order updated:', action.payload);
            state.id = action.payload.id;
            state.OrderDetails = action.payload.OrderDetails;
            state.loading = action.payload.loading;
            state.error = action.payload.error;
            state.login = action.payload.login;
        }
    },
    extraReducers: (builder) => {
        // You can add extra reducers here if needed
        builder
        .addCase(placeOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(placeOrder.fulfilled, (state, action: PayloadAction<OrderState>) => {
            console.log('Order placing:', action.payload);
            state.loading = false;
            state.id = action.payload.id;
            state.OrderDetails = action.payload.OrderDetails;
            state.error = null;
        })
        .addCase(placeOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});


export const { order } = orderSlice.actions;
export default orderSlice.reducer;