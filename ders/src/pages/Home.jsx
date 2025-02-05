import MerhabaDunya from '../components/MerhabaDunya'
import Selam from '../components/SelamlamaComponent'
import MainLayout from '../layouts/MainLayout'
import KullaniciKart from '../components/KullaniciKart'

import global from '../assets/global.module.css'

const Home = () => {
    return (
        <MainLayout>
            <div className={global.container}>
                <h1>Ana Sayfa 🏠</h1>
                <MerhabaDunya />
                <hr />
                <Selam />
                <hr />
                <KullaniciKart
                    isim="Serenay"
                    yas={24}
                    meslek="Stajyer"
                />
            </div>
        </MainLayout>
    )
}

export default Home