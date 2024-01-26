/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
       screens: {
        'mobile': {'max': '650px'},
        'tablet': {'min': '651px', 'max': '959px'},
        'laptop': {'min' : '960px'}
      },
      backgroundImage:{
        'bethel': "url('/src/assets/502015180_univ_lsr_lg.jpg')",
      

        
      }
    },
  },
  plugins: [],
}

