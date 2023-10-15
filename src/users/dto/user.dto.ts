import { IsEmail, IsOptional, IsString, Length, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 50)
  username: string;

  @IsString()
  @Length(8, 100)
  password: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}

export class UpdateUserDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  @Length(3, 50)
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}
