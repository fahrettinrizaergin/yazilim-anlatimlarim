# React'ta API İstekleri ve Veri Yönetimi - Fetch API Kullanımı 🚀

## Giriş 🎯

Merhaba arkadaşlar! Bu yazımızda React uygulamalarında API isteklerini nasıl yapacağımızı ve Fetch API'yi nasıl etkili bir şekilde kullanacağımızı öğreneceğiz. Hadi başlayalım! 💪

## Fetch API Nedir? 🤔

Fetch API, modern web tarayıcılarında HTTP istekleri yapmak için kullanılan güçlü ve esnek bir arabirimdir. Promise tabanlı çalışır ve XMLHttpRequest'e göre daha kullanışlı bir alternatiftir.

## Temel GET İsteği 📥

```javascript
import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Bir hata oluştu!');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## POST İsteği Örneği 📤

```javascript
import React, { useState } from 'react';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Gönderim başarısız!');
      }

      const data = await response.json();
      setStatus('success');
      console.log('Kullanıcı oluşturuldu:', data);
    } catch (error) {
      setStatus('error');
      console.error('Hata:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={e => setFormData({...formData, name: e.target.value})}
        placeholder="İsim"
      />
      <input
        type="email"
        value={formData.email}
        onChange={e => setFormData({...formData, email: e.target.value})}
        placeholder="E-posta"
      />
      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Gönderiliyor...' : 'Gönder'}
      </button>
      {status === 'success' && <p>Başarıyla gönderildi! ✅</p>}
      {status === 'error' && <p>Bir hata oluştu! ❌</p>}
    </form>
  );
}
```

## Async/Await ile Daha Temiz Kod 🧹

```javascript
import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://api.example.com/products');
      if (!response.ok) throw new Error('Veri çekilemedi!');
      
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Hata:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Ürünler</h2>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} - {product.price}TL
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## İyi Uygulama Örnekleri 🌟

### 1. API İsteklerini Ayrı Bir Dosyada Toplamak

```javascript
// api.js
const API_BASE_URL = 'https://api.example.com';

export const api = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error('API hatası!');
    return response.json();
  },

  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('API hatası!');
    return response.json();
  }
};

// Component içinde kullanımı
import { api } from './api';

function UserDashboard() {
  const fetchUserData = async () => {
    try {
      const userData = await api.get('/user/profile');
      // ...
    } catch (error) {
      // Hata yönetimi
    }
  };
}
```

### 2. Loading ve Error State Yönetimi

```javascript
function useApi(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('API hatası!');
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (error) {
        setError(error.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}

// Kullanımı
function UserProfile() {
  const { data: user, loading, error } = useApi('https://api.example.com/user/1');

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

## Önemli İpuçları 💡

1. **Hata Yönetimi**
   - Her zaman try/catch bloklarını kullanın
   - Kullanıcıya anlamlı hata mesajları gösterin
   - Network hatalarını ele alın

2. **Loading Durumları**
   - İstek süresince loading state kullanın
   - Kullanıcıya görsel feedback verin
   - Gerektiğinde skeleton loader kullanın

3. **Request Optimizasyonu**
   - Gereksiz isteklerden kaçının
   - Veriyi cache'leyin
   - Debounce/throttle tekniklerini kullanın

## Yaygın Hatalar ve Çözümleri ⚠️

### 1. Memory Leak

```javascript
function Component() {
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const response = await fetch('api/data');
      const data = await response.json();
      
      // Component unmount olduysa state'i güncelleme
      if (isMounted) {
        setData(data);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);
}
```

### 2. Race Condition

```javascript
function SearchComponent() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    let currentSearch = search; // Mevcut aramanın referansını tut

    const fetchResults = async () => {
      const response = await fetch(`/api/search?q=${search}`);
      const data = await response.json();
      
      // Sadece en son aramanın sonuçlarını göster
      if (currentSearch === search) {
        setResults(data);
      }
    };

    if (search) fetchResults();
  }, [search]);
}
```

## Sonuç 🎉

Fetch API, React uygulamalarında veri alışverişi için güçlü ve esnek bir çözüm sunar. Doğru kullanıldığında, uygulamanızın veri yönetimini etkili bir şekilde yapabilir ve kullanıcı deneyimini iyileştirebilirsiniz.

Umarım bu rehber, React'te Fetch API kullanımı konusunda size yardımcı olmuştur. Sorularınız varsa, sormaktan çekinmeyin. Birlikte öğrenmeye devam! 🚀