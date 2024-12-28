/**
 * Copyright © 2024 rperezll (https://github.com/rperezll)
 *
 * This file is part of a project licensed under the GPL-3.0 License.
 * See the LICENSE file in the root directory for more information.
 */


import { Injectable } from '@angular/core';
import { Notification } from '../interfaces/notification.interface';
import { Subject } from 'rxjs';
import { NotificationType } from '../types/notification.type';

@Injectable({
	providedIn: 'root',
})
export class NgFastToastService {
	private emitCreateNotification = new Subject<{ notification: Notification; type: NotificationType }>();
	emitCreateNotification$ = this.emitCreateNotification.asObservable();

	/**
	 * @description Triggers a `success` notification.
	 * Use this method to display messages indicating that an action was completed successfully.
	 *
	 * @param {Notification} notification - The notification object containing information such as the message, title, and other relevant notification data.
	 * @returns {void}
	 */
	success(notification: Notification): void {
		this.emitCreateNotification.next({ notification, type: 'success' });
	}

	/**
	 * @description Triggers a `warn` notification.
	 * Use this method to display warning messages indicating that the user should be cautious about the action or result.
	 *
	 * @param {Notification} notification - The notification object containing information such as the message, title, and other relevant notification data.
	 * @returns {void}
	 */
	warn(notification: Notification): void {
		this.emitCreateNotification.next({ notification, type: 'warning' });
	}

	/**
	 * @description Triggers an `error` notification.
	 * Use this method to display error messages indicating that an action has failed or encountered an issue.
	 *
	 * @param {Notification} notification - The notification object containing information such as the message, title, and other relevant notification data.
	 * @returns {void}
	 */
	error(notification: Notification) {
		this.emitCreateNotification.next({ notification, type: 'error' });
	}
}
