import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import MapList from './MapList'
import styles from './Map.module.css'
import cors from 'cors'
import { CategoryContext } from '../../CategoryContext'
import { RoundaboutLeft } from '@mui/icons-material';
import CourseResult from './CourseResult'

function Map() {
    var HOME_PATH = window.HOME_PATH || '.';
    let map = null;
    const [placeList, setPlaceList] = useState([])
    const [myLocation, setMyLocation] = useState('');
    const [position, setPosition] = useState('');
    const [data, setData] = useState('');
    const [coord, setCoord] = useState({});
    const { category, setCategory } = useContext(CategoryContext);
    const [restaurant, setRestaurant] = useState([]);
    const [play, setPlay] = useState([]);
    const [hotel, setHotel] = useState([]);
    const [resultState, setResultState] = useState(false);
    const [responseData, setResponseData] = useState(null);
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

                //------------마커 -------------


                console.log(marker);

                map = new naver.maps.Map('map', {
                    center: new naver.maps.LatLng(Coord[0]), //지도의 초기 중심 좌표
                    zoom: 16, //지도의 초기 줌 레벨
                    minZoom: 0, //지도의 최소 줌 레벨
                    zoomControl: true, //줌 컨트롤의 표시 여부
                    zoomControlOptions: { //줌 컨트롤의 옵션
                        position: naver.maps.Position.TOP_RIGHT
                    }

                }, []);


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


    //---------------- 카테고리 저장 버튼 ---------------------


    function onSaveButtonClick(listIndex) {
        if (category === 'restaurant') {
            setRestaurant(prev => [...prev, markerPositions[listIndex]]);
            alert('식당 추가');
            console.log(restaurant, '저장 완료')
        }
        else if (category === 'play') {
            setPlay(prev => [...prev, markerPositions[listIndex]]);
            alert('놀거리 추가');
            console.log(play, '저장 완료')
        }
        else if (category === 'hotel') {
            setHotel(prev => [...prev, markerPositions[listIndex]]);
            alert('숙소 추가');
            console.log(hotel, '저장 완료')
        }
    }

    useEffect(() => {
        console.log(restaurant, hotel, play)

    }, [restaurant]);

    useEffect(() => {
        console.log(restaurant, hotel, play)

    }, [play]);

    useEffect(() => {
        console.log(restaurant, hotel, play)

    }, [hotel]);


    //--------------------코스 만들기 버튼 --------------------------
    async function fetchDirections() {
        let start = hotel[0];
        let goal = restaurant[0];
        let waypoint = play;
        waypoint = waypoint.join('|');
        const option = 'trafast';
        console.log(restaurant, hotel, play)


        // 애플리케이션 등록 시 발급받은 client id와 secret 값을 아래에 입력해주세요.

        try {
            console.log(waypoint)
            const response = await axios.get(
                `https://thingproxy.freeboard.io/fetch/https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=${start}&waypoints=${waypoint}&goal=${goal}&option={trafast}`,
                // `https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=${start}&waypoint=${waypoint}&goal=${goal}&option=${option}`,
                {
                    headers: {
                        "X-NCP-APIGW-API-KEY-ID": '8gyi4oq980',
                        "X-NCP-APIGW-API-KEY": 'GcfPkL4YmbimXsu8cLvA41h7dWMQ5HhmSLIaML2a'
                    }
                },
            );
            setResponseData(response)
            let polylinePath = response.data.route.traoptimal[0].path
            console.log(polylinePath)
            let latLngPath = polylinePath.map(coord => new naver.maps.LatLng(coord[1], coord[0]));
            console.log(latLngPath)

            map = new naver.maps.Map('map', {
                center: new naver.maps.LatLng(start), //지도의 초기 중심 좌표
                zoom: 16, //지도의 초기 줌 레벨
                minZoom: 0, //지도의 최소 줌 레벨
                zoomControl: true, //줌 컨트롤의 표시 여부
                zoomControlOptions: { //줌 컨트롤의 옵션
                    position: naver.maps.Position.TOP_RIGHT
                }

            }, []);

            var polyline = new naver.maps.Polyline({
                map: map,
                path: latLngPath,      //선 위치 변수배열
                strokeColor: '#2259c7', //선 색 빨강 #빨강,초록,파랑
                strokeOpacity: 1, //선 투명도 0 ~ 1
                strokeWeight: 6,   //선 두께
                strokeLineCap: 'round',
                strokeLineJoin: 'round',
                startIcon: 'CIRCLE',
                endIcon: "SQUARE",

            })

            var marker = new naver.maps.Marker({
                position: polylinePath[polylinePath.length - 1], //마크 표시할 위치 배열의 마지막 위치
                map: map,
                icon: {
                    url: HOME_PATH + '../../../marker/finishMarker.svg',
                    size: new naver.maps.Size(50, 50),
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(20, 50)
                }

            });
            var marker = new naver.maps.Marker({
                position: polylinePath[0], //마크 표시할 위치 배열의 마지막 위치
                map: map,
                icon: {
                    url: HOME_PATH + '../../../marker/marker-copy-0.svg',
                    size: new naver.maps.Size(50, 50),
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(20, 50)
                }
            });

            var marker = new naver.maps.Marker({
                position: play[0], //마크 표시할 위치 배열의 마지막 위치
                map: map,
                icon: {
                    url: HOME_PATH + '../../../marker/marker-marker.svg',
                    size: new naver.maps.Size(50, 50),
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(20, 50)
                }
            });


            setResultState(true)
        } catch (error) {
            console.error('Directions data fetch failed', error);
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
                {!resultState ? (<MapList placeList={placeList} setPlaceList={setPlaceList} onSaveButtonClick={onSaveButtonClick}></MapList>
                ) : (
                    <CourseResult response={responseData} />
                )}
                <div className={styles.map} id="map"></div>
                {!resultState ? (<button className={styles.finishButton} onClick={fetchDirections}>코스 만들기</button>)
                    : (
                        <button className={styles.finishButton}>코스 저장</button>
                    )}

            </div>
        </>
    );
}

export default Map;