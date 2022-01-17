import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './interface/user.interface';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { AuthCredentials } from './dto/auth-credential.dto';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL')
    private authModel: Model<User>,
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredintials: CreateAuthDto): Promise<User> {
    const { password, confirmPassword } = authCredintials;

    if (password === confirmPassword) {
      const regularUser = await this.userRepository.validateUser(
        authCredintials,
      );

      if (regularUser) {
        const user = new this.authModel(authCredintials);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        return user;
      } else {
        throw new ConflictException('user already exist');
      }
    } else {
      throw new BadRequestException('password Mismatched');
    }
  }

  async signIn(authCredintials: AuthCredentials): Promise<string> {
    const user = await this.userRepository.validateUserPassword(
      authCredintials,
    );

    const payload: JwtPayload = {
      name: user.name,
      username: user.username,
      email: user.email,
      dept: user.dept,
      password: user.password,
      isTeacher: user.isTeacher,
    };

    const accessToken = await this.jwtService.sign(payload);
    // console.log('token is ', accessToken);
    return accessToken;
  }

  async findOne(email: string): Promise<User> {
    const user = this.authModel.findOne({ email });

    return user.select({ password: 0 });
  }
}
