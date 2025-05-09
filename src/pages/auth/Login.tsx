import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Button, Container, Row, Col, Alert} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {login} from '../../store/authSlice';
import {authService} from "../../services/auth.service";
import {jwtDecode} from 'jwt-decode';


const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const data = await authService.login({email, password});
            const decodedToken: { email: string; role: string } = jwtDecode(data.access_token);
            localStorage.setItem('token', data.access_token);
            dispatch(login(data.email));
            if (decodedToken.role === 'admin') {
                navigate('/products/admin');
                return;
            }
            if (decodedToken.role === 'seller') {
                navigate('/products/seller');
                return;
            }
            navigate('/products');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Container className="d-flex vh-100 justify-content-center align-items-center bg-light">
            <Row className="w-100">
                <Col md={{span: 6, offset: 3}}>
                    <div className="p-4 shadow rounded bg-white">
                        <h3 className="text-center mb-4">Iniciar sesión</h3>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@mail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                className="w-100"
                                onClick={handleLogin}
                                disabled={!email || !password}
                            >
                                ENTRAR
                            </Button>

                            <div className="text-center mt-3">
                                <a href="/register">Regístrarse</a>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
