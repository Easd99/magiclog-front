import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const HomePage: React.FC = () => {
    const { userEmail } = useSelector((state: RootState) => state.auth);
    return (
        <div className="p-5">
            <h2>Bienvenido, {userEmail}!</h2>
        </div>
    );
};

export default HomePage;
