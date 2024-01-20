import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { GoogleStrategy } from './google.startegy';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './admin.model';
import { UserModule } from 'src/user/user.module';
@Module({

  imports: [

    UserModule,

    MongooseModule.forFeature([
      {
        name: 'Admin',
        schema: AdminSchema
      }
    ])
  ],
  controllers: [AdminController],
  providers: [AdminService,GoogleStrategy]
})
export class AdminModule {}
