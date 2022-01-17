// import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Model } from 'mongoose';
// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { JwtPayload } from '../interface/jwt-payload.interface';
// import { User } from '../interface/user.interface';

// @Injectable()
// export class AuthStrategy extends PassportStrategy(Strategy) {
//   constructor(@Inject('USER_MODEL') private authModel: Model<User>) {
//     super({
//       jwtFromRequest: (req) => {
//         if (!req || !req.cookies) return null;
//         console.log(req.cookies);
//         return req.cookies['access_token'];
//         // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       },
//       ignoreExpiration: false,
//       secretOrKey: 'abcdefghijklmnopsdsdbsb',
//     });
//   }

//   async validate(payload: JwtPayload) {
//     const { username } = payload;
//     const user = await this.authModel.findOne({ username });

//     if (!user) {
//       throw new UnauthorizedException('error in jwt strategy');
//     }

//     return user;
//   }
// }

import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../interface/user.interface';
import { JwtPayload } from '../interface/jwt-payload.interface';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('USER_MODEL')
    private authModel: Model<User>,
  ) {
    super({
      jwtFromRequest: (req) => {
        // console.log(req);
        console.log(req.cookies['access_token']);
        if (!req || !req.cookies) {
          return null;
        }
        return req.cookies['access_token'];
      },
      ignoreExpiration: false,
      secretOrKey: 'abcdefghijklmnop',
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user = await this.authModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('error in jwt-strategy');
    }

    return user;
    // return { username: payload.username , role: payload.roles }
  }
}
