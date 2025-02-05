# React.memo Kullanımı

## İçindekiler
- [React.memo Nedir?](#reactmemo-nedir)
- [Temel Kullanım](#temel-kullanım)
- [Custom Karşılaştırma](#custom-karşılaştırma)
- [Performans Optimizasyonu](#performans-optimizasyonu)
- [En İyi Pratikler](#en-iyi-pratikler)

## React.memo Nedir?
React.memo, fonksiyonel bileşenlerin gereksiz render'larını önlemek için kullanılan bir higher-order component'tir. Bileşenin prop'larını karşılaştırarak, değişiklik olmadığında yeniden render'ı engeller.

## Temel Kullanım

### Basit React.memo Örneği
```jsx
import React from 'react';

function MyComponent({ name, age }) {
  console.log('MyComponent render edildi');
  
  return (
    <div>
      <h2>{name}</h2>
      <p>Yaş: {age}</p>
    </div>
  );
}

// React.memo ile sarmalama
export default React.memo(MyComponent);
```

### Kullanım Örneği
```jsx
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [name] = useState('John');

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Sayaç: {count}
      </button>
      
      {/* count değiştiğinde bile MyComponent render edilmeyecek */}
      <MyComponent name={name} age={25} />
    </div>
  );
}
```

## Custom Karşılaştırma

### areEqual Fonksiyonu ile Özel Karşılaştırma
```jsx
function MyComponent({ user, onUpdate }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <button onClick={onUpdate}>Güncelle</button>
    </div>
  );
}

// Özel karşılaştırma fonksiyonu
function areEqual(prevProps, nextProps) {
  return (
    prevProps.user.id === nextProps.user.id &&
    prevProps.user.name === nextProps.user.name
  );
}

export default React.memo(MyComponent, areEqual);
```

### Kompleks Props Karşılaştırma
```jsx
const MemoizedComponent = React.memo(
  function ComplexComponent({ data, callbacks }) {
    return (
      <div>
        <h2>{data.title}</h2>
        <button onClick={callbacks.onSave}>Kaydet</button>
      </div>
    );
  },
  (prev, next) => {
    // Derin karşılaştırma
    return (
      prev.data.title === next.data.title &&
      prev.data.id === next.data.id &&
      prev.callbacks.onSave === next.callbacks.onSave
    );
  }
);
```

## Performans Optimizasyonu

### useCallback ile Fonksiyon Props
```jsx
function ParentComponent() {
  const [items, setItems] = useState([]);

  // Fonksiyon prop'u memoize et
  const handleUpdate = useCallback((id) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, updated: true }
          : item
      )
    );
  }, []); // Boş dependency array

  return (
    <div>
      {items.map(item => (
        <MemoizedItem
          key={item.id}
          item={item}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}

const MemoizedItem = React.memo(function Item({ item, onUpdate }) {
  return (
    <div>
      <span>{item.name}</span>
      <button onClick={() => onUpdate(item.id)}>
        Güncelle
      </button>
    </div>
  );
});
```

### useMemo ile Obje Props
```jsx
function ParentComponent() {
  const [user, setUser] = useState({ id: 1, name: 'John' });

  // Obje prop'u memoize et
  const userConfig = useMemo(() => ({
    id: user.id,
    displayName: `${user.name} (ID: ${user.id})`
  }), [user.id, user.name]);

  return <MemoizedUserProfile config={userConfig} />;
}

const MemoizedUserProfile = React.memo(function UserProfile({ config }) {
  return (
    <div>
      <h2>{config.displayName}</h2>
    </div>
  );
});
```

## En İyi Pratikler

1. **Doğru Kullanım Yerleri**
```jsx
// İYİ: Pahalı hesaplamalar içeren bileşen
const ExpensiveComponent = React.memo(function({ data }) {
  // Karmaşık hesaplamalar
  const processedData = heavyCalculation(data);
  
  return <div>{processedData}</div>;
});

// KÖTÜ: Basit bileşen
const SimpleComponent = React.memo(function({ text }) {
  return <span>{text}</span>;
});
```

2. **Props Stabilizasyonu**
```jsx
function ParentComponent() {
  // KÖTÜ: Her render'da yeni obje
  const user = { name: 'John', age: 25 };

  // İYİ: Memoize edilmiş obje
  const user = useMemo(() => ({
    name: 'John',
    age: 25
  }), []);

  return <MemoizedComponent user={user} />;
}
```

3. **Seçici Memoizasyon**
```jsx
function Dashboard() {
  return (
    <div>
      {/* Sık güncellenen, basit bileşen */}
      <StatusIndicator />
      
      {/* Nadir güncellenen, karmaşık bileşen */}
      <MemoizedDataGrid />
    </div>
  );
}
```

4. **Event Handler'ları Optimize Etme**
```jsx
function ParentComponent() {
  // Event handler'ları useCallback ile optimize et
  const handleClick = useCallback((id) => {
    console.log(`Clicked: ${id}`);
  }, []);

  // Inline fonksiyonlardan kaçın
  return (
    <MemoizedButton
      onClick={handleClick} // İYİ
      // onClick={() => console.log('clicked')} // KÖTÜ
    />
  );
}
```

5. **Performans Ölçümü**
```jsx
const MemoizedComponent = React.memo(function Component(props) {
  // Render süresini ölç
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      console.log(`Render süresi: ${endTime - startTime}ms`);
    };
  });

  return <div>{/* Component içeriği */}</div>;
});
``` 