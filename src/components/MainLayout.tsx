import React from 'react';
import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';

interface Props {
    children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <div className="d-flex flex-grow-1">
                <Sidebar />
                <main className="flex-grow-1 px-4 py-3">{children}</main>
            </div>

            <Footer />
        </div>
    );
};

export default MainLayout;
