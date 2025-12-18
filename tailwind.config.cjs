module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serifjp: ["'Noto Serif JP'", 'serif'],
        serifen: ['Merriweather', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper: '#FBF7EF', // ほんのり黄みの紙色
        ink: '#1f2937',   // 濃いグレー（テキスト）
        accent: '#2543eb', // 深い青（アクセント）
      },
      maxWidth: {
        'reading': '60ch',
      },
    },
  },
  plugins: [],
}
