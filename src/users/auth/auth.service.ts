import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { JwtPayload } from '../jwt/jwt-payload.interface';
import { User } from '../schemas/users.schema';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(email, password);

    if (user) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    return this.usersService.login(user);
  }

  async register(user: User) {
    const { username, email, password } = user;
    const existingUser = await this.usersService.findOneByEmail(email);

    if (existingUser) {
      return 'User with this email already exists';
    }

    await this.usersService.createUser(username, email, password);
    return 'User has been created';
  }

  async validateUserByJwt(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
