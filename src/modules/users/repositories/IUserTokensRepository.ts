import { UserTokens } from '@prisma/client';

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserTokens>;
  findByToken(token: string): Promise<UserTokens | undefined>;
}
