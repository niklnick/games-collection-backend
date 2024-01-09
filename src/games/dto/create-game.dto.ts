import { Category, Duration, GroupPhase, Location, Preparation } from "../entities/game.entity";

export class CreateGameDto {
    readonly title: string;
    readonly category: Category;
    readonly grouPhase: GroupPhase;
    readonly duration: Duration;
    readonly location: Location;
    readonly preparation: Preparation;
    readonly creator: {
        readonly id: string;
    }
}
