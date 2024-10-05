import { Component, inject, OnInit } from '@angular/core';
import { NgFastToastService } from '../services/ng-fast-toast.service';
import { ToastComponent } from "../ui/toast/toast.component";
import { ToastConfig } from '../interfaces/notification-config.interface';
import { generateGuid } from '../utils/generate-guid';
import { UserNotification } from '../interfaces/user-notification.interface';
import { NotificationType } from '../types/notification.type';
import { BgColorTypes, calculateToastColors, ColorTypes } from '../utils/color-types';

@Component({
  selector: 'ng-fast-toast',
  standalone: true,
  imports: [ToastComponent],
  templateUrl: './ng-fast-toast.component.html',
  styles: ``
})
export class NgFastToastComponent implements OnInit {
  notifications: ToastConfig[] = [];

  ngFastToastService = inject(NgFastToastService);

  ngOnInit(): void {
	console.info('🍞 ng-fast-toast initialized correctly');
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
							title: data.notification.title
						},
						colorConfig: calculateToastColors(data.type),
						duration: data.notification.duration,
						type: data.type,
					});
				}
			},
		});
  }
}
