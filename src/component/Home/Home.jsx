import styles from './Home.module.css';
import Navbar from './Navbar';
import React from "react";
import SearchLocal from './SearchLocal';



function Home() {

    return (
        <div>
            <Navbar />
            <div className={styles.back_Ground}>
                <main className={styles.Main}>
                    <div className={styles.content_Font} >여행 지금 여기에서부터 시작하세요</div>
                    <SearchLocal />
                </main>
            </div>
        </div>
    );
}

export default Home;