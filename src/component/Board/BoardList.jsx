import React, { useState, useEffect } from 'react';
import axios from "axios";


function BoardList() {
    const getBoardList = async () => {
        const resp = (await axios.get('//127.0.0.1:3306/board')).data
        console.log(resp.data)
    }

    useEffect(() => {
        getBoardList();
    }, []);
    return (
        <div>
            게시판 목록 출력
        </div>
    );
}

export default BoardList;

