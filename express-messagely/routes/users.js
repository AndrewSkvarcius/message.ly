/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/


/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/


/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/


/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

 const Router = require("express").Router;
 const router =  new Router();
 const {ensureLoggedIn, ensureCorrectUser} = require("../middleware/auth");
 
 const User = require("../models/user");
 const {SECRET_KEY} = require("../config");
 const ExpressError= require("../expressError");
 
//GET list of users
 router.get("/", ensureLoggedIn, async (req,res,next)=> {
    try{
        let users = await User.all();
        return res.json([users]);
    }
    catch(e){
        return next(e);
    }
 })

 // GET details of users
router.get("/:username", ensureCorrectUser, async(req,res,next)=>{
    try{
        let user = await User.get(req.params.username);
        return res.json({user});
    }
    catch(e){
        return next(e);
    }
});

//GET messages to user
router.get("/:username/to", ensureCorrectUser, async (req, res ,next)=>{
    try{
        let message = await User.messagesTo(req.params.username);
        return res.json({message});
    }
    catch(e){
        return next(e);
    }
})

//GET message from user
router.get("/:username/from", ensureCorrectUser, async (req, res ,next)=>{
    try{
        let message = await User.messagesFrom(req.params.username);
        return res.json({message});
    }
    catch(e){
        return next(e);
    }
})
 module.exports = router;