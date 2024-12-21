import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';

@Component({
	selector: 'error-icon',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './error.component.html',
})
export class ErrorIconSvg {
	@Input({ required: true }) svgColor: string;
	@Input({ required: true }) size: { width: number; height: number };
}
