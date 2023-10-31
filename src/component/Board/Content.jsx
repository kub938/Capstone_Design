import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Content() {
    const [board, setBoard] = useState(null);
    const { id } = useParams();  // URL로부터 id를 얻습니다.

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
            <h1>{board.title}</h1>
            <p>{board.content}</p>
        </div>
    );
}

export default Content;
