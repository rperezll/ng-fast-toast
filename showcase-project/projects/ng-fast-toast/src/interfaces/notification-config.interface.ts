import { NotificationType } from '../types/notification.type';
import { BgColorTypes } from '../utils/color-types';

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
}
