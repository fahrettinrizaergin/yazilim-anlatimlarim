# React Hooks ile Performans Optimizasyonu

## İçindekiler
- [Hook'ların Performans Etkisi](#hookların-performans-etkisi)
- [useMemo Kullanımı](#usememo-kullanımı)
- [useCallback Kullanımı](#usecallback-kullanımı)
- [useEffect Optimizasyonu](#useeffect-optimizasyonu)
- [Custom Hooks ile Performans](#custom-hooks-ile-performans)

## Hook'ların Performans Etkisi

### Hook Kuralları ve Performans
```jsx
function GoodComponent() {
  // İYİ: Hook'lar en üst seviyede
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // KÖTÜ: Koşullu Hook kullanımı
  if (count > 0) {
    // useState('conditional'); // Bu hatalı kullanım
  }

  return (
    <div>
      <p>{count}</p>
      <p>{name}</p>
    </div>
  );
}
```

## useMemo Kullanımı

### Pahalı Hesaplamalar
```jsx
function ExpensiveCalculation({ data }) {
  // Pahalı hesaplamaları memoize et
  const processedData = useMemo(() => {
    return data.map(item => {
      // Karmaşık hesaplamalar
      return heavyCalculation(item);
    });
  }, [data]); // Sadece data değiştiğinde yeniden hesapla

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.value}</div>
      ))}
    </div>
  );
}
```

### Referans Kararlılığı
```jsx
function UserProfile({ user }) {
  // Obje referansını kararlı tut
  const userDetails = useMemo(() => ({
    fullName: `${user.firstName} ${user.lastName}`,
    age: user.age,
    email: user.email
  }), [user.firstName, user.lastName, user.age, user.email]);

  return <ProfileDetails user={userDetails} />;
}
```

## useCallback Kullanımı

### Event Handler Optimizasyonu
```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);

  // Handler'ı memoize et
  const handleDelete = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []); // Boş dependency array

  // Handler'ı props olarak geçirme
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
```

### Callback Props
```jsx
function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');

  // Debounce edilmiş arama fonksiyonu
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      onSearch(searchTerm);
    }, 300),
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return <input value={query} onChange={handleChange} />;
}
```

## useEffect Optimizasyonu

### Dependency Array Optimizasyonu
```jsx
function UserData({ userId }) {
  const [user, setUser] = useState(null);

  // İYİ: Minimal dependency array
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Sadece userId değiştiğinde çalışır

  // KÖTÜ: Gereksiz dependencies
  useEffect(() => {
    console.log(user);
  }, [user, userId]); // user'ı izlemek gereksiz
}
```

### Cleanup Fonksiyonları
```jsx
function LiveData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isSubscribed = true;
    const ws = new WebSocket('ws://api.example.com');

    ws.onmessage = (event) => {
      if (isSubscribed) {
        setData(JSON.parse(event.data));
      }
    };

    // Cleanup fonksiyonu
    return () => {
      isSubscribed = false;
      ws.close();
    };
  }, []); // Boş dependency array

  return <div>{/* data render */}</div>;
}
```

## Custom Hooks ile Performans

### useDebounce Hook'u
```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Kullanımı
function SearchComponent() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    // API araması yap
    if (debouncedSearch) {
      searchAPI(debouncedSearch);
    }
  }, [debouncedSearch]);
}
```

### useThrottle Hook'u
```jsx
function useThrottle(value, limit) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
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
      <p>Şimdiki değer: {count}</p>
      <p>Önceki değer: {previousCount}</p>
    </div>
  );
}
```

## En İyi Pratikler

1. **State Gruplandırma**
```jsx
// İYİ: İlişkili state'leri grupla
const [formData, setFormData] = useState({
  name: '',
  email: '',
  age: 0
});

// KÖTÜ: Çok fazla ayrı state
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [age, setAge] = useState(0);
```

2. **useEffect Dependency Optimizasyonu**
```jsx
function OptimizedComponent({ onUpdate }) {
  // Callback'i memoize et
  const memoizedCallback = useCallback(() => {
    onUpdate();
  }, [onUpdate]);

  // Effect'te memoize edilmiş callback'i kullan
  useEffect(() => {
    memoizedCallback();
  }, [memoizedCallback]);
}
```

3. **Performans Ölçümü**
```jsx
function usePerformanceTracker(componentName) {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      console.log(`${componentName} render süresi:`, endTime - startTime);
    };
  });
}

// Kullanımı
function MyComponent() {
  usePerformanceTracker('MyComponent');
  // ...
}
```

4. **Koşullu Render Optimizasyonu**
```jsx
function ConditionalComponent({ isVisible, children }) {
  // Gereksiz render'ları önle
  if (!isVisible) return null;

  return <div>{children}</div>;
}
```

5. **Context Optimizasyonu**
```jsx
const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  // Value'yu memoize et
  const value = useMemo(() => ({
    theme,
    setTheme
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
``` 