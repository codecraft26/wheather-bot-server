import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { AuthGuard } from '@nestjs/passport'


@Controller()
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    








}





