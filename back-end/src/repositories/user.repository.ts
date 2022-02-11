import { Record, Result } from 'neo4j-driver';
import { UserDto } from 'src/models/user.dto';
import { executeQuery, stringify } from './connection-pools/neo4j.db';

export class UserRepository {
  async findByEmail(email: string): Promise<UserDto> {
    const result = await executeQuery<Record>(
      `MATCH (user) WHERE user.email = '${email}' RETURN user`,
    );
    if (result.length == 0) throw new Error('이메일 없음');
    return result[0].get('user').properties;
  }

  async findByUsername(userName: string): Promise<UserDto[]> {
    const result = await executeQuery<Record>(
      `MATCH (user) WHERE user.username =~ '${userName}.*' RETURN user`,
    );
    return result.map((r) => r.get('user').properties);
  }

  async createUser(userDto: UserDto): Promise<UserDto> {
    const result = await executeQuery<Record>(
      `create (user:User ${stringify(userDto)}) RETURN user`,
    );
    return result[0].get('user').properties;
  }
}
