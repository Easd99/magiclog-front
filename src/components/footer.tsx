import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="text-center text-muted py-3 border-top mt-4">
            <small>© {new Date().getFullYear()} Magiclog. Todos los derechos reservados.</small>
        </footer>
    );
};

export default Footer;
