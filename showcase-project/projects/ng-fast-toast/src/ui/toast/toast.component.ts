import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ToastConfig } from '../../interfaces/notification-config.interface';
import { CircleProgressComponent } from '../progress-circle/circle-progress.component';
import { secondsToMilliseconds } from '../../utils/time-parser';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'toast',
	standalone: true,
	imports: [CommonModule, CircleProgressComponent],
	styles: `
		@keyframes slideIn {
			0% {
				transform: translateX(100%);
				opacity: 0;
			}
			100% {
				transform: translateX(0);
				opacity: 1;
			}
		}

		@keyframes slideOut {
			0% {
				transform: translateX(0);
				opacity: 1;
			}
			100% {
				transform: translateX(100%);
				opacity: 0;
			}
		}

		.toast-enter {
			animation: slideIn 0.5s forwards;
		}

		.toast-exit {
			animation: slideOut 0.5s forwards;
		}
	`,
	templateUrl: './toast.component.html',
})
export class ToastComponent implements OnInit {
	@Input({ required: true }) config: ToastConfig;
	@Output() finish = new EventEmitter<string>();

	ngOnInit(): void {
		this.toastCicle();
	}

	private toastCicle() {
		// Initial waiting time
		setTimeout(() => {
			const alertElement = document.getElementById(this.config.guid);
			alertElement.classList.remove('opacity-0');
			alertElement.classList.add('toast-enter');
			// Exit waiting time setting form user
			setTimeout(() => {
				alertElement.classList.remove('toast-enter');
				alertElement.classList.add('toast-exit');
				// Witing time for remove notification
				setTimeout(() => {
					this.finish.emit(this.config.guid);
				}, 500);
			}, secondsToMilliseconds(this.config.duration));
		}, 100);
	}
}
