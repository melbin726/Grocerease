import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper, Grid } from '@mui/material';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/footer';

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
                ProductID: '',
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
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Container component="main" maxWidth="md" sx={{ flexGrow: 1 }}>
                <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
                                    Add Product
                                </Typography>
                                {error && (
                                    <Typography color="error" sx={{ mt: 2 }}>
                                        {error}
                                    </Typography>
                                )}
                                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
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
                                        Add
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                }}
                            >
                                <img
                                    src={`${process.env.PUBLIC_URL}/Untitled_design-removebg-previeww.png`}
                                    alt="Product Illustration"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <Footer />
        </div>
    );
};

export default ManageProducts;
