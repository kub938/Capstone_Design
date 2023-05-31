import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom'
import { useState } from 'react'


function Navbar() {

    return (
        <div>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <NavLink to="">GoTravel</NavLink>
                    </div>
                    <div className={styles.navElements}>
                        <ul>
                            <li><NavLink to="">코스추천</NavLink></li>
                            <li><NavLink to="">게시판</NavLink></li>
                            <li><NavLink to="">로그인</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav >
        </div>
    )
}

export default Navbar