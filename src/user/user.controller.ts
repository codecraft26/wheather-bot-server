import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { AuthGuard } from '@nestjs/passport'


@Controller()
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {

    }


    @Get('auth/google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return this.userService.googleLogin(req)
    }
    








}





