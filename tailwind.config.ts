
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
          DEFAULT: "#0F172A", // Dark blue background
          secondary: "#1E293B"
        },
        foreground: "hsl(var(--foreground))",
        accent: {
          DEFAULT: "#8B5CF6", // Vibrant purple
          hover: "#7C3AED"
        },
        text: {
          DEFAULT: "#FFFFFF",
          secondary: "#94A3B8"
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
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 30px rgba(139, 92, 246, 0.8)' }
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        fadeOut: 'fadeOut 0.5s ease-out forwards',
        glow: 'glow 2s ease-in-out infinite',
        pulse: 'pulse 2s ease-in-out infinite'
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
