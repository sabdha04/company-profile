import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './page/home';
import History from './page/history';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </BrowserRouter>
    );
}
