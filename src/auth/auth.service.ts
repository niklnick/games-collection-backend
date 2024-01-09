import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) { }

    async signup(signupDto: SignupDto): Promise<AuthDto> {
        if (await this.usersRepository.findOne({
            where: { email: signupDto.email }
        })) throw new ConflictException();

        const user: User = this.usersRepository.create({
            password: (await hash(signupDto.password, (await genSalt()))),
            ...signupDto
        });

        return {
            user: new ReadUserDto(await this.usersRepository.save(user)),
            token: await this.jwtService.signAsync({ sub: user.id })
        };
    }

    async login(loginDto: LoginDto): Promise<AuthDto> {
        const user: User | null = await this.usersRepository.findOne({
            where: { email: loginDto.email }
        });

        if (!user) throw new NotFoundException();
        else if (!await compare(loginDto.password, user.password)) throw new UnauthorizedException();

        return {
            user: new ReadUserDto(user),
            token: await this.jwtService.signAsync({ sub: user.id })
        };
    }
}
