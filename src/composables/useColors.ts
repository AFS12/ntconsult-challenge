import { Colors } from '@/types/colors'

export const useColors = (): { colors: Colors } => {
  const colors: Colors = {
    skyBlue: '#87CEEB',
    aqua: '#7FDBFF',
    turquoise: '#40E0D0',
    darkGreen: '#2E473B',
    mintGreen: '#98FF98',
    lavender: '#E6E6FA',
    lavender80: '#E6E6FACC',
    navyBlue: '#4682B4',
    sandyBeige: '#FFF5EE',
    white: '#FFFFFF',
    ivory: '#FFFFF0',
    lightGray: '#D3D3D3',
    mediumGray: '#B0B0B0',
    grayishBlue: '#B0E0E6',
    beige: '#F5F5DC',
  }

  return { colors }
}
