import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    name: string;
    chatId: number;
    subscribed: boolean;
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    chatId: {
        type: Number,
        required: true
    },

    subscribed:{
        type: Boolean,
        default: false
    }
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
