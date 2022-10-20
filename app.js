const express = require('express');
const app = express();
const PORT = 8080;
const signupRouter = require('./routes/signup.routes');
const postsRouter = require('./routes/posts.routes');
const commentsRouter = require('./routes/comments.routes');



app.use(express.json());

app.use("/",[signupRouter,postsRouter,commentsRouter]);


app.listen(PORT, () => {
    console.log(`${PORT} 에 연결되었습니다.`)
})
