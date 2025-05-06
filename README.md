# EMI Calculator with Exchange Rates

## 📌 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Overview
A comprehensive EMI (Equated Monthly Installment) calculator application built with React, featuring real-time currency exchange rates and amortization schedule generation. Perfect for calculating loan payments and tracking exchange rates in real-time.

## ✨ Features

### EMI Calculation
- Monthly payment computation with detailed breakdown
- Amortization schedule generation
- Multiple currency support
- Real-time calculations
- Export functionality for payment schedules

### Exchange Rates
- Live currency rates with auto-refresh
- Search and filter functionality
- Sortable data grid
- Real-time currency conversion
- Export rates to Excel

### UI/UX Features
- Material Design components
- Responsive layout for all devices
- Dark/Light theme support
- Mobile-friendly interface
- Intuitive navigation

## 🛠 Tech Stack
- React 18
- Material-UI v5
- Context API for state management
- React Router v6
- Exchange Rates API
- XLSX for data exports

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher) or yarn (v1.22 or higher)
- Modern web browser

### Installation

1. Clone the repository
```bash
git clone https://github.com/Framework12/emi_calculator.git
cd emi-calculator
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Configure environment variables
```env
REACT_APP_EXCHANGE_RATE_API_KEY=your_api_key
REACT_APP_EXCHANGE_RATE_BASE_URL=https://v6.exchangerate-api.com/v6
```

5. Start development server
```bash
npm start
# or
yarn start
```

## 💻 Usage

### EMI Calculator
1. Enter loan amount in your preferred currency
2. Specify annual interest rate (%)
3. Choose loan tenure (months/years)
4. Select currency for calculation
5. View monthly payment and total interest
6. Export amortization schedule to Excel

### Exchange Rates
1. View live exchange rates against USD
2. Use search to find specific currencies
3. Sort rates by currency code or value
4. Export current rates to Excel
5. Track rate changes in real-time

## 📁 Project Structure
```
emi/
├── src/
│   ├── components/
│   │   ├── calculator/
│   │   └── exchange/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   └── styles/
├── public/
└── package.json
```

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔧 Available Scripts
```bash
npm start      # Start development server
npm test       # Run tests
npm run build  # Create production build
```

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
