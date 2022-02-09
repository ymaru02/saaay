import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleService } from './services/sample.service';
import { SampleController } from './controllers/sample.controller';
import { RoomController } from './controllers/room.controller';
import { RoomService } from './services/room.service';
<<<<<<< HEAD
// import { Neo4jModule } from './neo4j/neo4j.module';

@Module({
  // imports: [
  //   Neo4jModule.forRoot({
  //   scheme: 'neo4j',
  //   host: 'localhost',
  //   port: 7687,
  //   username: 'neo4j',
  //   password: 'neo4j',
  //   }),
  // ],
=======
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestUser } from './entity/user.entity';
import { TestTodo } from './entity/todo.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([TestUser]),
    TypeOrmModule.forFeature([TestTodo]),
  ],
>>>>>>> c552d7c42337adcccccb4a5ddacf998be268526d
  controllers: [AppController, SampleController, RoomController],
  providers: [AppService, SampleService, RoomService],
})
export class AppModule {}
