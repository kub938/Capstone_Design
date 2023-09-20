import React, { useState } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchLocal() {
    const [local, setLocal] = useState('');
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        // axios.get('http://localhost:4000/api/mainsearch', {
        //     params: {
        //         query: local
        //     }
        // })
        //     .then(function (response) {
        //         // console.log(response);
        //         response.params;
        //         navigate('/map');
        //         console.log('서버로 데이터 전송 완료');
        //         // 여기서 응답 데이터를 처리합니다.
        //     })
        //     .catch(function (error) {
        //         console.error(error);
        //     });

        const url = 'http://localhost:4000/api/mainsearch';
        try {
            const formData = { name: local };
            const response = axios.post(url, formData);
            navigate('/map');
        } catch (error) {
            console.error('데이터 전송 오류:', error)
        }
    }

    return (
        <form className={styles.form} >
            <input className={styles.input_Data} value={local} type="text" onChange={(e) => setLocal(e.target.value)} placeholder="지역명" />
            <button className={styles.input_Btn} onClick={onSubmit} type="submit">Go!</button>
        </form>
    );
}


export default SearchLocal;