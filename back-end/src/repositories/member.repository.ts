import { Injectable } from '@nestjs/common';
import { MemberDto } from 'src/models/member.dto';
import { Mariadb } from './connection-pools/maria.db';

@Injectable()
export class MemberRepository {
  constructor(private readonly Mariadb: Mariadb) {}
  public async findMemberById(memberId: string): Promise<MemberDto> {
    const conn = await this.Mariadb.pool.getConnection();
    const rows = await conn.query('SELECT * from member where id = ?', [
      memberId,
    ]);
    console.log(rows);
    const memberDto = new MemberDto(rows[0]);
    return memberDto;
  }
}
