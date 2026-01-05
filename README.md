# 🎓 GPAx

**MAKAUT SGPA/YGPA to Percentage Calculator** | *A Community Tool Built for Students*

> Empowering MAKAUT students with accurate academic calculations

## About

GPAx is a modern, open-source academic calculator built with love for **Maulana Abul Kalam Azad University of Technology (MAKAUT)** students. 

Formerly known as **WBUT** (West Bengal University of Technology), MAKAUT serves thousands of BCA and engineering students. GPAx makes it easy to convert SGPA to percentage and calculate YGPA in seconds.

**Part of the MAKAUT Community** - Inspired by the open-source spirit of [Apertre](https://apertre.resourcio.in/)

## Features

✨ **Instant SGPA → Percentage Conversion**  
📊 **Calculate YGPA from Odd & Even Semester SGPA**  
🎨 **Interactive 3D Visualization with Three.js**  
⚡ **Real-time Updates**  
📱 **Mobile-Responsive Design**  
🌐 **Works Offline**  

## Formulas Used

All formulas are based on MAKAUT's standard academic guidelines:

- **SGPA → Percentage**: `(SGPA - 0.75) × 10`
- **YGPA**: `(SGPA_odd + SGPA_even) / 2`
- **YGPA → Percentage**: `(YGPA - 0.75) × 10`

> **⚠️ Disclaimer**: These are approximate conversions. Always verify with your official MAKAUT grade card for exact percentages.

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (usually http://localhost:5173)

## Project Structure

- `index.html` - Main HTML file
- `main.js` - Three.js application code
- `package.json` - Project dependencies and scripts

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
