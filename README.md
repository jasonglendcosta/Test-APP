# ONE DEVELOPMENT | Strategic Platform 2026

A GOD-tier strategy application built with Next.js 14, featuring a stunning home page showcasing ONE Development's digital transformation journey and an enhanced One Residence project brief dashboard.

![ONE Development](https://img.shields.io/badge/ONE-Development-D86DCB?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Features

### Strategy Home Page
- **Hero Section**: Animated strategic vision with radar chart visualization
- **Performance Metrics**: Real-time KPIs with trend indicators
- **Digital Initiatives**: Progress tracking for 2026 transformation roadmap
- **Featured Project Card**: One Residence showcase with key statistics

### One Residence Project Brief
- **Overview Dashboard**: Project profile, unit distribution, location highlights
- **Unit Mix Analysis**: Interactive cards with pricing, PSF, and revenue data
- **Interactive Tower View**: 3D-style floor visualization with click-to-explore details
- **Financial Summary**: Revenue breakdown, floor-wise analysis, payment plan
- **Amenities Showcase**: World-class features including Abu Dhabi's first HBOT facility

### Design System
- **Color Palette**: ONE Development pink (#D86DCB) to magenta (#A02B93) gradient
- **Glass Morphism**: Frosted glass effects with backdrop blur
- **Glow Effects**: Strategic accent glows and hover states
- **Dark Theme**: Premium slate/charcoal backgrounds

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd one-strategy-app

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.5 | React framework with App Router |
| React | 18.3.1 | UI library |
| TypeScript | 5.5.2 | Type safety |
| Tailwind CSS | 3.4.4 | Utility-first styling |
| Recharts | 2.12.7 | Data visualization |
| Framer Motion | 11.2.10 | Animations |
| Lucide React | 0.395.0 | Icons |

## 📁 Project Structure

```
one-strategy-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with metadata
│   │   └── page.tsx        # Main application pages
│   ├── components/
│   │   ├── ui/             # Reusable UI components
│   │   │   └── index.tsx   # Logo, GlowCard, Buttons, StatCard
│   │   ├── charts/
│   │   │   ├── index.tsx   # UnitMix, Revenue, Radar charts
│   │   │   └── TowerVisualization.tsx
│   │   └── layout/         # Layout components
│   ├── data/
│   │   └── project-data.ts # Project constants and data
│   ├── lib/
│   │   └── utils.ts        # Utility functions
│   └── styles/
│       └── globals.css     # Global styles and animations
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Design Tokens

```css
/* Primary Colors */
--od-pink: #D86DCB;
--od-magenta: #A02B93;

/* Background Colors */
--od-dark: #0a0a0f;
--od-slate: #1a1a24;

/* Typography */
font-family: 'Space Grotesk' (headers)
font-family: 'Inter' (body)
```

## 📊 Project Data

### One Residence Key Metrics
- **Total Units**: 196 (195 Residential + 1 Retail)
- **Total Revenue**: AED 452.2M
- **Building Height**: 124m (31 floors)
- **Completion**: December 2028
- **Location**: Al Reem Island, Abu Dhabi

### Unit Type Distribution
| Type | Units | Avg. Price | Avg. PSF |
|------|-------|------------|----------|
| 1BR Simplex | 63 | 1.58M | 1,601 |
| 1BR Duplex | 13 | 1.76M | 1,766 |
| 2BR Simplex | 74 | 2.23M | 1,491 |
| 2BR Duplex | 11 | 3.26M | 1,601 |
| 3BR Simplex | 20 | 3.33M | 1,490 |
| 3BR Duplex | 12 | 3.65M | 1,544 |
| 4BR Duplex | 2 | 5.78M | 1,765 |

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1440px+)
- Laptop (1024px - 1439px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📄 License

Proprietary - ONE Development © 2024

---

Built with ❤️ by the ONE Development Digital Team
