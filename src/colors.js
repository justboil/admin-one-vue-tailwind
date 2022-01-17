const sectionBgBase = 'bg-gradient-to-tr'
export const sectionBgLogin = `${sectionBgBase} from-purple-400 via-pink-500 to-red-500`
export const sectionBgLoginDark = `${sectionBgBase} from-purple-900 via-pink-900 to-red-900`
export const sectionBgError = `${sectionBgBase} from-pink-400 via-red-500 to-yellow-500`
export const sectionBgErrorDark = `${sectionBgBase} from-pink-900 via-red-900 to-yellow-900`

export const colorsBg = {
  white: 'bg-white text-black',
  light: 'bg-gray-100 text-black',
  success: 'bg-emerald-500 text-white',
  danger: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-white',
  info: 'bg-blue-600 text-white'
}

export const colorsBgHover = {
  white: 'hover:bg-gray-50',
  light: 'hover:bg-gray-200',
  success: 'hover:bg-emerald-600',
  danger: 'hover:bg-red-600',
  warning: 'hover:bg-yellow-600',
  info: 'hover:bg-blue-500'
}

export const colorsBorders = {
  white: 'border-gray-300',
  light: 'border-gray-200 dark:border-gray-400',
  success: 'border-emerald-600',
  danger: 'border-red-600',
  warning: 'border-yellow-600',
  info: 'border-blue-700'
}

export const colorsText = {
  white: 'text-black dark:text-gray-100',
  light: 'text-gray-700 dark:text-gray-400',
  success: 'text-emerald-500',
  danger: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-600'
}

export const colorsOutline = {
  white: [colorsText.white, colorsBorders.white],
  light: [colorsText.light, colorsBorders.light],
  success: [colorsText.success, colorsBorders.success],
  danger: [colorsText.danger, colorsBorders.danger],
  warning: [colorsText.warning, colorsBorders.warning],
  info: [colorsText.info, colorsBorders.info]
}

export const colorsOutlineHover = {
  white: 'hover:bg-gray-100 hover:text-gray-900 dark:hover:text-gray-900',
  light: 'hover:bg-gray-100 hover:text-gray-900 dark:hover:text-gray-900',
  success: 'hover:bg-emerald-500 hover:text-white',
  danger: 'hover:bg-red-500 hover:text-white',
  warning: 'hover:bg-yellow-500 hover:text-white',
  info: 'hover:bg-blue-600 hover:text-white'
}

export const getButtonColor = (color, isOutlined, hasHover) => {
  const base = [
    isOutlined ? colorsText[color] : colorsBg[color],
    colorsBorders[color]
  ]

  if (hasHover) {
    base.push(isOutlined ? colorsOutlineHover[color] : colorsBgHover[color])
  }

  return base
}
