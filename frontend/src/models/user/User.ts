import Signup from "./Signup";

export default interface User extends Signup{
    id: string
    createdAt: string
    updatedAt: string
}