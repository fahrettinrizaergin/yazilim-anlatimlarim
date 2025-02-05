# React'ta API İstekleri ve Veri Yönetimi - Axios ile HTTP İstekleri 🚀

## Giriş 🎯

Merhaba arkadaşlar! Bu yazımızda React uygulamalarında Axios kullanarak HTTP isteklerini nasıl yapacağımızı ve veri yönetimini nasıl gerçekleştireceğimizi öğreneceğiz. Axios, HTTP istekleri için Fetch API'ye güçlü bir alternatif sunan popüler bir kütüphanedir. Hadi başlayalım! 💪

## Axios Nedir? 🤔

Axios, tarayıcı ve Node.js için Promise tabanlı bir HTTP istemcisidir. Fetch API'ye göre daha fazla özellik sunar ve kullanımı daha kolaydır. İşte bazı avantajları:

- Otomatik JSON dönüşümü
- İstek ve yanıt için interceptor desteği
- İstek zaman aşımı ayarlama
- İstek iptali
- XSRF koruması

## Kurulum 📦

```bash
npm install axios
# veya
yarn add axios
```

## Temel GET İsteği 📥

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://api.example.com/users')
      .then(response => {
        setUsers(response.data);
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
import axios from 'axios';

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
      const response = await axios.post('https://api.example.com/users', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setStatus('success');
      console.log('Kullanıcı oluşturuldu:', response.data);
    } catch (error) {
      setStatus('error');
      console.error('Hata:', error.message);
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

## Axios Instance Kullanımı 🛠

```javascript
// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// İstek interceptor'ı
api.interceptors.request.use(
  config => {
    // İstek gönderilmeden önce yapılacak işlemler
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Yanıt interceptor'ı
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // Oturum süresi dolmuş, kullanıcıyı login sayfasına yönlendir
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Kullanımı
import api from './api';

function UserDashboard() {
  const fetchUserData = async () => {
    try {
      const response = await api.get('/user/profile');
      console.log(response.data);
    } catch (error) {
      console.error('Hata:', error.message);
    }
  };
}
```

## Async/Await ile Temiz Kod 🧹

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://api.example.com/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Hata:', error.message);
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

## Custom Hook ile API İstekleri 🎣

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: source.token
        });
        setData(response.data);
        setError(null);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('İstek iptal edildi');
        } else {
          setError(error.message);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel();
    };
  }, [url]);

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

## İyi Uygulama Örnekleri 🌟

1. **İstek İptali**
   ```javascript
   function SearchComponent() {
     useEffect(() => {
       const source = axios.CancelToken.source();

       const search = async () => {
         try {
           const response = await axios.get('/api/search', {
             cancelToken: source.token
           });
           // ...
         } catch (error) {
           if (axios.isCancel(error)) {
             console.log('İstek iptal edildi');
           }
         }
       };

       search();

       return () => {
         source.cancel();
       };
     }, []);
   }
   ```

2. **Paralel İstekler**
   ```javascript
   const fetchData = async () => {
     try {
       const [usersResponse, productsResponse] = await Promise.all([
         axios.get('/api/users'),
         axios.get('/api/products')
       ]);

       console.log('Kullanıcılar:', usersResponse.data);
       console.log('Ürünler:', productsResponse.data);
     } catch (error) {
       console.error('Hata:', error.message);
     }
   };
   ```

## Önemli İpuçları 💡

1. **Hata Yönetimi**
   - Global hata yakalama için interceptor kullanın
   - Kullanıcıya anlamlı hata mesajları gösterin
   - Network hatalarını ele alın

2. **Performans Optimizasyonu**
   - İstekleri önbelleğe alın
   - Gereksiz isteklerden kaçının
   - İstek iptali mekanizmalarını kullanın

3. **Güvenlik**
   - Hassas verileri URL'de göndermekten kaçının
   - HTTPS kullanın
   - API anahtarlarını güvenli bir şekilde saklayın

## Sonuç 🎉

Axios, React uygulamalarında HTTP istekleri için güçlü ve kullanımı kolay bir çözüm sunar. Otomatik JSON dönüşümü, interceptor desteği ve zengin özellik seti ile projelerinizde veri yönetimini daha etkili hale getirebilirsiniz.

Umarım bu rehber, React'te Axios kullanımı konusunda size yardımcı olmuştur. Sorularınız varsa, sormaktan çekinmeyin. Birlikte öğrenmeye devam! 🚀