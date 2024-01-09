import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Category {
    ACTIVE = 'active',
    COOPERATIVE = 'cooperative',
    ICEBREAKER = 'icebreaker',
    PUZZLE = 'puzzle',
    RALLYE = 'rallye',
    REFLECTION = 'reflection',
    RELAXATION = 'relaxation',
    WARM_UP = 'warmUp'
}

export enum GroupPhase {
    FORMING,
    STORMING,
    NORMING,
    PERFORMING,
    ADJOURNING
}

export enum Duration {
    QUICK,
    SHORT,
    MEDIUM,
    LONG
}

export enum Location {
    ANYWHERE = 'anywhere',
    INDOOR = 'indoor',
    OUTDOOR = 'outdoor'
}

export enum Preparation {
    LOW,
    MID,
    HIGH
}

@Entity({ orderBy: { 'createDate': 'ASC' } })
export class Game {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'enum', enum: Category })
    category: Category;

    @Column({ type: 'enum', name: 'group_phase', enum: GroupPhase, default: GroupPhase.FORMING })
    groupPhase: GroupPhase;

    @Column({ type: 'enum', enum: Duration, default: Duration.QUICK })
    duration: Duration;

    @Column({ type: 'enum', enum: Location, default: Location.ANYWHERE })
    location: Location

    @Column({ type: 'enum', enum: Preparation, default: Preparation.LOW })
    preparation: Preparation;

    @CreateDateColumn({ type: 'timestamp', name: 'create_date' })
    createDate: Date;

    @ManyToOne(() => User, (user: User) => user.createdGames, { nullable: false, eager: true })
    @JoinColumn({ name: 'creator_id' })
    creator: User;

    @ManyToMany(() => User, (user: User) => user.likedGames)
    likes: User[];
}
