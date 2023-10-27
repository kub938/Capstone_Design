import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import MapList from './MapList'
import styles from './Map.module.css'
import cors from 'cors'
import { CategoryContext } from '../../CategoryContext'


function Map() {
    const [placeList, setPlaceList] = useState([])
    const [myLocation, setMyLocation] = useState('');
    const [position, setPosition] = useState('');
    const [data, setData] = useState('');
    const [coord, setCoord] = useState({});
    const { category, setCategory } = useContext(CategoryContext);


    let markers = []; // 마커 정보를 담는 배열
    let infoWindows = []; // 정보창을 담는 배열
    let Coord = []
    let markerPositions = []
    //-------------검색한 좌표값 불러오기-------------

    // async function fetchData() {
    //     try {
    //         const response = await axios.get('http://localhost:4000/api/roadAddress');
    //         console.log(data)
    //         const Coord = {
    //             x: response.data[0].x,
    //             y: response.data[0].y
    //         }
    //         setCoord(Coord)
    //         console.log('CoordData 출력 성공')
    //     } catch (error) {
    //         console.error('실패', error);
    //     }
    // }




    //---------------------------------------
    useEffect(() => {
        async function initMap() {
            try {
                const response = await axios.get('http://localhost:4000/api/roadAddress');
                //---------------- 리스트 좌표 5개 저장 ---------------

                for (let i = 0; i < 5; i++) {
                    Coord.push({
                        x: response.data[i][0].x,
                        y: response.data[i][0].y
                    })
                }
                console.log(Coord)
                markerPositions = [
                    [Coord[0].x, Coord[0].y],
                    [Coord[1].x, Coord[1].y],
                    [Coord[2].x, Coord[2].y],
                    [Coord[3].x, Coord[3].y],
                    [Coord[4].x, Coord[4].y]
                ]




                //-------------맵 초기셋팅 옵션 -----------
                // var map = new naver.maps.Map('map', {
                //     center: new naver.maps.LatLng(Coord[0]), //지도의 초기 중심 좌표
                //     zoom: 16, //지도의 초기 줌 레벨
                //     minZoom: 0, //지도의 최소 줌 레벨
                //     zoomControl: true, //줌 컨트롤의 표시 여부
                //     zoomControlOptions: { //줌 컨트롤의 옵션
                //         position: naver.maps.Position.TOP_RIGHT
                //     }

                // }, []);

                //------------마커 -------------

                // let marker = markerPositions.map(position => {
                //     new naver.maps.Marker({
                //         position: new naver.maps.LatLng(position[1], position[0]),
                //         map: map,
                //     });
                // });

                // var markerPositions = [
                //     [Coord[0].x, Coord[0].y],
                //     [Coord[1].x, Coord[1].y],
                //     [Coord[2].x, Coord[2].y],
                //     [Coord[3].x, Coord[3].y],
                //     [Coord[4].x, Coord[4].y]
                // ];
                console.log(marker);

                var map = new naver.maps.Map('map', {
                    center: new naver.maps.LatLng(Coord[0]), //지도의 초기 중심 좌표
                    zoom: 16, //지도의 초기 줌 레벨
                    minZoom: 0, //지도의 최소 줌 레벨
                    zoomControl: true, //줌 컨트롤의 표시 여부
                    zoomControlOptions: { //줌 컨트롤의 옵션
                        position: naver.maps.Position.TOP_RIGHT
                    }

                }, []);

                // var bounds = map.getBounds(),
                //     southWest = bounds.getSW(),
                //     northEast = bounds.getNE(),
                //     lngSpan = northEast.lng() - southWest.lng(),
                //     latSpan = northEast.lat() - southWest.lat();

                for (var i = 0; i < markerPositions.length; i++) {

                    var position = new naver.maps.LatLng(markerPositions[i][1], markerPositions[i][0]);

                    var marker = new naver.maps.Marker({
                        map: map,
                        position: position,
                    });

                    var infoWindowContent;
                    console.log(placeList[i].title)
                    if (placeList[i]) { // placeList에 해당 인덱스의 값이 있으면 그 값을 사용합니다.
                        infoWindowContent = '<div style="width:300px;text-align:center;padding:10px;">' + placeList[i].title + placeList[i].link + '<br></br>' + placeList[i].roadAddress + '</div>';
                    } else { // 없으면 기본 문자열을 사용합니다.
                        infoWindowContent = '<div style="width:150px;text-align:center;padding:10px;">No information available</div>';
                    }

                    var infoWindow = new naver.maps.InfoWindow({
                        content: infoWindowContent
                    });

                    markers.push(marker);
                    infoWindows.push(infoWindow);
                };

                naver.maps.Event.addListener(map, 'idle', function () {
                    updateMarkers(map, markers);
                });

                function updateMarkers(map, markers) {

                    var mapBounds = map.getBounds();
                    var marker, position;

                    for (var i = 0; i < markers.length; i++) {

                        marker = markers[i]
                        position = marker.getPosition();

                        if (mapBounds.hasLatLng(position)) {
                            showMarker(map, marker);
                        } else {
                            hideMarker(map, marker);
                        }
                    }
                }

                function showMarker(map, marker) {

                    if (marker.setMap()) return;
                    marker.setMap(map);
                }

                function hideMarker(map, marker) {

                    if (!marker.setMap()) return;
                    marker.setMap(null);
                }

                // 해당 마커의 인덱스를 seq라는 클로저 변수로 저장하는 이벤트 핸들러를 반환합니다.
                function getClickHandler(seq) {
                    return function (e) {
                        var marker = markers[seq],
                            infoWindow = infoWindows[seq];

                        if (infoWindow.getMap()) {
                            infoWindow.close();
                        } else {
                            infoWindow.open(map, marker);
                        }
                    }
                }

                for (var i = 0, ii = markers.length; i < ii; i++) {
                    naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i));
                }


                // const marker = new naver.maps.Marker({
                //     pos: Coord,
                //     map: map
                // });
                // const handleClick = (e) => {
                //     marker.setPosition(e.coord);
                // };

                // map.addListener('click', handleClick);


                //--------------정보창----------------------


                // var contentString = [
                //     placeList[0],
                //     placeList[1],
                //     placeList[2],
                //     placeList[3],
                //     placeList[4],
                // ].join('<br>');

                // var infowindow = new naver.maps.InfoWindow({
                //     content: <div style="width :200px;text-align:center;padding :10px;">{contentString[0]}</div>
                // }); // 클릭했을 때 띄워줄 정보 입력


                //----------------------------------------------------------
                // 생성한 마커를 담는다.
                // markers.push(marker);
                // infoWindows.push(infoWindow[1]); // 생성한 정보창을 담는다.


                // naver.maps.Event.addListener(marker, "click", function (e) {
                //     console.log('Click')
                //     if (infowindow.getMap()) {
                //         infowindow.close();
                //     } else {
                //         infowindow.open(map, marker);
                //     }
                // });

                // infowindow.open(map, marker);


                // function getClickHandler(seq) {
                //     console.log(seq)
                //     return function (e) {  // 마커를 클릭하는 부분
                //         var marker = markers[seq], // 클릭한 마커의 시퀀스로 찾는다.
                //             infoWindow = infoWindows[seq]; // 클릭한 마커의 시퀀스로 찾는다

                //         if (infoWindow.getMap()) {
                //             infoWindow.close();
                //         } else {
                //             infoWindow.open(map, marker); // 표출
                //         }
                //     }
                // }

                // for (var i = 0, ii = markers.length; i < ii; i++) {
                //     console.log(markers[i], getClickHandler(i));
                //     naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i)); // 클릭한 마커 핸들러
                // }




                //----------------------------------------

                map.setOptions("mapTypeControl", true);
                naver.maps.Event.addListener(map, 'zoom_changed', function (zoom) {
                    console.log('zoom:' + zoom);
                });


                //--------------리스트 저장버튼 ---------------



                //---------------------------------------
                window.navermap_authFailure = function () {
                    // 인증 실패 시 처리 코드 작성
                    console.log("인증에 실패했습니다.");
                }

            }
            catch (error) {
                console.error('map 로딩 실패', error);
            }
        }
        initMap();
    }, [markerPositions]);

    let restaurant = []
    let play = []
    let hotel = []

    const onSaveButtonClick = (index) => {
        if (category === 'restaurant') {
            restaurant.push(markerPositions[index])
            alert('식당 추가')
            console.log(category, '저장 완료')
        }
        else if (category === 'play') {
            play.push(markerPositions[index])
            alert('숙소 추가')
            console.log(category, '저장 완료')
        }
        else if (category === 'hotel') {
            hotel.push(markerPositions[index])
            alert('숙소 추가')
            console.log(category, '저장 완료')
        }
    }



    //----------- 현위치 검색 ------------------
    // const position = new naver.maps.LatLng(36.3364, 127.4582);
    // // 위치 정보 가져오기
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(success, error);
    // }
    // // 위치추적에 성공했을때 위치 값을 넣어줍니다.
    // function success(position) {
    //     console.log('현위치 출력 성공')
    //     setMyLocation({
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //     });
    // }
    // // 위치 추적에 실패 했을때 초기값을 넣어줍니다.
    // function error() {
    //     console.log('현위치 검색 실패');
    //     setMyLocation({ latitude: 37.4979517, longitude: 127.0276188 });
    // }


    return (
        <>
            <div className={styles.container}>
                <MapList placeList={placeList} setPlaceList={setPlaceList} onSaveButtonClick={onSaveButtonClick} ></MapList>
                <div className={styles.map} id="map"></div>
                <button className={styles.finishButton}>코스 만들기</button>
            </div>
        </>
    );
}

export default Map;