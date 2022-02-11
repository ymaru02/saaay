import { Record, Result } from 'neo4j-driver';
import { UserDto } from 'src/models/user.dto';
import {
  driver,
  executeQuery,
  session,
  stringify,
} from './connection-pools/neo4j.db';

export class UserRepository {
  async findByEmail(email: string): Promise<UserDto> {
    const result = await executeQuery<Record>(
      `MATCH (user) WHERE user.email = '${email}' RETURN user`,
    );
    return result[0].get('user').properties;
  }

  async findByUsername(userName: string): Promise<Result> {
    return await executeQuery(
      `MATCH (user) WHERE user.username = '${userName}' RETURN user`,
    );
  }

  async createUser(userDto: UserDto): Promise<UserDto> {
    const result = await executeQuery<Record>(
      `create (user:User ${stringify(userDto)}) RETURN user`,
    );
    return result[0].get('user').properties;
  }
}
