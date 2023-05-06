import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import { PrismaClient, UserTokens } from '@prisma/client';

class UserTokensRepository implements IUserTokensRepository {

  private ormRepository;

  constructor() {
    this.ormRepository = new PrismaClient();
  }

  public async findByToken(token: string): Promise<UserTokens | undefined> {
    const userToken = await this.ormRepository.userTokens.findFirst({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserTokens> {
    const userToken = await this.ormRepository.userTokens.create({
      data: {
        user_id: user_id
      },
    });

    return userToken;
  }

}

export default UserTokensRepository;
