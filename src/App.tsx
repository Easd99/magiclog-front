import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/auth/Login';
import RegisterPage from "./pages/auth/Register";
import BuyerCatalogPage from "./pages/buyer/BuyerCatalogPage";
import AdminCatalogPage from "./pages/admin/AdminCatalogPage";
import SellerInventoryPage from "./pages/seller/SellerInventoryPage";
import CreateProductPage from "./pages/seller/CreateProductPage";
import RequireAuth from "./components/auth/RequireAuth";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/" element={<Navigate to="/products" replace/>}/>


                <Route path="/products" element={
                    // <RequireAuth>
                    <BuyerCatalogPage/>
                    //</RequireAuth>
                }/>
                <Route path="/products/admin" element={
                    <RequireAuth>
                        <AdminCatalogPage/>
                    </RequireAuth>
                }/>
                <Route path="/products/seller" element={
                    <RequireAuth>
                        <SellerInventoryPage/>
                    </RequireAuth>
                }/>
                <Route path="/products/seller/create" element={
                    <RequireAuth>
                        <CreateProductPage/>
                    </RequireAuth>
                }/>
                <Route path="/products/seller/edit/:id" element={
                    <RequireAuth>
                        <CreateProductPage/>
                    </RequireAuth>
                }/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
