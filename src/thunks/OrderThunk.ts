import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async (accessToken: string, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/createOrder', {
                id: 1,
                name: "Laptop",
                quantity: 12,
                unitPrice: 11235.54,
                supplier: {
                    id: 1,
                    name: "Dell",
                    city: "Mumbai",
                    contactName: "Rakesh",
                    phone: "7979797979",
                    country: "India",
                    address: "Bangalore"
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log('Order placed successfully:', response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to place order');
        }
    });