import type { MaybeRef } from '@vueuse/core'
import { toGamut, differenceEuclidean, formatCss, converter } from 'culori'

export interface OklchScale {
  name: String
  hue: Number
  scale: 0 | 1 | 2 | 3 | 4 | 5
  greyval: 0 | 1 | 2 | 3 | 4
}

export interface SfColorMapping {
  name: String
  sfname: String
  shade: Number
}

export interface Palette {
  name: String
  palette: String[]
}

// see  https://stackblitz.com/edit/vitejs-vite-ncyeyc
export const shades = [50, ...Array.from({ length: 9 }).map((_, i) => (i + 1) * 100), 950]

const grey = [0.4, 0.2, 0.1, 0.05, 0.025]

const lightness = [
  [98.9, 98.0, 97.0, 95.5, 94.0, 91.11, 84, 62, 45, 29, 16],
  [98.5, 96.5, 93.0, 91.0, 88.11, 82.67, 73, 62, 45, 29, 16],
  [97.78, 93.56, 88.11, 82.67, 74.22, 64.78, 57.33, 46.89, 39.44, 32, 23.78],
  [93.56, 88.11, 82.67, 74.22, 64.78, 57.33, 46.89, 39.44, 32, 23.78, 16],
  [88.11, 82.67, 74.22, 64.78, 57.33, 46.89, 39.44, 32, 23.78, 16, 12],
  [82.67, 74.22, 64.78, 57.33, 46.89, 39.44, 32, 23.78, 16, 12, 8],
]

export const maxChroma = (i, hue, scale, greyval) => {
  let oklch = converter('oklch')
  let color = 'oklch(' + lightness[scale][i] + '% ' + grey[greyval] + ' ' + hue + ')'
  return formatCss(oklch(toGamut('p3', 'oklch', differenceEuclidean('oklch'), 0)(color)))
}

export const oklchVal = (i, hue, scale, greyval) => {
  let oklch = converter('oklch')
  return `oklch(${lightness[scale][i]}% ${grey[greyval]} ${hue} / <alpha-value>)`
}

const oklchParams = (i, hue, scale, greyval) => {
  let oklch = converter('oklch')
  return `'${lightness[scale][i]}% ${grey[greyval]} ${hue}'`
}

function calculatePalette(hue, scale, greyval) {
  return shades.map((shade, i) => maxChroma(i, hue, scale, greyval))
}

export function generateAllPalettes(colors) {
  return colors.map((color) => ({
    palette: calculatePalette(color.hue, color.scale, color.greyval),
    name: color.name,
  }))
}

export function colorVars(colormap: SfColorMapping[], colorScales: OklchScale[]) {
  function getColor(name: String) {
    // find the color in the colormap
    const color = colormap.find((c) => c.name === name)
    if (!color) {
      return `'var(--color-base)'`
    }

    // find the color in the colorScale
    const colorScale = colorScales.find((c) => c.name === color.sfname)
    if (!colorScale) {
      return `'var(--color-base)'`
    }

    return oklchParams(color.shade, colorScale.hue, colorScale.scale, colorScale.greyval)
  }
  return {
    'base': getColor('base'),
    'contrast': getColor('contrast'),
    'card-base': getColor('card-base'),
    'card-contrast': getColor('card-contrast'),
    'popover-base': getColor('popover-base'),
    'popover-contrast': getColor('popover-contrast'),
    'primary-base': getColor('primary-base'),
    'primary-contrast': getColor('primary-contrast'),
    'secondary-base': getColor('secondary-base'),
    'secondary-contrast': getColor('secondary-contrast'),
    'muted-base': getColor('muted-base'),
    'muted-contrast': getColor('mute-contrast'),
    'accent-base': getColor('accent-base'),
    'accent-contrast': getColor('accent-contrast'),
    'negative-base': getColor('negative-base'),
    'negative-contrast': getColor('negative-contrast'),
    'positive-base': getColor('positive-base'),
    'positive-contrast': getColor('positive-contrast'),
    'warning-base': getColor('warning-base'),
    'warning-contrast': getColor('warning-contrast'),
    'dimmed': getColor('dimmed'),
    'border': getColor('border'),
    'input': getColor('input'),
    'ring': getColor('ring'),
  }
}

export function colorUtilities(colorScales: OklchScale[]) {
  if (!colorScales || !(colorScales.length > 4)) {
    return {}
  }
  const colors = {
    primary: {
      DEFAULT: oklchVal(4, colorScales[0].hue, colorScales[0].scale, colorScales[0].greyval),
      contrast: 'oklch(var(--color-primary-contrast) / <alpha-value>)',
      50: oklchVal(0, colorScales[0].hue, colorScales[0].scale, colorScales[0].greyval),
      100: oklchVal(1, colorScales[0].hue, colorScales[0].scale, colorScales[0].greyval),
      200: oklchVal(2, colorScales[0].hue, colorScales[0].scale, colorScales[0].greyval),
      300: oklchVal(3, colorScales[0].hue, colorScales[0].scale, colorScales[0].greyval),
      400: oklchVal(4, colorScales[0].hue, colorScales[0].scale, colorScales[0].greyval),
      500: oklchVal(5, colorScales[0].hue, colorScales[0].scale, colorScales[0].greyval),
      600: oklchVal(6, colorScales[0].hue, colorScales[0].scale, colorScales[0].greyval),
      700: oklchVal(7, colorScales[0].hue, colorScales[0].scale, colorScales[0].greyval),
      800: oklchVal(8, colorScales[0].hue, colorScales[0].scale, colorScales[0].greyval),
      900: oklchVal(9, colorScales[0].hue, colorScales[0].scale, colorScales[0].greyval),
      950: oklchVal(10, colorScales[0].hue, colorScales[0].scale, colorScales[0].greyval),
    },
    secondary: {
      DEFAULT: oklchVal(4, colorScales[1].hue, colorScales[1].scale, colorScales[1].greyval),
      contrast: 'oklch(var(--color-secondary-contrast) / <alpha-value>)',
      50: oklchVal(0, colorScales[1].hue, colorScales[1].scale, colorScales[1].greyval),
      100: oklchVal(1, colorScales[1].hue, colorScales[1].scale, colorScales[1].greyval),
      200: oklchVal(2, colorScales[1].hue, colorScales[1].scale, colorScales[1].greyval),
      300: oklchVal(3, colorScales[1].hue, colorScales[1].scale, colorScales[1].greyval),
      400: oklchVal(4, colorScales[1].hue, colorScales[1].scale, colorScales[1].greyval),
      500: oklchVal(5, colorScales[1].hue, colorScales[1].scale, colorScales[1].greyval),
      600: oklchVal(6, colorScales[1].hue, colorScales[1].scale, colorScales[1].greyval),
      700: oklchVal(7, colorScales[1].hue, colorScales[1].scale, colorScales[1].greyval),
      800: oklchVal(8, colorScales[1].hue, colorScales[1].scale, colorScales[1].greyval),
      900: oklchVal(9, colorScales[1].hue, colorScales[1].scale, colorScales[1].greyval),
      950: oklchVal(10, colorScales[1].hue, colorScales[1].scale, colorScales[1].greyval),
    },
    warning: {
      DEFAULT: oklchVal(4, colorScales[2].hue, colorScales[2].scale, colorScales[2].greyval),
      contrast: 'oklch(var(--color-warning-contrast) / <alpha-value>)',
      50: oklchVal(0, colorScales[2].hue, colorScales[2].scale, colorScales[2].greyval),
      100: oklchVal(1, colorScales[2].hue, colorScales[2].scale, colorScales[2].greyval),
      200: oklchVal(2, colorScales[2].hue, colorScales[2].scale, colorScales[2].greyval),
      300: oklchVal(3, colorScales[2].hue, colorScales[2].scale, colorScales[2].greyval),
      400: oklchVal(4, colorScales[2].hue, colorScales[2].scale, colorScales[2].greyval),
      500: oklchVal(5, colorScales[2].hue, colorScales[2].scale, colorScales[2].greyval),
      600: oklchVal(6, colorScales[2].hue, colorScales[2].scale, colorScales[2].greyval),
      700: oklchVal(7, colorScales[2].hue, colorScales[2].scale, colorScales[2].greyval),
      800: oklchVal(8, colorScales[2].hue, colorScales[2].scale, colorScales[2].greyval),
      900: oklchVal(9, colorScales[2].hue, colorScales[2].scale, colorScales[2].greyval),
      950: oklchVal(10, colorScales[2].hue, colorScales[2].scale, colorScales[2].greyval),
    },
    positive: {
      DEFAULT: oklchVal(4, colorScales[3].hue, colorScales[3].scale, colorScales[3].greyval),
      contrast: 'oklch(var(--color-positive-contrast) / <alpha-value>)',
      50: oklchVal(0, colorScales[3].hue, colorScales[3].scale, colorScales[3].greyval),
      100: oklchVal(1, colorScales[3].hue, colorScales[3].scale, colorScales[3].greyval),
      200: oklchVal(2, colorScales[3].hue, colorScales[3].scale, colorScales[3].greyval),
      300: oklchVal(3, colorScales[3].hue, colorScales[3].scale, colorScales[3].greyval),
      400: oklchVal(4, colorScales[3].hue, colorScales[3].scale, colorScales[3].greyval),
      500: oklchVal(5, colorScales[3].hue, colorScales[3].scale, colorScales[3].greyval),
      600: oklchVal(6, colorScales[3].hue, colorScales[3].scale, colorScales[3].greyval),
      700: oklchVal(7, colorScales[3].hue, colorScales[3].scale, colorScales[3].greyval),
      800: oklchVal(8, colorScales[3].hue, colorScales[3].scale, colorScales[3].greyval),
      900: oklchVal(9, colorScales[3].hue, colorScales[3].scale, colorScales[3].greyval),
      950: oklchVal(10, colorScales[3].hue, colorScales[3].scale, colorScales[3].greyval),
    },
    negative: {
      DEFAULT: oklchVal(4, colorScales[4].hue, colorScales[4].scale, colorScales[4].greyval),
      contrast: 'oklch(var(--color-negative-contrast) / <alpha-value>)',
      50: oklchVal(0, colorScales[4].hue, colorScales[4].scale, colorScales[4].greyval),
      100: oklchVal(1, colorScales[4].hue, colorScales[4].scale, colorScales[4].greyval),
      200: oklchVal(2, colorScales[4].hue, colorScales[4].scale, colorScales[4].greyval),
      300: oklchVal(3, colorScales[4].hue, colorScales[4].scale, colorScales[4].greyval),
      400: oklchVal(4, colorScales[4].hue, colorScales[4].scale, colorScales[4].greyval),
      500: oklchVal(5, colorScales[4].hue, colorScales[4].scale, colorScales[4].greyval),
      600: oklchVal(6, colorScales[4].hue, colorScales[4].scale, colorScales[4].greyval),
      700: oklchVal(7, colorScales[4].hue, colorScales[4].scale, colorScales[4].greyval),
      800: oklchVal(8, colorScales[4].hue, colorScales[4].scale, colorScales[4].greyval),
      900: oklchVal(9, colorScales[4].hue, colorScales[4].scale, colorScales[4].greyval),
      950: oklchVal(10, colorScales[4].hue, colorScales[4].scale, colorScales[4].greyval),
    },
    neutral: {
      DEFAULT: oklchVal(4, colorScales[5].hue, colorScales[5].scale, colorScales[5].greyval),
      50: oklchVal(0, colorScales[5].hue, colorScales[5].scale, colorScales[5].greyval),
      100: oklchVal(1, colorScales[5].hue, colorScales[5].scale, colorScales[5].greyval),
      200: oklchVal(2, colorScales[5].hue, colorScales[5].scale, colorScales[5].greyval),
      300: oklchVal(3, colorScales[5].hue, colorScales[5].scale, colorScales[5].greyval),
      400: oklchVal(4, colorScales[5].hue, colorScales[5].scale, colorScales[5].greyval),
      500: oklchVal(5, colorScales[5].hue, colorScales[5].scale, colorScales[5].greyval),
      600: oklchVal(6, colorScales[5].hue, colorScales[5].scale, colorScales[5].greyval),
      700: oklchVal(7, colorScales[5].hue, colorScales[5].scale, colorScales[5].greyval),
      800: oklchVal(8, colorScales[5].hue, colorScales[5].scale, colorScales[5].greyval),
      900: oklchVal(9, colorScales[5].hue, colorScales[5].scale, colorScales[5].greyval),
      950: oklchVal(10, colorScales[5].hue, colorScales[5].scale, colorScales[5].greyval),
    },
  }
  return colors
}
