import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom'
import { useState, useContext } from 'react'
import { LogStateContext } from '../../LogStateContext';

function Navbar() {
    const { logstate, setLogState } = useContext(LogStateContext);

    const handleLogout = () => {
        // 로그아웃 처리 로직...
        setLogState(false);
        alert('로그아웃 되었습니다')
    };


    return (
        <div>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <NavLink to="/">GoTravel</NavLink>
                    </div>
                    <div className={styles.navElements}>
                        <ul>
                            <li><NavLink to="/map">코스추천</NavLink></li>
                            <li><NavLink to="/board">여행후기</NavLink></li>
                            {!logstate ? (<li><NavLink to="/login" >로그인</NavLink></li>
                            ) : (
                                <li><button onClick={handleLogout}>로그아웃</button></li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav >
        </div>
    )
}

export default Navbar