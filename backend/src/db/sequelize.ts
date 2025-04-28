import { Sequelize } from "sequelize-typescript";
import User from "../model/user";
import config from "config";
import Post from "../model/post";
import Comment from "../model/comment";
import Follow from "../model/follow";

const logging = config.get<boolean>('sequelize.logging') ? console.log : false


const sequelize = new Sequelize({
    models: [User, Post, Comment, Follow],
    dialect: 'mysql',
    ...config.get('db'),
    logging
})

export default sequelize