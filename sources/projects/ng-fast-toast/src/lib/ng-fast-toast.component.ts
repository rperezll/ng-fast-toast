/**
 * Copyright © 2025 rperezll (https://github.com/rperezll)
 *
 * This file is part of a project licensed under the GPL-3.0 License.
 * See the LICENSE file in the root directory for more information.
 */

import { Component, Inject, OnInit, Optional, signal } from '@angular/core';
import { NgFastToastService } from '../services/ng-fast-toast.service';
import { ToastComponent } from '../ui/toast/toast.component';
import { ToastConfig } from '../interfaces/notification-config.interface';
import { generateGuid } from '../utils/generate-guid';
import { calculateToastCustomColors } from '../utils/color-types';
import { CommonModule } from '@angular/common';
import { Config } from '../interfaces/config.interface';
import { Subject } from 'rxjs';

@Component({
	selector: 'ng-fast-toast',
	standalone: true,
	imports: [ToastComponent, CommonModule],
	templateUrl: './ng-fast-toast.component.html',
})
export class NgFastToastComponent implements OnInit {
	notifications: ToastConfig[] = [];

	constructor(
		private ngFastToastService: NgFastToastService,
		@Inject('ng-fast-toast-config') @Optional() public ngFastToastConfig?: Config,
	) {}

	ngOnInit(): void {
		console.info(`🍞 ng-fast-toast initialized correctly with ${this.ngFastToastConfig ? 'custom config.' : 'default config.'}`);
		this.notificationListener();
	}

	notificationListener() {
		// Create a new Toast
		this.ngFastToastService.emitCreateNotification$.subscribe({
			next: (data) => {
				if (data) {
					const guid = generateGuid();
					this.notifications.push({
						guid,
						content: {
							content: data.notification.content,
							title: data.notification.title,
						},
						colorConfig: calculateToastCustomColors(this.ngFastToastConfig?.customToast ?? [], data.type),
						duration: data.notification.duration,
						type: data.type,
						reactivate: new Subject<boolean>(),
					});

					if (data.callback) {
						data.callback(guid);
					}
				}
			},
		});

		// Update an existing Toast
		this.ngFastToastService.emitUpdateNotification$.subscribe({
			next: (data) => {
				if (data) {
					let index = this.notifications.findIndex((x) => x.guid === data.guid);
					if (index !== -1) {
						this.notifications[index].type = data.type;
						this.notifications[index].colorConfig = calculateToastCustomColors(this.ngFastToastConfig?.customToast ?? [], data.type);
						this.notifications[index].duration = data.notification.duration;
						if (data.notification) {
							this.notifications[index].content = {
								content: data.notification.content,
								title: data.notification.title,
							};
						}

						this.notifications[index].reactivate.next(true);
					}
				}
			},
		});
	}

	finishNotification(guid) {
		let index = this.notifications.findIndex((x) => x.guid === guid);
		if (index !== -1) {
			this.notifications.splice(index, 1);
		}
	}
}
