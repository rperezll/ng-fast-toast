/**
 * Copyright © 2024 rperezll (https://github.com/rperezll)
 *
 * This file is part of a project licensed under the GPL-3.0 License.
 * See the LICENSE file in the root directory for more information.
 */


import { Config } from '../interfaces/config.interface';

export function ngFastToastConfig(properties: Config) {
	return { provide: 'ng-fast-toast-config', useValue: properties };
}
