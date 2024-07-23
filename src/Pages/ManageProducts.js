import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import Header from '../Components/Header';
const ManageProducts = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const yourtoken = localStorage.getItem('token');
            const response = await axios.post('http://localhost:59817/api/Products/CreateProduct', {
                ProductID:'',
                ProductName: productName,
                ProductPrice: productPrice,
                productQuantity: 1,
                isActive: true,
                isDeleted: false
            }, {
                headers: {
                    authorization: `Bearer ${yourtoken}`,
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            });
            console.log('Added successfully:', response.data);

            navigate('/Home');
        } catch (error) {
            if (error.response) {
                setError('Add failed: ' + error.response.data.title);
                console.error('Add failed:', error.response.data);
            } else if (error.request) {
                setError('No response received from server.');
                console.error('No response received:', error.request);
            } else {
                setError('Error setting up request: ' + error.message);
                console.error('Error setting up request:', error.message);
            }
        }
    };

    return (
        < >
        <Header/>
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Add Product
                </Typography>
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Product Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="productprice"
                        label="Product Price"
                        name="productprice"
                        autoComplete="price"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ backgroundColor: 'black', color: 'white', mt: 2 }}
                       
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Container>
        </>
    );
};

export default ManageProducts;
