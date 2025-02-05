# Custom Hooks

## İçindekiler
- [Custom Hook Nedir?](#custom-hook-nedir)
- [Hook Kuralları](#hook-kuralları)
- [Örnek Custom Hook'lar](#örnek-custom-hooklar)
- [Hook Kompozisyonu](#hook-kompozisyonu)

## Custom Hook Nedir?
Custom Hook'lar, React bileşenlerinde tekrar kullanılabilir mantık oluşturmak için kullanılan JavaScript fonksiyonlarıdır. "use" öneki ile başlarlar ve diğer Hook'ları kullanabilirler.

## Hook Kuralları
1. Hook'ları sadece React fonksiyon bileşenlerinin en üst seviyesinde çağırın
2. Hook'ları sadece React fonksiyonlarında çağırın
3. Hook isimleri "use" öneki ile başlamalıdır

## Örnek Custom Hook'lar

### useLocalStorage Hook'u
```jsx
function useLocalStorage(key, initialValue) {
  // State'i localStorage'dan başlat
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // State değiştiğinde localStorage'ı güncelle
  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Kullanımı
function App() {
  const [name, setName] = useLocalStorage('name', 'Bob');
  return (
    <input
      type="text"
      value={name}
      onChange={e => setName(e.target.value)}
    />
  );
}
```

### useWindowSize Hook'u
```jsx
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // İlk yükleme için boyutları ayarla

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Kullanımı
function ResponsiveComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Genişlik: {width}px</p>
      <p>Yükseklik: {height}px</p>
    </div>
  );
}
```

### useDebounce Hook'u
```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Kullanımı
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // API araması yap
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
  );
}
```

### usePrevious Hook'u
```jsx
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Kullanımı
function Counter() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div>
      <p>Şu anki değer: {count}</p>
      <p>Önceki değer: {previousCount}</p>
      <button onClick={() => setCount(count + 1)}>Artır</button>
    </div>
  );
}
```

## Hook Kompozisyonu

### useAPI Hook'u
```jsx
function useAPI(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const debouncedUrl = useDebounce(url, 500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(debouncedUrl);
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (debouncedUrl) {
      fetchData();
    }
  }, [debouncedUrl]);

  return { data, loading, error };
}

// Kullanımı
function DataComponent() {
  const [url, setUrl] = useState('');
  const { data, loading, error } = useAPI(url);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div>
      <input
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="API URL'si"
      />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

## En İyi Pratikler
1. Hook'ları mantıksal olarak ilgili işlevlere ayırın
2. Hook'ların yan etkilerini temizleyin
3. Performans için useMemo ve useCallback kullanın
4. Hook'ları test edilebilir şekilde tasarlayın
5. Hook'ların dokümantasyonunu yapın ve örnek kullanımlar ekleyin 