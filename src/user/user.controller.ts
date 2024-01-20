import { Controller, Get,Injectable, Post ,Body, Patch} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }


    //create a post controller for creating a new user
 @Patch()
 async CreateUser():Promise<User>{




   return this.userService.subscribeUser(752173307)




 }



   



}
