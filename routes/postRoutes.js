const { Router } = require("express");
const { getPosts, deletePost, addPost, updatePost, getSpecificPost } = require('../controllers/postController');
const { verifyToken } = require("../auth/authfunctions");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const postRouter = Router();

postRouter.get("/", async (req, res) => {
    console.log("called");
    const posts = await getPosts();
    console.log(posts);
    res.json(posts);
});

postRouter.get("/:postid", async (req, res) => {
    console.log("Getting specific post");
    const post = await getSpecificPost(req.params.postid);
    res.json(post);
})

postRouter.delete("/:postid", verifyToken, async (req, res) => {
    await deletePost(req.params.postid);
    res.sendStatus(200);
});

postRouter.post("/", verifyToken, async (req, res) => {
    console.log("Called post post");
    jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
        if(err) {
            return res.sendStatus(403);
        }
        try {
            const result = await addPost(req.body.title, req.body.content);
            if (result == 0) {
                return res.sendStatus(200);
            } else {
                return res.sendStatus(400);
            }
        }
        catch (err) {
            return res.send(500);
        }
    })
    /*
    const result = await addPost(req.body.title, req.body.content);
    if (result == 0) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(400);
    }
    */
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