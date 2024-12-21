import { Component, inject, OnInit } from '@angular/core';
import { NgFastToastComponent, NgFastToastService, ngFastToastConfig } from 'ng-fast-toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFastToastComponent],
  providers: [NgFastToastService],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'test-project';
  testTypes = ['success', 'error', 'warning', 'loading'];

  toast = inject(NgFastToastService);

  ngOnInit() {
      setTimeout(() => {
        this.toast.success({content: 'ng-fast-toast are ready!', duration: 5});
        setTimeout(() => {
          this.toast.warn({content: 'ng-fast-toast are ready!', duration: 5});
        }, 2000);
        setTimeout(() => {
          this.toast.error({content: 'ng-fast-toast are ready!', duration: 5});
        }, 3000);
      }, 1000);

  }
}
