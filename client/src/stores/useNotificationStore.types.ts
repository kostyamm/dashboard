export type NotificationProps = {
    key: Symbol;
    message: string | null;
    title?: string;
    status?: number;
}

export type NotificationState = {
    notificationState: Array<NotificationProps>;
}
