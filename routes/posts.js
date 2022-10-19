const express= require('express');
const router=express.Router()

const {Posts}=require('../models');
const authMiddleware=require('../middlewares/auth-middleware');
const posts = require('../models/posts');


//게시글 작성

router.post('/posts',authMiddleware,async(req,res)=>{
    const{title,content}=req.body;
    const {nickname,userId}=res.locals.user;
    
    const createPost = await Posts.create({title,content,nickname,userId});
    res.status(200).send({
        createPost
    })
})
//게시글 조회
router.get('/posts',async(req,res)=>{
    const postFindAll=await Posts.findAll({
        attributes : {exclude: ['content']}, 
        order: [['createdAt', 'DESC']], // sequelize 문법 , findAll로 게시글을 찾는 데 content 제외하고 시간순으로 보여줘!!라는 의미
    
    })
    res.status(200).send({
        postFindAll
    })
    
})
//게시글 상세조회
router.get('/posts/:postsId',authMiddleware,async(req,res)=>{
    const {postsId}=req.params;
    const post=await Posts.findOne({where:{postsId}});
    res.json({
       post
    })
})
//게시글수정
router.put('/posts/:postsId',authMiddleware,async(req,res)=>{
    const {postsId}=req.params;
    const {title,content}=req.body;
    const updatePost=await Posts.update({title,content},{where:{postsId}});
    res.status(200).send({
        updatePost
    })

})

//게시글 삭제
router.delete('/posts/:postsId',authMiddleware,async(req,res)=>{
    const {postsId}=req.params;
    const deletePost=await Posts.destroy({where:{postsId}});
    res.status(200).send({
        deletePost
    })
})

module.exports =router