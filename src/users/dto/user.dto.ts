export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  profilePicture?: string;
}

export class UpdateUserDto {
  id: string;
  username?: string;
  email?: string;
  profilePicture?: string;
}
