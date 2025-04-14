    /** @type {import('tailwindcss').Config} */
    module.exports = {
        content: [
          './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
          './src/components/**/*.{js,ts,jsx,tsx,mdx}',
          './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Include the app directory
        ],
        theme: {
          extend: {
             // Add custom theme values if needed, like colors:
             colors: {
               'apple-blue': '#007aff',
             }
          },
        },
        plugins: [],
      }