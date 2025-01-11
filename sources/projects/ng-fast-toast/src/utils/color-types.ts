/**
 * Copyright © 2025 rperezll (https://github.com/rperezll)
 *
 * This file is part of a project licensed under the GPL-3.0 License.
 * See the LICENSE file in the root directory for more information.
 */


import { BgColorTypes } from '../interfaces/bg-color.interface';
import type { NotificationType } from '../types/notification.type';

export const ColorTypes: BgColorTypes[] = [
	{
	  type: "error",
	  bgToastColor: "#fee2e2",  // bg-red-50
	  borderToastColor: "#f87171",  // border-red-500
	  titleSvgColor: "#991b1b",  // #991b1b
	  titleTextColor: "#b91c1c",  // text-red-800
	  contentTextColor: "#c92a2a",  // text-red-700
	  progressCircleColor: "#b91c1c"  // text-red-800
	},
	{
	  type: "warning",
	  bgToastColor: "#fef3c7",  // bg-yellow-50
	  borderToastColor: "#f59e0b",  // border-yellow-500
	  titleSvgColor: "#854d0e",  // #854d0e
	  titleTextColor: "#b45309",  // text-yellow-800
	  contentTextColor: "#c26a00",  // text-yellow-700
	  progressCircleColor: "#b45309"  // text-yellow-800
	},
	{
	  type: "success",
	  bgToastColor: "#d1fae5",  // bg-green-50
	  borderToastColor: "#22c55e",  // border-green-500
	  titleSvgColor: "#166534",  // #166534
	  titleTextColor: "#15803d",  // text-green-800
	  contentTextColor: "#16a34a",  // text-green-700
	  progressCircleColor: "#15803d"  // text-green-800
	},
	{
	  type: "loading",
	  bgToastColor: "#d1fae5",  // bg-green-50
	  borderToastColor: "#22c55e",  // border-green-500
	  titleSvgColor: "#166534",  // #166534
	  titleTextColor: "#15803d",  // text-green-800
	  contentTextColor: "#16a34a",  // text-green-700
	  progressCircleColor: "#15803d"  // text-green-800
	}
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
