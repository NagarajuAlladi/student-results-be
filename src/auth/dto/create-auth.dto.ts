import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    type: String,
    description: 'Name of the User',
    default: '',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description:
      'UserName of the User ,should be not less than 5 or not longer than 20 also should be unique',
    default: '',
  })
  @MinLength(5)
  @MaxLength(20)
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    description: 'Email of the user',
    default: '',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Department of the user',
    default: '',
  })
  dept: string;

  @ApiProperty({
    type: String,
    description:
      'Password should not be lesser than 8 or longer than 20 and also use uppercase & lowercase & specialCharecter combination',
    default: '',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be atleast 8 characters' })
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is very weak',
  })
  password: string;

  @ApiProperty({
    type: String,
    description:
      'Password should not be lesser than 8 or longer than 20 and also use uppercase & lowercase & specialCharecter combination',
    default: '',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be atleast 8 characters' })
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is very weak',
  })
  confirmPassword: string;
}
