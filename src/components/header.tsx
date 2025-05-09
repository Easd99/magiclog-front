import React from 'react';
import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userName = token ? JSON.parse(atob(token.split('.')[1])).name : null;

    return (
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h5>Catálogo de productos</h5>

            {token && userName ? (
                <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-person-circle fs-4"></i>
                        <span>{userName}</span>
                    </div>
                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => {
                            localStorage.removeItem('token');
                            window.location.href = '/Login';
                        }}
                    >
                        Cerrar sesión
                    </Button>
                </div>
            ) : (
                <Button variant="outline-secondary" onClick={() => navigate('/Login')}>
                    Iniciar sesión
                </Button>
            )}
        </div>
    );
};

export default Header;
