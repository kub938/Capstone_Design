import { style } from '@mui/system';
import React from 'react'
import styles from './CourseResult.module.css'
function CourseResult({ response }) {
    function msToTime(duration) {
        let seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        if (hours === 0) {
            return minutes + "분 " + seconds + "초 ";
        }
        else {
            return hours + "시 " + minutes + "분 " + seconds + "초 ";

        }
    }

    console.log(response.data.route.traoptimal[0].summary)
    let distance = Math.floor(response.data.route.traoptimal[0].summary.distance) / 1000 //전체 경로 거리(미터)
    let duration = msToTime(response.data.route.traoptimal[0].summary.duration) //전체 경로 소요시간(1/1000초)
    let taxiFare = response.data.route.traoptimal[0].summary.taxiFare
    let goalDistance = Math.floor(response.data.route.traoptimal[0].summary.goal.distance) / 1000 //목적지까지 경로 거리
    let goalDuration = msToTime(response.data.route.traoptimal[0].summary.goal.duration) //목적지까지 경로 소요시간
    let wayDistance = Math.floor(response.data.route.traoptimal[0].summary.waypoints[0].distance) / 1000 //목적지까지 경로 거리
    let wayDuration = msToTime(response.data.route.traoptimal[0].summary.waypoints[0].duration) //목적지까지 경로 소요시간


    return (

        <div className={styles.container}>
            <div className={styles.headline}>Total</div>
            <div className={styles.innertext}>총 거리 : {distance}km</div>
            <div className={styles.innertext}>총 소요시간 : {duration}</div>

            <hr />
            <div className={styles.headline}>출발지 &gt; 경유지</div>
            <div className={styles.innertext}>거리 : {wayDistance}km</div>
            <div className={styles.innertext}>소요시간 : {wayDuration}</div>


            <hr />

            <div className={styles.headline}>경유지 &gt; 도착지</div>
            <div className={styles.innertext}>거리 : {goalDistance}km</div>
            <div className={styles.innertext}>소요시간 : {goalDuration}</div>

            <hr />

            <div className={styles.headline}>교통비</div>
            <div className={styles.innertext}>총 택시비 : {taxiFare}</div>
            <hr />



        </div>
    )
}


export default CourseResult