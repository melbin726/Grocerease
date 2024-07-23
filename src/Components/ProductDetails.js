// src/Components/ProductDetails.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ProductDetails = ({ open, onClose, description, imageUrl, publishedTime,productName }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>  
                    {productName}
                </DialogTitle>
            <DialogContent>
                {imageUrl && (
                    <img src={imageUrl} alt="Product" style={{ width: '300px', height: '300px', marginBottom: '20px' }} />
                )}
                <Typography variant="body1" gutterBottom>
                    {description}
                </Typography>
                {publishedTime && (
                    <Typography variant="body2" color="textSecondary">
                        Published on: {new Date(publishedTime).toLocaleDateString()}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductDetails;
