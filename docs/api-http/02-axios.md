# Axios ile HTTP İstekleri

## İçindekiler
- [Axios Nedir?](#axios-nedir)
- [Kurulum](#kurulum)
- [Temel Kullanım](#temel-kullanım)
- [İstek Yapılandırması](#istek-yapılandırması)
- [Interceptors Kullanımı](#interceptors-kullanımı)
- [Custom Instance](#custom-instance)

## Axios Nedir?
Axios, tarayıcı ve Node.js için Promise tabanlı HTTP istemcisidir. Fetch API'ye göre daha fazla özellik sunar ve kullanımı daha kolaydır.

## Kurulum

```bash
# npm ile kurulum
npm install axios

# yarn ile kurulum
yarn add axios
```

## Temel Kullanım

### GET İsteği
```jsx
import axios from 'axios';

function VeriListesi() {
  const [veri, setVeri] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState(null);

  useEffect(() => {
    const veriGetir = async () => {
      try {
        setYukleniyor(true);
        const response = await axios.get('https://api.ornek.com/veriler');
        setVeri(response.data);
      } catch (error) {
        setHata(error.message);
      } finally {
        setYukleniyor(false);
      }
    };

    veriGetir();
  }, []);

  if (yukleniyor) return <div>Yükleniyor...</div>;
  if (hata) return <div>Hata: {hata}</div>;

  return (
    <ul>
      {veri.map(item => (
        <li key={item.id}>{item.baslik}</li>
      ))}
    </ul>
  );
}
```

### POST İsteği
```jsx
async function veriGonder(yeniVeri) {
  try {
    const response = await axios.post('https://api.ornek.com/veriler', yeniVeri);
    return response.data;
  } catch (error) {
    throw error;
  }
}
```

### PUT İsteği
```jsx
async function veriGuncelle(id, guncelVeri) {
  try {
    const response = await axios.put(`https://api.ornek.com/veriler/${id}`, guncelVeri);
    return response.data;
  } catch (error) {
    throw error;
  }
}
```

### DELETE İsteği
```jsx
async function veriSil(id) {
  try {
    await axios.delete(`https://api.ornek.com/veriler/${id}`);
    return true;
  } catch (error) {
    throw error;
  }
}
```

## İstek Yapılandırması

### Global Yapılandırma
```jsx
axios.defaults.baseURL = 'https://api.ornek.com';
axios.defaults.headers.common['Authorization'] = 'Bearer token';
axios.defaults.headers.post['Content-Type'] = 'application/json';
```

### İstek Özel Yapılandırma
```jsx
const config = {
  method: 'post',
  url: '/veriler',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  },
  data: {
    baslik: 'Yeni Veri',
    icerik: 'İçerik'
  }
};

axios(config)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

## Interceptors Kullanımı

### Request Interceptor
```jsx
axios.interceptors.request.use(
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
```

### Response Interceptor
```jsx
axios.interceptors.response.use(
  response => {
    // Başarılı yanıt işlemleri
    return response;
  },
  error => {
    // Hata yanıt işlemleri
    if (error.response.status === 401) {
      // Oturum sonlandırma işlemleri
    }
    return Promise.reject(error);
  }
);
```

## Custom Instance

### Axios Instance Oluşturma
```jsx
const api = axios.create({
  baseURL: 'https://api.ornek.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Instance kullanımı
api.get('/veriler')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

### Custom Hook ile Axios
```jsx
function useAxios(url) {
  const [veri, setVeri] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const veriGetir = async () => {
      try {
        setYukleniyor(true);
        const response = await axios.get(url, {
          cancelToken: source.token
        });
        setVeri(response.data);
        setHata(null);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('İstek iptal edildi');
        } else {
          setHata(error.message);
        }
      } finally {
        setYukleniyor(false);
      }
    };

    veriGetir();

    return () => {
      source.cancel();
    };
  }, [url]);

  return { veri, yukleniyor, hata };
}
```

## En İyi Pratikler
1. Axios instance'ları kullanarak kod tekrarını önleyin
2. İstekleri iptal etmek için CancelToken kullanın
3. Interceptor'ları merkezi hata yönetimi için kullanın
4. Başlık ve kimlik doğrulama bilgilerini global olarak ayarlayın
5. Timeout değerlerini uygun şekilde yapılandırın 