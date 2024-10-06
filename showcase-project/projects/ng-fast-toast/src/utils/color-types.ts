import type { NotificationType } from '../types/notification.type';

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

export const ColorTypes: BgColorTypes[] = [
	{
		type: 'error',
		bgToastColor: 'bg-red-50',
		borderToastColor: 'border-red-500',
		titleSvgColor: 'fill-red-800',
		titleTextColor: 'text-red-800',
		contentTextColor: 'text-red-700',
		progressCircleColor: 'text-red-800',
	},
	{
		type: 'warning',
		bgToastColor: 'bg-yellow-50',
		borderToastColor: 'border-yellow-500',
		titleSvgColor: 'fill-yellow-800',
		titleTextColor: 'text-yellow-800',
		contentTextColor: 'text-yellow-700',
		progressCircleColor: 'text-yellow-800',
	},
	{
		type: 'success',
		bgToastColor: 'bg-green-50',
		borderToastColor: 'border-green-500',
		titleSvgColor: 'fill-green-800',
		titleTextColor: 'text-green-800',
		contentTextColor: 'text-green-700',
		progressCircleColor: 'text-green-800',
	},
];

export function calculateToastColors(type: NotificationType): BgColorTypes {
	return ColorTypes.find((x) => x.type === type);
}
