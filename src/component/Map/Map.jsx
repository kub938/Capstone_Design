import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { numberInputClasses } from '@mui/base';

function Map() {

    const [myLocation, setMyLocation] = useState('');

    useEffect(() => {
        // 위치 정보 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setMyLocation({ latitude, longitude });
                },
                (error) => {
                    console.error('위치 정보를 가져올 수 없습니다:', error);
                    setMyLocation('위치 정보를 가져올 수 없음');
                }
            );
        } else {
            console.error('Geolocation API가 지원되지 않는 브라우저입니다.');
            setMyLocation('브라우저에서 Geolocation을 지원하지 않음');
        }

        var mapOptions = {
            center: new window.naver.maps.LatLng(myLocation.latitude, myLocation.longitude),
            zoom: 10
        }
        var map = new window.naver.maps.Map('map', mapOptions);

        window.navermap_authFailure = function () {
            // 인증 실패 시 처리 코드 작성
            console.log("인증에 실패했습니다.");
        }
    }, []);

    return (
        <div id="map" style={{ width: '100%', height: '900px' }}></div>
    );
}

export default Map;