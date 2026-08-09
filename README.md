# ☕ CoffeeScope

![CI](https://github.com/ChethanJD/coffeescope/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)

**CoffeeScope** is a coffee market intelligence platform built with Next.js. It brings together live market data, AI-powered price predictions, crop disease detection, weather insights, and a grower marketplace into a single dashboard for coffee farmers, traders, and analysts.

## Features

- 📊 **Analytics Dashboard** — market share, origin volume, price trends, and volatility visualizations
- 🤖 **AI Price Prediction** — forecast charts with confidence scoring and recommendations
- 🌱 **Disease Detection** — upload crop images to get an AI-assisted diagnosis
- 🌍 **Global Market Map** — interactive origin map with country-level drilldowns (India regional data included)
- 🧮 **Profit Calculator** — estimate margins based on adjustable inputs
- 🛒 **Marketplace** — browse and filter listings, contact sellers
- 🌦️ **Weather Insights** — current conditions, forecast strip, AI recommendations
- 📰 **News Feed** — coffee industry news aggregation
- 🔐 **Auth** — login/signup flows with form validation
- 🌓 **Light/Dark Theme** support

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router) + React 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Recharts](https://recharts.org/) for data visualization
- [React Leaflet](https://react-leaflet.js.org/) for maps
- [Framer Motion](https://www.framer.com/motion/) for animation
- [Zod](https://zod.dev/) for schema validation

## Getting Started

### Prerequisites

- Node.js 18.18+ (Node 20 LTS recommended)
- npm

### Installation

```bash
git clone https://github.com/ChethanJD/coffeescope.git
cd coffeescope
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build & Production

```bash
npm run build
npm start
```

### Other scripts

```bash
npm run lint         # Lint the codebase
npm run type-check   # TypeScript type checking
```

## Project Structure

```
coffeescope/
├── app/              # Next.js App Router pages (routes)
├── components/       # Reusable UI components, organized by feature
├── hooks/            # Custom React hooks
├── lib/              # Utilities, mock data, calculators, validation
├── public/           # Static assets
├── types/            # Shared TypeScript types
```

## Deployment

This project is set up to deploy easily on [Vercel](https://vercel.com/):

1. Push your code to GitHub
2. Import the repo in Vercel
3. Vercel auto-detects Next.js and deploys on every push to `main`

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines and our [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.
