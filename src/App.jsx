import React, { useState, useEffect } from 'react';
import { Terminal, ChevronRight, Code, ShieldAlert, Loader2, Check, X } from 'lucide-react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  useEffect(() => {
    // Animación de entrada
    setMounted(true);

    // Centrar el brillo inicialmente
    if (typeof window !== 'undefined') {
      setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
    
    // Elemento reactivo: tracking del ratón y táctil para el brillo
    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      setMousePos({ x: clientX, y: clientY });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación del formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('loading');

    try {
      await addDoc(collection(db, 'access_requests'), {
        email: email.trim(),
        timestamp: serverTimestamp()
      });
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans flex flex-col items-center justify-center relative overflow-hidden selection:bg-[#B87333]/30">

      {/* Brillo cobrizo reactivo al movimiento del ratón */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(184,115,51,0.07), transparent 40%)`
        }}
      />

      {/* Fondo Minimalista IT (patrón sutil) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Contenido Principal (Animado en OnMount) */}
      <main className={`relative z-10 flex flex-col items-center text-center px-4 sm:px-6 md:px-8 w-full max-w-5xl transition-all duration-[1500ms] ease-out transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Etiqueta Superior */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#B87333]/5 border border-[#B87333]/20 mb-8 sm:mb-10 md:mb-14 hover:bg-[#B87333]/10 transition-colors duration-500 cursor-default">
          <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B87333] shrink-0" />
          <span className="text-[#B87333] text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase">
            Acceso IT Restringido
          </span>
        </div>

        {/* Título Principal Minimalista */}
        <h1 className="text-[2.75rem] leading-none min-[375px]:text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black text-white tracking-tighter mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 md:gap-6 w-full">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">NEXT</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#F4C493] via-[#B87333] to-[#7A4016] drop-shadow-[0_0_30px_rgba(184,115,51,0.2)]">GEN</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">IT</span>
        </h1>

        {/* Subtítulo / Descripción */}
        <p className="text-sm min-[375px]:text-base sm:text-lg md:text-xl text-neutral-400 font-light mb-10 sm:mb-12 max-w-2xl leading-relaxed px-2 sm:px-0">
          Desarrollando el ecosistema definitivo y exclusivo para la nueva generación de <span className="text-[#B87333] font-medium">líderes tecnológicos</span>. Minimalismo, código y networking de alto nivel.
        </p>

        {/* Input Reactivo Minimalista */}
        <div
          className="w-full max-w-md relative group mt-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Resplandor trasero de cobre en hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#B87333]/0 via-[#B87333]/30 to-[#B87333]/0 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-300 pointer-events-none"></div>
          
          <form 
            onSubmit={handleSubmit}
            className="relative flex items-center bg-[#0A0A0A] border border-white/5 rounded-xl sm:rounded-2xl p-1 sm:p-1.5 focus-within:border-[#B87333]/50 focus-within:bg-[#0F0F0F] transition-all duration-500 shadow-2xl"
          >
            <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600 ml-2 sm:ml-3 shrink-0" />
            <input
              type="email"
              required
              placeholder="ejecuta_acceso(tu@email.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              className="w-full min-w-0 bg-transparent border-none text-neutral-300 px-3 py-2.5 sm:px-4 sm:py-3 focus:outline-none placeholder-neutral-700 font-mono text-[10px] sm:text-sm disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`shrink-0 px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-sm tracking-widest uppercase transition-all duration-500 flex items-center gap-1.5 sm:gap-2 overflow-hidden relative disabled:cursor-not-allowed ${status === 'success' ? 'bg-[#B87333] text-black shadow-[0_0_20px_rgba(184,115,51,0.4)]' : status === 'error' ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-[#B87333]/10 hover:bg-[#B87333] text-[#B87333] hover:text-black'}`}
            >
              <span className="relative z-10">Init</span>
              <span className="relative z-10">
                {status === 'idle' && <ChevronRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />}
                {status === 'loading' && <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />}
                {status === 'success' && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                {status === 'error' && <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </span>
            </button>
          </form>
        </div>

        {/* Detalles Técnicos "Próximamente" */}
        <div className="mt-16 sm:mt-24 flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-neutral-600 font-mono text-[10px] sm:text-xs uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B87333] animate-pulse"></span>
            Próximamente
          </span>
          <span className="opacity-30">|</span>
          <span className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-default">
            <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            System.await()
          </span>
        </div>

      </main>
    </div>
  );
}