import React from 'react';
import styles from './Login.module.css'

function LoginPage(props) {

    return (
        <div className={styles.Container}>
            <div>로그인</div>
            <div>
                <input type="text" />
            </div>
            <div>
                <input type="password" />
            </div>
        </div>

    );
}

export default LoginPage