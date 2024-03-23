export interface IUserRegistrationDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserLoginDto {
  email: string;
  password: string;
}
