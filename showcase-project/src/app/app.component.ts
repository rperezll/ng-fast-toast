import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFastToastComponent, NgFastToastService } from '../../projects/ng-fast-toast/src/public-api';
import { NotificationTypeList } from '../../projects/ng-fast-toast/src/types/notification.type';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, NgFastToastComponent],
	providers: [NgFastToastService],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
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
					duration: 5,
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
