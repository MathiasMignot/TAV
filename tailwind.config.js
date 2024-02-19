/** @type {import('tailwindcss').Config} */
export default {
  env: {
    browser: true,
    node: true,
  },
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
       screens: {
        'mobile': {'min':'300px','max': '650px'},
        'tablet': {'min': '651px', 'max': '959px'},
        'laptop': {'min' : '960px'}
      },
      backgroundImage:{
        'bethel': "url('/src/assets/502015180_univ_lsr_lg.jpg')",
        'presentoire':"url('/src/assets/presentoire.jpg')",
      

        
      }
    },
  },
  plugins: [],
}

