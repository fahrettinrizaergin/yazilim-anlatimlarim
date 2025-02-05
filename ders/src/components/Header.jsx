import { Link } from 'react-router-dom'
import navbar from '../assets/navbar.module.css'
import global from '../assets/global.module.css'

export default function Header() {
    return (
        <header className={navbar.navbarContainer}>  
            <div className={global.container}>
                <nav className={navbar.navbarItem}>
                    <Link className={navbar.navbarItemLink} to="/">Ana Sayfa</Link>
                    <Link className={navbar.navbarItemLink} to="/about">Hakkımızda</Link>
                    <Link className={navbar.navbarItemLink} to="/contact">İletişim</Link>
                </nav> 
            </div>
        </header>
    )
}