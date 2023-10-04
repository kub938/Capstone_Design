import React, { useState } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchLocal() {
    const [local, setLocal] = useState('');
    const navigate = useNavigate();
    const onSubmit = (e) => {

        e.preventDefault();

        const url = 'http://localhost:4000/api/mainsearch';
        const formData = { name: local };
        navigate('/map');
        axios.post(url, formData)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <form className={styles.form} >
            <input className={styles.input_Data} value={local} type="text" onChange={(e) => setLocal(e.target.value)} placeholder="지역명" />
            <button className={styles.input_Btn} onClick={onSubmit} type="submit">Go!</button>
        </form>
    );
}


export default SearchLocal;