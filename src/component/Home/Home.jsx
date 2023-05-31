import styles from './Home.module.css';
import Navbar from './Navbar';
import React, { Component } from "react";
import { useNavigate } from 'react-router-dom';



function Home() {

    // handleChange = (e) => {
    //     this.setState({
    //         name: e.target.value
    //     })
    // }

    // const navigate = useNavigate();
    // const clicked = () => {
    //     navigate("../Course/Course", { state: { value: this.state.value } })
    // }



    return (
        <div>
            <Navbar />
            <main className={styles.Main}>
                <div className={styles.content_Font} >당신의 여행 지금 여기부터 시작하세요</div>
                <form className={styles.form} action="">
                    <input className={styles.input_Data} type="text" placeholder="지역명" />
                    <button className={styles.input_Btn} type="submit">Go!</button>
                </form>
            </main>
        </div>
    );
}

export default Home;