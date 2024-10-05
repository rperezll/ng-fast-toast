import { Component, inject, Input, OnInit } from '@angular/core';
import { ToastConfig } from '../../interfaces/notification-config.interface';
import { CircleProgressComponent } from "../progress-circle/circle-progress.component";
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

.alert-enter {
  animation: slideIn 0.5s forwards; /* Ajusta la duración según sea necesario */
}

.alert-exit {
  animation: slideOut  0.5s forwards; /* Ajusta la duración según sea necesario */
}
  `,
  templateUrl: './toast.component.html',
})
export class ToastComponent implements OnInit {

  @Input({ required: true}) config: ToastConfig;
  @Input({ required: true}) index: number;

  ngOnInit(): void {
    console.log(this.config);
    
    setTimeout(() => {
      const alertElement = document.getElementById(this.config.guid);

      alertElement.classList.remove('opacity-0');
      alertElement.classList.add('alert-enter');

      setTimeout(() => {
        alertElement.classList.remove('alert-enter');
        alertElement.classList.add('alert-exit');
      }, secondsToMilliseconds(this.config.duration));
    }, 100);
  }
}
