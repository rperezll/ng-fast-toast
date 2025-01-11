/**
 * Copyright © 2025 rperezll (https://github.com/rperezll)
 *
 * This file is part of a project licensed under the GPL-3.0 License.
 * See the LICENSE file in the root directory for more information.
 */

import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'success-icon',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './success.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class SuccessIconSvg {
	@Input({ required: true }) svgColor: string;
	@Input({ required: true }) size: { width: number; height: number };
}
