import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getComments(postid) {
    const comments = await prisma.comment.findMany({
        where: {
            postId: parseInt(postid)
        }
    });
    return comments
}

async function deleteComment(commentid) {
    await prisma.comment.delete({
        where: {
            id: parseInt(commentid)
        }
    });
}


async function addComment(content, commentorname, postid) {
    if (!content || !commentorname || !postid) {
        return 1
    }
    console.log(content)
    console.log(commentorname)
    console.log(postid)
    await prisma.comment.create({
        data: {
            content: content,
            commentorName: commentorname,
            postId: parseInt(postid)
        }
    });
    return 0
}

export { getComments, deleteComment, addComment };