# React Code Splitting

## İçindekiler
- [Code Splitting Nedir?](#code-splitting-nedir)
- [React.lazy ve Suspense](#reactlazy-ve-suspense)
- [Route Bazlı Code Splitting](#route-bazlı-code-splitting)
- [Komponent Bazlı Code Splitting](#komponent-bazlı-code-splitting)
- [En İyi Pratikler](#en-iyi-pratikler)

## Code Splitting Nedir?
Code Splitting, uygulamanızı daha küçük parçalara bölerek, sadece gerektiğinde yüklenmesini sağlayan bir tekniktir. Bu sayede başlangıç yükleme süresini azaltır ve uygulama performansını artırır.

## React.lazy ve Suspense

### Temel Kullanım
```jsx
import React, { Suspense } from 'react';

// Lazy loading ile komponent import etme
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Çoklu Komponent Lazy Loading
```jsx
const About = React.lazy(() => import('./About'));
const Contact = React.lazy(() => import('./Contact'));
const Dashboard = React.lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Router>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </Suspense>
  );
}
```

## Route Bazlı Code Splitting

### React Router ile Kullanım
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';

const Home = React.lazy(() => import('./routes/Home'));
const UserProfile = React.lazy(() => import('./routes/UserProfile'));
const Settings = React.lazy(() => import('./routes/Settings'));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="loading">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

## Komponent Bazlı Code Splitting

### Koşullu Yükleme
```jsx
const HeavyChart = React.lazy(() => import('./HeavyChart'));

function Dashboard({ showChart }) {
  return (
    <div>
      <h1>Dashboard</h1>
      {showChart && (
        <Suspense fallback={<div>Grafik yükleniyor...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
```

### Özel Loading Komponenti
```jsx
function LoadingFallback() {
  return (
    <div className="loading-container">
      <div className="loading-spinner" />
      <p>İçerik yükleniyor...</p>
    </div>
  );
}

const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## Hata Yönetimi

### Error Boundary ile Kullanım
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Bir şeyler yanlış gitti. Lütfen sayfayı yenileyin.</div>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <HeavyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

## Prefetching

### Komponent Prefetching
```jsx
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  const [showComponent, setShowComponent] = useState(false);

  // Mouse hover olduğunda komponenti önceden yükle
  const handleMouseEnter = () => {
    const componentPromise = import('./HeavyComponent');
  };

  return (
    <div>
      <button
        onMouseEnter={handleMouseEnter}
        onClick={() => setShowComponent(true)}
      >
        Komponenti Göster
      </button>

      {showComponent && (
        <Suspense fallback={<LoadingSpinner />}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}
```

## En İyi Pratikler

1. **Doğru Bölme Noktaları Seçin**
```jsx
// İyi: Mantıklı bölme noktası
const AdminDashboard = React.lazy(() => import('./AdminDashboard'));

// Kötü: Çok küçük komponent için gereksiz bölme
const Button = React.lazy(() => import('./Button'));
```

2. **Route Seviyesinde Bölme**
```jsx
// routes.js
export const routes = [
  {
    path: '/',
    component: React.lazy(() => import('./Home'))
  },
  {
    path: '/dashboard',
    component: React.lazy(() => import('./Dashboard'))
  }
];
```

3. **Uygun Fallback UI**
```jsx
function SuspenseFallback() {
  return (
    <div className="fallback">
      <Skeleton />
      <ProgressBar />
    </div>
  );
}
```

4. **Webpack Chunk Names**
```jsx
const AdminPanel = React.lazy(() => 
  import(/* webpackChunkName: "admin" */ './AdminPanel')
);
```

5. **Preload Stratejisi**
```jsx
// Kullanıcı etkileşimine göre preload
const preloadComponent = () => {
  const componentPromise = import('./HeavyComponent');
  // Opsiyonel: Yükleme durumunu takip et
  componentPromise.then(() => {
    console.log('Komponent yüklendi');
  });
};
``` 