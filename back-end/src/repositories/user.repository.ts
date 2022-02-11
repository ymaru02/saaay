import { UserDto } from 'src/models/user.dto';
import { driver, stringify } from './connection-pools/neo4j.db';

export class UserRepository {
  async findByUsername(userName: string): Promise<UserDto> {
    let result;
    const session = driver().session();

    try {
      result = await session.run(
        `MATCH (user) WHERE user.username = '${userName}' RETURN user`,
      );
    } finally {
      await session.close();
    }

    await driver().close();

    return result.records;
  }

  async createUser(userDto: UserDto): Promise<UserDto> {
    let result;
    const session = driver().session();
    const stringified = stringify(userDto);
    try {
      result = await session.run(
        `create (user:User ${stringified}) RETURN user`,
      );
    } finally {
      await session.close();
    }

    await driver().close();

    return result.records;
  }
}
