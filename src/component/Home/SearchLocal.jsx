import React from 'react';
import styles from './Home.module.css';


function SearchLocal() {
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <input className={styles.input_Data} type="text" placeholder="지역명" />
            <button className={styles.input_Btn} type="submit">Go!</button>
        </form>
    );
}


export default SearchLocal;