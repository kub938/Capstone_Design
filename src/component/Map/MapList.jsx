import React, { useState, useEffect, useContext } from 'react';
import styles from './MapList.module.css';
import axios from 'axios';

function MapList() {
    const clientId = "nBcrF_omljd_AL2WOV0n"
    const clientSecret = 'QuroIWuHzI'
    const [placeList, setPlaceList] = useState([])
    const [local, setLocal] = useState('')

    async function fetchData() {
        try {
            const response = await axios.get('http://localhost:4000/search/local');
            setPlaceList(response.data.items);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div>
            <div className={styles.mapInfo}>
                <form action="" placeholder={placeList}>
                    <button>식당</button>
                    <button>놀거리</button>
                    <button>숙박</button>
                </form>
                <hr />
                <div className={styles.infoContents}>

                    {placeList.map((place) => (
                        <div className={styles.infoContents} key={place.title}>
                            <div>{place.title}</div>
                            <a href={place.link}>홈페이지 바로가기</a>
                            <div>카테고리: {place.category}</div>
                            <div>주소: {place.address}</div>
                            <br />
                            <button className={styles.btnStyle}>저장</button>
                            <hr />
                        </div>

                    ))}

                </div>
            </div>

        </div >
    );
}



export default MapList;