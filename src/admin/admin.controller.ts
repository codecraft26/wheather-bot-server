import { Controller, Delete, Get,Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport'
@Controller()
export class AdminController {

    constructor(private readonly adminService:AdminService){}


    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
    }


    @Get('auth/google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return this.adminService.googleLogin(req)
    }


    @Get('admin/users')
    async getAllUsers() {
        return this.adminService.getAllUsers();
    }
    @Get('admin/user/:id')

    async getUser(@Req() req) {
        return this.adminService.getUser(req.params.id);
    }

    @Delete('admin/user/:id')
    async deleteUser(@Req() req) {
        return this.adminService.deleteUser(req.params.id);
    }


    
}






    




