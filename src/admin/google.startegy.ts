import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';

import { Strategy ,VerifyCallback} from 'passport-google-oauth20';


export class GoogleStrategy extends PassportStrategy(Strategy,'google'){
    constructor(
        private readonly configService:ConfigService

    ){
        super({
            clientID:'726279536040-5ktkb0p75amk1im4apnb226vpqmvsvv7.apps.googleusercontent.com',
            clientSecret:'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',
            callbackURL:'http://localhost:8000/auth/google/callback',
            scope:['email','profile']
        });
    }


    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        }
        done(null, user);


    }



}
