/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
      colors:{
        "greygrey" : "#f1f1f1",
      }
    },
	},
	plugins: [],
};

