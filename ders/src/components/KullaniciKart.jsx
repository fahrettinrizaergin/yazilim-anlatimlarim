function KullaniciKart({ isim, yas, meslek }) {
    return (
        <div className="kart">
            <h3>{isim}</h3>
            <p>Yaş: {yas}</p>
            <p>Meslek: {meslek}</p>
        </div>
    );
}

export default KullaniciKart;