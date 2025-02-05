# Fetch API Kullanımı

## İçindekiler
- [Fetch API Nedir?](#fetch-api-nedir)
- [Temel Kullanım](#temel-kullanım)
- [HTTP Metodları](#http-metodları)
- [Hata Yönetimi](#hata-yönetimi)
- [Custom Hook Kullanımı](#custom-hook-kullanımı)

## Fetch API Nedir?
Fetch API, modern tarayıcılarda yerleşik olarak bulunan, HTTP istekleri yapmak için kullanılan bir web API'sidir. Promise tabanlı çalışır ve AJAX istekleri için XMLHttpRequest'e modern bir alternatif sunar.

## Temel Kullanım

### GET İsteği
```jsx
function VeriListesi() {
  const [veri, setVeri] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState(null);

  useEffect(() => {
    const veriGetir = async () => {
      try {
        setYukleniyor(true);
        const response = await fetch('https://api.ornek.com/veriler');
        if (!response.ok) {
          throw new Error('Veri getirme hatası!');
        }
        const data = await response.json();
        setVeri(data);
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

## HTTP Metodları

### POST İsteği
```jsx
async function veriGonder(yeniVeri) {
  try {
    const response = await fetch('https://api.ornek.com/veriler', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(yeniVeri)
    });
    
    if (!response.ok) {
      throw new Error('Veri gönderme hatası!');
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
}
```

### PUT İsteği
```jsx
async function veriGuncelle(id, guncelVeri) {
  try {
    const response = await fetch(`https://api.ornek.com/veriler/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(guncelVeri)
    });
    
    if (!response.ok) {
      throw new Error('Veri güncelleme hatası!');
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
}
```

### DELETE İsteği
```jsx
async function veriSil(id) {
  try {
    const response = await fetch(`https://api.ornek.com/veriler/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error('Veri silme hatası!');
    }
    
    return true;
  } catch (error) {
    throw error;
  }
}
```

## Hata Yönetimi

### İstek Durumu Kontrolü
```jsx
async function guvenliIstek(url, options = {}) {
  try {
    const response = await fetch(url, options);
    
    if (response.status === 404) {
      throw new Error('Kaynak bulunamadı');
    }
    
    if (response.status === 401) {
      throw new Error('Yetkisiz erişim');
    }
    
    if (!response.ok) {
      throw new Error('Bir hata oluştu');
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
}
```

## Custom Hook Kullanımı

### useFetch Hook'u
```jsx
function useFetch(url) {
  const [veri, setVeri] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const veriGetir = async () => {
      try {
        setYukleniyor(true);
        const response = await fetch(url, {
          signal: controller.signal
        });
        
        if (!response.ok) {
          throw new Error('Veri getirme hatası!');
        }
        
        const data = await response.json();
        setVeri(data);
        setHata(null);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch iptal edildi');
        } else {
          setHata(error.message);
        }
      } finally {
        setYukleniyor(false);
      }
    };

    veriGetir();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { veri, yukleniyor, hata };
}

// Kullanımı
function VeriGosterimi() {
  const { veri, yukleniyor, hata } = useFetch('https://api.ornek.com/veriler');

  if (yukleniyor) return <div>Yükleniyor...</div>;
  if (hata) return <div>Hata: {hata}</div>;
  if (!veri) return null;

  return (
    <div>
      {/* Veri gösterimi */}
    </div>
  );
}
```

## En İyi Pratikler
1. Her zaman hata yönetimi yapın
2. İstekleri iptal etmek için AbortController kullanın
3. Loading ve error state'lerini yönetin
4. İstek başlıklarını (headers) doğru şekilde ayarlayın
5. Tekrar kullanılabilir fetch fonksiyonları oluşturun 