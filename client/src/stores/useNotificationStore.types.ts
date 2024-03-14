export enum NotificationType {
    Success = 'success',
    Error = 'error'
}

export type NotificationProps = {
    key: Symbol;
    message: string | null;
    type?: NotificationType
    title?: string;
    status?: number;
}

export type NotificationState = {
    notificationState: Array<NotificationProps>;
}
