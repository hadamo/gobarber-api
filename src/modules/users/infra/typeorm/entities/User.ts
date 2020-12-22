/* eslint-disable camelcase */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
    // generated pois é gerado, uuid em vez de increment pois nao é numerico
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // varchar por default
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    avatar: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;
