import {Entity, Column, Unique, PrimaryGeneratedColumn} from 'typeorm';

@Entity('admin_user')
export class admin_user {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Unique(['username'])//那些字段组成唯一键
    username: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @Column()
    role: string;

    @Column()
    nickname: string;

    @Column()
    active: number;
}
