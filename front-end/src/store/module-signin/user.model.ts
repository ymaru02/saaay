export class User {
  public email: string;
  public username: string;
  public biography: string;
  public follower: User[];
  public following: User[];

  constructor(
    email: string,
    username: string,
    biography: string,
    follower: User[],
    following: User[]
  ) {
    this.email = email;
    this.username = username;
    this.biography = biography;
    this.follower = follower;
    this.following = following;
  }
}
