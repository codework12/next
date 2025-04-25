
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "#1A1F2C",
          secondary: "#2C3E50"
        },
        foreground: "hsl(var(--foreground))",
        accent: {
          DEFAULT: "#1EAEDB",
          hover: "#33C3F0"
        },
        text: {
          DEFAULT: "#FFFFFF",
          secondary: "#9F9EA1"
        }
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "San Francisco", "Helvetica Neue", "sans-serif"],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' }
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        fadeOut: 'fadeOut 0.5s ease-out forwards',
        glow: 'glow 2s ease-in-out infinite'
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
