import { TestUser } from 'src/entity/sample/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TestUser)
export class TodoRepository extends Repository<TestUser> {}
