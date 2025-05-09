import api from './api';
import {ERROR_TRANSLATIONS} from "../constants/errorMessages";

interface ProductDto {
    id: number;
    name: string;
    SKU: string;
    price: number;
    imageUrl: string;
}

interface ProductCreateDto {
    name: string;
    sku: string;
    quantity: number;
    price: number;
    image?: File | null;
}

interface ProductUpdateDto {
    name?: string;
    sku?: string;
    quantity?: number;
    price?: number;
    image?: File | null;
}

export const productService = {

    getProductById: async (id: number) => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (e) {
            throw new Error('Error al obtener el producto');
        }
    },

    getProducts: async () => {
        const token = localStorage.getItem('token');
        const response = await api.get('/products/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },

    getProductsAdmin: async () => {

        const filters = {
            fetchUser: true,
        };

        const token = localStorage.getItem('token');
        const response = await api.get('/products/admin', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: filters,

        });
        return response.data;
    },

    getProductsSeller: async () => {
        const filters = {
            fetchUser: true,
        };
        const token = localStorage.getItem('token');
        const response = await api.get('/products/seller', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: filters,
        });
        return response.data;
    },

    createProduct: async (product: ProductCreateDto) => {
        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('sku', product.sku);
            formData.append('quantity', product.quantity.toString());
            formData.append('price', product.price.toString());
            if (product.image) {
                formData.append('image', product.image);
            }
            const token = localStorage.getItem('token');
            const response = await api.post('/products', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            return response.data;
        } catch (err: any) {
            const backendMessage = err.response?.data?.message || 'Error desconocido';
            const translated = ERROR_TRANSLATIONS[backendMessage] || backendMessage;
            throw new Error(translated);
        }
    },

    deleteProduct: async (id: number) => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.delete(`/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err: any) {
            const backendMessage = err.response?.data?.message || 'Error desconocido';
            const translated = ERROR_TRANSLATIONS[backendMessage] || backendMessage;
            throw new Error(translated);
        }
    },

    updateProduct: async (id: number, product: ProductUpdateDto) => {
        try {
            const formData = new FormData();
            if (product.name) {
                formData.append('name', product.name);
            }
            if (product.sku) {
                formData.append('sku', product.sku);
            }
            if (product.quantity) {
                formData.append('quantity', product.quantity.toString());
            }
            if (product.price) {
                formData.append('price', product.price.toString());
            }
            if (product.image) {
                formData.append('image', product.image);
            }
            const token = localStorage.getItem('token');
            const response = await api.patch(`/products/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            return response.data;
        } catch (err: any) {
            const backendMessage = err.response?.data?.message || 'Error desconocido';
            const translated = ERROR_TRANSLATIONS[backendMessage] || backendMessage;
            throw new Error(translated);
        }
    }

};
