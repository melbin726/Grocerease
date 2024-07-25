import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import Header from '../Components/Header';
import Footer from '../Components/footer'

const OrderDetails = () => {
    const navigate = useNavigate(); 
    const [orderDetails, setOrderDetails] = useState([]);
    const [orderNumber, setOrderNumber] = useState('');

    useEffect(() => {
        const orderID = localStorage.getItem('OrderID');
        fetchOrder(orderID);
        fetchOrderDetails(orderID);
    }, []);

    const fetchOrder = async (orderID) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:59817/api/Orders/GetOrderByOrderID/${orderID}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setOrderNumber(response.data.orderNumber);
        } catch (error) {
            console.error('There was an error fetching the order details!', error);
        }
    };

    const fetchOrderDetails = async (orderID) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:59817/api/Orders/GetOrderDetailsByOrderID/${orderID}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setOrderDetails(response.data);
        } catch (error) {
            console.error('There was an error fetching the order details!', error);
        }
    };

    const handleExport = async () => {
        try {
            const token = localStorage.getItem('token');
            const orderID = localStorage.getItem('OrderID');
            const response = await axios.get(`http://localhost:59817/api/Orders/ExportOrder/${orderID}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                responseType: 'blob'
            });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.click();
        } catch (error) {
            console.error('There was an error exporting the order details!', error);
        }
    };

    if (!orderDetails.length) {
        return (
            <>
                <Header />
                <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 4 }}>
                    Loading order details...
                </Typography>
            </>
        );
    }

    return (
        <>
            <Header />
            <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Order number: {orderNumber}
                </Typography>
            </Box>
            <Grid container spacing={3} sx={{ marginTop: 2, paddingLeft: 2, paddingRight: 2 }}>
                {orderDetails.map(detail => (
                    <Grid item key={detail.orderDetailsID} xs={12} md={6}>
                        <Card sx={{
                            boxShadow: 3,
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: 6,
                            },
                        }}>
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    {detail.productName}
                                </Typography>
                                <Typography variant="body1">
                                    Price: ${detail.productPrice}
                                </Typography>
                                <Typography variant="body2">
                                    Quantity: {detail.quantity}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                <Button
                    variant="contained"
                    sx={{ 
                        backgroundColor: 'black', 
                        color: 'white', 
                        '&:hover': { backgroundColor: '#333' } 
                    }}
                    onClick={handleExport}
                >
                    Export to PDF
                </Button>
            </Box>
            <Footer/>
        </>
    );
};

export default OrderDetails;
