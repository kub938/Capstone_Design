const express = require('express')
const cors = require('cors');
const PORT = 4000
const app = express()
const { connectToDb, getDb } = require('./db.cjs')
const mongoose = require('mongoose');
const url = "mongodb+srv://kub938:qo9331411@cluster0.yif4ztm.mongodb.net/?retryWrites=true&w=majority";
const User = require('./User.cjs')
const bcrypt = require('bcrypt');
const path = require('path');
const axios = require('axios')
const Schema = mongoose.Schema;

let userId = ''


//----------------db 세팅----------------------------
const BoardSchema = new mongoose.Schema({
    title: String,
    date: Date,
    content: String
});

const CourseSchema = new mongoose.Schema({
    path: [],
    id: {},
});


const Board = mongoose.model('Board', BoardSchema);
const Course = mongoose.model('Course', CourseSchema);
//-----------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
///--------------------------------------------------------------

let db

connectToDb((err) => {
    if (!err) {
        console.log("Db connect success")
        db = getDb()
    }
})
app.get('/api/boards', async (req, res) => {

    try {
        const boards = await Board.find({}).sort({ date: -1 }).limit(10); // 최근 게시글 10개를 가져옵니다.
        res.json(boards);
        console.log(boards)
    } catch (error) {
        console.error('Failed to fetch boards:', error);
        res.status(500).json({ error: '게시글을 가져오는데 실패하였습니다' });
    }
});

app.get('/api/boards/:id', async (req, res) => {
    try {
        const board = await Board.findById(req.params.id);
        if (!board) {
            return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
        }
        res.json(board);
    } catch (error) {
        console.error('Failed to fetch board:', error);
        res.status(500).json({ error: '게시글을 가져오는데 실패하였습니다' });
    }
});


app.post('/api/CreateBoard', async (req, res) => {
    const { title, content, date } = req.body;
    try {
        const newBoard = new Board({
            title, content, date // 현재 시간을 저장합니다.
        });
        await newBoard.save();
        res.status(201).json(newBoard); // 성공적으로 저장되면 저장된 객체를 응답에 담아 보냅니다.
    } catch (error) {
        console.error('Error creating board:', error);
        res.status(500).json({ error: '게시글 저장 오류' });
    }
})


app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // 이미 등록된 이메일인지 확인
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(410).json({ error: '이미 등록된 이메일입니다.' });
        }
        else if (existingUser === '') {
            return res.status(411, '이메일을 입력해 주십시오')
        }
        if (name === "" || email === '' || password === '') {
            return res.status(500)
        }

        // 새로운 사용자 생성
        const newUser = new User({ name, email, password });
        await newUser.save();
        console.log("User Saved", newUser)

        res.status(201).json(newUser); // Created user data is sent back as response

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: '회원가입 오류' }); // Send an error message if there's a problem
    }
});


app.post('/api/CourseData', async (req, res) => {
    const { path, id } = req.body;
    try {
        const newCourse = new Course({
            path, id: userId
        });
        console.log(id)
        await newCourse.save();
        res.status(201).json(newCourse); // 성공적으로 저장되면 저장된 객체를 응답에 담아 보냅니다.
    } catch (error) {
        console.error('Error creating board:', error);
        res.status(500).json({ error: '게시글 저장 오류' });
    }
})
// //회원가입 데이터 추가
// app.post('/api/signup', (req, res) => {
//     const { name, email, password } = req.body;
//     console.log('req.body : ', req.body);

//     User.create({ name: name, email: email, password: password })
//         .then(user => {
//             console.log('User created:', user);
//             res.status(201).json(user);  // Created user data is sent back as response
//         })
//         .catch(err => {
//             console.error('Error creating user:', err);
//             res.status(500).json({ error: '회원가입 오류' });  // Send an error message if there's a problem
//         });
// });

//로그인


app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("req.body: ", req.body);
    try {
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        console.log(user.password, password)
        if (!(user.password === password)) {
            return res.status(402).json({ error: 'Invalid email or password' });
        }


        res.json({
            success: true,
            message: 'Logged in successfully',
            user_id: user._id,
            user_email: user.email,
        });

        userId = user.email

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

app.get('/api/userId', (req, res) => {
    res.json({ userId: userId });
})



//회원가입 데이터 조회
app.get('/api/users/email', (req, res) => {
    User.find({})
        .then(users => {
            console.log('All users:', users);
            res.status(200).json(users);  // Send the list of all users as response
        })
        .catch(err => {
            console.error('Error retrieving users:', err);
            res.status(500).json({ error: 'An error occurred while retrieving the users' });  // Send an error message if there's a problem
        });
});



//-----------------------------------------------------------
//검색 데이터 뽑기
let dataStore = '';

app.post('/api/mainsearch', async (req, res) => {
    const name = req.body.name;
    try {
        dataStore = name;
        res.send(console.log('서버 데이터 수신 완료', dataStore));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '검색 오류' });
    }
});




//--------------maplist용 api 요청----------------------------
const client_id = 'nBcrF_omljd_AL2WOV0n'
const client_secret = 'QuroIWuHzI'
let roadaddress = []
let localData = ''
let category = ''
app.get('/search/local', async (req, res) => {
    let buttonId = req.query.id;
    if (buttonId === 'button1') {
        category = '식당'
    }
    else if (buttonId === 'button2') {
        category = '관광명소'
    }
    else if (buttonId === 'button3') {
        category = '호텔'
    }
    else {
        category = ''
    }

    let api_url = 'https://openapi.naver.com/v1/search/local?query=' + encodeURI(dataStore + category) + '&display=12&start=1&sort=random'; // JSON 결과
    let options = {
        url: api_url,
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
    };



    try {
        const response = await axios.get(api_url, options);
        arrRoad = response.data.items
        for (let i = 0; i < arrRoad.length; i++) {
            roadaddress.push(response.data.items[i].address)
        }
        // console.log(localData);
        res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
        res.end(JSON.stringify(response.data));

    } catch (error) {
        if (error.response) {
            // 서버가 2xx 이외의 상태 코드로 응답했을 때
            console.log('Error', error.response.status);
            res.status(error.response.status).end();
        } else if (error.request) {
            // 요청은 보냈지만 응답을 받지 못했을 때
            console.log('No response', error.request);
            res.status(500).end();
        } else {
            // 요청 자체가 만들어지지 않았거나 다른 문제가 발생했을 때
            console.log('Error', error.message);
            res.status(500).end();
        }
    }
});





app.get('/api/roadAddress', async (req, res) => {
    let arrRoadAddress = new Array(5);
    let requests = [];

    for (let i = 0; i < 5; i++) {
        var road_url = 'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=' + encodeURI(roadaddress[i]);
        var road_options = {
            uri: road_url,
            headers: {
                "Content-Type": "application/json",
                "X-NCP-APIGW-API-KEY-ID": "8gyi4oq980",
                "X-NCP-APIGW-API-KEY": "GcfPkL4YmbimXsu8cLvA41h7dWMQ5HhmSLIaML2a",
            }
        };

        requests.push(
            axios.get(road_url, road_options)
                .then(response => {
                    arrRoadAddress[i] = response.data.addresses;
                    console.log(response.data.addresses, 'CoordData 전송 성공');
                })
                .catch(errorMessage => {
                    console.error('실패', errorMessage);
                })
        );
    }

    Promise.all(requests)
        .then(() => res.json(arrRoadAddress))
        .catch(error => res.status(500).json({ error: 'An error occurred' }));

    arrRoadAddress = [];
    roadaddress = [];
});




//------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});











//------------------------------------------
// const todoList = [
//     {
//         id: 1,
//         text: '할일 1',
//         done: false,
//     },
// ];
// app.get('/', () => {
//     console.log('Hello')
// })

// app.get('/api/todo', (req, res) => {
//     res.json(todoList)
// })



// app.post('/api/todo', (req, res) => {
//     const { text, done } = req.body;
//     console.log('req.body : ', req.body);
//     todoList.push({
//         id: id++,
//         text,
//         done,
//     });
//     return res.send('success');
// });

// app.listen(4000, () => {
//     console.log('server start!!');
// })

// const localSearch = ''

// app.get('/map', (req, res) => {
//     const { text } = req.body;
//     console.log('입력된 데이터 : ', req.body);
//     localSearch.push({
//         text,
//     });
//     return res.send(text);
// })






//-------------------------------------------

// app.get('/', (req, res) => res.send('Hello World!'))



// app.use(express.urlencoded({ extended: true }))

// app.use(express.static(path.join(__dirname, '../build')));

// // app.use(express.json());
// // app.use(cors());

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build/index.html'));
// })

// app.get('/product', (req, res) => {
//     res.json({ name: 'black shoes' }); // 형태 그대로 출력
// })
// //product는 주소
// //DB데이터 리엑트에서 보여주는법 react에서는 서버에서 DB에 있는 데이터를 뽑은다음 react 보낸후 react가 html을 만들어 준다.
// //html을 서버가 만들면 server-side rendering, html을 리액트(JS)가 만들면 client-side rendering 이라한다.

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build/index.html'));
// }) //index.html이 아닌 다른 경로를 불러올때 필요(여러페이지일 경우)