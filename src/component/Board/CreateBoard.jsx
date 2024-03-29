import * as React from 'react';
import styles from './CreateBoard.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Home/Navbar'

function CreateBoard() {
    const navigate = useNavigate();
    const [title, setTitle] = React.useState('');  // 제목을 관리하는 state입니다.
    const [content, setContent] = React.useState('');
    let userName = ''
    function onTitleChange(e) {  // 제목 입력란의 값이 변경될 때 호출됩니다.
        setTitle(e.target.value);
    }

    function onContentChange(e) {  // 내용 입력란의 값이 변경될 때 호출됩니다.
        setContent(e.target.value);
    }


    function onClick(e) {
        e.preventDefault()
        // axios.get('http://localhost:4000/api/userName')
        //     .then((res) => {
        //         userName = res.data
        //     })
        //     .catch((error) => {
        //         console.error(error, 'name 전송 오류')
        //     });
        const data = {  // 서버에 보낼 데이터입니다.
            title: title,
            content: content,
            // userName: userName,
            date: new Date(),
        };
        axios.post('http://localhost:4000/api/CreateBoard', data)  // 서버에 POST 요청을 보냅니다.
            .then(() => {
                navigate('/board');
                console.log('게시판 데이터 전송 성공')
            })
            // 요청이 성공하면 '/board'로 이동합니다.
            .catch((error) => console.error('Failed to save the board:', error));  // 요청이 실패하면 오류를 출력합니다
    }

    return (
        <div>
            <Navbar></Navbar>
            <form className={styles.form} onSubmit={onClick} >
                <div className={styles.h1}>글쓰기</div>
                <input required type="text" placeholder='제목' className={styles.inputTitle} onChange={onTitleChange} />
                <input required type="text" placeholder='내용을 입력해 주세요' className={styles.inputContent} onChange={onContentChange} />
                <button className={styles.button} >저장</button>
            </form>
        </div>
    );
}

export default CreateBoard; 