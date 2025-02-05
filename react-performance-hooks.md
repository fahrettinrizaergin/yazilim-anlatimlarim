# React Performans Optimizasyonu: useMemo ve useCallback 🚀

## Giriş 🎯

Merhaba arkadaşlar! Bu yazımızda React'in performans optimizasyonu için sunduğu iki önemli hook'u, useMemo ve useCallback'i inceleyeceğiz. Bu hook'lar sayesinde uygulamalarımızı nasıl daha verimli hale getirebileceğimizi öğreneceğiz. Hadi başlayalım! 💪

## Memoization Nedir? 🤔

Memoization, bir fonksiyonun veya hesaplamanın sonucunu önbelleğe alarak, aynı girdiler için tekrar tekrar hesaplama yapmaktan kaçınma tekniğidir. React'te useMemo ve useCallback hook'ları bu prensibi kullanır.

## useMemo Hook'u 📝

### Temel Kullanım

```javascript
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]
);
```

### Pratik Örnek

```javascript
import React, { useMemo, useState } from 'react';

function ProductList({ products, filterText }) {
  const filteredProducts = useMemo(() => {
    console.log('Ürünler filtreleniyor...');
    return products.filter(product =>
      product.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [products, filterText]); // Sadece products veya filterText değiştiğinde yeniden hesapla

  return (
    <ul>
      {filteredProducts.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

function App() {
  const [products] = useState([
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Mouse' },
    { id: 3, name: 'Keyboard' }
  ]);
  const [filterText, setFilterText] = useState('');
  const [count, setCount] = useState(0); // Sayaç state'i

  return (
    <div>
      <input
        type="text"
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
        placeholder="Ürün ara..."
      />
      <button onClick={() => setCount(c => c + 1)}>
        Sayaç: {count}
      </button>
      <ProductList products={products} filterText={filterText} />
    </div>
  );
}
```

## useCallback Hook'u 🎣

### Temel Kullanım

```javascript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]
);
```

### Pratik Örnek

```javascript
import React, { useCallback, useState, memo } from 'react';

// Alt bileşen (memo ile optimize edilmiş)
const TodoItem = memo(function TodoItem({ todo, onToggle }) {
  console.log('TodoItem render edildi:', todo.text);
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
    </li>
  );
});

// Ana bileşen
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'React Hooks öğren', completed: false },
    { id: 2, text: 'Performans optimizasyonu yap', completed: false }
  ]);

  // useCallback ile fonksiyonu memoize ediyoruz
  const handleToggle = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // Boş dependency array çünkü fonksiyon hiçbir prop'a bağlı değil

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
        />
      ))}
    </ul>
  );
}
```

## Ne Zaman Kullanmalı? 🎯

### useMemo İçin:
1. Hesaplama maliyetli olduğunda
2. Referans eşitliği önemli olduğunda
3. Büyük veri setleriyle çalışırken

### useCallback İçin:
1. Fonksiyon child bileşenlere prop olarak geçildiğinde
2. Fonksiyon bir useEffect dependency array'inde kullanıldığında
3. Fonksiyon memoized bileşenlere geçildiğinde

## Yaygın Hatalar ve Çözümleri ⚠️

### 1. Gereksiz Kullanım

```javascript
// ❌ Gereksiz Kullanım
const value = useMemo(() => a + b, [a, b]); // Basit işlemler için gerekli değil

// ✅ Normal Kullanım
const value = a + b;
```

### 2. Eksik Dependency Array

```javascript
// ❌ Yanlış Kullanım
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [] // b değiştiğinde güncellenmeyecek!
);

// ✅ Doğru Kullanım
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]
);
```

## Performans İpuçları 💡

1. **Seçici Kullanım**
   - Her hesaplama için useMemo kullanmayın
   - Her fonksiyon için useCallback kullanmayın
   - Sadece gerçekten fayda sağlayacak yerlerde kullanın

2. **Dependency Array Optimizasyonu**
   - Gereksiz bağımlılıkları kaldırın
   - Mümkünse bağımlılık sayısını azaltın
   - Object ve array'leri useMemo ile memoize edin

3. **DevTools ile Performans Analizi**
   - React DevTools Profiler kullanın
   - Gereksiz render'ları tespit edin
   - Optimizasyon öncesi ve sonrası performansı karşılaştırın

## Gerçek Dünya Örneği 🌍

```javascript
import React, { useState, useMemo, useCallback } from 'react';

function DataGrid({ data, onSort }) {
  // Karmaşık veri işleme
  const processedData = useMemo(() => {
    console.log('Veri işleniyor...');
    return data.map(item => ({
      ...item,
      fullName: `${item.firstName} ${item.lastName}`,
      totalScore: item.scores.reduce((a, b) => a + b, 0)
    }));
  }, [data]);

  // Sıralama fonksiyonu
  const handleSort = useCallback((column) => {
    const sorted = [...processedData].sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    onSort(sorted);
  }, [processedData, onSort]);

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('fullName')}>İsim</th>
          <th onClick={() => handleSort('totalScore')}>Toplam Puan</th>
        </tr>
      </thead>
      <tbody>
        {processedData.map(item => (
          <tr key={item.id}>
            <td>{item.fullName}</td>
            <td>{item.totalScore}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## Sonuç 🎉

useMemo ve useCallback hook'ları, doğru kullanıldığında React uygulamalarınızın performansını önemli ölçüde artırabilir. Ancak her optimizasyon gibi, bunları da yerinde ve gerektiğinde kullanmak önemlidir. Performans sorunlarını önce tespit edin, sonra bu hook'ları kullanarak çözün.

Umarım bu rehber, React'te performans optimizasyonunu anlamanıza ve projelerinizde useMemo ve useCallback hook'larını etkili bir şekilde kullanmanıza yardımcı olmuştur. Sorularınız varsa, sormaktan çekinmeyin. Birlikte öğrenmeye devam! 🚀