/**
 * Copyright © 2025 rperezll (https://github.com/rperezll)
 *
 * This file is part of a project licensed under the GPL-3.0 License.
 * See the LICENSE file in the root directory for more information.
 */


import { NotificationType } from '../types/notification.type';

export interface BgColorTypes {
	type: NotificationType;
	bgToastColor?: string;
	borderToastColor?: string;
	titleSvgColor?: string;
	titleTextColor?: string;
	contentTextColor?: string;
	progressCircleColor?: string;
	contentColor?: string;
}
