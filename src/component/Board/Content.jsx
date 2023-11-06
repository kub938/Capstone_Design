import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './content.module.css'
import Navbar from '../Home/Navbar'


function Content() {
    const [board, setBoard] = useState(null);
    const { id } = useParams();  // URL로부터 id를 얻습니다.
    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더하고, 항상 두 자리 숫자를 유지하기 위해 slice를 사용합니다.
        const day = ("0" + date.getDate()).slice(-2); // 일도 항상 두 자리 숫자를 유지하기 위해 slice를 사용합니다.

        return `${year}-${month}-${day}`;
    }
    useEffect(() => {

        axios.get(`http://localhost:4000/api/boards/${id}`)  // 해당 id의 게시글 데이터를 서버에서 가져옵니다.
            .then((response) => {
                console.log(response.data.title)
                setBoard(response.data);
            })
            .catch((error) => console.error('Failed to fetch board:', error));
    }, [id]);

    if (!board) return null;  // 게시글 데이터가 아직 없으면 아무것도 출력하지 않습니다.

    return (
        <div>
            <Navbar></Navbar>
            <div className={styles.container}>
                <h3 className={styles.title}>자유게시판</h3>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>{board.title}</th>
                            <th>{formatDate(board.date)}</th>
                            <th>조회수 {board.views}</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td colSpan="3">{board.content}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Content;
