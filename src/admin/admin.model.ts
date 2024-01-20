import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({
    timestamps: true,
})
export class Admin extends Document {
    @Prop()
    name: string;

    @Prop({ unique: true })
    email: string;

    @Prop({ default: false, type: Boolean })
    isAdmin: boolean;

    @Prop()
    photo: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);