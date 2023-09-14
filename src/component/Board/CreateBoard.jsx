import * as React from 'react';
import Button from '@mui/material/Button';



function CreateBoard() {

    return (
        <div>
            <form >
                <input type="text" placeholder='제목' />
                <input type="text" placeholder='내용' />
                <Button>저장</Button>
            </form>
        </div>
    );
}

export default CreateBoard; 