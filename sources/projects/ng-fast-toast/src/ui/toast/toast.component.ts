/**
 * Copyright © 2025 rperezll (https://github.com/rperezll)
 *
 * This file is part of a project licensed under the GPL-3.0 License.
 * See the LICENSE file in the root directory for more information.
 */

import { Component, computed, ElementRef, EventEmitter, Inject, Input, OnInit, Optional, Output, Renderer2, ViewChild } from '@angular/core';
import { ToastConfig } from '../../interfaces/notification-config.interface';
import { CircleProgressComponent } from '../circle-progress/circle-progress.component';
import { secondsToMilliseconds } from '../../utils/time-parser';
import { CommonModule } from '@angular/common';
import { WarningIconSvg } from '../../icons/warning/warning.component';
import { SuccessIconSvg } from '../../icons/success/success.component';
import { ErrorIconSvg } from '../../icons/error/error.component';
import { Config } from '../../interfaces/config.interface';
import { LoadingIconSvg } from '../../icons/loading/loading.component';

@Component({
	selector: 'toast-root',
	standalone: true,
	imports: [CommonModule, CircleProgressComponent, WarningIconSvg, SuccessIconSvg, ErrorIconSvg, LoadingIconSvg],
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
	@Input({ required: true }) toast: ToastConfig;
	@Output() finish = new EventEmitter<string>();
	@ViewChild('toastElement') alertElement: ElementRef;
	startX = 0;

	constructor(
		private renderer: Renderer2,
		@Inject('ng-fast-toast-config') @Optional() public ngFastToastConfig?: Config,
	) {}

	ngOnInit(): void {
		this.toast.reactivate.subscribe((reactivate) => {
			this.toastExecute();
		});
		this.toastExecute();
	}

	private toastExecute() {
		// Initial waiting time
		setTimeout(() => {
			this.startToast();
			this.listenPadRemove();
			// Exit waiting time setting form user
			setTimeout(() => {
				this.exitToast();
			}, secondsToMilliseconds(this.toast.duration));
		}, 100);
	}

	private startToast() {
		// const alertElement = document.getElementById(this.config.guid);
		const alertElement = this.alertElement.nativeElement;
		alertElement.classList.remove('opacity-0');
		if (this.ngFastToastConfig?.align === 'left') {
			alertElement.classList.add('toast-enter-left');
		} else {
			alertElement.classList.add('toast-enter-right');
		}
	}

	private exitToast() {
		const alertElement = this.alertElement.nativeElement;
		if (this.ngFastToastConfig?.align === 'left') {
			alertElement.classList.remove('toast-enter-left');
			alertElement.classList.add('toast-exit-left');
		} else {
			alertElement.classList.remove('toast-enter-right');
			alertElement.classList.add('toast-exit-right');
		}
		// Waiting time for remove notification
		setTimeout(() => {
			this.finish.emit(this.toast.guid);
		}, 500);
	}

	manualRemove() {
		this.exitToast();
	}

	private listenPadRemove() {
		this.renderer.listen(this.alertElement.nativeElement, 'touchstart', (event: TouchEvent) => {
			this.startX = event.touches[0].clientX;
		});

		this.renderer.listen(this.alertElement.nativeElement, 'touchmove', (event: TouchEvent) => {
			const deltaX = event.touches[0].clientX - this.startX;

			if (this.ngFastToastConfig.align === 'right') {
				if (deltaX > 50) {
					this.exitToast();
				}
			}

			if (this.ngFastToastConfig.align === 'left') {
				if (deltaX < -50) {
					this.exitToast();
				}
			}
		});
	}
}
