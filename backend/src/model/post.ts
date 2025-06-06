import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./user";
import Comment from "./comment";


@Table({
    underscored: true
})

export default class Post extends Model {
    //primary key
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    //popular columns
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId: string
    
    @AllowNull(false)
    @Column(DataType.STRING(40))
    title: string

    @AllowNull(false)
    @Column(DataType.TEXT)
    body: string

    @AllowNull(true)
    @Column(DataType.TEXT)
    imageUrl: string

    //relationships
    @BelongsTo(() => User)
    user: User

    @HasMany(() => Comment)
    comments: Comment[]
}