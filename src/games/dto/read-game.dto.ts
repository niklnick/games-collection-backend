import { User } from "src/users/entities/user.entity";
import { Category, Duration, Game, GroupPhase, Location, Preparation } from "../entities/game.entity";

class UserDto {
    readonly id: string;
    readonly email: string;
    readonly name: {
        readonly first: string;
        readonly last: string;
    }
}

export class ReadGameDto {
    readonly id: string;
    readonly title: string;
    readonly category: Category;
    readonly groupPhase: GroupPhase;
    readonly duration: Duration;
    readonly location: Location;
    readonly preparation: Preparation;
    readonly createDate: Date;
    readonly creator: UserDto;
    readonly likes: UserDto[];

    constructor(game: Game) {
        this.id = game.id;
        this.title = game.title;
        this.category = game.category;
        this.groupPhase = game.groupPhase;
        this.duration = game.duration;
        this.location = game.location;
        this.preparation = game.preparation;
        this.createDate = game.createDate;
        this.creator = {
            id: game.creator.id,
            email: game.creator.email,
            name: {
                first: game.creator.firstName,
                last: game.creator.lastName
            }
        }
        this.likes = game.likes.map((user: User) => {
            return {
                id: user.id,
                email: user.email,
                name: {
                    first: user.firstName,
                    last: user.lastName
                }
            }
        });
    }
}
