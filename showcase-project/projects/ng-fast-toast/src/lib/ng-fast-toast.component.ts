import { Component, Inject, inject, OnInit, Optional } from '@angular/core';
import { NgFastToastService } from '../services/ng-fast-toast.service';
import { ToastComponent } from '../ui/toast/toast.component';
import { ToastConfig } from '../interfaces/notification-config.interface';
import { generateGuid } from '../utils/generate-guid';
import { calculateToastColors, calculateToastCustomColors } from '../utils/color-types';
import { CommonModule } from '@angular/common';
import { Config } from '../interfaces/config.interface';

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
		this.ngFastToastService.emitCreateNotification$.subscribe({
			next: (data) => {
				if (data) {
					this.notifications.push({
						guid: generateGuid(),
						content: {
							content: data.notification.content,
							title: data.notification.title,
						},
						colorConfig: calculateToastCustomColors(this.ngFastToastConfig?.customToast ?? [], data.type),
						duration: data.notification.duration,
						type: data.type,
					});
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
