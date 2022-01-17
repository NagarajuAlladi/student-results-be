import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentials } from './dto/auth-credential.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './interface/user.interface';
import { Response, Request } from 'express';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  @ApiCreatedResponse({ description: 'this response has created successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  signUp(
    @Body(new ValidationPipe()) authCredintials: CreateAuthDto,
  ): Promise<User> {
    return this.authService.signUp(authCredintials);
  }

  @Post('/signin')
  @ApiOkResponse({ description: 'The resource has been successfully returned' })
  @ApiForbiddenResponse({ description: 'Invalid credintials' })
  async signin(
    @Body(ValidationPipe) authCredintials: AuthCredentials,
    @Res() response: Response,
  ): Promise<string> {
    const token = await this.authService.signIn(authCredintials);

    response
      .cookie('access_token', token, {
        httpOnly: true,
        // domain: 'localhost', // your domain here!
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send(token);

    return token;
  }

  @ApiOkResponse({ description: 'User varified Successfully' })
  @ApiBadRequestResponse({ description: 'login failed' })
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');

    return {
      message: 'Logged out successfully',
    };
  }

  @Get('/cookies')
  findAll(@Req() request: Request) {
    // console.log(request.cookies);
    console.log(request.cookies['access_token']);
    // console.log(request.signedCookies);
  }

  @Get('/user')
  @ApiOkResponse({ description: 'User verified Successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorised User' })
  async user(@Req() request: Request) {
    // console.log(request.cookies)
    const cookies = request.cookies['access_token'];
    // console.log('cookies:', cookies);

    const data = await this.jwtService.verifyAsync(cookies);
    // console.log('data:', data);

    if (!data) {
      throw new UnauthorizedException();
    }
    const user = await this.authService.findOne(data.email);

    return user;
  }
}
