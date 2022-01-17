import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../interface/user.interface';
import { Model } from 'mongoose';
import { JwtPayload } from '../interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('USER_MODEL')
    private authModel: Model<User>,
  ) {
    super({
      //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: (req) => {
        // console.log(req);
        // console.log(req.cookies['access_token']);
        if (!req || !req.cookies) {
          return null;
        }
        return req.cookies['access_token'];
      },
      ignoreExpiration: false,
      secretOrKey: 'abcdefghijklmnopsdsdbsb',
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user = await this.authModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('error in jwt-strategy');
    }

    return user;

    // return { userId: payload.sub, username: payload.username };
  }
}
