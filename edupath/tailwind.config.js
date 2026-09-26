/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B5BFF',
          dark: '#2D47E6',
          light: '#EEF2FF',
        },
        secondary: {
          DEFAULT: '#60A5FA',
          dark: '#3B82F6',
          light: '#E0F2FE',
        },
        neutral: {
          bg: '#F9FAFB',
          card: '#FFFFFF',
          border: '#E5E7EB',
          muted: '#6B7280',
          text: '#111827',
        },
        semantic: {
          error: '#EF4444',
          success: '#10B981',
        },
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          500: '#3B82F6',
          600: '#3B5BFF',
          700: '#2D47E6',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
      },
      fontFamily: {
        sans: ['Poppins_400Regular'],
        regular: ['Poppins_400Regular'],
        medium: ['Poppins_500Medium'],
        semibold: ['Poppins_600SemiBold'],
        bold: ['Poppins_700Bold'],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [],
};
