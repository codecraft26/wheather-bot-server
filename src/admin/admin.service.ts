import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './admin.model';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.model';


@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
        private readonly userService: UserService

        
    ) {}

    async googleLogin(req) {
        if (!req.user) {
            return 'No user from google';
        }

        try {
            let admin = await this.adminModel.findOne({ email: req.user.email });
            if (!admin) {
                admin = new this.adminModel({
                    name: req.user.firstName,
                    email: req.user.email,
                    photo: req.user.photo,
                    isAdmin: true
                });
                await admin.save();
            }
                console.log(req.user);
            return admin;
        } catch (error) {
            // Handle errors here
            console.error(error);
            throw error;
        }
    }


    async getAllUsers(): Promise<User[]> {
        const users = await this.userService.getAllUsers();
        return users;
    }

    async getUser(id:string): Promise<User> {
        const user = await this.userService.getUserById(id);
        return user;
    }

    async deleteUser(id:string): Promise<User> {
        const user = await this.userService.deleteUser(id);
        return user;
    }










}
