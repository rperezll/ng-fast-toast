/**
 * Copyright © 2024 rperezll (https://github.com/rperezll)
 *
 * This file is part of a project licensed under the GPL-3.0 License.
 * See the LICENSE file in the root directory for more information.
 */


import { BgColorTypes } from './bg-color.interface';

export interface Config {
	align?: 'left' | 'right';
	customToast?: BgColorTypes[];
}
