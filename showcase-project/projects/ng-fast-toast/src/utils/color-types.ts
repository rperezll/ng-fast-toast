import { BgColorTypes } from '../interfaces/bg-color.interface';
import type { NotificationType } from '../types/notification.type';

export const ColorTypes: BgColorTypes[] = [
	{
		type: 'error',
		bgToastColor: 'bg-red-50',
		borderToastColor: 'border-red-500',
		titleSvgColor: '#991b1b',
		titleTextColor: 'text-red-800',
		contentTextColor: 'text-red-700',
		progressCircleColor: 'text-red-800',
	},
	{
		type: 'warning',
		bgToastColor: 'bg-yellow-50',
		borderToastColor: 'border-yellow-500',
		titleSvgColor: '#854d0e',
		titleTextColor: 'text-yellow-800',
		contentTextColor: 'text-yellow-700',
		progressCircleColor: 'text-yellow-800',
	},
	{
		type: 'success',
		bgToastColor: 'bg-green-50',
		borderToastColor: 'border-green-500',
		titleSvgColor: '#166534',
		titleTextColor: 'text-green-800',
		contentTextColor: 'text-green-700',
		progressCircleColor: 'text-green-800',
	},
	// TODO: Add loading color types
	{
		type: 'loading',
		bgToastColor: 'bg-green-50',
		borderToastColor: 'border-green-500',
		titleSvgColor: '#166534',
		titleTextColor: 'text-green-800',
		contentTextColor: 'text-green-700',
		progressCircleColor: 'text-green-800',
	},
];

export function calculateToastColors(type: NotificationType): BgColorTypes {
	return ColorTypes.find((x) => x.type === type);
}

export function calculateToastCustomColors(userConfig: BgColorTypes[], type: NotificationType): BgColorTypes {
	const mergeConfig: BgColorTypes[] = ColorTypes.map((defaultConfig) => {
		const userTypeConfig = userConfig.find((config) => config.type === defaultConfig.type);

		if (userTypeConfig) {
			return {
				...defaultConfig,
				...userTypeConfig,
			};
		}
		return defaultConfig;
	});

	return mergeConfig.find((x) => x.type === type);
}
