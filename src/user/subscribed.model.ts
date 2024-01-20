import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document,Types } from "mongoose";
import { User } from "src/user/user.model";


export type SubscribedDocument = Subscribed & Document


@Schema({
    timestamps: true,
})


export class Subscribed extends Document{
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: User[];


}

export const SubscribedSchema = SchemaFactory.createForClass(Subscribed);