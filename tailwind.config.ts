import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      darkMode: 'class',
      colors: {
        futuristic: {
          primary: "#00bcd4",
          secondary: "#ff7043",
          dark: "#0f172a",
          accent: "#00ff9d",
          lime: { 600: "#65a30d", },
          fuchsia: { 600: "#c026d3", }
        },
        light: {
          primary: "#4f46e5",    // Indigo 600 (lebih soft dari biru sebelumnya)
          text: "#374151",       // Gray 700 (lebih readable)
          bg: "#f3f4f6",         // Gray 100 (sedikit lebih hangat)
          card: "#ffffff",       // White (tetap bersih)
          accent: "#7c3aed",     // Ungu soft
          muted: "#9ca3af"       // Gray 400 untuk text sekunder
        },
        dark: {
          primary: "#6366f1",    // Indigo 500 (lebih terang di dark mode)
          text: "#e5e7eb",       // Gray 200 (tidak terlalu putih)
          bg: "#111827",         // Gray 900 (sedikit lebih gelap)
          card: "#1f2937",       // Gray 800 (untuk card)
          accent: "#8b5cf6",     // Ungu yang lebih soft
          muted: "#6b7280"       // Gray 500 untuk text sekunder
        }
      },
      backgroundImage: {
        'text-gradient': 'linear-gradient(45deg, #00bcd4, #00ff9d)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #00bcd4, #2196f3)',
      },
      animation: {
        pulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        ping: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    }
  },
  safelist: [
    "from-futuristic-primary",
    "to-futuristic-accent",
    {
      pattern: /(from|via|to)-futuristic-(primary|secondary|dark|accent)/,
    },
  ],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
