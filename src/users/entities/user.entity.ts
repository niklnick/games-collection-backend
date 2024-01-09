import { Game } from "src/games/entities/game.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @OneToMany(() => Game, (game: Game) => game.creator)
    createdGames: Game[];

    // TODO: Games cannot be liked
    @ManyToMany(() => Game, (game: Game) => game.likes)
    @JoinTable({
        name: 'user_game_likes',
        joinColumn: { name: 'user_id' },
        inverseJoinColumn: { name: 'game_id' }
    })
    likedGames: Game[];
}
