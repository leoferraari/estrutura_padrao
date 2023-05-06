import { Request, Response } from "express";
import { instanceToPlain } from 'class-transformer';

import uploadConfig from '@config/upload';

import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    delete user.password

    let sLink = '';

    switch (uploadConfig.driver) {
      case 'disk':
        sLink = `${process.env.APP_API_URL}/files/${user.avatar}`;
        break;
      case 's3':
        sLink = `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${user.avatar}`;
        break;
    }

    user.avatar = sLink;

    return response.json({ user: instanceToPlain(user) });
  }
}

