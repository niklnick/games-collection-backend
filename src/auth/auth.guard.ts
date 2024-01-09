import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token: string = this.extractToken(context.switchToHttp().getRequest<Request>());

    if (!token) throw new UnauthorizedException();

    try {
      await this.jwtService.verifyAsync(token, { secret: this.configService.get<string>('JWT_SECRET') });
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractToken(request: Request): string | null {
    const [type, token]: string[] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
