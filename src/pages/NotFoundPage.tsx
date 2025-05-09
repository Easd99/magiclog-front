import React from 'react';
import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
            <h1 className="display-4">404</h1>
            <p className="lead">La página que buscas no existe.</p>
            <Button variant="outline-secondary" onClick={() => navigate('/products')}>
                Ir al inicio
            </Button>
        </div>
    );
};

export default NotFoundPage;
