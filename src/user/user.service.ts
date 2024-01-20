import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { promises } from 'dns';


@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {

    }


    async findOrCreateUser(chatId: number, userName: string): Promise<User> {




        const user = await this.userModel.findOne({ chatId })






        if (!user) {
            const user = await this.userModel.create({
                chatId: chatId,
                name: userName,
                subscribed: false
            });
            await user.save();
            return user

        }

    }


    async subscribeUser(chatId: number): Promise<User> {
      
        const user = await this.userModel.findOneAndUpdate({ chatId }, { subscribed: true }, { new: true });
    
        
        if (user) {
           
            //update the user 

            return user;
        }
    
       
        throw new Error(`User with chatId ${chatId} not found`);
    }




}