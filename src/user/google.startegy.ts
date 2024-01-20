import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';

import { Strategy ,VerifyCallback} from 'passport-google-oauth20';


export class GoogleStrategy extends PassportStrategy(Strategy,'google'){
    constructor(
        private readonly configService:ConfigService

    ){
        super({
            clientID:'714463495336-u7uvskqrb3j9e1ntft4tccob66ramoft.apps.googleusercontent.com',
            clientSecret:'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',
            callbackURL:'https://wheather-updates.onrender.com/auth/google/callback',
            scope:['email','profile','name']
        });
    }


    async validate(accessToken:string,refreshToken:string,profile:any,done:VerifyCallback):Promise<any>{
       const {name ,emails,Photos} = profile;
         const user = {
              email:emails[0].value,
              firstName:name.givenName,
              lastName:name.familyName,
              picture:Photos[0].value,
              accessToken
         };
         done(null,user);


}
}