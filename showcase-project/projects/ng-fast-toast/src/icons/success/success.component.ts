import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';

@Component({
	selector: 'success-icon',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './success.component.html',
})
export class SuccessIconSvg {
	@Input({ required: true }) svgColor: string;
	@Input({ required: true }) size: { width: number; height: number };
}
