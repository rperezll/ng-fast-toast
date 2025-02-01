/**
 * Copyright © 2025 rperezll (https://github.com/rperezll)
 *
 * This file is part of a project licensed under the GPL-3.0 License.
 * See the LICENSE file in the root directory for more information.
 */

import { Signal } from '@angular/core';
import { NotificationType } from '../types/notification.type';
import { BgColorTypes } from './bg-color.interface';
import { Subject } from 'rxjs';

interface ContentToast {
	title?: string;
	content: string;
}

export interface ToastConfig {
	guid: string;
	type: NotificationType;
	content: ContentToast;
	colorConfig: BgColorTypes;
	duration: number;
	reactivate: Subject<boolean>;
}
