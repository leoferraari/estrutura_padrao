// import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
// import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';




// class NotificationsRepository implements INotificationRepository {

//   private ormRepository;

//   constructor() {
//     this.ormRepository = null;
//   }

//   public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {

//     const notification = this.ormRepository.create({ content, recipient_id });

//     await this.ormRepository.save(notification);

//     return notification;
//   }
// }

// export default NotificationsRepository;
