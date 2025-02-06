# React'ta API İstekleri ve Veri Yönetimi - Hata Yönetimi 🛠️

## Giriş 🎯

Bu yazımızda React uygulamalarında hata yönetiminin nasıl yapılacağını, kullanıcı dostu hata mesajlarının nasıl gösterileceğini ve yaygın hata senaryolarıyla nasıl başa çıkılacağını öğreneceğiz. Hadi başlayalım! 💪

## Try-Catch ile Temel Hata Yönetimi 🔍

```javascript
import React, { useState } from 'react';
import axios from 'axios';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('https://api.example.com/user/profile');
      setUser(response.data);
    } catch (error) {
      // Hata tipine göre özel mesajlar
      if (error.response) {
        // Sunucu yanıtı ile gelen hatalar (400-500)
        switch (error.response.status) {
          case 404:
            setError('Kullanıcı bulunamadı');
            break;
          case 401:
            setError('Lütfen önce giriş yapın');
            break;
          default:
            setError('Bir hata oluştu: ' + error.response.data.message);
        }
      } else if (error.request) {
        // Sunucuya ulaşılamadığında
        setError('Sunucuya ulaşılamıyor. İnternet bağlantınızı kontrol edin.');
      } else {
        // İstek oluşturulurken oluşan hatalar
        setError('Bir hata oluştu: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <div className="loading">Yükleniyor...</div>}
      {error && (
        <div className="error-message">
          <span>❌ {error}</span>
          <button onClick={() => setError(null)}>Kapat</button>
        </div>
      )}
      {user && (
        <div className="user-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
      <button onClick={fetchUserData} disabled={loading}>
        Kullanıcı Bilgilerini Getir
      </button>
    </div>
  );
}
```

## Global Hata Yönetimi - Error Boundary 🌐

```javascript
// ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Hata loglama servisi entegrasyonu
    console.error('Hata detayları:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>😔 Üzgünüz, bir şeyler yanlış gitti</h2>
          <p>{this.state.error.message}</p>
          <button onClick={() => window.location.reload()}>
            Sayfayı Yenile
          </button>
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
      <UserProfile />
    </ErrorBoundary>
  );
}
```

## Axios Interceptor ile Merkezi Hata Yönetimi 🎯

```javascript
// api.js
import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'https://api.example.com'
});

// Hata mesajlarını özelleştirme
const getErrorMessage = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return 'Geçersiz istek';
      case 401:
        return 'Oturum süreniz doldu';
      case 403:
        return 'Bu işlem için yetkiniz yok';
      case 404:
        return 'İstenen kaynak bulunamadı';
      case 500:
        return 'Sunucu hatası';
      default:
        return error.response.data.message || 'Bir hata oluştu';
    }
  }
  if (error.request) {
    return 'Sunucuya ulaşılamıyor';
  }
  return 'Bir hata oluştu';
};

// Response Interceptor
api.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = getErrorMessage(error);
    
    // Kullanıcıya hata bildirimi göster
    toast.error(errorMessage);

    // 401 hatası durumunda login sayfasına yönlendir
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
```

## Custom Hook ile Hata Yönetimi 🎣

```javascript
import { useState, useCallback } from 'react';

function useErrorHandler() {
  const [error, setError] = useState(null);

  const handleError = useCallback((error) => {
    if (error.response) {
      // HTTP yanıt hatalarını işle
      const { status, data } = error.response;
      switch (status) {
        case 400:
          setError({
            type: 'VALIDATION_ERROR',
            message: data.message || 'Geçersiz veri'
          });
          break;
        case 401:
          setError({
            type: 'AUTH_ERROR',
            message: 'Oturum süreniz doldu'
          });
          break;
        // Diğer hata durumları...
        default:
          setError({
            type: 'UNKNOWN_ERROR',
            message: 'Beklenmeyen bir hata oluştu'
          });
      }
    } else if (error.request) {
      // Ağ hatalarını işle
      setError({
        type: 'NETWORK_ERROR',
        message: 'Sunucuya ulaşılamıyor'
      });
    } else {
      // Diğer hataları işle
      setError({
        type: 'APP_ERROR',
        message: error.message
      });
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
}

// Kullanımı
function UserForm() {
  const { error, handleError, clearError } = useErrorHandler();

  const handleSubmit = async (data) => {
    try {
      await api.post('/users', data);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div>
      {error && (
        <div className="error-message">
          {error.message}
          <button onClick={clearError}>✕</button>
        </div>
      )}
      {/* Form içeriği */}
    </div>
  );
}
```

## İyi Uygulama Örnekleri 🌟

1. **Kullanıcı Dostu Hata Mesajları**
   - Teknik detayları gizleyin
   - Anlaşılır bir dil kullanın
   - Çözüm önerileri sunun

2. **Hata Durumlarına Göre UI**
   ```javascript
   function DataDisplay({ data, error, loading }) {
     if (loading) return <LoadingSpinner />;
     if (error) return <ErrorMessage error={error} />;
     if (!data) return <EmptyState />;
     
     return <DataList data={data} />;
   }
   ```

3. **Retry Mekanizması**
   ```javascript
   const fetchWithRetry = async (url, retries = 3) => {
     try {
       return await axios.get(url);
     } catch (error) {
       if (retries > 0 && error.request) {
         // Ağ hatalarında tekrar dene
         await new Promise(resolve => setTimeout(resolve, 1000));
         return fetchWithRetry(url, retries - 1);
       }
       throw error;
     }
   };
   ```

## Önemli İpuçları 💡

1. **Hata Loglama**
   - Önemli hataları bir loglama servisine gönderin
   - Hata stacktrace'lerini saklayın
   - Kullanıcı bilgisi ve context ekleyin

2. **Offline Durum Yönetimi**
   - Ağ bağlantısını kontrol edin
   - Offline durumda kullanıcıyı bilgilendirin
   - Mümkünse offline işlemleri önbelleğe alın

3. **Güvenlik**
   - Hassas hata detaylarını kullanıcıya göstermeyin
   - API anahtarları ve token hatalarını gizleyin
   - Rate limiting durumlarını ele alın

## Sonuç 🎉

Hata yönetimi, kullanıcı deneyimi açısından kritik öneme sahiptir. İyi bir hata yönetimi stratejisi ile kullanıcılarınıza daha güvenilir ve kullanıcı dostu bir deneyim sunabilirsiniz. Hataları doğru şekilde yakalayıp, anlaşılır mesajlarla kullanıcıya iletmek, uygulamanızın profesyonelliğini artıracaktır.

Umarım bu rehber, React uygulamalarınızda hata yönetimi konusunda size yardımcı olmuştur. Sorularınız varsa, sormaktan çekinmeyin. Birlikte öğrenmeye devam! 🚀