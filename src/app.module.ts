import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TelegramModule } from './telegram/telegram.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:[".local.env"]

    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(ConfigService:ConfigService)=>({
          uri:ConfigService.get("MONGO_URL")

      }),
      inject:[ConfigService]
    }),

      
    UserModule, TelegramModule, AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
