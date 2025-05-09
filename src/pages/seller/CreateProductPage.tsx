import React, {useEffect, useState} from 'react';
import {Button, Form, Alert} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import {productService} from "../../services/product.service";
import Sidebar from "../../components/sidebar";

interface Product {
    id: number;
    name: string;
    sku: string;
    quantity: number;
    price: number;
    imageURL?: string;
}

const CreateProductPage: React.FC = () => {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                const product: Product = await productService.getProductById(Number(id));
                setName(product.name);
                setSku(product.sku);
                setQuantity(product.quantity);
                setPrice(product.price);
                setPreviewUrl(product.imageURL || null);
            };
            fetchProduct();
        }
    }, [id]);

    const handleSubmit = async () => {
        try {
            if (id) {
                await productService.updateProduct(Number(id), {
                    name,
                    sku,
                    quantity,
                    price,
                    image: imageFile
                });
            } else {
                await productService.createProduct({
                    name,
                    sku,
                    quantity,
                    price,
                    image: imageFile
                });
            }
            navigate('/products/seller');
        } catch (err: any) {
            setError(err.message);
        }
    };


    return (
        <div className="d-flex vh-100">
            <Sidebar/>
            <div className="flex-grow-1 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <Button variant="link" onClick={() => navigate(-1)} className="p-0">
                        ← Regresar
                    </Button>
                    <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-person-circle fs-4"></i>
                        <span>{}</span>
                    </div>
                </div>

                <div style={{maxWidth: '400px', margin: '0 auto'}}>
                    <h4 className="mb-4">Crear producto</h4>

                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label>Imagen (archivo)</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = (e.target as HTMLInputElement).files?.[0];
                                    if (file) {
                                        setImageFile(file);
                                        setPreviewUrl(URL.createObjectURL(file));
                                    }
                                }}
                            />
                            {previewUrl && (
                                <div className="mt-3 text-center">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        style={{
                                            width: '100%',
                                            maxHeight: '150px',
                                            objectFit: 'cover',
                                            borderRadius: '4px'
                                        }}
                                    />
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className={sku.trim() === '' ? 'text-danger' : ''}>SKU</Form.Label>
                            <Form.Control
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                                isInvalid={!sku.trim()}
                            />
                            <Form.Control.Feedback type="invalid">
                                Este campo no puede quedar vacío
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                min={0}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Precio</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <Form.Control
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    min={0}
                                    step="0.01"
                                />
                            </div>
                        </Form.Group>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Button onClick={handleSubmit} variant="outline-secondary" className="w-100">
                            {id ? 'Actualizar' : 'Crear'}
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default CreateProductPage;
