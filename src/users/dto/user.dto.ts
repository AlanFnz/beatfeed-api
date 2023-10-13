export class CreateUserDto {
  username: string;
  email: string;
}

export class UpdateUserDto {
  id: string;
  username?: string;
  email?: string;
}
