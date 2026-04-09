import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Waves, 
  TreePine, 
  Utensils, 
  MapPin, 
  ExternalLink, 
  ChevronRight, 
  Star, 
  Info,
  Heart,
  Menu as MenuIcon,
  X,
  Search,
  ChevronLeft,
  Ship,
  Truck,
  Mountain,
  Coffee,
  Beer,
  Fish,
  Camera,
  Navigation,
  Clock,
  ChevronDown,
  Activity,
  MessageSquare,
  Flag,
  Plane,
  Calendar,
  Dices,
  Play,
  LayoutGrid
} from 'lucide-react';
import { locations, Location, HOUSE_COORDS } from './data';

import { usePlacePhotos } from './hooks/usePlacePhotos';

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8; // Radius of the earth in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in miles
}

export default function App() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGridView, setIsGridView] = useState(false);
  const [googlePhotosEnabled, setGooglePhotosEnabled] = useState(() => {
    const saved = localStorage.getItem('sjds-google-photos-enabled');
    return saved === 'true';
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'photos' | 'map'>('photos');
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('sjds-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [tripData, setTripData] = useState(() => {
    const saved = localStorage.getItem('sjds-trip-data');
    return saved ? JSON.parse(saved) : {
      airline: '',
      flightNumber: '',
      departureDate: '',
      arrivalDate: '',
      notes: ''
    };
  });

  useEffect(() => {
    localStorage.setItem('sjds-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('sjds-trip-data', JSON.stringify(tripData));
  }, [tripData]);

  useEffect(() => {
    localStorage.setItem('sjds-google-photos-enabled', googlePhotosEnabled.toString());
  }, [googlePhotosEnabled]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const filteredLocations = useMemo(() => {
    return locations.filter(loc => {
      const matchesFilter = filter === 'all' || 
                          (filter === 'favorites' && favorites.includes(loc.id)) ||
                          loc.category === filter || 
                          (filter === 'beaches' && loc.category.startsWith('beaches-')) ||
                          (filter === 'adventures' && loc.category.startsWith('adventures'));
      const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          loc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const activeLocation = useMemo(() => 
    locations.find(l => l.id === selectedId) || locations[0]
  , [selectedId]);

  const { photos: googlePhotos, loading: googleLoading } = usePlacePhotos(activeLocation.query, activeLocation.name, googlePhotosEnabled);

  const displayPhotos = useMemo(() => 
    googlePhotos.length > 0 ? googlePhotos : activeLocation.images
  , [googlePhotos, activeLocation.images]);

  useEffect(() => {
    setCurrentImageIndex(0);
    setIsMenuOpen(false);
  }, [selectedId]);

  useEffect(() => {
    let interval: any;
    if (!isGridView && displayPhotos.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % displayPhotos.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isGridView, displayPhotos.length]);

  const categories = [
    { id: 'all', label: 'All', icon: Compass },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'beaches', label: 'Beaches', icon: Waves },
    { id: 'dining', label: 'Dining', icon: Utensils },
    { id: 'adventures', label: 'Adventures', icon: Mountain },
    { id: 'adventures-regional', label: 'Regional', icon: MapPin },
    { id: 'golf', label: 'Golf', icon: Flag },
    { id: 'car-rentals', label: 'Car Rentals', icon: Truck },
    { id: 'logistics', label: 'Logistics', icon: Truck },
    { id: 'my-trip', label: 'My Trip', icon: Plane },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayPhotos.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayPhotos.length) % displayPhotos.length);
  };

  const pickRandomLocation = () => {
    const randomIndex = Math.floor(Math.random() * locations.length);
    const randomLoc = locations[randomIndex];
    setFilter('all');
    setSelectedId(randomLoc.id);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="h-16 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800 flex items-center justify-between px-6 z-50 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors lg:hidden"
          >
            {isSidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-600 rounded-xl shadow-lg shadow-orange-900/20">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black uppercase italic leading-none tracking-tight">SJDS Explorer</h1>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Regional Analysis 2026</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <button
            onClick={pickRandomLocation}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl shadow-lg shadow-orange-900/20 transition-all flex items-center gap-2 group"
            title="Pick a random thing to do"
          >
            <Dices size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Surprise Me</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <motion.aside 
          initial={false}
          animate={{ 
            width: isSidebarOpen ? (window.innerWidth < 1024 ? '100%' : 384) : 0,
            x: isSidebarOpen ? 0 : -384
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`absolute lg:relative z-40 h-full border-r border-zinc-800 bg-zinc-950 flex flex-col overflow-hidden`}
        >
          {/* Search in Sidebar */}
          <div className="p-4 border-b border-zinc-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
              <input 
                type="text" 
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              />
            </div>
          </div>

          {/* Categories in Sidebar */}
          <div className="p-4 border-b border-zinc-800 shrink-0 overflow-x-auto no-scrollbar">
            <div className="flex lg:grid lg:grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap lg:whitespace-normal ${
                    filter === cat.id 
                    ? 'bg-zinc-100 text-zinc-950' 
                    : 'bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 border border-zinc-800'
                  }`}
                >
                  <cat.icon size={12} />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-b border-zinc-800 flex items-center justify-between shrink-0">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Regional Network</span>
            <span className="text-[10px] font-bold text-zinc-600 px-2 py-0.5 bg-zinc-900 rounded-full">
              {filteredLocations.length} Results
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredLocations.map((loc) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={loc.id}
                  onClick={() => {
                    setSelectedId(loc.id);
                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedId(loc.id);
                      if (window.innerWidth < 1024) setIsSidebarOpen(false);
                    }
                  }}
                  className={`w-full text-left p-4 rounded-2xl transition-all border group relative overflow-hidden cursor-pointer ${
                    selectedId === loc.id 
                    ? 'bg-zinc-100 text-zinc-950 border-white shadow-2xl shadow-white/5' 
                    : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-col">
                      <span className="font-black uppercase italic tracking-tight text-lg leading-none group-hover:translate-x-1 transition-transform">
                        {loc.name}
                      </span>
                      <span className={`text-[9px] font-bold uppercase tracking-widest mt-1 ${selectedId === loc.id ? 'text-zinc-500' : 'text-zinc-600'}`}>
                        {loc.category.replace('-', ' ')}
                      </span>
                      {loc.coordinates && (
                        <div className="flex items-center gap-1 mt-1 text-[8px] font-bold text-orange-600 uppercase tracking-wider">
                          <Navigation size={8} />
                          {calculateDistance(HOUSE_COORDS.lat, HOUSE_COORDS.lng, loc.coordinates.lat, loc.coordinates.lng).toFixed(1)} miles
                        </div>
                      )}
                      {loc.hours && (
                        <div className="flex items-center gap-1 mt-1 text-[8px] font-bold text-zinc-500 uppercase tracking-wider">
                          <Clock size={8} />
                          {loc.hours.open} - {loc.hours.close}
                        </div>
                      )}
                    </div>
                    <div className={`p-2 rounded-xl ${selectedId === loc.id ? 'bg-zinc-950 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                      <loc.icon size={16} />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-1.5">
                      {loc.tags.map(tag => (
                        <span key={tag} className={`text-[8px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          selectedId === loc.id ? 'bg-zinc-950 text-white' : 'bg-zinc-800 text-zinc-500'
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(loc.id);
                      }}
                      className={`p-1.5 rounded-lg transition-colors ${
                        favorites.includes(loc.id) 
                        ? 'text-red-500 bg-red-500/10' 
                        : 'text-zinc-600 hover:text-zinc-400'
                      }`}
                    >
                      <Heart size={14} fill={favorites.includes(loc.id) ? "currentColor" : "none"} />
                    </button>
                  </div>

                  {selectedId === loc.id && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="absolute right-0 top-0 bottom-0 w-1 bg-orange-600"
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col bg-zinc-900 overflow-y-auto no-scrollbar relative">
          <AnimatePresence mode="wait">
            {filter === 'my-trip' ? (
              <motion.div
                key="my-trip"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 p-6 md:p-12 lg:p-16 max-w-4xl mx-auto w-full"
              >
                <div className="space-y-12">
                  <header>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-orange-600 rounded-xl shadow-lg shadow-orange-900/20">
                        <Plane className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">Trip Logistics</h2>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white">
                      Your Journey <span className="text-zinc-800">2026</span>
                    </h1>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Flight Info */}
                    <section className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 space-y-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Plane size={18} className="text-zinc-500" />
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Flight Details</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2">Airline</label>
                          <input 
                            type="text"
                            value={tripData.airline}
                            onChange={(e) => setTripData({...tripData, airline: e.target.value})}
                            placeholder="e.g. United, Avianca"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2">Flight Number</label>
                          <input 
                            type="text"
                            value={tripData.flightNumber}
                            onChange={(e) => setTripData({...tripData, flightNumber: e.target.value})}
                            placeholder="e.g. UA1234"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                          />
                        </div>
                      </div>
                    </section>

                    {/* Schedule */}
                    <section className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 space-y-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar size={18} className="text-zinc-500" />
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Schedule</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2">Departure Date & Time</label>
                          <input 
                            type="datetime-local"
                            value={tripData.departureDate}
                            onChange={(e) => setTripData({...tripData, departureDate: e.target.value})}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-zinc-300"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2">Arrival Date & Time</label>
                          <input 
                            type="datetime-local"
                            value={tripData.arrivalDate}
                            onChange={(e) => setTripData({...tripData, arrivalDate: e.target.value})}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-zinc-300"
                          />
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* Countdown / Status */}
                  {tripData.departureDate && (
                    <section className="bg-orange-600 rounded-[2.5rem] p-8 text-white overflow-hidden relative group">
                      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <Clock size={120} />
                      </div>
                      <div className="relative z-10">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4">Time Until Departure</h4>
                        <div className="flex gap-8 items-end">
                          {(() => {
                            const diff = new Date(tripData.departureDate).getTime() - new Date().getTime();
                            if (diff <= 0) return <span className="text-4xl font-black uppercase italic">Safe Travels!</span>;
                            
                            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                            
                            return (
                              <>
                                <div className="flex flex-col">
                                  <span className="text-6xl font-black italic leading-none">{days}</span>
                                  <span className="text-[10px] font-black uppercase tracking-widest mt-2 opacity-70">Days</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-6xl font-black italic leading-none">{hours}</span>
                                  <span className="text-[10px] font-black uppercase tracking-widest mt-2 opacity-70">Hours</span>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Notes */}
                  <section className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <MessageSquare size={18} className="text-zinc-500" />
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Trip Notes</h3>
                    </div>
                    <textarea 
                      value={tripData.notes}
                      onChange={(e) => setTripData({...tripData, notes: e.target.value})}
                      placeholder="Add confirmation numbers, rental codes, or packing lists..."
                      rows={6}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl py-4 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-zinc-300 resize-none"
                    />
                  </section>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={activeLocation.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col min-h-full"
              >
              {/* Media Section (Gallery + Map) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 h-[60vh] lg:h-[55vh] shrink-0 border-b border-zinc-800">
                {/* Image Gallery / Grid */}
                <div className={`relative bg-black overflow-hidden group ${mobileView === 'map' ? 'hidden lg:block' : 'block'}`}>
                  <AnimatePresence mode="wait">
                    {isGridView ? (
                      <motion.div
                        key="grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full p-2 grid grid-cols-2 sm:grid-cols-3 gap-2 overflow-y-auto no-scrollbar"
                      >
                        {displayPhotos.map((img, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setCurrentImageIndex(i);
                              setIsGridView(false);
                            }}
                            className="relative aspect-[4/3] rounded-lg overflow-hidden bg-zinc-900 border border-white/5"
                          >
                            <img
                              src={img.includes('googleusercontent.com') ? img : img.replace('800/600', '400/300')}
                              alt={`${activeLocation.name} ${i + 1}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
                          </motion.button>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="carousel"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full relative"
                      >
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={currentImageIndex}
                            src={displayPhotos[currentImageIndex]}
                            initial={{ 
                              opacity: 0, 
                              scale: 1.2,
                              rotate: Math.random() * 10 - 5 
                            }}
                            animate={{ 
                              opacity: 1, 
                              scale: 1,
                              rotate: 0
                            }}
                            exit={{ 
                              opacity: 0, 
                              scale: 0.8,
                              rotate: Math.random() * 10 - 5
                            }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        </AnimatePresence>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent pointer-events-none" />
                        
                        {displayPhotos.length > 1 && (
                          <>
                            <button 
                              onClick={prevImage}
                              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-opacity"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button 
                              onClick={nextImage}
                              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-opacity"
                            >
                              <ChevronRight size={20} />
                            </button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                              {displayPhotos.map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`h-1 rounded-full transition-all ${i === currentImageIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    <button
                      onClick={() => setIsGridView(!isGridView)}
                      className="bg-zinc-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/10 flex items-center gap-2 hover:bg-zinc-800 transition-colors"
                    >
                      {isGridView ? <Play size={12} /> : <LayoutGrid size={12} />}
                      {isGridView ? 'Slideshow Mode' : 'Grid Mode'}
                    </button>
                    
                    <button
                      onClick={() => setGooglePhotosEnabled(!googlePhotosEnabled)}
                      className={`backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl border flex items-center gap-2 transition-all ${
                        googlePhotosEnabled 
                        ? 'bg-green-600/20 border-green-500/50 text-green-500 hover:bg-green-600/30' 
                        : 'bg-zinc-900/80 border-white/10 text-zinc-400 hover:bg-zinc-800'
                      }`}
                      title={googlePhotosEnabled ? "Google Photos Enabled (Costs API Credits)" : "Google Photos Disabled (Free Mode)"}
                    >
                      <Camera size={12} className={googlePhotosEnabled ? "animate-pulse" : ""} />
                      {googlePhotosEnabled ? 'Google Photos: ON' : 'Google Photos: OFF'}
                    </button>
                    {!isGridView && (
                      <span className="bg-orange-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                        <Star size={10} fill="white" />
                        Focused View
                      </span>
                    )}
                    {googleLoading && (
                      <span className="bg-zinc-900/80 backdrop-blur-md text-zinc-400 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/10 flex items-center gap-2">
                        <Clock size={12} className="animate-spin" />
                        Fetching Real Photos...
                      </span>
                    )}
                    {!(typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY) && (
                      <div className="hidden md:flex bg-zinc-900/80 backdrop-blur-md text-orange-500 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-orange-500/20 items-center gap-2">
                        <Info size={12} />
                        Add Google API Key for real photos
                      </div>
                    )}
                    
                    {/* Mobile View Toggle */}
                    <div className="lg:hidden flex bg-zinc-900/80 backdrop-blur-md p-1 rounded-xl border border-white/10">
                      <button 
                        onClick={() => setMobileView('photos')}
                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mobileView === 'photos' ? 'bg-white text-black' : 'text-zinc-400'}`}
                      >
                        Photos
                      </button>
                      <button 
                        onClick={() => setMobileView('map')}
                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mobileView === 'map' ? 'bg-white text-black' : 'text-zinc-400'}`}
                      >
                        Map
                      </button>
                    </div>
                  </div>
                </div>

                {/* Map Section */}
                <div className={`relative bg-zinc-950 ${mobileView === 'photos' ? 'hidden lg:block' : 'block'}`}>
                  <iframe
                    title="Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1) invert(0.9) hue-rotate(180deg)' }}
                    src={`https://www.google.com/maps?q=${activeLocation.query}&output=embed&t=k`}
                    allowFullScreen
                    referrerPolicy="no-referrer"
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 right-6">
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={`https://www.google.com/maps/search/${activeLocation.query}`} 
                      target="_blank" 
                      className="bg-white text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2 shadow-2xl hover:bg-orange-500 hover:text-white transition-all"
                    >
                      Open in Maps <ExternalLink size={14} />
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-6 md:p-12 lg:p-16 max-w-7xl mx-auto w-full flex-1">
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="flex-1 space-y-12">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < Math.floor(activeLocation.rating) ? "#f97316" : "none"} className={i < Math.floor(activeLocation.rating) ? "text-orange-500" : "text-zinc-600"} />
                          ))}
                        </div>
                        <span className="text-sm font-black text-white">{activeLocation.rating}</span>
                        <span className="text-zinc-600 mx-2">|</span>
                        {activeLocation.coordinates && (
                          <>
                            <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-orange-500">
                              <Navigation size={12} />
                              {calculateDistance(HOUSE_COORDS.lat, HOUSE_COORDS.lng, activeLocation.coordinates.lat, activeLocation.coordinates.lng).toFixed(1)} miles from house
                            </div>
                            <span className="text-zinc-600 mx-2">|</span>
                          </>
                        )}
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{activeLocation.category.replace('-', ' ')}</span>
                      </div>
                      <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter text-white mb-8 flex flex-wrap items-center gap-6">
                        {activeLocation.name}
                        <button
                          onClick={() => toggleFavorite(activeLocation.id)}
                          className={`p-4 rounded-3xl border transition-all ${
                            favorites.includes(activeLocation.id)
                            ? 'bg-red-500/10 border-red-500/50 text-red-500'
                            : 'bg-zinc-800/50 border-zinc-700 text-zinc-500 hover:text-white hover:border-zinc-500'
                          }`}
                        >
                          <Heart size={32} fill={favorites.includes(activeLocation.id) ? "currentColor" : "none"} />
                        </button>
                      </h2>
                      <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-medium italic max-w-3xl">
                        {activeLocation.description}
                      </p>
                      {activeLocation.website && (
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="mt-8"
                        >
                          <a 
                            href={activeLocation.website}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-lg shadow-orange-900/20 group"
                          >
                            Visit Official Website
                            <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </a>
                        </motion.div>
                      )}
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <section className="bg-zinc-800/30 rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                          <Info size={100} />
                        </div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-orange-500/10 rounded-lg">
                              <Star className="text-orange-500" size={18} />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">Insider Intel</h4>
                          </div>
                          <p className="text-zinc-300 text-lg leading-relaxed">
                            {activeLocation.intel}
                          </p>
                        </div>
                      </section>

                      <section className="space-y-6">
                        <div className="flex items-center gap-3">
                          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Pro Tips</h4>
                        </div>
                        <div className="space-y-3">
                          {activeLocation.tips.map((tip, i) => (
                            <motion.div 
                              initial={{ x: 20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.4 + (i * 0.1) }}
                              key={i} 
                              className="flex items-center gap-4 p-5 bg-zinc-950/50 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors"
                            >
                              <div className="shrink-0 w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-orange-600 font-black text-xs">
                                {i + 1}
                              </div>
                              <span className="text-sm text-zinc-300 font-semibold leading-tight">{tip}</span>
                            </motion.div>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>

                  <div className="lg:w-80 space-y-8 shrink-0">
                    {/* Surf & Tide Widget */}
                    {activeLocation.surfData && (
                      <section className="p-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] shadow-xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                          <Waves size={80} />
                        </div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                <Waves size={16} />
                              </div>
                              <h4 className="text-xs font-black uppercase tracking-widest text-blue-500">Surf & Tides</h4>
                            </div>
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-500 text-[8px] font-black uppercase rounded-full animate-pulse">
                              <Activity size={8} /> Live
                            </span>
                          </div>

                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Conditions</span>
                              <span className="text-xs font-black text-white">3-4ft • Clean</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Difficulty</span>
                              <span className="text-xs font-black text-white">{activeLocation.surfData.difficulty}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Best Tide</span>
                              <span className="text-xs font-black text-white">{activeLocation.surfData.bestTide}</span>
                            </div>
                            
                            <div className="pt-4 border-t border-zinc-800">
                              <div className="flex justify-between items-end mb-2">
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Next Tide</span>
                                  <span className="text-xs font-black text-white">High @ 2:45 PM</span>
                                </div>
                                <div className="h-8 w-24 flex items-end gap-0.5">
                                  {[0.2, 0.4, 0.7, 0.9, 1.0, 0.8, 0.5, 0.3].map((h, i) => (
                                    <div key={i} className="flex-1 bg-blue-500/20 rounded-t-sm" style={{ height: `${h * 100}%` }} />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    )}

                    <section className="p-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] shadow-xl">
                      {activeLocation.hours && (
                        <div className="mb-8 p-4 bg-zinc-800/30 rounded-2xl border border-white/5">
                          <div className="flex items-center gap-3 mb-3">
                            <Clock size={14} className="text-orange-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Operating Hours</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-white">{activeLocation.hours.days}</span>
                            <span className="text-xs font-black text-orange-500">{activeLocation.hours.open} - {activeLocation.hours.close}</span>
                          </div>
                        </div>
                      )}
                      {activeLocation.menu && (
                        <div className="mb-8">
                          <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="w-full flex items-center justify-between p-4 bg-zinc-800/50 hover:bg-zinc-800 rounded-2xl border border-zinc-700 transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                                <Utensils size={16} />
                              </div>
                              <span className="text-xs font-black uppercase tracking-widest">View Menu</span>
                            </div>
                            <ChevronDown size={16} className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                          </button>
                          
                          <AnimatePresence>
                            {isMenuOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-4 space-y-6">
                                  {activeLocation.menu.sections.map((section, idx) => (
                                    <div key={idx} className="space-y-3">
                                      <h5 className="text-[10px] font-black uppercase tracking-widest text-orange-500 border-b border-zinc-800 pb-2">
                                        {section.title}
                                      </h5>
                                      <div className="space-y-3">
                                        {section.items.map((item, i) => (
                                          <div key={i} className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                              <p className="text-xs font-bold text-zinc-200">{item.name}</p>
                                              {item.description && (
                                                <p className="text-[10px] text-zinc-500 mt-0.5 leading-tight">{item.description}</p>
                                              )}
                                            </div>
                                            <span className="text-xs font-black text-white shrink-0">{item.price}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                {activeLocation.website && (
                                  <div className="px-4 pb-4">
                                    <a 
                                      href={activeLocation.website}
                                      target="_blank"
                                      className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-bold uppercase text-[9px] tracking-widest flex items-center justify-center gap-2 transition-colors border border-zinc-700"
                                    >
                                      <ExternalLink size={12} /> View Full Menu on Website
                                    </a>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Price Range</span>
                        <span className="text-sm font-black text-white">{activeLocation.priceRange}</span>
                      </div>
                      <div className="flex gap-1.5 mb-8">
                        {['$', '$$', '$$$', '$$$$'].map((p) => (
                          <div 
                            key={p} 
                            className={`flex-1 h-1.5 rounded-full transition-all ${
                              activeLocation.priceRange.length >= p.length ? 'bg-orange-600 shadow-[0_0_10px_rgba(234,88,12,0.5)]' : 'bg-zinc-800'
                            }`} 
                          />
                        ))}
                      </div>
                      
                      <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest block">Tags</span>
                        <div className="flex flex-wrap gap-2">
                          {activeLocation.tags.map(tag => (
                            <span key={tag} className="text-[9px] font-bold px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full uppercase tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {activeLocation.whatsapp && (
                        <div className="pt-8 border-t border-zinc-800 mt-8">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4">Direct Booking</h4>
                          <a 
                            href={`https://wa.me/${activeLocation.whatsapp.replace(/\+/g, '')}`}
                            target="_blank"
                            className="w-full py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-900/20"
                          >
                            <MessageSquare size={14} /> Chat on WhatsApp
                          </a>
                        </div>
                      )}

                      <div className="pt-8 border-t border-zinc-800 mt-8">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4">Navigation</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <a 
                            href={`https://www.google.com/maps/dir/?api=1&destination=${activeLocation.coordinates.lat},${activeLocation.coordinates.lng}`}
                            target="_blank"
                            className="py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-colors"
                          >
                            <Navigation size={14} /> From Current Location
                          </a>
                          <a 
                            href={`https://www.google.com/maps/dir/?api=1&origin=${HOUSE_COORDS.lat},${HOUSE_COORDS.lng}&destination=${activeLocation.coordinates.lat},${activeLocation.coordinates.lng}`}
                            target="_blank"
                            className="py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-colors"
                          >
                            <MapPin size={14} /> From Mi Casa
                          </a>
                        </div>
                      </div>
                    </section>

                    <section className="p-8 bg-orange-600 rounded-[2.5rem] text-white shadow-2xl shadow-orange-900/20">
                      <h4 className="text-xs font-black uppercase tracking-widest mb-4">Quick Action</h4>
                      <p className="text-sm font-medium opacity-90 mb-6">Ready to explore this location? Get the exact coordinates.</p>
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${activeLocation.query}`}
                        target="_blank"
                        className="w-full py-4 bg-white text-orange-600 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-100 transition-colors"
                      >
                        Get Directions <ChevronRight size={14} />
                      </a>
                    </section>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <footer className="p-12 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-500 bg-zinc-950/50">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Compass size={16} className="text-orange-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">SJDS Explorer 2026</span>
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-widest opacity-50">Emerald Coast Edition</span>
                </div>
                <div className="flex items-center gap-8">
                  <a href="#" className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Terms</a>
                  <div className="flex gap-4">
                    <Camera size={16} className="hover:text-white transition-colors cursor-pointer" />
                    <MapPin size={16} className="hover:text-white transition-colors cursor-pointer" />
                  </div>
                </div>
              </footer>
            </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
