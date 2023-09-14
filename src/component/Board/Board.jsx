import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Board() {
    return (
        <div>
            <div>
                다른 분들은 어떤 여행을하고 있을까요??
            </div>
            <Link to="/boardcontents">
                <main>
                    <div>사진</div>
                    <div>제목</div>
                    <div>부제목</div>
                </main>
            </Link>
            <Link to='/createboard'>
                글쓰기
            </Link>

        </div>
    );
}

export default Board;

