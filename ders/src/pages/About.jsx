import MainLayout from "../layouts/MainLayout"

import global from '../assets/global.module.css'

const About = () => {
    return (
        <MainLayout>
            <div className={global.container}>
                <h1>Hakkımızda 📝</h1>
            </div>
        </MainLayout>
    )
}

export default About