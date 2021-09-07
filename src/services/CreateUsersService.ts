import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
    name: string;
    email: string;
    admin?:  boolean;
}

class CreateUsersService {
    async execute({name, email, admin}: IUserRequest){
        const usersRepository = getCustomRepository(UsersRepositories);

        if(!email) {
            throw new Error("Email incorrect")
        }

        const userAlreadyExists = await usersRepository.findOne({email});
        if(usersRepository){
            throw new Error("User already exists")
        }

        const user = usersRepository.create({
            name,
            email,
            admin
        })

        await usersRepository.save(user)

        return user;
    }
}

export {CreateUsersService};