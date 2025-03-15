const { Router } = require("express");
const { getPosts, deletePost, addPost, updatePost } = require('../controllers/postController');
const { verifyToken } = require("../auth/authfunctions");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const postRouter = Router();

postRouter.get("/", async (req, res) => {
    const posts = await getPosts();
    res.json(posts);
});

postRouter.delete("/:postid", verifyToken, async (req, res) => {
    await deletePost(req.params.postid);
    res.sendStatus(200);
});

postRouter.post("/", verifyToken, async (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if(err) { res.sendStatus(403) };
    })
    const result = await addPost(req.body.title, req.body.content);
    if (result == 0) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(400);
    }
});

postRouter.put("/:postid", verifyToken, async (req, res) => {
    const result = await updatePost(req.params.postid, req.body.newtitle, req.body.newcontent);
    if (result == 0) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

module.exports = postRouter;