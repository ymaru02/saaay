import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleService } from './services/sample.service';
import { SampleController } from './controllers/sample.controller';
import { RoomController } from './controllers/room.controller';
import { RoomService } from './services/room.service';
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
  controllers: [AppController, SampleController, RoomController],
  providers: [AppService, SampleService, RoomService],
})
export class AppModule {}
