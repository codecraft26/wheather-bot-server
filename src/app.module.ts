import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TelegramModule } from './telegram/telegram.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:[".local.env"]

    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(ConfigService:ConfigService)=>({
          uri:ConfigService.get("MONGO_URL")

      }),
      inject:[ConfigService]
    }),

      
    UserModule, TelegramModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
