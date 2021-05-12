import React from 'react';
import logo from './logo192.png'
import App from './App'
import './Home.css'
import { Button, Modal } from 'react-bootstrap';
const Home = () => {


    return (


        <div>
            <div className='logodiv'>
                <img src={logo} className='logo' alt='anan'></img>
                <h3>T.C.</h3>
                <h4>KÜTAHYA DUMLUPINAR ÜNİVERSİTESİ</h4>
                <h4>MÜHENDİSLİK FAKÜLTESİ</h4>
                <h4>YAPAY ZEKA İLE DUYGU ANALİZİ</h4>

                <div className='modal-div'>
                    <div className='modalheader'>
                        <hr></hr>
                    </div>
                    <App />
                </div>

            </div>
            <div className='footer'>
                <p>BERKAY ŞUÖZER BİTİRME PROJESİ BİLGİSAYAR MÜHENDİSLİĞİ BÖLÜMÜ DANIŞMAN SOYDAN SERTTAŞ KÜTAHYA, 2021</p>

            </div>
        </div>



    );
}



export default Home;