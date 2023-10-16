const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
})

// userSchema.pre('save', async function (next) {
//     const user = this;

//     // 비밀번호가 변경되지 않은 경우 다음 미들웨어로 진행
//     if (!user.isModified('password')) return next();

//     try {
//         // 비밀번호 해시화
//         const saltRounds = 10;
//         const hash = await bcrypt.hash(user.password, saltRounds);
//         user.password = hash;
//         next();
//     } catch (error) {
//         return next(error);
//     }
// });

module.exports = mongoose.model('User', userSchema);