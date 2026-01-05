# 🎓 GPAx

MAKAUT SGPA/YGPA to Percentage Calculator with Interactive 3D Visualization

## Overview

GPAx is a web-based academic calculator designed for Indian university students (especially MAKAUT/BCA) that:
- Converts SGPA to Percentage
- Calculates YGPA from Odd & Even semester SGPA
- Converts YGPA to Percentage
- Features interactive 3D visualization using Three.js
- Provides real-time updates with mobile-responsive UI

## Formulas Used

- **SGPA → Percentage**: `(SGPA - 0.75) × 10`
- **YGPA**: `(SGPA_odd + SGPA_even) / 2`
- **YGPA → Percentage**: `(YGPA - 0.75) × 10`

## Getting Started

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
