import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { AuthCredentials } from './dto/auth-credential.dto';
import { User } from './interface/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(@Inject('USER_MODEL') private authModel: Model<User>) {}

  async validateUser(authCredintials): Promise<boolean> {
    const { username, email } = authCredintials;

    const userExistWithName = await this.authModel.findOne({ username });

    const userExistWithEmail = await this.authModel.findOne({ email });

    if (userExistWithName === null && userExistWithEmail === null) {
      return true;
    } else {
      return false;
    }
  }

  async validateUserPassword(authCredintials: AuthCredentials): Promise<any> {
    const { username, password } = authCredintials;

    const user = await this.authModel.findOne({ username });

    if (user === null) {
      throw new UnauthorizedException('Invalid credintials');
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      } else {
        throw new BadRequestException('Invalid Credintials');
      }
    }
  }
}
