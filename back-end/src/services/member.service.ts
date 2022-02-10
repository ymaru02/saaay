import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { MemberRepository } from 'src/repositories/member.repository';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(User)
    private readonly memberRepository: MemberRepository,
  ) {}

  public async findMember(memberId: string): Promise<User> {
    // let memberDto;
    // await this.memberRepository.findOne(memberId).then((m) => {
    //   return m;
    // });
    // return memberDto;
    return this.memberRepository.findOne(memberId);
  }
}
