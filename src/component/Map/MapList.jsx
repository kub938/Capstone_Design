import React, { useState, useEffect, useContext } from 'react';
import styles from './MapList.module.css';
import axios from 'axios';
import { CategoryContext } from '../../CategoryContext'
import styled from 'styled-components';


function MapList({ placeList, setPlaceList, onSaveButtonClick }) {
    const clientId = "nBcrF_omljd_AL2WOV0n"
    const clientSecret = 'QuroIWuHzI'
    // const [placeList, setPlaceList] = useState([])
    const [local, setLocal] = useState('')
    const { category, setCategory } = useContext(CategoryContext);
    const [selectedButtonId, setSelectedButtonId] = useState(null);

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
        setSelectedButtonId(currentButtonId);

    }

    useEffect(() => {
        fetchData()
    }, []);

    function removeBoldTags(array) {
        return array.map(item => {
            return item.replace(/<b>|<\/b>/g, '');
        });
    }
    return (
        <div>
            <div className={styles.mapInfo}>
                <form action="" className={styles.form} placeholder={placeList} >
                    <button id='button1' className={styles.button1} onClick={handleButtonClick} style={{
                        backgroundColor: selectedButtonId === 'button1' ? 'rgb(51, 115, 236)' : 'initial',
                        color: selectedButtonId === 'button1' ? 'white' : 'initial'
                    }}>식당</button>
                    <button id='button2' className={styles.button2} onClick={handleButtonClick} style={{
                        backgroundColor: selectedButtonId === 'button2' ? 'rgb(51, 115, 236)' : 'initial',
                        color: selectedButtonId === 'button2' ? 'white' : 'initial'
                    }}>놀거리</button>
                    <button id='button3' className={styles.button3} onClick={handleButtonClick} style={{
                        backgroundColor: selectedButtonId === 'button3' ? 'rgb(51, 115, 236)' : 'initial',
                        color: selectedButtonId === 'button3' ? 'white' : 'initial'
                    }}>숙박</button>
                </form>
                <hr />
                <div className={styles.infoContents}>
                    {placeList.map((place, index) => (

                        <div className={styles.infoContents} key={index}>
                            <div className={styles.title}>{place.title.replace(/<b>|<\/b>/g, '')}</div>
                            <a href={place.link}>홈페이지 바로가기</a>
                            <div>카테고리 : {place.category}</div>
                            <div>주소 : {place.address}</div>
                            <button className={styles.btnStyle} onClick={() => onSaveButtonClick(index)}>저장</button>
                            <hr />
                        </div>

                    ))}

                </div>
            </div>

        </div >
    );
}



export default MapList;