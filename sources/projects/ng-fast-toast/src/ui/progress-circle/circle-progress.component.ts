/**
 * Copyright © 2025 rperezll (https://github.com/rperezll)
 *
 * This file is part of a project licensed under the GPL-3.0 License.
 * See the LICENSE file in the root directory for more information.
 */


import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'circle-progress',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './circle-progress.component.html',
	styleUrl: './circle-progress.component.css',
	styles: `
		.circular-progress {
			animation: rotate 10s linear forwards;
		}

		@keyframes rotate {
			0% {
				stroke-dashoffset: 283;
			}
			100% {
				stroke-dashoffset: 0;
			}
		}
	`,
	encapsulation: ViewEncapsulation.None
})
export class CircleProgressComponent {
	@Input({ required: true }) time: number;
	@Input({ required: true }) color: string;
}
