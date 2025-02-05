# React Performans Optimizasyonu: React.memo 🚀

## Giriş 🎯

Merhaba arkadaşlar! Bugün React uygulamalarımızı daha performanslı hale getirmek için kullanabileceğimiz önemli bir özelliği, React.memo'yu inceleyeceğiz. Gereksiz render'ları önleyerek uygulamamızın performansını nasıl artırabileceğimizi öğreneceğiz. Hadi başlayalım! 💪

## React.memo Nedir? 🤔

React.memo, bir higher-order component'tir ve fonksiyonel bileşenleri memoize etmek (önbelleğe almak) için kullanılır. Yani, bir bileşenin prop'ları değişmediği sürece yeniden render edilmesini önler.

```javascript
const MemoizedComponent = React.memo(function MyComponent(props) {
  // Bileşen kodları
});
```

## Ne Zaman Kullanmalıyız? 🎯

1. Bileşen sık sık yeniden render ediliyor
2. Prop'ları genellikle aynı kalıyor
3. Bileşen karmaşık veya ağır işlemler yapıyor

## Basit Bir Örnek 🎈

```javascript
import React from 'react';

// Memoize edilmemiş bileşen
function TodoItem({ todo, onToggle }) {
  console.log('TodoItem render edildi:', todo.text);
  
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
    </div>
  );
}

// Memoize edilmiş bileşen
const MemoizedTodoItem = React.memo(TodoItem);

// Ana bileşen
function TodoList() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'React.memo öğren', completed: false },
    { id: 2, text: 'Performans optimizasyonu yap', completed: false }
  ]);

  const handleToggle = React.useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  return (
    <div>
      {todos.map(todo => (
        <MemoizedTodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
```

## Gelişmiş Kullanım 🚀

### 1. Özel Karşılaştırma Fonksiyonu

```javascript
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.todo.id === nextProps.todo.id &&
    prevProps.todo.completed === nextProps.todo.completed
  );
};

const MemoizedTodoItem = React.memo(TodoItem, areEqual);
```

### 2. useCallback ile Fonksiyon Prop'ları Optimize Etme

```javascript
function ParentComponent() {
  const [count, setCount] = React.useState(0);

  const handleClick = React.useCallback(() => {
    console.log('Tıklandı!');
  }, []); // Bağımlılık dizisi boş

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Sayaç: {count}
      </button>
      <MemoizedChildComponent onClick={handleClick} />
    </div>
  );
}
```

## Yaygın Hatalar ve Çözümleri ⚠️

### 1. Obje Prop'ları

```javascript
// ❌ Yanlış Kullanım
function Parent() {
  return <MemoizedComponent style={{ margin: 10 }} />; // Her render'da yeni obje
}

// ✅ Doğru Kullanım
const style = { margin: 10 }; // Sabit obje
function Parent() {
  return <MemoizedComponent style={style} />;
}
```

### 2. İç İçe Fonksiyonlar

```javascript
// ❌ Yanlış Kullanım
function Parent() {
  const handleClick = () => console.log('Tıklandı!');
  return <MemoizedComponent onClick={handleClick} />;
}

// ✅ Doğru Kullanım
function Parent() {
  const handleClick = React.useCallback(
    () => console.log('Tıklandı!'),
    []
  );
  return <MemoizedComponent onClick={handleClick} />;
}
```

## Performans İpuçları 💡

1. **Seçici Kullanım**
   - Her bileşeni memoize etmeyin
   - Sadece gerçekten fayda sağlayacak yerlerde kullanın

2. **Prop Sayısını Azaltın**
   - Ne kadar çok prop, o kadar çok karşılaştırma
   - Gereksiz prop'ları kaldırın

3. **useMemo ile Değer Optimizasyonu**
   ```javascript
   const memoizedValue = React.useMemo(
     () => computeExpensiveValue(a, b),
     [a, b]
   );
   ```

4. **DevTools ile Performans Analizi**
   - React DevTools Profiler kullanın
   - Gereksiz render'ları tespit edin

## Örnek Kullanım Senaryoları 🌟

### 1. Liste Öğeleri

```javascript
const ListItem = React.memo(function ListItem({ item, onSelect }) {
  return (
    <div onClick={() => onSelect(item.id)}>
      {item.title}
    </div>
  );
});

function List({ items }) {
  const handleSelect = React.useCallback((id) => {
    console.log('Seçilen:', id);
  }, []);

  return (
    <div>
      {items.map(item => (
        <ListItem
          key={item.id}
          item={item}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}
```

### 2. Form Bileşenleri

```javascript
const FormInput = React.memo(function FormInput({ label, value, onChange }) {
  return (
    <div>
      <label>{label}:</label>
      <input value={value} onChange={onChange} />
    </div>
  );
});

function Form() {
  const [values, setValues] = React.useState({
    name: '',
    email: ''
  });

  const handleNameChange = React.useCallback((e) => {
    setValues(prev => ({ ...prev, name: e.target.value }));
  }, []);

  const handleEmailChange = React.useCallback((e) => {
    setValues(prev => ({ ...prev, email: e.target.value }));
  }, []);

  return (
    <form>
      <FormInput
        label="İsim"
        value={values.name}
        onChange={handleNameChange}
      />
      <FormInput
        label="Email"
        value={values.email}
        onChange={handleEmailChange}
      />
    </form>
  );
}
```

## Sonuç 🎉

React.memo, doğru kullanıldığında uygulamanızın performansını önemli ölçüde artırabilir. Ancak her zaman hatırlamalıyız ki, erken optimizasyon kötü bir pratiktir. Önce performans sorunlarını tespit edin, sonra React.memo ve diğer optimizasyon tekniklerini kullanın.

Umarım bu rehber, React.memo'yu anlamanıza ve projelerinizde etkili bir şekilde kullanmanıza yardımcı olmuştur. Sorularınız varsa, sormaktan çekinmeyin. Birlikte öğrenmeye devam! 🚀