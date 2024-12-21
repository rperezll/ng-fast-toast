import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';

@Component({
	selector: 'warning-icon',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './warning.component.html',
})
export class WarningIconSvg {
	@Input({ required: true }) svgColor: string;
	@Input({ required: true }) size: { width: number; height: number };
}
