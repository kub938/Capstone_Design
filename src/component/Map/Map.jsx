import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { numberInputClasses } from '@mui/base';
import MapList from './MapList'
import styles from './Map.module.css'

function Map() {

    const [myLocation, setMyLocation] = useState('');
    useEffect(() => {
        const position = new naver.maps.LatLng(36.3364, 127.4582);
        // 위치 정보 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        }
        // 위치추적에 성공했을때 위치 값을 넣어줍니다.
        function success(position) {
            console.log('현위치 출력 성공')
            setMyLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        }
        // 위치 추적에 실패 했을때 초기값을 넣어줍니다.
        function error() {
            console.log('현위치 검색 실패');
            setMyLocation({ latitude: 37.4979517, longitude: 127.0276188 });
        }


        //-------------맵 옵션 -----------
        var map = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(36.3364, 127.4582), //지도의 초기 중심 좌표
            zoom: 15, //지도의 초기 줌 레벨
            minZoom: 0, //지도의 최소 줌 레벨
            zoomControl: true, //줌 컨트롤의 표시 여부
            zoomControlOptions: { //줌 컨트롤의 옵션
                position: naver.maps.Position.TOP_RIGHT
            }
        }, []);

        //------------마커 -------------
        const marker = new naver.maps.Marker({
            position: position,
            map: map
        });
        const handleClick = (e) => {
            marker.setPosition(e.coord);
            console.log()
        };

        map.addListener('click', handleClick);

        //----------------------------------------

        map.setOptions("mapTypeControl", true);
        naver.maps.Event.addListener(map, 'zoom_changed', function (zoom) {
            console.log('zoom:' + zoom);
        });



        window.navermap_authFailure = function () {
            // 인증 실패 시 처리 코드 작성
            console.log("인증에 실패했습니다.");
        }
    }, []);

    return (
        <>
            <div className={styles.container}>
                <MapList></MapList>
                <div className={styles.map} id="map"></div>
            </div>
        </>
    );
}

export default Map;