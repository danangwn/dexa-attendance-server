import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity('attendance')
export class Attendance extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @PrimaryColumn({ name: 'attend_id' })
    attendId: string;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'start_time' })
    startTime: Date;

    @Column({ name: 'end_time' })
    endTime: Date;

    @Column({ name: 'lat_long' })
    latLong: string;

    @Column({ name: 'photo' })
    photo: string;

    @Column({ name: 'created_date' })
    createdDate: Date;

    @Column({ name: 'modified_date' })
    modifiedDate: Date;

    user: User;
}
