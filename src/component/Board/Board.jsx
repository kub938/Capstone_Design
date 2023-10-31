import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Border.module.css'
import axios from 'axios';

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
        <div>
            <div>
                <h3>게시판</h3>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>no</td>
                        <td>제목</td>
                        <td>날짜</td>
                    </tr>
                </thead>
                <tbody>
                    {boards.slice(0, 10).map((board, index) => (  // 최대 10개의 게시글만 출력합니다.
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><Link to={`/board/${board._id}`}>{board.title}</Link></td>

                            <td>{formatDate(board.date)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to='/createboard'>
                글쓰기
            </Link>

        </div>
    );
}

export default Board;

