const express = require('express');
const router = express.Router();

const {Comments}=require('../models');
const authMiddleware = require('../middlewares/auth-middleware');
const comments = require('../models/comments');


//댓글작성
router.post('/comments/:postsId',authMiddleware,async(req,res)=>{
    const{postsId} = req.params;
    const {comments}=req.body;
    const {userId,nickname}=res.locals.user
    
    const createComment= await Comments.create({comments,userId,nickname,postsId});
    res.status(201).json({
        createComment
    });
})

//댓글 조회
router.get('/comments',async(req,res)=>{
    const commentFindAll =await Comments.findAll({
        ttributes : {exclude: ['comments']}, 
        order: [['createdAt', 'DESC']],
    })
    res.status(200).json({
        commentFindAll
    })
})

//댓글 상세조회
router.get('/comments/:commentsId',async(req,res)=>{
    const {commentsId} = req.params;
    const comment=await Comments.findOne({where:{commentsId}});
    res.json({
        comment
    })
})

//댓글 수정 '

router.put('/comments/:commentsId',authMiddleware,async(req,res)=>{
    const {commentsId} = req.params;
    const {comments}=req.body;
    const updateComment=await Comments.update({comments},{where:{commentsId}});
    res.status(200).json({
        updateComment
    })
})

//댓글 삭제 
router.delete('/comments/:commentsId',authMiddleware,async(req,res)=>{
    const{commentsId}= req.params;
    const deleteComment=await Comments.destroy({where:{commentsId}});
    res.status(200).json({
        deleteComment
    
    })
})



module.exports=router;
