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
        this.toast.success({title: 'Hello Success', content: 'ng-fast-toast are ready!', duration: 5});
        setTimeout(() => {
          this.toast.warn({title: 'Hello Warn', content: 'ng-fast-toast are ready!', duration: 5});
        }, 2000);
        setTimeout(() => {
          this.toast.error({title: 'Hello Error', content: 'ng-fast-toast are ready!', duration: 5});
        }, 3000);
        setTimeout(async () => {
          const guid = await this.toast.loading({ title: 'Waiting for...', content: 'I am processing...', duration: 50000 });
          setTimeout(() => {
            this.toast.updateLoading(guid, 'error', { title: 'Perfecto', content: 'I am processing...', duration: 2 });
          }, 4000);
        }, 4000);
      }, 1000);
  }
}
