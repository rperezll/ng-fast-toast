/**
 * Copyright © 2025 rperezll (https://github.com/rperezll)
 *
 * This file is part of a project licensed under the GPL-3.0 License.
 * See the LICENSE file in the root directory for more information.
 */

import { Component, inject } from '@angular/core';
import { NgFastToastComponent, NgFastToastService, ngFastToastConfig } from '../../projects/ng-fast-toast/src/public-api';
import { NotificationTypeList } from '../../projects/ng-fast-toast/src/types/notification.type';
import { GithubIcon } from '../icons/github/github.component';
import { mockProvidedConfig } from './mocks/custom-toast.mock';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [NgFastToastComponent, GithubIcon],
	providers: [NgFastToastService, ngFastToastConfig({ align: 'right', customToast: mockProvidedConfig })],
	templateUrl: './app.component.html',
})
export class AppComponent {
	title = 'showcase-project';
	fastToast = inject(NgFastToastService);
	notificationTypeList = NotificationTypeList;

	executeToast(type) {
		switch (type) {
			case 'success':
				this.fastToast.success({ title: 'Perfect!', content: 'Good Job today.', duration: 3 });
				break;
			case 'warning':
				this.fastToast.warn({
					title: 'Listen!',
					content:
						'A lightweight and fast notification library for Angular, designed to make it super easy to display quick, stylish alerts (toasts) in your app. With a simple and customizable API, you can easily control the look, position, and behavior of your notifications.',
					duration: 5000,
				});
				break;
			case 'error':
				this.fastToast.error({ title: 'Oh noo!', content: 'Something went wrong.', duration: 5 });
				break;
			default:
				break;
		}
	}
}
