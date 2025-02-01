/**
 * Copyright © 2025 rperezll (https://github.com/rperezll)
 *
 * This file is part of a project licensed under the GPL-3.0 License.
 * See the LICENSE file in the root directory for more information.
 */

import { AfterViewInit, Component, inject } from '@angular/core';
import { NgFastToastComponent, NgFastToastService, ngFastToastConfig } from '../../projects/ng-fast-toast/src/public-api';
import { NotificationType, NotificationTypeList } from '../../projects/ng-fast-toast/src/types/notification.type';
import { GithubIcon } from '../icons/github/github.component';
import { mockProvidedConfig } from './mocks/custom-toast.mock';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [NgFastToastComponent, GithubIcon],
	providers: [NgFastToastService, ngFastToastConfig({ align: 'right', customToast: mockProvidedConfig })],
	templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
	title = 'showcase-project';
	fastToast = inject(NgFastToastService);
	notificationTypeList: NotificationType[] = NotificationTypeList;

	ngAfterViewInit(): void {}

	async executeToast(type) {
		switch (type) {
			case 'success':
				this.fastToast.success({ title: 'Perfect!', content: 'Good Job today.', duration: 5 });
				break;
			case 'warning':
				this.fastToast.warn({
					title: 'Listen!',
					content:
						'A lightweight and fast notification library for Angular, designed to make it super easy to display quick, stylish alerts (toasts) in your app. With a simple and customizable API, you can easily control the look, position, and behavior of your notifications.',
					duration: 5,
				});
				break;
			case 'error':
				this.fastToast.error({ title: 'Oh noo!', content: 'Something went wrong.', duration: 5 });
				break;
			case 'loading':
				const guid = await this.fastToast.loading({ title: 'Waiting for...', content: 'I am processing...', duration: 50000 });
				setTimeout(() => {
					this.fastToast.updateLoading(guid, 'error', { title: 'Oh no', content: 'Something went wrong.', duration: 2 });
				}, 2000);
				break;
			default:
				break;
		}
	}

	trackByIndex(index: number): number {
		return index;
	}
}
