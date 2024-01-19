import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TelegramModule } from './telegram/telegram.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://aman:aman@cluster0.suqkggz.mongodb.net/?retryWrites=true&w=majority"),
UserModule,TelegramModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
