import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button, IconButton, TextField ,Box,Dialog, DialogContent, DialogActions} from '@mui/material';
import Header from '../Components/Header';
import ProductDetails from '../Components/ProductDetails';
import { Visibility } from '@mui/icons-material';
import Footer from '../Components/footer';

const GroceryItemList = () => {
    const [items, setItems] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [publishedTime, setPublishedTime] = useState('');
    const [description, setDescription] = useState('');
    const [open, setOpen] = useState(false);
    const [productName, setProductName] = useState('');
   
/*
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = () => {
        const yourtoken = localStorage.getItem('token');
        axios.get('http://localhost:59817/api/Products/GetAllProducts', {
            headers: {
                authorization: `Bearer ${yourtoken}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                const itemsWithQuantity = response.data.map(item => ({ ...item, quantity: 1 }));
                setItems(itemsWithQuantity);
            })
            .catch(error => {
                console.error('There was an error fetching the grocery items!', error);
            });
    };
*/

//added start

useEffect(() => {
    const dummyData = [
        { productID: 1, productName: 'Apple', productPrice: 2, quantity: 1 },
        { productID: 2, productName: 'Banana', productPrice: 1, quantity: 1 },
        { productID: 3, productName: 'Carrot', productPrice: 3, quantity: 1 },
        { productID: 4, productName: 'Orenge', productPrice: 4, quantity: 1},
        { productID: 5, productName: 'Apple', productPrice: 8, quantity: 1},
        { productID: 6, productName: 'Fish', productPrice: 3, quantity: 1 },
        { productID: 3, productName: 'Carrot', productPrice: 3, quantity: 1 },
        { productID: 3, productName: 'Carrot', productPrice: 3, quantity: 1 },  
    ];
    setItems(dummyData);
}, []);

// added end



    const handleQuantityChange = (e, item) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            const newQuantity = value === '' ? '' : parseInt(value, 10);
            const updatedItems = items.map(i => 
                i.productID === item.productID ? { ...i, quantity: newQuantity } : i
            );
            setItems(updatedItems);
        }
    };
/*
    const handleAddToCart = (item) => {
        try {
            const yourtoken = localStorage.getItem('token');
            const userID = localStorage.getItem('userID');
            const response = axios.post('http://localhost:59817/api/Cart/AddToCart', {
                cartID: '',
                userID: userID,
                productName: item.productName,
                productPrice : item.productPrice * item.quantity,
                quantity: item.quantity,
                isDeleted: false
            }, {
                headers: {
                    authorization: `Bearer ${yourtoken}`,
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            })
            .then(response => {
                alert('item added to Cart');
                console.log('Added successfully:', response.data);  
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
    */



//added start
const handleAddToCart = (item) => {
    alert(`${item.productName} added to Cart with quantity ${item.quantity}`);
};

//added end




    const handleViewDetails = (item) => {
        axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCGFxS48OT3QFtIIw8cSqdBt-IGd5eMmE0&cx=6639f09a4643541c4&q=what is the vegitable ${item.productName}`)
            .then(response => {
                if (response.data.items && response.data.items.length > 0) {
                    const snippet = response.data.items[0].snippet;
                    const metatags = response.data.items[0].pagemap.metatags[0];
                    const ogImage = metatags['og:image'];
                    const publishedTime = metatags['article:published_time'];

                    setDescription(snippet);
                    setImageUrl(ogImage);
                    setPublishedTime(publishedTime);
                    setProductName(item.productName);
                } else {
                    setDescription('Description not found.');
                    setImageUrl('');
                    setPublishedTime('');
                    setProductName('');
                }
                setOpen(true);
            })
            .catch(error => {
                console.error('There was an error fetching the product description!', error);
                setDescription('Error fetching description.');
                setImageUrl('');
                setPublishedTime('');
                setOpen(true);
            });
    };

    const handleClose = () => {
        setOpen(false);
        setDescription('');
        setImageUrl('');
        setPublishedTime('');
        setProductName('');
    };



    

    return (
        <>
        <Header />
        <Box sx={{ padding: 4, backgroundColor: '#f9f9f9' }}>
            <Grid container spacing={3}>
                {items.map(item => (
                    <Grid item key={item.productID} xs={12} sm={6} md={4}>
                        <Card sx={{
                            boxShadow: 3,
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: 6,
                            },
                            backgroundColor: '#ffffff',
                            padding: 2,
                            borderRadius: '10px'
                        }}>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img src={item.imageUrl} alt={item.productName} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px' }} />
                                <Typography gutterBottom variant="h6" component="div" sx={{ marginTop: 2, fontWeight: 'bold' }}>
                                    {item.productName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: ${item.productPrice}
                                </Typography>
                                <TextField
                                    margin="normal"
                                    id="quantity"
                                    label="Quantity"
                                    name="quantity"
                                    autoComplete="off"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(e, item)}
                                    InputProps={{
                                        inputProps: {
                                            style: { maxWidth: '50px' }
                                        }
                                    }}
                                    sx={{ marginTop: 2 }}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                                    <Button 
                                        variant="contained" 
                                        sx={{ backgroundColor: 'black', color: 'white', marginRight: 2, '&:hover': { backgroundColor: '#333' } }}
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        Add to Cart
                                    </Button>
                                    <IconButton 
                                        aria-label="view details" 
                                        sx={{ color: 'black' }}
                                        onClick={() => handleViewDetails(item)}
                                    >
                                        <Visibility />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
        <Footer />
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                    {productName}
                </Typography>
                {imageUrl && (
                    <img src={imageUrl} alt={productName} style={{ width: '100%', height: 'auto', marginBottom: 2 }} />
                )}
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
                    {description}
                </Typography>
                {publishedTime && (
                    <Typography variant="caption" color="text.secondary">
                        Published on: {publishedTime}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#333' } }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </>
);
};

export default GroceryItemList;