import type { NotificationType } from '../types/notification.type';
import { generateGuid } from '../utils/generate-guid';

export class Notification {
	guid: string;
	content: string;
	duration: number;
	type: NotificationType;
	visible: boolean;

	constructor(
		content: string,
		duration: number,
		type: NotificationType,
	) {
		this.guid = generateGuid();
		// this.title = title.length > 25 ? title.substring(0, 25) + '...' : title;
		this.content = content;
		this.duration = duration;
		this.type = type, 
		this.visible = true;
	}
}
