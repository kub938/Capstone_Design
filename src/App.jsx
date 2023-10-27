import React, { useEffect, useState } from 'react';
import Home from './component/Home/Home';
import LoginPage from './component/SignPage/LoginPage'
import SignUpPage from './component/SignPage/SignUpPage'
import Board from './component/Board/Board'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import BoardList from './component/Board/BoardList';
import CreateBoard from './component/Board/CreateBoard';
import Map from './component/Map/Map'
import 'bootstrap/dist/css/bootstrap.min.css';
import { LogStateContext } from './LogStateContext';
import { CategoryContext } from './CategoryContext'

function App() {
    const [logstate, setLogState] = useState(false);
    const [category, setCategory] = useState(null);
    console.log(logstate)
    return (
        <>
            <CategoryContext.Provider value={{ category, setCategory }}>
                <LogStateContext.Provider value={{ logstate, setLogState }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/board" element={<Board />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path='/map' element={<Map />} />
                            <Route path='/board' element={<Board />} />
                            <Route path="/boardcontents" element={<BoardList />} />
                            <Route path="/createboard" element={<CreateBoard />} />
                        </Routes>
                    </BrowserRouter>
                </LogStateContext.Provider>
            </CategoryContext.Provider>
        </>
    );
}

export default App;