import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function addUser(username, password, isauthor) {
    await prisma.user.create({
        data: {
            username: username,
            password: password,
            isAuthor: isauthor
        }
    });
}

async function getUsers() {
    const users = await prisma.user.findMany({});
    return users;
}

export { addUser, getUsers }