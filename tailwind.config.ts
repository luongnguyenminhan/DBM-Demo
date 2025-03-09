module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        animation: {
          'spin-slow': 'spin 2s linear infinite',
          'spin-fast': 'spin 0.5s linear infinite',
        }
      }
    },
    plugins: [],
  }