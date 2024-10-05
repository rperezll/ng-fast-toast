import { Injectable } from '@angular/core';
import { UserNotification } from '../interfaces/user-notification.interface';
import { Observable, Subject } from 'rxjs';
import { Notification } from '../notification/notification';
import { NotificationType } from '../types/notification.type';

@Injectable({
  providedIn: 'root'
})
export class NgFastToastService {
	private emitCreateNotification = new Subject<{notification: UserNotification, type: NotificationType}>();
	emitCreateNotification$ = this.emitCreateNotification.asObservable();

	/**
	 *
	 * @abstract Ejecuta una notificación de tipo `success`
	 * @param notification: UserNotification
	 */
	success(notification: UserNotification) {
		this.emitCreateNotification.next({notification, type: 'success'});
	}

	/**
	 *
	 * @abstract Ejecuta una notificación de tipo `warn`
	 * @param notification: UserNotification
	 */
	warn(notification: UserNotification) {
		this.emitCreateNotification.next({notification, type: 'warning'});
	}

	/**
	 *
	 * @abstract Ejecuta una notificación de tipo `error`
	 * @param notification: UserNotification
	 */
	error(notification: UserNotification) {
		this.emitCreateNotification.next({notification, type: 'error'});
	}
}