import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
<<<<<<<< HEAD:back-end/src/entity/sampletodo.entity.ts
import { TestUser } from './sampleuser.entity';
========
import { TestUser } from './sample-user.entity';
>>>>>>>> 013e0541fbd1bda2ebd56da6ff4ab8407fbd3c58:back-end/src/entity/sample-todo.entity.ts

// Class 이름 = 테이블 이름
@Entity()
export class TestTodo {
  @PrimaryGeneratedColumn() // PK, Auto Increment
  id: number;

  @Column()
  todo: string; // Column 정의 (DB에 자동생성)

  // 다대일 양방향 매핑 (user <-> todo)
  @ManyToOne(() => TestUser, (user) => user.todos)
  user: TestUser;
}
