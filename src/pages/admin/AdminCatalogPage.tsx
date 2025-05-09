import React, {useEffect, useState} from 'react';
import {Row, Col, Form, Card, Button, Badge} from 'react-bootstrap';
import {productService} from "../../services/product.service";
import MainLayout from "../../components/MainLayout";

interface Product {
    id: number;
    name: string;
    sku: string;
    price: number;
    user?: User;
    imageURL?: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

const AdminCatalogPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [vendors, setVendors] = useState<User[]>([]);
    const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await productService.getProductsAdmin();
        setProducts(response);

        // Obtener lista de proveedores únicos por ID
        const vendorMap = new Map<number, User>();
        response.forEach((product: Product) => {
            if (product.user && !vendorMap.has(product.user.id)) {
                vendorMap.set(product.user.id, product.user);
            }
        });

        setVendors(Array.from(vendorMap.values()));
    };

    const toggleVendor = (vendor: string) => {
        if (selectedVendors.includes(vendor)) {
            setSelectedVendors(selectedVendors.filter(v => v !== vendor));
        } else {
            setSelectedVendors([...selectedVendors, vendor]);
        }
    };

    const clearFilters = () => {
        setSelectedVendors([]);
    };

    const filteredProducts = selectedVendors.length === 0
        ? products
        : products.filter((p) => selectedVendors.includes(p.user?.email || ''));

    return (
        <MainLayout>
            <div className="flex-grow-1 p-4">
                {selectedVendors.length > 0 && (
                    <div className="mb-3">
                        {selectedVendors.map((vendor) => (
                            <Badge
                                key={vendor}
                                bg="light"
                                text="dark"
                                className="me-2 border"
                                style={{cursor: 'pointer'}}
                                onClick={() => toggleVendor(vendor)}
                            >
                                {vendor} &times;
                            </Badge>
                        ))}
                    </div>
                )}

                <Row>
                    <Col xs={12} md={3} lg={2} className="mb-4">
                        <div className="bg-light p-3 border rounded">
                            <h6>Filtros</h6>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span>Proveedor</span>
                                <Button variant="link" size="sm" onClick={clearFilters} className="p-0">
                                    Borrar
                                </Button>
                            </div>
                            {vendors.map((x) => (
                                <Form.Check
                                    key={x.id}
                                    type="checkbox"
                                    label={x.email}
                                    checked={selectedVendors.includes(x.email)}
                                    onChange={() => toggleVendor(x.email)}
                                    className="mb-2"
                                />
                            ))}
                        </div>
                    </Col>

                    <Col xs={12} md={9} lg={10}>
                        <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
                            {filteredProducts.map((product) => (
                                <Col key={product.id}>
                                    <Card className="text-center">
                                        <Card.Body>
                                            {
                                                product.imageURL ? (
                                                    <Card.Img
                                                        variant="top"
                                                        src={product.imageURL}
                                                        alt={product.name}
                                                        style={{
                                                            width: '80%',
                                                            height: '120px',
                                                            objectFit: 'cover',
                                                            marginBottom: '1rem',
                                                        }}
                                                    />
                                                ) : (
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            height: '120px',
                                                            backgroundColor: '#f0f0f0',
                                                            marginBottom: '1rem',
                                                        }}
                                                    />
                                                )
                                            }
                                            <Card.Title>{product.name}</Card.Title>
                                            <Card.Text>{product.sku}</Card.Text>
                                            <Card.Text className="fw-bold">
                                                ${product.price.toFixed(2)}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </div>
        </MainLayout>
    );
};

export default AdminCatalogPage;
