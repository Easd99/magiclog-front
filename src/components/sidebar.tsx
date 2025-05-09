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
            <aside
                className="bg-white d-flex flex-column"
                style={{
                    width: '220px', minHeight: '100vh', padding: '1.5rem 1rem', boxShadow: '2px 0 10px 0 rgba(0,0,0,0.05)'
                }}
            >
                < Nav className="flex-column gap-2">
                    < Nav.Item>
                        < Nav.Link
                            onClick={() => navigate('/products')}
                            className={`d-flex align-items-center rounded ${
                                location.pathname === '/products' ? 'fw-bold text-primary bg-light' : 'text-dark'
                            }`}
                        >
                            <i className="bi bi-box-seam me-2"/>
                            Productos
                        </Nav.Link>
                    </Nav.Item>

                    {role === 'admin' && (
                        <Nav.Item>
                            <Nav.Link
                                onClick={() => navigate('/products/admin')}
                                className={`d-flex align-items-center rounded ${
                                    isActive('/products/admin') ? 'fw-bold text-primary bg-light' : 'text-dark'
                                }`}
                            >
                                <i className="bi bi-tools me-2"/>
                                Administración
                            </Nav.Link>
                        </Nav.Item>
                    )
                    }

                    {
                        (role === 'admin' || role === 'seller') && (
                            <Nav.Item>
                                <Nav.Link
                                    onClick={() => navigate('/products/seller')}
                                    className={`d-flex align-items-center rounded ${
                                        isActive('/products/seller') ? 'fw-bold text-primary bg-light' : 'text-dark'
                                    }`}
                                >
                                    <i className="bi bi-clipboard-data me-2"/>
                                    Inventario
                                </Nav.Link>
                            </Nav.Item>
                        )
                    }
                </Nav>
            </aside>
        )
            ;
    }
;

export default Sidebar;
