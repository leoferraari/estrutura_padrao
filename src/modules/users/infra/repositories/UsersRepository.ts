import { PrismaClient, Prisma, Users } from "@prisma/client";

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class UsersRepository implements IUserRepository {

  private ormRepository;

  constructor() {
    this.ormRepository = new PrismaClient();
  }

  public async findById(id: string): Promise<Users> {
    const user = await this.ormRepository.users.findUnique({ where: { id } });

    return user;
  }

  public async findByEmail(email: string): Promise<Users> {
    const user = await this.ormRepository.users.findUnique({
      where: { email }
    });

    return user;
  }

  public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<Users[]> {
    let users: Users[];

    if (except_user_id) {
      users = await this.ormRepository.$queryRaw<Users[]>(Prisma.sql`SELECT * from users where id <> ${except_user_id}`)
    } else {
      users = await this.ormRepository.users.findMany();
    }

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<Users> {
    const user_r = this.ormRepository.users.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password
      }
    });

    return user_r;
  }

  public async savePassword(user: Users): Promise<Users> {

    return this.ormRepository.users.update({
      where: {
        id: user.id
      },
      data: {
        password: user.password
      }
    });
  }

  public async saveAvatar(user: Users): Promise<Users> {
    return this.ormRepository.users.update({
      where: {
        id: user.id
      },
      data: {
        avatar: user.avatar
      }
    });
  }

  public async save(user: Users): Promise<Users> {
    return this.ormRepository.users.update({
      where: {
        id: user.id
      },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      }
    });
  }
}

export default UsersRepository;
