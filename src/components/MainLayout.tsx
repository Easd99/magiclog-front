import React from 'react';
import Header from "./header";
import Sidebar from "./sidebar";

interface Props {
    children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({children}) => {
    return (
        <div className="d-flex vh-100">
            <Sidebar/>
            <div className="flex-grow-1 p-4">
                <Header/>
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
