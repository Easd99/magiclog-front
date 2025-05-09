// src/components/Sidebar.tsx
import React from 'react';
import {Nav} from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => {
        const current = location.pathname;
        return current === path || current.startsWith(`${path}/`);
    };


    const token = localStorage.getItem('token');
    const role = token ? JSON.parse(atob(token.split('.')[1])).role : null;

    return (
        <div className="bg-light border-end" style={{width: '220px', minHeight: '100vh'}}>
            <h5 className="text-center py-3">MarketPlace</h5>
            <Nav className="flex-column px-3">
                <Nav.Link
                    onClick={() => navigate('/products')}
                    className={location.pathname === '/products' ? 'fw-bold text-primary' : 'text-dark'}
                >
                    Productos
                </Nav.Link>

                {role === 'admin' && (
                    <Nav.Link
                        onClick={() => navigate('/products/admin')}
                        className={isActive('/products/admin') ? 'fw-bold text-primary' : 'text-dark'}
                    >
                        Administración
                    </Nav.Link>
                )}

                {(role === 'admin' || role === 'seller') && (
                    <Nav.Link
                        onClick={() => navigate('/products/seller')}
                        className={isActive('/products/seller') ? 'fw-bold text-primary' : 'text-dark'}
                    >
                        Inventario
                    </Nav.Link>
                )}
            </Nav>
        </div>
    );
};

export default Sidebar;
