import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Note {
    @ObjectIdColumn()
    id?: ObjectId;

    @Column()
    title?: string;

    @Column({ nullable: true })
    content?: string;

    @Column({ nullable: true })
    createdAt?: Date;

    @Column({ nullable: true })
    updatedAt?: Date;
}



