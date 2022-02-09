import { DynamicModule, Module } from '@nestjs/common';
import { Neo4jConfig } from 'src/neo4j-config.interface';
import { Neo4jService } from './neo4j.service';
import { createDriver } from './neo4j.util';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4jconstants';

@Module({
  providers: [Neo4jService]
})

export class Neo4jModule {
  static forRoot(config: Neo4jConfig): DynamicModule {
    return {
        module: Neo4jModule,
        providers: [
          {
            provide: NEO4J_CONFIG,
            useValue: config
          },
          {
            provide: NEO4J_DRIVER,
            inject: [ NEO4J_CONFIG ],
            useFactory: async (config: Neo4jConfig) => createDriver(config),
          },
          Neo4jService,
        ],
        exports: [
          Neo4jService,
        ]
    }
}
}
