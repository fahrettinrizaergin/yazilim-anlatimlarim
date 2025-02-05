# React Hata Yönetimi

## İçindekiler
- [Error Boundary](#error-boundary)
- [Try-Catch Kullanımı](#try-catch-kullanımı)
- [Async/Await Hata Yönetimi](#asyncawait-hata-yönetimi)
- [Global Hata Yönetimi](#global-hata-yönetimi)
- [Hata İzleme ve Raporlama](#hata-izleme-ve-raporlama)

## Error Boundary

### Temel Error Boundary Bileşeni
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Hata loglama servisi çağrısı
    console.error('Error Boundary yakaladı:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Bir şeyler yanlış gitti.</h1>
          <p>{this.state.error.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Kullanımı
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

## Try-Catch Kullanımı

### Event Handler'larda Hata Yönetimi
```jsx
function FormComponent() {
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      // Form işlemleri
      throw new Error('Form gönderme hatası!');
    } catch (error) {
      console.error('Form hatası:', error);
      // Hata durumunu kullanıcıya göster
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form içeriği */}
    </form>
  );
}
```

## Async/Await Hata Yönetimi

### API İsteklerinde Hata Yönetimi
```jsx
function DataFetcher() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://api.example.com/data');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;
  if (!data) return null;

  return (
    <div>
      {/* Veri gösterimi */}
    </div>
  );
}
```

## Global Hata Yönetimi

### Custom Error Handler Hook
```jsx
function useErrorHandler() {
  const [error, setError] = useState(null);

  const handleError = useCallback((error) => {
    console.error('Hata yakalandı:', error);
    setError(error);
    
    // Hata tipine göre işlem yap
    if (error.name === 'AuthError') {
      // Oturum hatası işlemleri
    } else if (error.name === 'NetworkError') {
      // Ağ hatası işlemleri
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
}

// Kullanımı
function App() {
  const { error, handleError, clearError } = useErrorHandler();

  useEffect(() => {
    if (error) {
      // Hata gösterim komponenti
      toast.error(error.message);
    }
  }, [error]);

  return (
    <ErrorContext.Provider value={{ handleError, clearError }}>
      {/* Uygulama içeriği */}
    </ErrorContext.Provider>
  );
}
```

### Özel Hata Sınıfları
```jsx
class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

class ValidationError extends Error {
  constructor(message, fields) {
    super(message);
    this.name = 'ValidationError';
    this.fields = fields;
  }
}

// Kullanımı
async function submitForm(data) {
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new ValidationError('Form validation failed', await response.json());
      }
      throw new ApiError('API request failed', response.status);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ValidationError) {
      // Form hatalarını göster
    } else if (error instanceof ApiError) {
      // API hatalarını göster
    } else {
      // Genel hataları göster
    }
  }
}
```

## Hata İzleme ve Raporlama

### Hata İzleme Servisi Entegrasyonu
```jsx
function initErrorTracking() {
  window.onerror = function(message, source, lineno, colno, error) {
    // Hata izleme servisine gönder
    trackError({
      message,
      source,
      lineno,
      colno,
      stack: error?.stack
    });
    return false;
  };

  window.addEventListener('unhandledrejection', function(event) {
    // Promise hatalarını yakala
    trackError({
      message: event.reason?.message || 'Unhandled Promise Rejection',
      stack: event.reason?.stack
    });
  });
}

function trackError(error) {
  // Hata izleme servisine gönder (örn: Sentry, LogRocket)
  if (process.env.NODE_ENV === 'production') {
    errorTrackingService.captureException(error);
  } else {
    console.error('Development Error:', error);
  }
}
```

## En İyi Pratikler
1. Her zaman Error Boundary kullanın
2. Async işlemlerde try-catch bloklarını kullanın
3. Hataları merkezi bir yerden yönetin
4. Üretim ortamında hata izleme servisi kullanın
5. Kullanıcı dostu hata mesajları gösterin
6. Hata durumlarında uygun fallback UI'lar sağlayın
7. Kritik hataları loglayın ve izleyin 