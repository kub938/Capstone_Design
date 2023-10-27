import React, { useState, useEffect, useContext } from 'react';
import styles from './MapList.module.css';
import axios from 'axios';
import { CategoryContext } from '../../CategoryContext'


function MapList({ placeList, setPlaceList, onSaveButtonClick }) {
    const clientId = "nBcrF_omljd_AL2WOV0n"
    const clientSecret = 'QuroIWuHzI'
    // const [placeList, setPlaceList] = useState([])
    const [local, setLocal] = useState('')
    const { category, setCategory } = useContext(CategoryContext);

    async function fetchData(id) {
        try {
            const response = await axios.get(`http://localhost:4000/search/local?id=${id}`);
            setPlaceList(response.data.items);
            console.log('리스트 데이터 출력 성공');

        } catch (error) {
            console.error('실패', error);
        }
    }

    const handleButtonClick = async (event) => {
        event.preventDefault();
        const currentButtonId = event.target.id;
        if (currentButtonId === 'button1') {
            setCategory('restaurant')
        }
        else if (currentButtonId === 'button2') {
            setCategory('play')
        }
        else if (currentButtonId === 'button3') {
            setCategory('hotel')
        }

        fetchData(currentButtonId);
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div>
            <div className={styles.mapInfo}>
                <form action="" placeholder={placeList}>
                    <button id='button1' onClick={handleButtonClick}>식당</button>
                    <button id='button2' onClick={handleButtonClick}>놀거리</button>
                    <button id='button3' onClick={handleButtonClick}>숙박</button>
                </form>
                <hr />
                <div className={styles.infoContents}>

                    {placeList.map((place, index) => (

                        <div className={styles.infoContents} key={index}>
                            <div>{index}</div>
                            <div>{place.title}</div>
                            <a href={place.link}>홈페이지 바로가기</a>
                            <div>카테고리: {place.category}</div>
                            <div>주소: {place.address}</div>
                            <br />
                            <button className={styles.btnStyle} onClick={onSaveButtonClick}>저장</button>
                            <hr />
                        </div>

                    ))}

                </div>
            </div>

        </div >
    );
}



export default MapList;