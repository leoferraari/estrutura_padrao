import { Exclude, Expose } from 'class-transformer';

import uploadConfig from '@config/upload';


class User {

  id: string;

  name: string;

  email: string;

  @Exclude()
  password: string;


  avatar: string;


  created_at: Date;


  updated_at: Date;

}

export default User;
