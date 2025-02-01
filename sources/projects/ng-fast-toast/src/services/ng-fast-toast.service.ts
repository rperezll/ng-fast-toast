/**
 * Copyright © 2025 rperezll (https://github.com/rperezll)
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
	private emitCreateNotification = new Subject<{ notification: Notification; type: NotificationType; callback?: (guid: string) => void }>();
	emitCreateNotification$ = this.emitCreateNotification.asObservable();

	private emitUpdateNotification = new Subject<{
		guid: string;
		notification: Notification;
		type: NotificationType;
		callback?: (guid: string) => void;
	}>();
	emitUpdateNotification$ = this.emitUpdateNotification.asObservable();

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
	 * @description Triggers a `loading` notification and executes a callback with the generated `guid`.
	 * Use this method to display a loading notification and perform a callback action once the `guid` is generated.
	 *
	 * @param {Notification} notification - The notification object containing information such as the message, title, and other relevant notification data.
	 * @returns {Promise<string>} - A promise that resolves with the generated `guid` when the callback is executed.
	 */
	loading(notification: Notification): Promise<string> {
		return new Promise((resolve) => {
			this.emitCreateNotification.next({
				notification,
				type: 'loading',
				callback(guid) {
					resolve(guid);
				},
			});
		});
	}

	/**
	 * Updates an existing toast notification using its GUID.
	 *
	 * @param {string} id - The GUID of the toast to update.
	 * @param {string} newType - The new type of the notification.
	 * @param {string} [newContent] - Optional new content for the notification.
	 */
	updateLoading(guid: string, newType: NotificationType, notification?: Notification): void {
		this.emitUpdateNotification.next({ guid, type: newType, notification });
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
