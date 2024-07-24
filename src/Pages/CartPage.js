import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button ,Box} from '@mui/material';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/footer'

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate(); 

    


    useEffect(() => {
        fetchCartItems();

       

    }, []);

    const fetchCartItems = () => {
        const userId = localStorage.getItem('userID');
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:59817/api/Cart/ViewCart/${userId}`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setCartItems(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the cart items!', error);
        });
    };







    const handleRemoveFromCart = (item) => {
        try {
            const yourtoken = localStorage.getItem('token');
            const response = axios.delete('http://localhost:59817/api/Cart/RemoveFromCart/'+item.cartID, {
                headers: {
                    authorization: `Bearer ${yourtoken}`,
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            })
            .then(response => {
               
                alert('Item deleted successfully');
                console.log('deleted successfully:', response.data);
                fetchCartItems();


                

            });
           
        } catch (error) {
            if (error.response) {
                console.error('Add failed:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
        }
    };
    


    const handleOrder = () => {
        try {
            const yourtoken = localStorage.getItem('token');
            const userID = localStorage.getItem('userID');
            const response = axios.post('http://localhost:59817/api/Orders/PlaceOrder', {
                
                orderID: '',
                userID: userID,
                orderNumber :'',
                orderDate: '2000-01-01',
                isDeleted: false
            }, {
                headers: {
                    authorization: `Bearer ${yourtoken}`,
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            })
            .then(response => {
                alert('Order successfull');
                console.log('ordered successfully:', response.data); 
                navigate('/Orders');  
            });
           
        } catch (error) {
            if (error.response) {
                console.error('Add failed:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
        }
    };


    return (
        <>
            <Header />
            <Grid container spacing={3} sx={{ marginTop: 4, marginBottom: 4 }}>
                {cartItems.map(item => (
                    <Grid item key={item.CartID} xs={12} sm={6} md={4}>
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
                                    {item.productName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Quantity: {item.quantity}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: ${item.productPrice}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                     <Button 
                                        variant="contained" 
                                        sx={{ 
                                            backgroundColor: 'black', 
                                            color: 'white', 
                                            '&:hover': { backgroundColor: '#333' }, 
                                            width: { xs: '100%', sm: '45%', md: '45%' },
                                            mr: 1,
                                        }}
                                        onClick={() => handleRemoveFromCart(item)}
                                    >
                                        Remove
                                    </Button>
                                   
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                <Grid item xs={12} display="flex" justifyContent="center">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ 
                            backgroundColor: 'black', 
                            color: 'white', 
                            mt: 2, 
                            width: { xs: '100%', sm: '50%', md: '25%' } 
                        }}
                        onClick={handleOrder}
                    >
                        Confirm Order
                    </Button>
                    
                </Grid>
            </Grid>
            <Footer />
           
        </>

       
        
    );
};

export default CartPage;
