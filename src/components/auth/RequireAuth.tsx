import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

interface RequireAuthProps {
    children: React.ReactNode;
}

interface JwtPayload {
    exp: number;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/Login');
            return;
        }

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const isExpired = decoded.exp * 1000 < Date.now();
            if (isExpired) {
                localStorage.removeItem('token');
                navigate('/Login');
            }
        } catch (error) {
            localStorage.removeItem('token');
            navigate('/Login');
        }
    }, [navigate]);

    return <>{children}</>;
};

export default RequireAuth;
