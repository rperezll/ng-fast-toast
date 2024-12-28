/**
 * Copyright © 2024 rperezll (https://github.com/rperezll)
 *
 * This file is part of a project licensed under the GPL-3.0 License.
 * See the LICENSE file in the root directory for more information.
 */

import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { ToastConfig } from '../../interfaces/notification-config.interface';
import { CircleProgressComponent } from '../progress-circle/circle-progress.component';
import { secondsToMilliseconds } from '../../utils/time-parser';
import { CommonModule } from '@angular/common';
import { WarningIconSvg } from '../../icons/warning/warning.component';
import { SuccessIconSvg } from '../../icons/success/success.component';
import { ErrorIconSvg } from '../../icons/error/error.component';
import { Config } from '../../interfaces/config.interface';

@Component({
	selector: 'toast',
	standalone: true,
	imports: [CommonModule, CircleProgressComponent, WarningIconSvg, SuccessIconSvg, ErrorIconSvg],
	styles: `
		@keyframes slideInRight {
			0% {
				transform: translateX(100%);
				opacity: 0;
			}
			100% {
				transform: translateX(0);
				opacity: 1;
			}
		}

		@keyframes slideOutRight {
			0% {
				transform: translateX(0);
				opacity: 1;
			}
			100% {
				transform: translateX(100%);
				opacity: 0;
			}
		}

		@keyframes slideInLeft {
			0% {
				transform: translateX(-100%);
				opacity: 0;
			}
			100% {
				transform: translateX(0);
				opacity: 1;
			}
		}

		@keyframes slideOutLeft {
			0% {
				transform: translateX(0);
				opacity: 1;
			}
			100% {
				transform: translateX(-100%);
				opacity: 0;
			}
		}

		.toast-enter-right {
			animation: slideInRight 0.5s forwards;
		}

		.toast-exit-right {
			animation: slideOutRight 0.5s forwards;
		}

		.toast-enter-left {
			animation: slideInLeft 0.5s forwards;
		}

		.toast-exit-left {
			animation: slideOutLeft 0.5s forwards;
		}
	`,
	templateUrl: './toast.component.html',
})
export class ToastComponent implements OnInit {
	@Input({ required: true }) config: ToastConfig;
	@Output() finish = new EventEmitter<string>();

	constructor(@Inject('ng-fast-toast-config') @Optional() public ngFastToastConfig?: Config) {}

	ngOnInit(): void {
		this.toastCicle();

		console.log(this.config.colorConfig.bgToastColor);
	}

	private toastCicle() {
		// Initial waiting time
		setTimeout(() => {
			const alertElement = document.getElementById(this.config.guid);
			alertElement.classList.remove('opacity-0');
			if (this.ngFastToastConfig?.align === 'left') {
				alertElement.classList.add('toast-enter-left');
			} else {
				alertElement.classList.add('toast-enter-right');
			}
			// Exit waiting time setting form user
			setTimeout(() => {
				if (this.ngFastToastConfig?.align === 'left') {
					alertElement.classList.remove('toast-enter-left');
					alertElement.classList.add('toast-exit-left');
				} else {
					alertElement.classList.remove('toast-enter-right');
					alertElement.classList.add('toast-exit-right');
				}
				// Waiting time for remove notification
				setTimeout(() => {
					this.finish.emit(this.config.guid);
				}, 500);
			}, secondsToMilliseconds(this.config.duration));
		}, 100);
	}
}
