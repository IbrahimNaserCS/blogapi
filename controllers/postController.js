const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getPosts() {
    const posts = await prisma.post.findMany({});
    return posts
}

async function deletePost(postid) {
    await prisma.comment.deleteMany({
        where: {
            postId: parseInt(postid)
        }
    })
    await prisma.post.delete({
        where: {
            id: parseInt(postid)
        }
    });
}

async function updatePost(postid, newtitle, newcontent) {
    if (!postid || !newtitle || !newcontent) {
        return 1;
    }
    await prisma.post.update({
        where: {
            id: parseInt(postid)
        },
        data: {
            title: newtitle,
            content: newcontent
        }
    });
    return 0;
}

async function addPost(title, content) {
    if (!title || !content) {
        return 1;
    }
    await prisma.post.create({
        data: {
            title: title,
            content: content,
        }
    });
    return 0;
}

module.exports = {
    getPosts,
    deletePost,
    addPost,
    updatePost
  };
  