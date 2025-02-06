# React Custom Hooks'u Birlikte Öğrenelim! 🎣

## Custom Hook Nedir? 🤔

React'in en güzel özelliklerinden biri olan Custom Hooks'u öğreneceğiz. Custom Hook'lar, React component'lerimizde kullandığımız mantığı tekrar kullanılabilir fonksiyonlara dönüştürmemizi sağlar.

## Neden Custom Hook Kullanmalıyız? 🎯

1. **Kod Tekrarını Önler** - Aynı mantığı birden fazla component'te kullanmak istediğimizde
2. **Daha Temiz Kod** - Component'lerimizi daha sade ve anlaşılır hale getirir
3. **Kolay Bakım** - Mantığı tek bir yerde topladığımız için bakımı kolaylaşır

## Custom Hook Nasıl Yazılır? 📝

Hadi birlikte basit bir örnek yapalım! Önce form işlemleri için bir custom hook yazalım:

```javascript
import { useState } from 'react';

// Custom hook'lar "use" ile başlamalıdır!
function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    resetForm
  };
}

// Nasıl kullanılır?
function KayitFormu() {
  const { values, handleChange, resetForm } = useForm({
    isim: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form değerleri:', values);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="isim"
        value={values.isim}
        onChange={handleChange}
        placeholder="İsminiz"
      />
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="E-posta"
      />
      <button type="submit">Gönder</button>
    </form>
  );
}
```

## Başka Bir Örnek: useLocalStorage 💾

Yerel depolama işlemleri için kullanışlı bir hook yazalım:

```javascript
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Başlangıç değerini localStorage'dan okuyoruz
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // storedValue değiştiğinde localStorage'ı güncelliyoruz
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// Nasıl kullanılır?
function AyarlarComponent() {
  const [tema, setTema] = useLocalStorage('tema', 'açık');

  return (
    <div>
      <p>Şu anki tema: {tema}</p>
      <button onClick={() => setTema(tema === 'açık' ? 'koyu' : 'açık')}>
        Temayı Değiştir
      </button>
    </div>
  );
}
```

## Custom Hook'ların Altın Kuralları 🌟

1. **İsimlendirme** - Her zaman "use" ile başlamalı (useForm, useLocalStorage gibi)
2. **Tek Sorumluluk** - Her hook tek bir işi iyi yapmalı
3. **React Hook Kuralları** - Diğer hook'ları sadece en üst seviyede kullan
4. **Test Edilebilirlik** - Hook'larını test edilebilir şekilde tasarla

## Veri Çekme İşlemleri için Custom Hook 🌐

```javascript
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (err) {
        setError('Veri çekerken bir hata oluştu 😢');
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Nasıl kullanılır?
function KullaniciListesi() {
  const { data, loading, error } = useFetch('https://api.ornek.com/kullanicilar');

  if (loading) return <div>Yükleniyor... 🔄</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul>
      {data?.map(kullanici => (
        <li key={kullanici.id}>{kullanici.isim}</li>
      ))}
    </ul>
  );
}
```

## Son Notlar 📌

- Custom Hook'lar, React'te kod tekrarını önlemenin harika bir yoludur
- Her zaman belirli bir amaca hizmet etmeli
- İhtiyaca göre basit veya karmaşık olabilir
- Projenizde sık kullandığınız mantıkları hook'lara dönüştürmeyi düşünün

Umarım bu rehber Custom Hook'ları anlamanıza yardımcı olmuştur! Herhangi bir sorunuz olursa, sormaktan çekinmeyin. Birlikte öğrenmeye devam! 🚀