import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Subscribed } from './subscribed.model';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        @InjectModel(Subscribed.name) private subscribedModel: Model<Subscribed> 
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
               


            return user;
        }
        throw new Error(`User with chatId ${chatId} not found`);
    }


    async updateUserLocation(chatId: number, location: string): Promise<void> {
        try {
            const user = await this.userModel.findOne({ chatId });
            if (user) {
                user.location = location;
                await user.save();
            }
        } catch (error) {
           throw new Error(`User with chatId ${chatId} not found`);
        }
}
async getUserLocation(chatId: number): Promise<string> {
    try {
        const user = await this.userModel.findOne({ chatId });
        return user ? user.location : null;
    } catch (error) {
        
       throw new Error(`User with chatId ${chatId} not found`);
    }
}


async getUser(id: string): Promise<User> {
    try {
        const user = await this.userModel.findById(id);
        return user;
    } catch (error) {
        
       throw new Error(`User with chatId `);
    }
}

async addToSubscribedModel(chatId: number): Promise<void> {
    // Find the user by their chatId
    const user = await this.userModel.findOne({ chatId: chatId }).exec();
    if (!user) {
        throw new Error('User not found');
    }

    
    const isSubscribed = await this.subscribedModel.findOne({ users: user._id }).exec();
    if (isSubscribed) {
        throw new Error('User already subscribed');
    }

    const subscribed = new this.subscribedModel({
        users: [user._id],
    });

    await subscribed.save();
}

async checkIfUserSubscribed(chatId: number): Promise<boolean> {
    
    const subscribedUser = await this.subscribedModel.findOne({ chatId: chatId }).exec();
    return !!subscribedUser;
}

async getSubscribedUsers():Promise<User[]> {
    const subscribedUsers = await this.subscribedModel.find().populate('users').exec();
   return subscribedUsers.map((subscribed) => subscribed.users).flat();


}



}