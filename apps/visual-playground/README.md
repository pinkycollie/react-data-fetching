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
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to GitHub Pages using `gh-pages` or manual commit to `gh-pages` branch

### Static Hosting (Any Provider)

1. Build the app: `npm run build`
2. Upload the contents of the `dist` directory to your hosting provider

## 🛠️ Technologies Used

- **React 19**: UI library
- **TypeScript 5.9**: Type safety
- **Vite 7**: Build tool and dev server
- **TanStack React Query v5**: Data fetching and caching
- **Axios**: HTTP client
- **CSS**: Custom styling (no UI framework dependencies)

## 📚 Learning Resources

- [React Query Documentation](https://tanstack.com/query/latest)
- [Optimistic Updates Guide](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates)
- [Caching Examples](https://tanstack.com/query/latest/docs/react/guides/caching)
- [SWR vs React Query Comparison](https://tanstack.com/query/latest/docs/react/comparison)

## 🔍 Key React Query Concepts Demonstrated

### 1. Caching
React Query automatically caches query results and intelligently reuses them, reducing unnecessary network requests.

### 2. Stale-While-Revalidate (SWR)
Queries can serve cached (potentially stale) data immediately while fetching fresh data in the background.

### 3. Automatic Refetching
Queries automatically refetch based on:
- Window focus
- Network reconnection
- Polling intervals
- Manual invalidation

### 4. Optimistic Updates
UI updates immediately when mutations are triggered, providing instant feedback. Changes are automatically rolled back if the mutation fails.

### 5. Request Deduplication
Multiple components requesting the same data will share a single network request.

## 🤝 Contributing

This is part of the [react-data-fetching](https://github.com/pinkycollie/react-data-fetching) repository. Please refer to the main repository for contribution guidelines.

## 📝 License

This project is part of the react-data-fetching repository. See the main repository for license information.

## 🎓 Educational Goals

This playground helps developers:
- Understand React Query's caching mechanisms visually
- See the difference between fresh and stale data
- Learn how optimistic updates work and when they roll back
- Experiment with different configurations safely
- Compare mock vs. real API behavior
- Debug and visualize data fetching flows

## 💡 Tips

1. **Start with low latency** to see responses quickly, then increase to understand caching benefits
2. **Enable polling** to see automatic refetching in action
3. **Increase failure rate** to understand error handling and retry logic
4. **Toggle todos rapidly** to see optimistic updates in action
5. **Watch the cache inspector** while refetching to understand staleness
6. **Try the devtools** (bottom-right icon) for even more React Query insights

## 🐛 Troubleshooting

### Port already in use
If port 3350 is already in use, modify the port in `vite.config.ts`:
```typescript
server: {
  port: 3351, // or any available port
}
```

### Build fails
Ensure you're using Node.js 18 or higher:
```bash
node --version
```

### Dependencies not installing
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For questions or issues, please open an issue in the main [react-data-fetching](https://github.com/pinkycollie/react-data-fetching) repository.

---

Built with ❤️ for the React community
