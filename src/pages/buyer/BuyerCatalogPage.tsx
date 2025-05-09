import React, {useEffect, useState} from 'react';
import {Row, Col, Form, Card, Button} from 'react-bootstrap';
import {productService} from "../../services/product.service";
import MainLayout from "../../components/MainLayout";

interface Product {
    id: number;
    name: string;
    sku: string;
    price: number;
    imageURL?: string;
}

const BuyerCatalogPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState('');
    const [priceFilter, setPriceFilter] = useState(670); // valor máximo del slider
    const [maxPrice, setMaxPrice] = useState(670);


    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await productService.getProducts();
            setProducts(response);
            const max = Math.max(...response.map((p: Product) => p.price));
            setMaxPrice(max);
            setPriceFilter(max);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const filtered = products.filter(
        (p) =>
            (p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.sku.toLowerCase().includes(search.toLowerCase())) &&
            p.price <= priceFilter
    );

    return (

        <MainLayout>
            <div className="flex-grow-1 p-4">
                {/* Filtro por nombre o SKU */}
                <Form.Control
                    type="text"
                    placeholder="Buscar por nombre o SKU"
                    className="mb-4"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Row>
                    {/* Col izquierda: Filtros de precio */}
                    <Col xs={12} md={3} lg={2}>
                        <div className="bg-light p-3 border rounded mb-4">
                            <h6 className="mb-3">Filtros</h6>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span>Precios</span>
                                <Button
                                    variant="link"
                                    size="sm"
                                    onClick={() => setPriceFilter(maxPrice)}
                                    className="p-0"
                                >
                                    Borrar
                                </Button>
                            </div>
                            <Form.Range
                                min={120}
                                max={maxPrice}
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(Number(e.target.value))}
                            />
                            <div className="d-flex justify-content-between">
                                <span>$120</span>
                                <span className="text-primary">${priceFilter}</span>
                            </div>
                        </div>
                    </Col>

                    {/* Col derecha: Productos */}
                    <Col xs={12} md={9} lg={10}>
                        <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
                            {filtered.map((product) => (
                                <Col key={product.id}>
                                    <Card className="text-center">
                                        <Card.Body>
                                            {product.imageURL ? (
                                                <Card.Img
                                                    variant="top"
                                                    src={product.imageURL}
                                                    alt={product.name}
                                                    style={{height: '120px', objectFit: 'cover'}}
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
                                            )}
                                            <Card.Title>{product.name}</Card.Title>
                                            <Card.Text>{product.sku}</Card.Text>
                                            <Card.Text className="fw-bold">${product.price.toFixed(2)}</Card.Text>
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

export default BuyerCatalogPage;
