import React from 'react';
import {Button, Container} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userName = token ? JSON.parse(atob(token.split('.')[1])).name : null;

    return (
        <header className="bg-white shadow-sm py-3 px-4 border-center mb-3">
            <Container fluid className="d-flex justify-content-between align-items-center">


                <div className="text-center">

                </div>
                <h5 className="mb-0 fw-semibold text-primary">MarketPlace</h5>

                {token && userName ? (
                    <div className="d-flex align-items-center gap-3">
                        <div className="d-flex align-items-center gap-2">
                            <i className="bi bi-person-circle fs-4 text-secondary"></i>
                            <span className="fw-medium">{userName}</span>
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
                    <Button variant="outline-primary" onClick={() => navigate('/Login')}>
                        Iniciar sesión
                    </Button>
                )}
            </Container>
        </header>
    );
};

export default Header;
