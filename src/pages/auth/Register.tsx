import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Button, Container, Row, Col, Alert} from 'react-bootstrap';
import {login} from '../../store/authSlice';
import {authService} from "../../services/auth.service";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

const RegisterPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [role, setRole] = useState<'user' | 'seller'>('user');
    const [error, setError] = useState('');


    const handleRegister = async () => {
        if (!email || !password || !confirm || !name) {
            setError('Completa todos los campos.');
            return;
        }
        if (password !== confirm) {
            setError('Las contraseñas no coinciden');
            return;
        }


        try {
            await authService.register({
                name,
                email,
                role,
                password,
                confirmPassword: confirm,
            })
            const data = await authService.login({email, password});
            localStorage.setItem('token', data.access_token);
            dispatch(login(data.email));
            const decodedToken: { email: string; role: string } = jwtDecode(data.access_token);
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
                        <h3 className="text-center mb-4">Crea una cuenta</h3>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="string"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
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
                                <Form.Label>Rol</Form.Label>
                                <Form.Select value={role}
                                             onChange={(e) => setRole(e.target.value as 'user' | 'seller')}>
                                    <option value="user">Usuario</option>
                                    <option value="seller">Vendedor</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Confirmar contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    isInvalid={!!error && password !== confirm}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Las contraseñas no coinciden
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button
                                variant="primary"
                                className="w-100"
                                onClick={handleRegister}
                                disabled={!email || !password || !confirm}
                            >
                                REGISTRARSE
                            </Button>

                            <div className="text-center mt-3">
                                <a href="/login">Inicia sesión</a>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterPage;
