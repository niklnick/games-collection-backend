import { Game } from "src/games/entities/game.entity";
import { User } from "../entities/user.entity";

class GameDto {
    readonly id: string;
    readonly title: string;
}

export class ReadUserDto {
    readonly id: string;
    readonly email: string;
    readonly name: {
        readonly first: string;
        readonly last: string;
    }
    readonly createdGames: GameDto[];
    readonly likedGames: GameDto[];

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.name = {
            first: user.firstName,
            last: user.lastName
        }
        this.createdGames = user.createdGames?.map((game: Game) => {
            return {
                id: game.id,
                title: game.title
            }
        });
        this.likedGames = user.likedGames?.map((game: Game) => {
            return {
                id: game.id,
                title: game.title
            }
        });
    }
}
