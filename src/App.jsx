import { useState } from 'react';
import Home from './component/Home/Home';
import { BrowserRouter } from 'react-router-dom'
import Navbar from './component/Home/Navbar'

function App() {
    return (
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );
}

export default App
