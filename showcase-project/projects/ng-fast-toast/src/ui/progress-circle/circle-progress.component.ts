import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'circle-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './circle-progress.component.html',
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
  `
})
export class CircleProgressComponent {
  @Input({ required: true}) time: number;
  @Input({ required: true}) color: string;
}
