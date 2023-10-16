const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kub938:qo9331411@cluster0.yif4ztm.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require('mongoose');
let dbConnection

module.exports = {
    connectToDb: (cb) => {
        mongoose.connect('mongodb://localhost:27017/capston')
            .then(() => {
                dbConnection = mongoose.connection;
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },         //처음 데이터 베이스를 연결한뒤에 실행
    getDb: () => dbConnection,               //연결 반환
}




// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }













// const { MailRounded } = require('@mui/icons-material');
// const { MongoClient, ServerApiVersion } = require('mongodb');

// main().catch(err => console.Console.log(err));

// async function main() {
//     await mongoose.connect(uri);
// }

// const userSchema = new mongoose.Schema({
//     name: String,
//     password: String,
//     email: String
// });

// const user = mongoose.model({
//     name: 'kittchen',
//     password: 'ojosadf',
//     email: 'kb@nbaver.com'
// }, userSchema)

// console.log(user)







// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// // const client = new MongoClient(uri, {
//     //     serverApi: {
//     //         version: ServerApiVersion.v1,
//     //         strict: true,
//     //         deprecationErrors: true,
//     //     }
//     // });


// // async function run() {
// //     try {
// //         // Connect the client to the server	(optional starting in v4.7)
// //         await client.connect();
// //         // Send a ping to confirm a successful connection
// //         await client.db("admin").command({ ping: 1 });
// //         console.log("Pinged your deployment. You successfully connected to MongoDB!");
// //     } finally {
// //         // Ensures that the client will close when you finish/error
// //         await client.close();
// //     }
// // }
// // run().catch(console.dir);

