import { LoginDto } from "./login.dto";

export class SignupDto extends LoginDto {
    readonly firstName: string;
    readonly lastName: string;
}
