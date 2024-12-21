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
