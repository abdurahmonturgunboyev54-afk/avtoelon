import React, { useState, useEffect } from 'react';
import { 
  Car, Search, Heart, User, PlusCircle, ShieldCheck, 
  LayoutDashboard, FileText, CheckCircle, XCircle, Users, 
  Tag, Settings, LogOut, Menu, X, Eye, EyeOff, Edit, Trash2, Check, AlertCircle, Phone, MapPin, Gauge, Fuel, Settings2, DollarSign
} from 'lucide-react';

export default function App() {
  const [view, setView] = useState('home'); // home, admin, add-car, detail, favorites
  const [cars, setCars] = useState([
    {
      _id: '1',
      brand: 'Chevrolet',
      model: 'Malibu 2',
      year: 2023,
      priceUsd: 31000,
      priceUzs: 396800000,
      color: 'Qora',
      mileage: 15000,
      engineSize: 2.0,
      fuelType: 'Benzin',
      transmission: 'Avtomat',
      region: 'Toshkent',
      phone: '+998 90 123-45-67',
      sellerName: 'Javohir',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
      description: 'Holati ideal, 4 ta yangi yumshoq balon taqilgan, kraska toza.',
      status: 'approved',
      createdAt: '2026-06-01'
    },
    {
      _id: '2',
      brand: 'BYD',
      model: 'Song Plus DM-i',
      year: 2024,
      priceUsd: 28500,
      priceUzs: 364800000,
      color: 'Oq',
      mileage: 5000,
      engineSize: 1.5,
      fuelType: 'Gibrid',
      transmission: 'Avtomat',
      region: 'Samarqand',
      phone: '+998 91 987-65-43',
      sellerName: 'Aziz',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      description: 'Full komplektatsiya, zaryadnik va poliklari bor.',
      status: 'approved',
      createdAt: '2026-06-02'
    },
    {
      _id: '3',
      brand: 'Chevrolet',
      model: 'Cobalt',
      year: 2023,
      priceUsd: 13500,
      priceUzs: 172800000,
      color: 'Kumush',
      mileage: 22000,
      engineSize: 1.5,
      fuelType: 'Benzin',
      transmission: 'Avtomat',
      region: 'Fargona',
      phone: '+998 93 456-78-90',
      sellerName: 'Dilshod',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      description: 'Loyiha asosida tayyorlangan, mexanika emas avtomat.',
      status: 'pending',
      createdAt: '2026-06-03'
    }
  ]);

  const [favorites, setFavorites] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  
  // Admin Login State
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminLoginInput, setAdminLoginInput] = useState('');
  const [adminPassInput, setAdminPassInput] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminTab, setAdminTab] = useState('dashboard');

  // Filters State
  const [filters, setFilters] = useState({
    brand: '',
    model: '',
    yearMin: '',
    yearMax: '',
    priceMin: '',
    priceMax: '',
    fuelType: '',
    transmission: '',
    region: ''
  });

  // Add Car Form State
  const [newCarForm, setNewCarForm] = useState({
    brand: 'Chevrolet',
    model: 'Gentra',
    year: 2023,
    priceUsd: 14500,
    color: 'Oq',
    mileage: 12000,
    engineSize: 1.5,
    fuelType: 'Benzin',
    transmission: 'Avtomat',
    region: 'Toshkent',
    phone: '+998 90 000-00-00',
    sellerName: 'Ism',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    description: 'Yaxshi holatda.'
  });
  const [addSuccess, setAddSuccess] = useState(false);

  // Admin login handler
  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    if (adminLoginInput === 'admin' && adminPassInput === 'admin009') {
      setIsAdminAuthenticated(true);
      setShowAdminLogin(false);
      setView('admin');
      setLoginError('');
      setAdminLoginInput('');
      setAdminPassInput('');
    } else {
      setLoginError('Login yoki parol noto‘g‘ri!');
    }
  };

  // Toggle favorite
  const toggleFavorite = (carId, e) => {
    e.stopPropagation();
    if (favorites.includes(carId)) {
      setFavorites(favorites.filter(id => id !== carId));
    } else {
      setFavorites([...favorites, carId]);
    }
  };

  // Add car submit
  const handleAddCarSubmit = (e) => {
    e.preventDefault();
    const created = {
      ...newCarForm,
      _id: Date.now().toString(),
      priceUzs: newCarForm.priceUsd * 12800,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCars([created, ...cars]);
    setAddSuccess(true);
    setTimeout(() => {
      setAddSuccess(false);
      setView('home');
    }, 2000);
  };

  // Filter cars
  const filteredCars = cars.filter(car => {
    if (view === 'home' && car.status !== 'approved') return false;
    if (filters.brand && car.brand !== filters.brand) return false;
    if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
    if (filters.transmission && car.transmission !== filters.transmission) return false;
    if (filters.region && car.region !== filters.region) return false;
    if (filters.priceMin && car.priceUsd < Number(filters.priceMin)) return false;
    if (filters.priceMax && car.priceUsd > Number(filters.priceMax)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* HEADER */}
      <header className="bg-[#020617] text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* LOGOTIP -> ADMIN LOGIN GATEWAY */}
          <div 
            onClick={() => setShowAdminLogin(true)} 
            className="cursor-pointer flex items-center gap-2 group"
            title="Admin panelga kirish uchun bosing"
          >
            <div className="bg-blue-600 p-2 rounded-xl text-white group-hover:scale-105 transition">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-wider text-white">AVTO<span className="text-blue-500">ELON</span>.UZ</span>
              <p className="text-[10px] text-slate-400 tracking-widest uppercase">O'zbekiston avto bozori</p>
            </div>
          </div>

          {/* QIDIRUV PANELI */}
          <div className="hidden md:flex items-center bg-slate-800 rounded-xl px-3 py-1.5 w-96 border border-slate-700">
            <Search className="w-5 h-5 text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Marka, model yoki viloyat bo'yicha qidirish..." 
              className="bg-transparent border-none outline-none text-white text-sm w-full placeholder-slate-400"
              onChange={(e) => setFilters({...filters, brand: e.target.value})}
            />
          </div>

          {/* TUGMALAR */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setView('favorites')}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition"
            >
              <Heart className="w-5 h-5 text-red-500" />
              <span className="hidden sm:inline text-sm font-medium">Sevimlilar ({favorites.length})</span>
            </button>

            <button 
              onClick={() => setView('add-car')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition"
            >
              <PlusCircle className="w-5 h-5" />
              <span>E’lon qo'shish</span>
            </button>
          </div>
        </div>
      </header>

      {/* ADMIN LOGIN MODAL */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowAdminLogin(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Admin Panelga Kirish</h3>
              <p className="text-sm text-slate-500">AVTOELON.UZ boshqaruv tizimi</p>
            </div>

            {loginError && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Login</label>
                <input 
                  type="text" 
                  value={adminLoginInput}
                  onChange={(e) => setAdminLoginInput(e.target.value)}
                  placeholder="admin" 
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Parol</label>
                <div className="relative">
                  <input 
                    type={showPass ? "text" : "password"} 
                    value={adminPassInput}
                    onChange={(e) => setAdminPassInput(e.target.value)}
                    placeholder="admin009" 
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-800 pr-10"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-600/30 transition"
              >
                Kirish
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        
        {/* VIEW 1: HOME (Qidiruv, Filtrlar va Kartochkalar) */}
        {view === 'home' && (
          <div>
            {/* HERO & FILTER SECTION */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-8">
              <h1 className="text-2xl md:text-4xl font-black mb-2">O'zbekistondagi eng yirik avto e'lonlar platformasi</h1>
              <p className="text-slate-300 text-sm md:text-base mb-6">O'zingizga mos avtomobilni qulay narxlarda toping yoki o'z avtomobilingizni soting.</p>

              {/* FILTRLAR */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <select 
                  value={filters.brand} 
                  onChange={(e) => setFilters({...filters, brand: e.target.value})}
                  className="bg-slate-900 text-white rounded-xl px-3 py-2.5 text-sm border border-slate-700 outline-none"
                >
                  <option value="">Barcha markalar</option>
                  <option value="Chevrolet">Chevrolet</option>
                  <option value="BYD">BYD</option>
                  <option value="Kia">Kia</option>
                  <option value="Chery">Chery</option>
                  <option value="Hyundai">Hyundai</option>
                </select>

                <select 
                  value={filters.fuelType} 
                  onChange={(e) => setFilters({...filters, fuelType: e.target.value})}
                  className="bg-slate-900 text-white rounded-xl px-3 py-2.5 text-sm border border-slate-700 outline-none"
                >
                  <option value="">Yoqilg'i turi</option>
                  <option value="Benzin">Benzin</option>
                  <option value="Gibrid">Gibrid</option>
                  <option value="Elektro">Elektro</option>
                  <option value="Metan/Propan">Metan / Propan</option>
                </select>

                <select 
                  value={filters.transmission} 
                  onChange={(e) => setFilters({...filters, transmission: e.target.value})}
                  className="bg-slate-900 text-white rounded-xl px-3 py-2.5 text-sm border border-slate-700 outline-none"
                >
                  <option value="">Uzatma qutisi</option>
                  <option value="Avtomat">Avtomat</option>
                  <option value="Mexanika">Mexanika</option>
                </select>

                <select 
                  value={filters.region} 
                  onChange={(e) => setFilters({...filters, region: e.target.value})}
                  className="bg-slate-900 text-white rounded-xl px-3 py-2.5 text-sm border border-slate-700 outline-none"
                >
                  <option value="">Barcha viloyatlar</option>
                  <option value="Toshkent">Toshkent</option>
                  <option value="Samarqand">Samarqand</option>
                  <option value="Fargona">Farg'ona</option>
                  <option value="Andijon">Andijon</option>
                  <option value="Buxoro">Buxoro</option>
                </select>
              </div>
            </div>

            {/* CARDS GRID */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">So'nggi avtomobil e'lonlari</h2>
              <span className="text-sm text-slate-500 font-medium">Jami: {filteredCars.length} ta e'lon</span>
            </div>

            {filteredCars.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-200">
                <Car className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-700">Hech qanday e'lon topilmadi</h3>
                <p className="text-sm text-slate-500 mt-1">Qidiruv parametrlarini o'zgartirib ko'ring.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                  <div 
                    key={car._id}
                    onClick={() => { setSelectedCar(car); setView('detail'); }}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 cursor-pointer group flex flex-col"
                  >
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      <img 
                        src={car.image} 
                        alt={car.model} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <button 
                        onClick={(e) => toggleFavorite(car._id, e)}
                        className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-2 rounded-xl text-slate-700 hover:bg-white hover:text-red-500 transition shadow"
                      >
                        <Heart className={`w-5 h-5 ${favorites.includes(car._id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                      <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg font-semibold">
                        {car.year} yil
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                            {car.brand} {car.model}
                          </h3>
                        </div>
                        <div className="text-blue-600 font-extrabold text-xl mb-3">
                          ${car.priceUsd.toLocaleString()} <span className="text-xs text-slate-500 font-normal">({car.priceUzs?.toLocaleString()} so'm)</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <div className="flex items-center gap-1.5">
                            <Gauge className="w-4 h-4 text-slate-400" />
                            <span>{car.mileage.toLocaleString()} km</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Settings2 className="w-4 h-4 text-slate-400" />
                            <span>{car.transmission}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Fuel className="w-4 h-4 text-slate-400" />
                            <span>{car.fuelType}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span>{car.region}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                        <span>E'lon sanasi: {car.createdAt}</span>
                        <span className="font-semibold text-blue-600">Batafsil &rarr;</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: DETAIL PAGE */}
        {view === 'detail' && selectedCar && (
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
            <button 
              onClick={() => setView('home')}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 mb-6 inline-flex items-center gap-1"
            >
              &larr; Orqaga qaytish
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-2xl overflow-hidden bg-slate-100 h-[350px] md:h-[450px] shadow-inner">
                <img src={selectedCar.image} alt={selectedCar.model} className="w-full h-full object-cover" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedCar.brand}
                  </span>
                  <button 
                    onClick={(e) => toggleFavorite(selectedCar._id, e)}
                    className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-red-500 transition"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(selectedCar._id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                  {selectedCar.brand} {selectedCar.model} ({selectedCar.year})
                </h1>

                <div className="text-3xl font-extrabold text-blue-600 mb-6">
                  ${selectedCar.priceUsd.toLocaleString()} 
                  <span className="block text-sm font-normal text-slate-500 mt-1">{selectedCar.priceUzs?.toLocaleString()} so'm</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Yurgan masofasi</span>
                    <span className="text-sm font-bold text-slate-800">{selectedCar.mileage.toLocaleString()} km</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Dvigatel hajmi</span>
                    <span className="text-sm font-bold text-slate-800">{selectedCar.engineSize} L</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Yoqilg'i turi</span>
                    <span className="text-sm font-bold text-slate-800">{selectedCar.fuelType}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Uzatma qutisi</span>
                    <span className="text-sm font-bold text-slate-800">{selectedCar.transmission}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Rangi</span>
                    <span className="text-sm font-bold text-slate-800">{selectedCar.color}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Viloyat</span>
                    <span className="text-sm font-bold text-slate-800">{selectedCar.region}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Tavsif</h3>
                  <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {selectedCar.description}
                  </p>
                </div>

                <div className="bg-blue-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg">
                  <div>
                    <span className="text-xs text-blue-200 block">Sotuvchi</span>
                    <span className="text-base font-bold">{selectedCar.sellerName}</span>
                  </div>
                  <a 
                    href={`tel:${selectedCar.phone}`}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow transition"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{selectedCar.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: ADD CAR FORM */}
        {view === 'add-car' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-1">Avtomobil e'lonini joylashtirish</h2>
            <p className="text-sm text-slate-500 mb-6">Barcha maydonlarni to'ldiring. E'lon admin tekshiruvidan so'ng saytda chiqadi.</p>

            {addSuccess && (
              <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>E'loningiz muvaffaqiyatli yuborildi! Admin tasdiqlashini kuting.</span>
              </div>
            )}

            <form onSubmit={handleAddCarSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Marka</label>
                  <select 
                    value={newCarForm.brand}
                    onChange={(e) => setNewCarForm({...newCarForm, brand: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                  >
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="BYD">BYD</option>
                    <option value="Kia">Kia</option>
                    <option value="Chery">Chery</option>
                    <option value="Hyundai">Hyundai</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Model</label>
                  <input 
                    type="text" 
                    value={newCarForm.model}
                    onChange={(e) => setNewCarForm({...newCarForm, model: e.target.value})}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Ishlab chiqarilgan yil</label>
                  <input 
                    type="number" 
                    value={newCarForm.year}
                    onChange={(e) => setNewCarForm({...newCarForm, year: Number(e.target.value)})}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Narx (USD)</label>
                  <input 
                    type="number" 
                    value={newCarForm.priceUsd}
                    onChange={(e) => setNewCarForm({...newCarForm, priceUsd: Number(e.target.value)})}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Yurgan masofa (km)</label>
                  <input 
                    type="number" 
                    value={newCarForm.mileage}
                    onChange={(e) => setNewCarForm({...newCarForm, mileage: Number(e.target.value)})}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Yoqilg'i turi</label>
                  <select 
                    value={newCarForm.fuelType}
                    onChange={(e) => setNewCarForm({...newCarForm, fuelType: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                  >
                    <option value="Benzin">Benzin</option>
                    <option value="Gibrid">Gibrid</option>
                    <option value="Elektro">Elektro</option>
                    <option value="Metan/Propan">Metan / Propan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Uzatma qutisi</label>
                  <select 
                    value={newCarForm.transmission}
                    onChange={(e) => setNewCarForm({...newCarForm, transmission: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                  >
                    <option value="Avtomat">Avtomat</option>
                    <option value="Mexanika">Mexanika</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Viloyat</label>
                  <select 
                    value={newCarForm.region}
                    onChange={(e) => setNewCarForm({...newCarForm, region: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                  >
                    <option value="Toshkent">Toshkent</option>
                    <option value="Samarqand">Samarqand</option>
                    <option value="Fargona">Farg'ona</option>
                    <option value="Andijon">Andijon</option>
                    <option value="Buxoro">Buxoro</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Sotuvchi ismi</label>
                  <input 
                    type="text" 
                    value={newCarForm.sellerName}
                    onChange={(e) => setNewCarForm({...newCarForm, sellerName: e.target.value})}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Telefon raqam</label>
                  <input 
                    type="text" 
                    value={newCarForm.phone}
                    onChange={(e) => setNewCarForm({...newCarForm, phone: e.target.value})}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Rasm URL manzili</label>
                <input 
                  type="text" 
                  value={newCarForm.image}
                  onChange={(e) => setNewCarForm({...newCarForm, image: e.target.value})}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Tavsif</label>
                <textarea 
                  rows="3"
                  value={newCarForm.description}
                  onChange={(e) => setNewCarForm({...newCarForm, description: e.target.value})}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-600/30 transition"
              >
                E'lonni yuborish
              </button>
            </form>
          </div>
        )}

        {/* VIEW 4: FAVORITES */}
        {view === 'favorites' && (
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-6">Sevimlilar ({favorites.length})</h2>
            {favorites.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-200">
                <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-700">Sevimlilar ro'yxati bo'sh</h3>
                <p className="text-sm text-slate-500 mt-1">Yoqtirgan e'lonlaringizdagi yurakcha belgisini bosing.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.filter(c => favorites.includes(c._id)).map(car => (
                  <div 
                    key={car._id}
                    onClick={() => { setSelectedCar(car); setView('detail'); }}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer border border-slate-200"
                  >
                    <div className="relative h-48 bg-slate-100">
                      <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
                      <button 
                        onClick={(e) => toggleFavorite(car._id, e)}
                        className="absolute top-3 right-3 bg-white/80 p-2 rounded-xl text-red-500 shadow"
                      >
                        <Heart className="w-5 h-5 fill-red-500" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-slate-900">{car.brand} {car.model}</h3>
                      <div className="text-blue-600 font-extrabold mt-1">${car.priceUsd.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 5: ADMIN DASHBOARD */}
        {view === 'admin' && isAdminAuthenticated && (
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* SIDEBAR */}
            <div className="w-full md:w-64 bg-slate-900 text-white rounded-3xl p-4 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 px-3 py-3 mb-4 border-b border-slate-800">
                  <ShieldCheck className="w-6 h-6 text-blue-500" />
                  <span className="font-bold text-base">Admin Panel</span>
                </div>

                <nav className="space-y-1">
                  <button 
                    onClick={() => setAdminTab('dashboard')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${adminTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                  </button>

                  <button 
                    onClick={() => setAdminTab('all-ads')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${adminTab === 'all-ads' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                  >
                    <FileText className="w-5 h-5" />
                    <span>Barcha e'lonlar</span>
                  </button>

                  <button 
                    onClick={() => setAdminTab('pending-ads')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${adminTab === 'pending-ads' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>Yangi e'lonlar ({cars.filter(c => c.status === 'pending').length})</span>
                  </button>

                  <button 
                    onClick={() => setAdminTab('users')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${adminTab === 'users' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                  >
                    <Users className="w-5 h-5" />
                    <span>Foydalanuvchilar</span>
                  </button>

                  <button 
                    onClick={() => setAdminTab('settings')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${adminTab === 'settings' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Sozlamalar</span>
                  </button>
                </nav>
              </div>

              <button 
                onClick={() => { setIsAdminAuthenticated(false); setView('home'); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition mt-6"
              >
                <LogOut className="w-5 h-5" />
                <span>Chiqish</span>
              </button>
            </div>

            {/* ADMIN CONTENT */}
            <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              
              {adminTab === 'dashboard' && (
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-6">Statistika va Asosiy Ko'rsatkichlar</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                      <span className="text-xs font-semibold text-slate-400 uppercase">Jami e'lonlar</span>
                      <div className="text-3xl font-black text-slate-900 mt-1">{cars.length}</div>
                    </div>
                    <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200">
                      <span className="text-xs font-semibold text-emerald-600 uppercase">Tasdiqlangan</span>
                      <div className="text-3xl font-black text-emerald-700 mt-1">{cars.filter(c => c.status === 'approved').length}</div>
                    </div>
                    <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
                      <span className="text-xs font-semibold text-amber-600 uppercase">Kutilayotgan</span>
                      <div className="text-3xl font-black text-amber-700 mt-1">{cars.filter(c => c.status === 'pending').length}</div>
                    </div>
                    <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200">
                      <span className="text-xs font-semibold text-blue-600 uppercase">Foydalanuvchilar</span>
                      <div className="text-3xl font-black text-blue-700 mt-1">1,240</div>
                    </div>
                  </div>
                </div>
              )}

              {adminTab === 'all-ads' && (
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-6">Barcha e'lonlar</h2>
                  <div className="space-y-3">
                    {cars.map(car => (
                      <div key={car._id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50">
                        <div className="flex items-center gap-4">
                          <img src={car.image} alt={car.model} className="w-16 h-12 object-cover rounded-xl" />
                          <div>
                            <h4 className="font-bold text-slate-900">{car.brand} {car.model} ({car.year})</h4>
                            <span className="text-xs text-blue-600 font-semibold">${car.priceUsd.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${car.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : car.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                            {car.status}
                          </span>
                          <button 
                            onClick={() => {
                              setCars(cars.filter(c => c._id !== car._id));
                            }}
                            className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {adminTab === 'pending-ads' && (
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-6">Tasdiqlash kutilayotgan e'lonlar</h2>
                  {cars.filter(c => c.status === 'pending').length === 0 ? (
                    <p className="text-slate-500 text-sm">Hozircha yangi e'lonlar yo'q.</p>
                  ) : (
                    <div className="space-y-4">
                      {cars.filter(c => c.status === 'pending').map(car => (
                        <div key={car._id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <img src={car.image} alt={car.model} className="w-20 h-16 object-cover rounded-xl" />
                            <div>
                              <h4 className="font-bold text-slate-900">{car.brand} {car.model} ({car.year})</h4>
                              <p className="text-xs text-slate-500">Sotuvchi: {car.sellerName} ({car.phone})</p>
                              <span className="text-xs text-blue-600 font-bold">${car.priceUsd.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => {
                                setCars(cars.map(c => c._id === car._id ? {...c, status: 'approved'} : c));
                              }}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 shadow"
                            >
                              <Check className="w-4 h-4" /> Tasdiqlash
                            </button>
                            <button 
                              onClick={() => {
                                setCars(cars.map(c => c._id === car._id ? {...c, status: 'rejected'} : c));
                              }}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 shadow"
                            >
                              <X className="w-4 h-4" /> Rad etish
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {adminTab === 'users' && (
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-6">Foydalanuvchilar boshqaruvi</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div>
                        <h4 className="font-bold text-slate-900">Javohir Toshpulatov</h4>
                        <span className="text-xs text-slate-500">+998 90 123-45-67</span>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">Faol</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div>
                        <h4 className="font-bold text-slate-900">Azizbek Karimov</h4>
                        <span className="text-xs text-slate-500">+998 91 987-65-43</span>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">Faol</span>
                    </div>
                  </div>
                </div>
              )}

              {adminTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-6">Sayt Sozlamalari</h2>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Sayt Nomi</label>
                      <input type="text" defaultValue="AVTOELON.UZ" className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Dollar Kursi (UZS)</label>
                      <input type="number" defaultValue="12800" className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm" />
                    </div>
                    <button className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm shadow">Saqlash</button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-[#020617] text-slate-400 py-8 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs">
          <p className="mb-2">&copy; 2026 AVTOELON.UZ — O'zbekiston avtomobil bozori. Barcha huquqlar himoyalangan.</p>
          <p>Admin panelga kirish uchun yuqoridagi <span className="text-white font-bold">AVTOELON.UZ</span> logotipini bosing (Login: admin, Parol: admin009).</p>
        </div>
      </footer>

    </div>
  );
}
