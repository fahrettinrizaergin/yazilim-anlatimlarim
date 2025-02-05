# Higher Order Components (HOC)

## İçindekiler
- [HOC Nedir?](#hoc-nedir)
- [Temel HOC Yapısı](#temel-hoc-yapısı)
- [Yaygın Kullanım Örnekleri](#yaygın-kullanım-örnekleri)
- [HOC Kompozisyonu](#hoc-kompozisyonu)
- [En İyi Pratikler](#en-iyi-pratikler)

## HOC Nedir?
Higher Order Component (HOC), bir bileşeni alıp yeni bir bileşen döndüren bir fonksiyondur. React'te kod tekrarını azaltmak ve bileşen mantığını yeniden kullanmak için kullanılan ileri düzey bir tekniktir.

## Temel HOC Yapısı

### Basit HOC Örneği
```jsx
// Higher Order Component
function withLogger(WrappedComponent) {
  return function WithLoggerComponent(props) {
    useEffect(() => {
      console.log('Bileşen mount edildi:', WrappedComponent.name);
      return () => {
        console.log('Bileşen unmount edildi:', WrappedComponent.name);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
}

// Kullanımı
function MyComponent(props) {
  return <div>Merhaba, {props.name}!</div>;
}

const MyComponentWithLogger = withLogger(MyComponent);
```

## Yaygın Kullanım Örnekleri

### Authentication HOC
```jsx
function withAuth(WrappedComponent) {
  return function WithAuthComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Kimlik doğrulama kontrolü
      checkAuth().then(auth => {
        setIsAuthenticated(auth);
        setLoading(false);
      });
    }, []);

    if (loading) {
      return <div>Yükleniyor...</div>;
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };
}

// Kullanımı
const ProtectedComponent = withAuth(SecretComponent);
```

### Data Fetching HOC
```jsx
function withData(WrappedComponent, dataSource) {
  return function WithDataComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = await fetch(dataSource);
          const json = await result.json();
          setData(json);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata: {error}</div>;

    return <WrappedComponent data={data} {...props} />;
  };
}

// Kullanımı
const UserListWithData = withData(UserList, 'https://api.example.com/users');
```

### Style Injection HOC
```jsx
function withStyles(WrappedComponent, styles) {
  return function WithStylesComponent(props) {
    return (
      <div style={styles}>
        <WrappedComponent {...props} />
      </div>
    );
  };
}

// Kullanımı
const styles = {
  padding: '20px',
  margin: '10px',
  border: '1px solid #ccc'
};

const StyledComponent = withStyles(MyComponent, styles);
```

## HOC Kompozisyonu

### Birden Fazla HOC Kullanımı
```jsx
// HOC'ları compose etmek için yardımcı fonksiyon
function compose(...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

// HOC'ları birleştirme
const enhance = compose(
  withAuth,
  withData('https://api.example.com/data'),
  withStyles({ padding: '20px' }),
  withLogger
);

// Kullanımı
const EnhancedComponent = enhance(BaseComponent);
```

### Props Proxy Pattern
```jsx
function withPropsProxy(WrappedComponent) {
  return function WithPropsProxy(props) {
    const newProps = {
      ...props,
      extraProp: 'Ekstra Özellik'
    };

    return <WrappedComponent {...newProps} />;
  };
}
```

### Render Hijacking Pattern
```jsx
function withRenderHijacking(WrappedComponent) {
  return function WithRenderHijacking(props) {
    if (props.loading) {
      return <div>Yükleniyor...</div>;
    }

    if (props.error) {
      return <div>Hata: {props.error}</div>;
    }

    return <WrappedComponent {...props} />;
  };
}
```

## En İyi Pratikler

1. **Orijinal Bileşen İsmini Koru**
```jsx
function withHOC(WrappedComponent) {
  function WithHOC(props) {
    return <WrappedComponent {...props} />;
  }
  
  // Debugging için bileşen ismini ayarla
  WithHOC.displayName = `WithHOC(${getDisplayName(WrappedComponent)})`;
  return WithHOC;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```

2. **Props'ları Değiştirmeden İlet**
```jsx
function withHOC(WrappedComponent) {
  return function WithHOC(props) {
    // Yeni props'ları ekle ama mevcut props'ları değiştirme
    const enhancedProps = {
      ...props,
      newProp: 'value'
    };
    return <WrappedComponent {...enhancedProps} />;
  };
}
```

3. **Ref'leri Doğru Şekilde İlet**
```jsx
function withHOC(WrappedComponent) {
  return React.forwardRef((props, ref) => {
    return <WrappedComponent {...props} forwardedRef={ref} />;
  });
}
```

4. **Static Metodları Kopyala**
```jsx
function withHOC(WrappedComponent) {
  function WithHOC(props) {
    return <WrappedComponent {...props} />;
  }
  
  // Static metodları kopyala
  hoistNonReactStatics(WithHOC, WrappedComponent);
  return WithHOC;
}
```

5. **Performans Optimizasyonu**
```jsx
function withHOC(WrappedComponent) {
  return React.memo(function WithHOC(props) {
    return <WrappedComponent {...props} />;
  });
}
``` 