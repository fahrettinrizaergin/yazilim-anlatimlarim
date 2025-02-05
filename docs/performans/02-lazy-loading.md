# React Lazy Loading

## İçindekiler
- [Lazy Loading Nedir?](#lazy-loading-nedir)
- [Komponent Lazy Loading](#komponent-lazy-loading)
- [Resim Lazy Loading](#resim-lazy-loading)
- [Veri Lazy Loading](#veri-lazy-loading)
- [En İyi Pratikler](#en-iyi-pratikler)

## Lazy Loading Nedir?
Lazy Loading, bir web uygulamasının performansını artırmak için içeriğin ihtiyaç duyulduğunda yüklenmesini sağlayan bir tekniktir. Bu sayede başlangıç yükleme süresi azalır ve kullanıcı deneyimi iyileşir.

## Komponent Lazy Loading

### Temel Lazy Loading
```jsx
import React, { Suspense } from 'react';

const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Koşullu Lazy Loading
```jsx
function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  const Chart = React.lazy(() => import('./Chart'));

  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Grafiği Göster
      </button>

      {showChart && (
        <Suspense fallback={<div>Grafik yükleniyor...</div>}>
          <Chart />
        </Suspense>
      )}
    </div>
  );
}
```

## Resim Lazy Loading

### Native Lazy Loading
```jsx
function ImageGallery() {
  return (
    <div className="gallery">
      <img
        src="image1.jpg"
        loading="lazy"
        alt="Resim 1"
      />
      <img
        src="image2.jpg"
        loading="lazy"
        alt="Resim 2"
      />
      {/* Diğer resimler */}
    </div>
  );
}
```

### Intersection Observer ile Lazy Loading
```jsx
function LazyImage({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px'
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={imageRef}>
      {isLoaded ? (
        <img src={src} alt={alt} />
      ) : (
        <div className="placeholder" />
      )}
    </div>
  );
}
```

## Veri Lazy Loading

### Sonsuz Scroll
```jsx
function InfiniteList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const lastItemRef = useCallback(node => {
    if (loading) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, [loading]);

  useEffect(() => {
    const loadMore = async () => {
      setLoading(true);
      const newItems = await fetchItems(page);
      setItems(prev => [...prev, ...newItems]);
      setLoading(false);
    };

    loadMore();
  }, [page]);

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={index === items.length - 1 ? lastItemRef : null}
        >
          {item.content}
        </div>
      ))}
      {loading && <div>Yükleniyor...</div>}
    </div>
  );
}
```

### Sayfalama ile Lazy Loading
```jsx
function PaginatedList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/items?page=${page}`);
      const data = await response.json();
      
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => [...prev, ...data]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Veri yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="items-container">
        {items.map(item => (
          <div key={item.id} className="item">
            {item.content}
          </div>
        ))}
      </div>
      
      {hasMore && (
        <button
          onClick={loadMore}
          disabled={loading}
        >
          {loading ? 'Yükleniyor...' : 'Daha Fazla Yükle'}
        </button>
      )}
    </div>
  );
}
```

## En İyi Pratikler

1. **Uygun Loading State Gösterimi**
```jsx
function LoadingState() {
  return (
    <div className="loading-container">
      <Skeleton />
      <div className="loading-text">Yükleniyor...</div>
      <ProgressBar />
    </div>
  );
}
```

2. **Önbelleğe Alma**
```jsx
const cache = new Map();

async function loadComponent(path) {
  if (cache.has(path)) {
    return cache.get(path);
  }

  const component = await import(path);
  cache.set(path, component);
  return component;
}
```

3. **Hata Yönetimi**
```jsx
function LazyComponent() {
  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <Suspense fallback={<LoadingState />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
}
```

4. **Performans İzleme**
```jsx
function useLazyLoadMetrics() {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const loadTime = performance.now() - startTime;
      console.log(`Komponent yüklenme süresi: ${loadTime}ms`);
    };
  }, []);
}
```

5. **Öncelikli Yükleme**
```jsx
const PriorityLoading = {
  HIGH: { priority: 'high', timeout: 1000 },
  MEDIUM: { priority: 'medium', timeout: 2000 },
  LOW: { priority: 'low', timeout: 3000 }
};

function LazyLoadWithPriority({ priority, component }) {
  const Component = React.lazy(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(import(component));
      }, PriorityLoading[priority].timeout);
    });
  });

  return (
    <Suspense fallback={<LoadingState />}>
      <Component />
    </Suspense>
  );
}
``` 