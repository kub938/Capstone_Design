import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Border.module.css'
import axios from 'axios';
import Navbar from '../Home/Navbar';

function Board() {
    const [boards, setBoards] = useState([]);

    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더하고, 항상 두 자리 숫자를 유지하기 위해 slice를 사용합니다.
        const day = ("0" + date.getDate()).slice(-2); // 일도 항상 두 자리 숫자를 유지하기 위해 slice를 사용합니다.

        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        axios.get('http://localhost:4000/api/boards')  // '/api/boards'는 실제 API 경로를 입력해주세요.
            .then((response) => {
                setBoards(response.data)
                console.log(response)
            })
            .catch((error) => console.error('Failed to fetch boards:', error));
    }, []);

    return (
        <div >
            <Navbar></Navbar>
            <div className={styles.container}>
                <div>
                    <h3 className={styles.title}>여행 후기 게시판</h3>
                </div>
                <p className={styles.p}>즐거웠던 여행의 기억을 이곳에 담아보세요!</p>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>제목</th>
                            <th>글쓴이</th>
                            <th>작성 날짜</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boards.slice(0, 10).map((board, index) => (  // 최대 10개의 게시글만 출력합니다.
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><Link to={`/board/${board._id}`}>{board.title}</Link></td>
                                <td>{board.userName}</td>
                                <td>{formatDate(board.date)}</td>
                                <td>{board.views}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to='/createboard'>
                    <button className={styles.createBoard}>글쓰기</button>
                </Link>
            </div>
        </div>
    );
}

export default Board;

