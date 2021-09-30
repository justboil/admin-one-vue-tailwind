export const colorsBg = {
  white: ['bg-white text-black'],
  light: ['bg-gray-100 text-black'],
  success: ['bg-green-500 text-white'],
  danger: ['bg-red-500 text-white'],
  warning: ['bg-yellow-500 text-white'],
  info: ['bg-blue-500 text-white']
}

export const colorsBorders = {
  white: ['border-gray-300'],
  light: ['border-gray-200 dark:border-gray-400'],
  success: ['border-green-600'],
  danger: ['border-red-600'],
  warning: ['border-yellow-600'],
  info: ['border-blue-600']
}

export const colorsText = {
  white: ['text-black dark:text-gray-100'],
  light: ['text-gray-700 dark:text-gray-400'],
  success: ['text-green-500'],
  danger: ['text-red-500'],
  warning: ['text-yellow-500'],
  info: ['text-blue-500']
}

export const colorsOutline = {
  white: [...colorsText.white, ...colorsBorders.white],
  light: [...colorsText.light, ...colorsBorders.light],
  success: [...colorsText.success, ...colorsBorders.success],
  danger: [...colorsText.danger, ...colorsBorders.danger],
  warning: [...colorsText.warning, ...colorsBorders.warning],
  info: [...colorsText.info, ...colorsBorders.info]
}

export const colorsButtons = {
  white: ['hover:bg-gray-50', ...colorsBg.white, ...colorsBorders.white],
  light: ['hover:bg-gray-200', ...colorsBg.light, ...colorsBorders.light],
  success: ['hover:bg-green-600', ...colorsBg.success, ...colorsBorders.success],
  danger: ['hover:bg-red-600', ...colorsBg.danger, ...colorsBorders.danger],
  warning: ['hover:bg-yellow-600', ...colorsBg.warning, ...colorsBorders.warning],
  info: ['hover:bg-blue-600', ...colorsBg.info, ...colorsBorders.info]
}

export const colorsButtonsOutline = {
  white: ['hover:bg-gray-100 hover:text-gray-900 dark:hover:text-gray-900', ...colorsText.white, ...colorsBorders.white],
  light: ['hover:bg-gray-100 hover:text-gray-900 dark:hover:text-gray-900', ...colorsText.light, ...colorsBorders.light],
  success: ['hover:bg-green-500 hover:text-white', ...colorsText.success, ...colorsBorders.success],
  danger: ['hover:bg-red-500 hover:text-white', ...colorsText.danger, ...colorsBorders.danger],
  warning: ['hover:bg-yellow-500 hover:text-white', ...colorsText.warning, ...colorsBorders.warning],
  info: ['hover:bg-blue-500 hover:text-white', ...colorsText.info, ...colorsBorders.info]
}
