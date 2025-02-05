# ReactJS State Yönetimi

## İçindekiler
- [State Nedir?](#state-nedir)
- [useState Hook'u](#usestate-hooku)
- [useReducer Hook'u](#usereducer-hooku)
- [Context API](#context-api)
- [Global State Yönetimi](#global-state-yönetimi)

## State Nedir?
State, React bileşenlerinin içinde tutulan ve zaman içinde değişebilen verilerdir. Bir bileşenin kullanıcı etkileşimleri, API çağrıları veya başka olaylar sonucunda güncellenebilen durumunu temsil eder.

## useState Hook'u

### Temel Kullanım
```jsx
import React, { useState } from 'react';

function Sayac() {
  const [sayi, setSayi] = useState(0);

  return (
    <div>
      <p>Sayı: {sayi}</p>
      <button onClick={() => setSayi(sayi + 1)}>Artır</button>
    </div>
  );
}
```

### Nesne State'i
```jsx
function KullaniciFormu() {
  const [kullanici, setKullanici] = useState({
    ad: '',
    email: '',
    yas: 0
  });

  const handleChange = (e) => {
    setKullanici({
      ...kullanici,
      [e.target.name]: e.target.value
    });
  };
}
```

## useReducer Hook'u

### Temel Kullanım
```jsx
import { useReducer } from 'react';

const baslangicDurumu = { sayac: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'artir':
      return { sayac: state.sayac + 1 };
    case 'azalt':
      return { sayac: state.sayac - 1 };
    default:
      return state;
  }
}

function SayacReducer() {
  const [state, dispatch] = useReducer(reducer, baslangicDurumu);

  return (
    <div>
      Sayaç: {state.sayac}
      <button onClick={() => dispatch({ type: 'artir' })}>+</button>
      <button onClick={() => dispatch({ type: 'azalt' })}>-</button>
    </div>
  );
}
```

## Context API

### Context Oluşturma
```jsx
import { createContext, useContext, useState } from 'react';

const TemaContext = createContext();

function TemaProvider({ children }) {
  const [tema, setTema] = useState('aydin');

  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      {children}
    </TemaContext.Provider>
  );
}
```

### Context Kullanımı
```jsx
function TemaButonu() {
  const { tema, setTema } = useContext(TemaContext);

  return (
    <button onClick={() => setTema(tema === 'aydin' ? 'karanlik' : 'aydin')}>
      Tema Değiştir
    </button>
  );
}
```

## Global State Yönetimi

### Custom Hook ile State Yönetimi
```jsx
function useGlobalState(key, initialValue) {
  const [state, setState] = useState(() => {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
```

## En İyi Pratikler
1. State'i mümkün olduğunca alt bileşenlerde tutun
2. Karmaşık state mantığı için useReducer kullanın
3. Global state için Context API veya state yönetim kütüphaneleri kullanın
4. State güncellemelerini immutable şekilde yapın
5. useEffect ile yan etkileri yönetin 