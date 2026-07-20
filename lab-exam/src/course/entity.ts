import{Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity(Course)
export class Course {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    courseName: string;
    @Column()
    credit : number;
    @Column()
    department : string;
}