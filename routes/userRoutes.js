const { Router } = require("express");
const { addUser, getUsers } = require('../controllers/userController');

const userRouter = Router();

userRouter.post("/", async (req, res) => {
    await addUser(req.body.username, req.body.password, req.body.isauthor);
    res.sendStatus(200);
});

userRouter.get("/", async (req, res) => {
    const users = await getUsers();
    res.send(users);
})

module.exports = userRouter;