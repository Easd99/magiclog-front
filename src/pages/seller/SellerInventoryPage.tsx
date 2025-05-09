import React, {useEffect, useState} from 'react';
import {Table, Button, Row, Col,} from 'react-bootstrap';
import {productService} from "../../services/product.service";
import {useNavigate} from 'react-router-dom';
import MainLayout from "../../components/MainLayout";


interface Product {
    id: number;
    name: string;
    sku: string;
    quantity: number;
    price: number;
}

const SellerInventoryPage: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);

    const token = localStorage.getItem('token');

    const fetchProducts = async () => {
        const response = await productService.getProductsSeller();
        setProducts(response);
    };

    const handleDelete = async (id: number) => {

        await productService.deleteProduct(id);

        fetchProducts()
    };


    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <MainLayout>
            <div className="flex-grow-1 p-4">
                <Row className="justify-content-end mb-3">
                    <Col xs={12} md={3} lg={2}>
                        <div className="d-flex justify-content-end">
                            <Button variant="outline-secondary" onClick={() => navigate('/products/seller/create')}>
                                CREAR
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Table bordered hover>
                    <thead>
                    <tr>
                        <th>Nombre del producto</th>
                        <th>SKU</th>
                        <th>Cantidad</th>
                        <th>Price</th>
                        <th className="text-end">...</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.sku}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                            <td className="text-end">
                                <button
                                    className="btn btn-link btn-sm text-primary me-2"
                                    onClick={() => navigate(`/products/seller/edit/${product.id}`)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-link btn-sm text-danger"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Eliminar
                                </button>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </MainLayout>
    );
};

export default SellerInventoryPage;
