import { Component, OnInit } from '@angular/core';
import { NgFastToastComponent, ngFastToastConfig, NgFastToastService } from 'ng-fast-toast';

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

  constructor(
    private toast: NgFastToastService
  ) {}

  ngOnInit() {
      setTimeout(() => {
        this.toast.success({title: 'Hello Success', content: 'ng-fast-toast are ready!', duration: 5000});
        setTimeout(() => {
          this.toast.warn({title: 'Hello Warn', content: 'ng-fast-toast are ready!', duration: 5});
        }, 2000);
        setTimeout(() => {
          this.toast.error({title: 'Hello Error', content: 'ng-fast-toast are ready!', duration: 5});
        }, 3000);
      }, 1000);
  }
}
