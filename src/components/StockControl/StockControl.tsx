import React, { useState } from 'react';
import './StockControl.css';
import { useAppContext } from '../../context/AppContext';

interface StockControlProps {
    onClose: () => void;
}

const StockControl: React.FC<StockControlProps> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('depoGirisCikis');

    return (
        <div className="stock-control-overlay">
            <div className="stock-control-container">
                <div className="stock-control-header">
                    <h2 className="stock-control-title">Stok Kontrol</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="stock-control-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'depoGirisCikis' ? 'active' : ''}`}
                        onClick={() => setActiveTab('depoGirisCikis')}
                    >
                        Depo Giriş/Çıkış Takibi
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'gelirGider' ? 'active' : ''}`}
                        onClick={() => setActiveTab('gelirGider')}
                    >
                        Gelir Gider Takibi
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'islemGecmisi' ? 'active' : ''}`}
                        onClick={() => setActiveTab('islemGecmisi')}
                    >
                        İşlem Geçmişi
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'qrKod' ? 'active' : ''}`}
                        onClick={() => setActiveTab('qrKod')}
                    >
                        QR Kod
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'depoGirisCikis' && (
                        <div className="depo-giris-cikis">
                            <h3>Depo Giriş/Çıkış Takibi</h3>
                            <div className="content-placeholder">
                                <p>Depo giriş ve çıkış işlemlerini buradan takip edebilirsiniz.</p>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Ürün Kodu</th>
                                            <th>Ürün Adı</th>
                                            <th>İşlem Tipi</th>
                                            <th>Miktar</th>
                                            <th>Tarih</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={5} className="text-center">Henüz kayıt bulunmamaktadır.</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button className="btn btn-primary mt-3">Yeni Giriş/Çıkış İşlemi</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'gelirGider' && (
                        <div className="gelir-gider">
                            <h3>Gelir Gider Takibi</h3>
                            <div className="content-placeholder">
                                <p>Gelir ve gider işlemlerini buradan takip edebilirsiniz.</p>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>İşlem No</th>
                                            <th>İşlem Adı</th>
                                            <th>Tip</th>
                                            <th>Tutar</th>
                                            <th>Tarih</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={5} className="text-center">Henüz kayıt bulunmamaktadır.</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button className="btn btn-primary mt-3">Yeni Gelir/Gider Ekle</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'islemGecmisi' && (
                        <div className="islem-gecmisi">
                            <h3>İşlem Geçmişi</h3>
                            <div className="content-placeholder">
                                <p>Tüm işlem geçmişini buradan takip edebilirsiniz.</p>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>İşlem No</th>
                                            <th>İşlem Türü</th>
                                            <th>Açıklama</th>
                                            <th>Kullanıcı</th>
                                            <th>Tarih</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={5} className="text-center">Henüz kayıt bulunmamaktadır.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'qrKod' && (
                        <div className="qr-kod">
                            <h3>QR Kod</h3>
                            <div className="content-placeholder text-center">
                                <p>Ürün QR kodlarını oluşturabilir ve tarayabilirsiniz.</p>
                                <div className="qr-options d-flex justify-content-center gap-4 mt-4">
                                    <button className="btn btn-primary">QR Kod Oluştur</button>
                                    <button className="btn btn-secondary">QR Kod Tara</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StockControl;
