import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { Document } from 'mongoose';

export type AdminDocument = Admin & Document
@Schema({
    timestamps: true,
})
export class Admin extends Document {
    @Prop()
    name: string;
    @Prop()
    email:string
    @Prop()
    isAdmin:Boolean
    @Prop()
    Image:string
}


export const AdminSchema = SchemaFactory.createForClass(Admin);
