import { Component, Input } from '@angular/core';

@Component({
	selector: 'github-icon',
	standalone: true,
	templateUrl: './github.component.html',
})
export class GithubIcon {
	@Input({ required: true }) size: { width: number; height: number };
}
