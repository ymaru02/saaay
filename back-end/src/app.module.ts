import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleService } from './services/sample.service';
import { SampleController } from './controllers/sample.controller';
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
  controllers: [AppController, SampleController],
  providers: [AppService, SampleService],
})
export class AppModule {}
