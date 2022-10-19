const express = require('express');
const app = express();
const PORT = 8080;
const signupRouter = require('./routes/signup');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');



app.use(express.json());

app.use([signupRouter,postsRouter,commentsRouter]);


app.listen(PORT, () => {
    console.log(`${PORT} 에 연결되었습니다.`)
})
