const { Router } = require("express");
const { getComments, deleteComment, addComment } = require('../controllers/commentController');
const { verifyToken } = require("../auth/authfunctions");

const commentRouter = Router();

commentRouter.get("/:postid", async (req, res) => {
    const comments = await getComments(req.params.postid);
    res.json(comments);
});

commentRouter.delete("/:commentid", verifyToken, async (req, res) => {
    await deleteComment(req.params.commentid);
    res.sendStatus(200);
});

commentRouter.post("/:postid", async (req, res) => {
    const result = await addComment(req.body.content, req.body.commentorname, req.params.postid);
    if (result == 0) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(400);
    }
});

module.exports = commentRouter;