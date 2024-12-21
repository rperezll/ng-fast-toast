import { Config } from '../interfaces/config.interface';

export function ngFastToastConfig(properties: Config) {
	return { provide: 'ng-fast-toast-config', useValue: properties };
}
