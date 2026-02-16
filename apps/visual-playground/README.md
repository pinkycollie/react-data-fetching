# Visual React Query Playground

An interactive, production-ready demo app that visualizes React data fetching patterns, caching strategies, SWR flows, polling, and optimistic updates using TanStack React Query v5.

![React Query Visual Demo](https://img.shields.io/badge/React%20Query-v5-blue)
![Vite](https://img.shields.io/badge/Vite-v7-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)

## 🎯 Features

### Core Functionality
- **Interactive Controls**: Adjust network latency, failure rates, polling intervals, and switch between mock/real APIs
- **Cache Inspector**: Real-time visualization of React Query cache entries with freshness status and timestamps
- **Network Activity**: Visual representation of all network requests, responses, and errors
- **Query Demo**: Live demonstration of React Query features including staleTime, refetchOnWindowFocus, and manual refetch
- **Optimistic Updates**: Interactive todo list showcasing optimistic UI updates with automatic rollback on errors

### React Query Features Demonstrated
- ✅ Query caching and invalidation
- ✅ Stale-while-revalidate (SWR) pattern
- ✅ Automatic refetching (polling, window focus)
- ✅ Optimistic updates with rollback
- ✅ Loading and error states
- ✅ Request deduplication
- ✅ Cache persistence visualization

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm, pnpm, or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd apps/visual-playground
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

### Development

Start the development server:
```bash
npm run dev
# or
pnpm dev
```

The app will be available at [http://localhost:3350](http://localhost:3350)

### Build for Production

Build the application:
```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Type Checking

Run TypeScript type checking:
```bash
npm run typecheck
```

## 📁 Project Structure

```
visual-playground/
├── src/
│   ├── api/
│   │   ├── http.ts              # Axios configuration and interceptors
│   │   └── mockApi.ts           # Mock API with simulated latency/failures
│   ├── components/
│   │   ├── Canvas.tsx           # Main canvas container
│   │   ├── CacheView.tsx        # React Query cache inspector
│   │   ├── Controls.tsx         # Control panel for settings
│   │   ├── NetworkLane.tsx      # Network activity visualizer
│   │   ├── OptimisticTodoList.tsx  # Optimistic updates demo
│   │   └── QueryDemo.tsx        # Query demonstration component
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── styles.css               # Global styles
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
# React Query Visual Playground

An interactive, production-ready demo application that visualizes React data fetching, caching, stale-while-revalidate (SWR) flows, polling, and optimistic updates using **TanStack React Query**.

## Features

### 🎯 Core Capabilities

- **Interactive Controls Panel**: Adjust latency, failure rate, polling intervals, and data sources in real-time
- **Visual Network Activity**: See animated tokens for each API request (pending, success, error)
- **Cache Inspector**: Real-time view of React Query cache entries with status and timestamps
- **useQuery Demo**: Demonstrates configurable staleTime, refetchOnWindowFocus, and manual refetch
- **Optimistic Updates**: Toggle todos with instant UI feedback and automatic rollback on errors
- **Mock API with Configurable Behavior**: Simulated latency, failure rates, and optional external API calls
- **Dark/Light Theme Toggle**: Modern, accessible UI with vivid accent colors

### 🎨 UI/UX Features

- **Framer Motion Animations**: Smooth transitions for network tokens and UI elements
- **Responsive Layout**: Works on desktop and mobile devices
- **Accessible Design**: High contrast, keyboard navigation, semantic HTML
- **Real-time Activity Logs**: Track all data fetching events with timestamps

### 🔧 Technical Highlights

- Built with **Vite + React + TypeScript**
- Uses **@tanstack/react-query** for state management
- **Axios** for HTTP requests
- **Framer Motion** for animations
- Production-ready build configuration
- No runtime Babel compilation

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server (runs on http://localhost:3350)
npm run dev
```

The app will hot-reload as you make changes.

### Building for Production

```bash
# Type check and build
npm run build
```

This creates optimized production assets in the `dist` folder.

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

## Project Structure

```
apps/visual-playground/
├── src/
│   ├── api/
│   │   ├── http.ts              # Axios instance configuration
│   │   └── mockApi.ts           # Mock API with configurable behavior
│   ├── components/
│   │   ├── Canvas.tsx           # Main canvas wrapper
│   │   ├── CacheView.tsx        # React Query cache inspector
│   │   ├── Controls.tsx         # Control panel for configuration
│   │   ├── NetworkLane.tsx      # Visual network activity display
│   │   ├── OptimisticTodoList.tsx # Optimistic updates demo
│   │   └── QueryDemo.tsx        # useQuery demonstration
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   ├── styles.css               # Global styles with theme support
│   └── vite-env.d.ts            # Vite type definitions
├── public/                      # Static assets
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── tsconfig.node.json           # TypeScript config for Vite
├── vite.config.ts               # Vite configuration
└── README.md                    # This file
```

## 🎨 How to Use

### Control Panel
1. **Network Latency**: Adjust the slider to simulate slow networks (0-3000ms)
2. **Failure Rate**: Increase to test error handling (0-100%)
3. **Polling Interval**: Enable automatic refetching at set intervals
4. **Data Source**: Switch between mock APIs and JSONPlaceholder

### Query Demo
- Change **staleTime** to see how React Query determines when data is stale
- Enable **refetchOnWindowFocus** to automatically refetch when switching browser tabs
- Click **Manual Refetch** to trigger a manual query invalidation

### Optimistic Updates
- Click on any todo item to toggle its completion status
- Notice how the UI updates immediately (optimistic update)
- If the network fails (increase failure rate), the UI automatically rolls back

### Cache Inspector
- View all cached queries in real-time
- See when queries are fresh (🟢) or stale (🔴)
- Monitor when queries are actively fetching (⏳)

### Network Activity
- Track all network requests (➡️)
- See successful responses (✅) with duration
- Monitor failed requests (❌)

## 🌐 API Endpoints

### Mock API (Client-Side Simulation)
- **Todos**: Simulated todo list with toggle functionality
- **Posts**: Mock blog posts
- **Users**: Mock user data

All mock APIs support configurable latency and failure rates.

### JSONPlaceholder (Real API)
- **Todos**: https://jsonplaceholder.typicode.com/todos
- **Posts**: https://jsonplaceholder.typicode.com/posts
- **Users**: https://jsonplaceholder.typicode.com/users

## 🚢 Deployment

### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Vercel

1. Import your repository to Vercel
2. Build command will be auto-detected
3. Deploy!

### GitHub Pages

1. Build the app:
## Usage Guide

### Control Panel Options

- **Latency**: Simulate network delay (0-3000ms)
- **Failure Rate**: Probability of API failures (0-100%)
- **Poll Interval**: Auto-refetch interval for polling mode (0-10000ms)
- **Strategy**: Choose between Manual, Mount, SWR, or Polling fetch strategies
- **Use JSONPlaceholder API**: Toggle between mock data and real external API

### Actions

- **Fetch Data**: Manually trigger a data fetch
- **Invalidate Cache**: Clear all cached queries
- **Trigger External Fetch**: Force refetch all queries
- **Clear Logs**: Reset the activity log

### Understanding the Demos

#### useQuery Demo

Demonstrates how React Query manages server state:
- Automatic background refetching
- Stale-while-revalidate pattern
- Cache invalidation
- Loading and error states

#### Optimistic Updates Demo

Shows how to update UI instantly before server confirmation:
1. Click a todo to toggle completion
2. UI updates immediately (optimistic)
3. Request sent to server
4. On success: confirmed ✅
5. On error: rolled back ↩️

Watch the activity logs to see the lifecycle.

## Deployment

### Static Hosting (GitHub Pages, Netlify, Vercel)

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

#### GitHub Pages

```bash
# Build with correct base path if deploying to a subdirectory
# Edit vite.config.ts: base: '/your-repo-name/'
npm run build

# Push dist folder to gh-pages branch
git subtree push --prefix apps/visual-playground/dist origin gh-pages
```

#### Netlify/Vercel

Simply connect your repository and set:
- Build command: `npm run build`
- Publish directory: `apps/visual-playground/dist`
- Base directory: `apps/visual-playground`

### Docker (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Development Notes

### React Query Configuration

The app uses custom default options:
```typescript
{
  queries: {
    retry: 1,
    refetchOnWindowFocus: false,
  }
}
```

Adjust these in `App.tsx` as needed.

### Mock API Behavior

The `mockApi` class in `src/api/mockApi.ts` simulates real-world scenarios:
- Configurable latency and failure rates
- Request logging for visualization
- Optimistic update support
- Optional external API integration

### Theme System

Themes are CSS custom properties defined in `styles.css`:
- Switch between dark and light themes
- Consistent color palette across components
- Easy to extend with new themes

## Testing Scenarios

1. **Test Caching**: 
   - Fetch data, then fetch again quickly
   - Notice the second fetch uses cached data

2. **Test Stale-While-Revalidate**:
   - Fetch data, wait >5 seconds
   - Switch browser tabs and return
   - Data refetches in background

3. **Test Error Handling**:
   - Set failure rate to 100%
   - Try to fetch data
   - See error state and logs

4. **Test Optimistic Updates**:
   - Toggle a todo (instant feedback)
   - Increase latency to 2000ms
   - See optimistic update, then confirmation

5. **Test Rollback**:
   - Set failure rate to 100%
   - Toggle a todo
   - Watch it update then roll back

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lightweight bundle (~150KB gzipped)
- Fast initial load (<1s on 3G)
- 60fps animations
- Efficient re-renders with React Query

## Troubleshooting

### Build Errors

If you encounter TypeScript errors:
```bash
npm run typecheck
```

### Port Already in Use

Change the port in `package.json`:
```json
"dev": "vite --port 3351"
```

### External API Blocked

If JSONPlaceholder requests fail, check CORS settings and network connectivity.

## Contributing

This is a demo project. Feel free to:
- Fork and experiment
- Add new features
- Improve the UI
- Report issues

## License

MIT License - use freely for learning and production projects.

## Learn More

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Vite Documentation](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Documentation](https://react.dev/)

---

**Happy coding! 🚀**
