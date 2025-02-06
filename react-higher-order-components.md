# React Higher Order Components (HOC) Rehberi! 🚀

## HOC Nedir? 🤔

Bugün React'in süper güçlerinden biri olan Higher Order Components (HOC) konusunu ele alacağız. HOC'ler, component'lerimizi sarmalayarak onlara yeni özellikler kazandıran fonksiyonlardır. Düşünün ki bir süper kahraman pelerini gibi - normal bir component'i sarıp ona ekstra güçler veriyor! 🦸‍♂️

## HOC'nin Temel Yapısı 📝

```javascript
// Temel HOC yapısı
const withSuperPower = (WrappedComponent) => {
  // Yeni bir component döndürür
  return function EnhancedComponent(props) {
    // Ekstra özellikler/mantık burada
    return <WrappedComponent {...props} extraProp="süper güç" />;
  };
};

// Kullanımı
const NormalComponent = ({ extraProp }) => {
  return <div>Ben şimdi süper güçlüyüm: {extraProp}</div>;
};

const SuperPoweredComponent = withSuperPower(NormalComponent);
```

## HOC'lerin Kullanım Alanları 🎯

### 1. Yetkilendirme Kontrolü 🔐

```javascript
const withAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Kullanıcının giriş yapıp yapmadığını kontrol et
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    }, []);

    if (!isAuthenticated) {
      return <div>Lütfen önce giriş yapın! 🔒</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

// Kullanımı
const GizliSayfa = () => {
  return <div>Çok gizli bilgiler! 🤫</div>;
};

const KorunmusGizliSayfa = withAuth(GizliSayfa);
```

### 2. Yükleme Durumu Yönetimi ⌛

```javascript
const withLoading = (WrappedComponent) => {
  return function LoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return (
        <div className="loading-spinner">
          Yükleniyor... 🔄
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

// Kullanımı
const VeriListesi = ({ data }) => {
  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

const YuklenebilirListe = withLoading(VeriListesi);

// Ana component'te kullanımı
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Veri çekme işlemi
    setTimeout(() => {
      setData([{ id: 1, name: 'Örnek' }]);
      setIsLoading(false);
    }, 2000);
  }, []);

  return <YuklenebilirListe isLoading={isLoading} data={data} />;
}
```

### 3. Veri Manipülasyonu 🔄

```javascript
const withDataTransform = (WrappedComponent) => {
  return function TransformedComponent({ data, ...props }) {
    // Veriyi istediğimiz formata dönüştürüyoruz
    const transformedData = data.map(item => ({
      ...item,
      fullName: `${item.name} ${item.surname}`,
      createdAt: new Date(item.createdAt).toLocaleDateString('tr-TR')
    }));

    return <WrappedComponent data={transformedData} {...props} />;
  };
};

// Kullanımı
const KullaniciListesi = ({ data }) => {
  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>
          {user.fullName} - Kayıt: {user.createdAt}
        </li>
      ))}
    </ul>
  );
};

const GelismisKullaniciListesi = withDataTransform(KullaniciListesi);
```

## HOC'lerin Altın Kuralları 🌟

1. **İsimlendirme** - HOC fonksiyonları genelde 'with' ile başlar (withAuth, withLoading gibi)
2. **Orijinal Props'ları Aktar** - `{...props}` ile orijinal props'ları aktarmayı unutmayın
3. **Değişmezlik** - Gelen component'i modifiye etmeyin, yeni bir component döndürün
4. **Kompozisyon** - Birden fazla HOC'yi birleştirerek kullanabilirsiniz

## HOC'leri Birleştirme 🔗

```javascript
// Birden fazla HOC'yi birleştirme
const SuperComponent = withAuth(withLoading(withDataTransform(BaseComponent)));

// Ya da compose kullanarak daha okunaklı hale getirme
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

const enhance = compose(
  withAuth,
  withLoading,
  withDataTransform
);

const SuperComponent = enhance(BaseComponent);
```

## Son Notlar 📌

- HOC'ler React'te kod tekrarını önlemenin güçlü bir yoludur
- Component mantığını yeniden kullanılabilir hale getirir
- Render Props ve Custom Hooks ile birlikte kullanılabilir
- Karmaşık component'leri daha yönetilebilir hale getirir

Umarım bu rehber HOC'leri anlamanıza yardımcı olmuştur! Sorularınız varsa, sormaktan çekinmeyin. Birlikte öğrenmeye devam! 🚀