//const { application } = require('express');
const express=require('express')
const router = express.Router();

const jwt = require('jsonwebtoken');
const Joi = require("joi")

const {Users} = require('../models'); //시퀄라이즈는 변수에 중괄호

const ckNickname = /^[a-zA-Z0-9]{3,10}$/; 
const ckPassword = /^[a-zA-Z0-9]{4,30}$/;
const userSchema = Joi.object
    ({
     nickname: Joi.string().pattern(ckNickname).required(),
     password: Joi.string().pattern(ckPassword).required(),
     confirm: Joi.string(),
     });



router.post('/',async(req,res)=>{
    const {nickname,password,confirm}=req.body;

    const checkJoi = {nickname,password,confirm}
    
    try{
        await userSchema.validateAsync(checkJoi);
    } catch(err){
        res.status(400).send({errorMessage : err.message})
        return;       
    }

    if (password.search(nickname) > -1) { 
        res.status(400).send({ errorMessage: "비밀번호에 닉네임이 포함되어있습니다." }) 
    return;
 }
    if(password!==confirm){
        res.status(400).send({ errorMessage: "비밀번호가 비밀번호 확인란과 일치하지 않습니다."
    });
    return;
    }





    const user=new Users({nickname,password})
    await user.save();
    res.status(200).send({
        user
    })
})

router.post('/login',async(req,res)=>{
    const {nickname,password}=req.body;
    const users= await Users.findOne({
        where:{nickname}})



if (!users || password !== users.password) { // user 없거나 비번 다르면
    res.status(400).send({
    errorMessage: "닉네임 또는 패스워드를 확인해주세요.",
    });
    return;
    }

   res.send({ // 토큰값 받기
    token: jwt.sign({ userId: users.userId }, "my-secret-key"),
    });

})


module.exports=router;
