import { User } from "../entities/user.entity";

export class ReadUserDto {
    readonly id: string;
    readonly email: string;
    readonly name: {
        readonly first: string;
        readonly last: string;
    };

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.name = {
            first: user.firstName,
            last: user.lastName
        };
    }
}
