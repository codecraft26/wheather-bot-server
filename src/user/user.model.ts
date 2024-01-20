import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { Document } from 'mongoose';

export type UserDocument = User & Document
@Schema({
    timestamps: true,
})
export class User extends Document {
    @Prop()
    name: string;
    @Prop()
    chatId: number;
    @Prop()
    subscribed: Boolean
    @Prop()
    location:string
}


export const UserSchema = SchemaFactory.createForClass(User);
