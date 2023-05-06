import ICreateUserDTO from '../dtos/ICreateUserDTO';
import { Users } from '@prisma/client'
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<Users[]>;
  findById(id: string): Promise<Users | null>;
  findByEmail(id: string): Promise<Users | null>;
  create(data: ICreateUserDTO): Promise<Users>;
  savePassword(user: Users): Promise<Users>;
  saveAvatar(user: Users): Promise<Users>;
  save(user: Users): Promise<Users | null>;
}
