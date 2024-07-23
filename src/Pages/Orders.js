import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const navigate = useNavigate();
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        fetchOrderItems();
    }, []);

    const fetchOrderItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const userID = localStorage.getItem('userID');
            console.log(`Fetching orders for userID: ${userID}`); // Log userID
            const response = await axios.get(`http://localhost:59817/api/Orders/GetOrdersByUserID/${userID}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            });
            console.log('Fetched order items:', response.data); // Log response data
            setOrderItems(response.data);
        } catch (error) {
            if (error.response) {
                console.error('Failed to fetch orders:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
        }
    };

    const handleOrderDetailsClick = (orderID) => {
        localStorage.setItem('OrderID', orderID);
        navigate('/OrderDetails');
    };

    return (
        <>
            <Header />
            <Grid container spacing={3} sx={{ marginTop: 4, marginBottom: 4 }}>
                {orderItems.map(item => (
                    <Grid item key={item.orderID} xs={12} sm={6} md={4}>
                        <Card sx={{
                            boxShadow: 3,
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: 6,
                            },
                        }}>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {item.orderNumber}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: ${item.orderPrice}
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: 'black', color: 'white', marginTop: 2, '&:hover': { backgroundColor: '#333' } }}
                                    onClick={() => handleOrderDetailsClick(item.orderID)}
                                >
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Orders;
