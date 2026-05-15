import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  MapPin, 
  Banknote, 
  Martini, 
  Mic2, 
  Phone,
  ChevronRight,
  Terminal,
  Sparkles,
  ArrowRight,
  Clock,
  Users
} from 'lucide-react';

// --- DATOS DINÁMICOS ---
const EVENT_INFO = {
  title: "NEXT GEN IT",
  subtitle: "NETWORKING & CÓCTEL",
  date: "28 DE MAYO",
  time: "20:00H a 22:00H",
  location: {
    name: "CASA VIEJA",
    address: "Calle Joaquín Costa, 27, Madrid"
  },
  price: "22€ por persona",
  includes: "Bebida & Picoteo Incluidos",
  contactPhone: "623 993 800",
  hashtag: "#NextGenITMadrid",
  // Formato ISO exacto con zona horaria de Madrid (CEST es +02:00 en Mayo)
  targetDate: "2026-05-28T20:00:00+02:00" 
};

const AGENDA_ITEMS = [
  {
    id: 1,
    time: "20:00",
    title: "Presentación NextGen IT",
    description: "Bienvenida oficial, introducción a la comunidad y visión de futuro. Un espacio para romper el hielo y conectar desde el primer minuto con otros líderes.",
    icon: <Terminal className="w-6 h-6" />
  },
  {
    id: 2,
    time: "20:35",
    title: "Microtalk: Redefiniendo el Ecosistema",
    description: "Breve charla interactiva sobre cómo la nueva generación de profesionales está transformando el sector tecnológico actual y qué oportunidades surgen.",
    icon: <Mic2 className="w-6 h-6" />
  },
  {
    id: 3,
    time: "20:55",
    title: "Conversación Inspiradora & Cóctel",
    description: "Charlas informales con un invitado especial mientras disfrutamos de la mejor compañía, bebidas y picoteo en un ambiente distendido y relajado.",
    icon: <Users className="w-6 h-6" />
  }
];

// --- HOOKS CUSTOM ---
const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      setTimeLeft(newTimeLeft);
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    // Calcular inmediatamente para evitar delay de 1 segundo en la UI
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

// --- COMPONENTES ---
const ScrollReveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1000ms] ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Countdown = ({ targetDate }) => {
  const timeLeft = useCountdown(targetDate);
  
  return (
    <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 my-8 md:my-10">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="text-xl sm:text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
              {value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] md:text-xs text-slate-400 mt-2 sm:mt-3 uppercase tracking-widest font-bold">
            {unit === 'days' ? 'Días' : unit === 'hours' ? 'Hrs' : unit === 'minutes' ? 'Min' : 'Seg'}
          </span>
        </div>
      ))}
    </div>
  );
};

const Header = () => (
  <header className="relative z-10 text-center pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 flex flex-col items-center">
    <ScrollReveal delay={100}>
      <div className="group cursor-pointer inline-flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-slate-900/80 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:border-cyan-400/60 hover:bg-slate-800 transition-all duration-300 max-w-full overflow-hidden">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
        </span>
        <span className="text-cyan-300 font-mono text-[10px] sm:text-xs md:text-sm tracking-widest uppercase group-hover:text-cyan-100 transition-colors truncate">
          Jóvenes Líderes de la Tecnología
        </span>
      </div>
    </ScrollReveal>
    
    <ScrollReveal delay={300}>
      <h1 className="text-5xl sm:text-7xl lg:text-[8rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 tracking-tighter mb-3 sm:mb-4 drop-shadow-[0_0_40px_rgba(6,182,212,0.3)]">
        {EVENT_INFO.title}
      </h1>
    </ScrollReveal>
    
    <ScrollReveal delay={500}>
      <h2 className="text-lg sm:text-xl md:text-3xl font-extrabold text-slate-300 tracking-widest uppercase mb-4">
        {EVENT_INFO.subtitle}
      </h2>
    </ScrollReveal>

    <ScrollReveal delay={700}>
      <Countdown targetDate={EVENT_INFO.targetDate} />
    </ScrollReveal>
  </header>
);

const DetailCard = ({ icon, title, value, subtitle, delay }) => (
  <ScrollReveal delay={delay}>
    <div className="group relative h-full bg-slate-900/40 backdrop-blur-lg border border-slate-700/50 p-6 md:p-8 rounded-3xl hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="p-3 sm:p-4 bg-slate-800/80 rounded-2xl mb-4 sm:mb-6 text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] group-hover:scale-110 relative z-10">
        {icon}
      </div>
      <h3 className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-1 sm:mb-2 relative z-10">{title}</h3>
      <p className="text-white text-xl md:text-2xl font-black mb-2 relative z-10">{value}</p>
      {subtitle && <p className="text-cyan-400/80 font-medium relative z-10">{subtitle}</p>}
    </div>
  </ScrollReveal>
);

const InteractiveAgenda = () => {
  const [activeId, setActiveId] = useState(1);

  return (
    <section className="py-16 md:py-24 px-4 max-w-4xl mx-auto w-full relative z-10">
      <ScrollReveal>
        <div className="text-center mb-10 md:mb-16">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 md:mb-4 tracking-wide uppercase flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <Clock className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 mb-2 sm:mb-0" />
            Agenda del <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Evento</span>
          </h3>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">Un recorrido diseñado para inspirar, conectar y disfrutar al máximo.</p>
        </div>
      </ScrollReveal>
      
      <div className="flex flex-col gap-5">
        {AGENDA_ITEMS.map((item, index) => {
          const isActive = activeId === item.id;
          return (
            <ScrollReveal key={item.id} delay={index * 150}>
              <div 
                onClick={() => setActiveId(item.id)}
                className={`cursor-pointer rounded-3xl border transition-all duration-500 overflow-hidden backdrop-blur-md ${
                  isActive 
                    ? 'border-cyan-500/50 bg-slate-800/80 shadow-[0_0_40px_rgba(6,182,212,0.15)]' 
                    : 'border-slate-800/50 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div className="p-5 sm:p-6 md:p-8 flex items-start sm:items-center gap-4 md:gap-6">
                  <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-500 shrink-0 ${isActive ? 'bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-110' : 'bg-slate-800 text-cyan-400'}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <span className={`font-mono text-xs sm:text-sm md:text-base transition-colors duration-300 block mb-1 ${isActive ? 'text-cyan-300 font-bold' : 'text-slate-500'}`}>
                      {item.time}
                    </span>
                    <h4 className={`text-lg sm:text-xl md:text-2xl transition-all duration-300 leading-tight ${isActive ? 'text-white font-black' : 'text-slate-300 font-medium'}`}>
                      {item.title}
                    </h4>
                  </div>
                  <div className={`transform transition-transform duration-500 hidden sm:block ${isActive ? 'rotate-90 text-cyan-400' : 'text-slate-600'}`}>
                    <ArrowRight className="w-8 h-8" />
                  </div>
                </div>
                
                <div className={`transition-all duration-500 ease-in-out px-5 sm:px-6 md:px-8 ${isActive ? 'max-h-48 pb-6 sm:pb-8 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}>
                  <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed sm:ml-20 md:ml-24 sm:pl-4 md:pl-6 sm:border-l-2 md:border-slate-700/50 mt-2 sm:mt-0">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};

const InteractiveReservation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const email = "nextgenitspain@gmail.com";
  const subject = "RESERVAR PLAZA";
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  return (
    <section className="py-20 md:py-32 px-4 relative z-10">
      <ScrollReveal>
        <div className="max-w-2xl mx-auto bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 md:p-14 shadow-[0_0_50px_rgba(168,85,247,0.1)] relative overflow-hidden group">
          {/* Glow background reactivo */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute -top-24 sm:-top-32 -right-24 sm:-right-32 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/20 rounded-full blur-[60px] group-hover:bg-purple-500/30 transition-colors duration-700"></div>
          <div className="absolute -bottom-24 sm:-bottom-32 -left-24 sm:-left-32 w-48 sm:w-64 h-48 sm:h-64 bg-cyan-500/20 rounded-full blur-[60px] group-hover:bg-cyan-500/30 transition-colors duration-700"></div>
          
          <div className="text-center relative z-10">
            <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-slate-800/80 rounded-2xl mb-4 sm:mb-6 shadow-inner text-cyan-400">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4">Asegura tu plaza</h3>
            <p className="text-slate-400 text-base sm:text-lg md:text-xl mb-8 md:mb-10 max-w-sm mx-auto leading-relaxed">
              El aforo es exclusivo y limitado. Forma parte de la nueva generación IT hoy mismo.
            </p>

            <a 
              href={mailtoLink}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative inline-flex w-full sm:w-auto items-center justify-center px-6 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-bold text-white transition-all duration-300 bg-slate-800 border border-slate-600 rounded-2xl hover:border-transparent hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
              <span className="relative z-10 flex items-center gap-3">
                Reservar Asistencia
                <ChevronRight className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
              </span>
            </a>

            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-slate-400 text-sm sm:text-base">
              <span>O contáctanos directamente:</span>
              <a href={`tel:${EVENT_INFO.contactPhone.replace(/\s/g, '')}`} className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 w-full sm:w-auto bg-slate-800/50 rounded-xl hover:bg-slate-700/80 hover:text-cyan-400 transition-colors border border-slate-700/50">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-mono text-base sm:text-lg font-bold tracking-wider">{EVENT_INFO.contactPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

// --- APP PRINCIPAL ---
export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-cyan-500/30 relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] -left-1/4 w-[70vw] h-[70vw] bg-cyan-900/20 blur-[120px] rounded-full mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[-10%] -right-1/4 w-[60vw] h-[60vw] bg-purple-900/20 blur-[130px] rounded-full mix-blend-screen animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-blue-900/10 blur-[100px] rounded-full mix-blend-screen"></div>
      </div>

      <Header />

      <main className="flex-grow">
        <section className="relative z-10 px-4 max-w-6xl mx-auto -mt-8 sm:-mt-4 mb-16 sm:mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DetailCard delay={0} icon={<Calendar className="w-8 h-8" />} title="Fecha" value={EVENT_INFO.date} subtitle={EVENT_INFO.time} />
            <DetailCard delay={150} icon={<MapPin className="w-8 h-8" />} title="Lugar" value={EVENT_INFO.location.name} subtitle={EVENT_INFO.location.address} />
            <DetailCard delay={300} icon={<Banknote className="w-8 h-8" />} title="Precio" value={EVENT_INFO.price} />
            <DetailCard delay={450} icon={<Martini className="w-8 h-8" />} title="Incluye" value="Bebida & Picoteo" />
          </div>
        </section>

        <InteractiveAgenda />
        <InteractiveReservation />
      </main>

      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-xl py-8 sm:py-12 mt-auto text-center">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 sm:gap-4 text-slate-500 font-mono text-xs sm:text-sm mb-6 sm:mb-8">
            <span>{EVENT_INFO.title}</span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span>{EVENT_INFO.date}</span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span>{EVENT_INFO.location.name}</span>
          </div>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-black text-2xl sm:text-3xl tracking-widest drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            {EVENT_INFO.hashtag}
          </p>
        </ScrollReveal>
      </footer>
    </div>
  );
}