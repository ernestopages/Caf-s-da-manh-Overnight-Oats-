import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ChevronDown, 
  X
} from 'lucide-react';

// --- Utility Components ---

const CHECKOUT_URL = "#"; // Link do checkout (preparado para receber a URL)

const Button = ({ children, onClick, className = "", href }: React.PropsWithChildren<{ onClick?: () => void, className?: string, href?: string }>) => {
  const baseClasses = `w-full py-4 px-4 rounded-xl font-bold text-[15px] sm:text-lg uppercase tracking-wider transition-all duration-300 shadow-lg active:scale-95 bg-[#2F7D32] text-white hover:brightness-110 whitespace-nowrap flex items-center justify-center btn-pulse ${className}`;
  
  if (href) {
    return (
      <a 
        href={href}
        className={`no-underline ${baseClasses}`}
      >
        {children}
      </a>
    );
  }
  return (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
      className={baseClasses}
    >
      {children}
    </button>
  );
};

const Section = ({ children, className = "", id = "" }: React.PropsWithChildren<{ className?: string, id?: string }>) => (
  <section id={id} className={`py-12 px-6 max-w-2xl mx-auto ${className}`}>
    {children}
  </section>
);

// Intensified highlight color
const Highlight = ({ children }: React.PropsWithChildren<{}>) => (
  <span className="text-[#B45309]">{children}</span>
);

// --- Page Sections ---

const TopBanner = () => {
  const [dates, setDates] = useState('');

  useEffect(() => {
    const today = new Date();
    const d0 = today.getDate().toString().padStart(2, '0');
    
    const y1 = new Date(today);
    y1.setDate(today.getDate() - 1);
    const d1 = y1.getDate().toString().padStart(2, '0');
    
    const y2 = new Date(today);
    y2.setDate(today.getDate() - 2);
    const d2 = y2.getDate().toString().padStart(2, '0');

    setDates(`${d2}, ${d1} e ${d0}`);
  }, []);

  return (
    <div className="bg-[#E53935] text-white py-3 px-4 text-center font-bold text-sm tracking-wide">
      OFERTA VÁLIDA APENAS NOS DIAS {dates}
    </div>
  );
};

const Hero = () => {
  return (
    <Section className="text-center pt-8 pb-4 bg-[#F6F3ED]">
      <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-3 text-[#2F7D32]">
        CHEGA DE PREPARAR <Highlight>CAFÉ DA MANHÃ</Highlight> TODOS OS DIAS
      </h1>
      <p className="text-sm md:text-base text-[#4A4A4A] mb-6 font-normal leading-relaxed max-w-lg mx-auto">
        <strong className="font-bold text-[#1C1C1C]">Descubra</strong> a paz de ter <strong className="font-bold text-[#1C1C1C]">café da manhã</strong> pronto e fique longe do <strong className="font-bold text-[#1C1C1C]">fogão</strong> por <strong className="font-bold text-[#1C1C1C]">7 dias</strong>
      </p>
      <div className="max-w-md mx-auto">
        <img 
          src="https://i.ibb.co/Pz5QLnvR/CAPA-ATT-png.png" 
          alt="Capa do E-book Overnight Oats" 
          className="w-full h-auto object-contain mx-auto"
          loading="eager"
        />
      </div>
    </Section>
  );
};

const WhatYouFind = () => {
  const items = [
    { text: "+30 opções deliciosas", icon: "🍓" },
    { text: "Opções sem Lactose", icon: "🥛" },
    { text: "Sem cozinhar nada", icon: "🥄" },
    { text: "O segredo das camadas", icon: "🥞" },
    { text: "Onde encontrar e comprar os potes que eu uso", icon: "🫙" },
    { text: "Conservação de 7 dias", icon: "📅" },
    { text: "Prontos em 30 minutos", icon: "⏱️" },
    { text: "Passo a passo de preparo", icon: "📋" },
  ];

  return (
    <Section className="bg-[#F6F3ED] pt-2 pb-10" id="find">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#F0EAD6]">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-[#2F7D32] uppercase tracking-wide">
          O QUE VOCÊ<br/><span className="text-[#B45309]">VAI ENCONTRAR</span>
        </h2>
        <div className="flex flex-col gap-1.5 mb-8 max-w-sm mx-auto pl-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 py-1">
              <span className="text-2xl shrink-0 w-8 text-center">{item.icon}</span>
              <span className="font-bold text-[#2F7D32] text-base sm:text-lg leading-tight">
                {item.text}
              </span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-[#F0EAD6]">
          <img 
            src="https://i.ibb.co/fzg6zGpv/Gemini-Generated-Image-3ib6u03ib6u03ib6.webp" 
            alt="Montagem dos potes" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </Section>
  );
};

const RecipeCard = ({ title, desc, img }: { title: string, desc: string, img: string }) => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full border border-[#6BCB77]/10">
    <img src={img} alt={title} className="w-full h-56 object-cover" />
    <div className="p-5 flex-grow">
      <h3 className="font-bold text-lg mb-2 text-[#2F7D32]">{title}</h3>
      <p className="text-[#4A4A4A] text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const Recipes = () => (
  <Section className="bg-[#F6F3ED]">
    <h2 className="text-2xl font-bold text-center mb-10 text-[#2F7D32] uppercase">
      Alguns <Highlight>Cafés da Manhã no Pote</Highlight> que Você Irá Aprender:
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
      <RecipeCard 
        title="⚡ Energético Natural"
        desc="(Perfeito pra começar o dia com disposição, saciedade e sem aquela fome que aparece antes do almoço.)"
        img="https://i.ibb.co/4ZPZScBJ/Energ-tico.webp"
      />
      <RecipeCard 
        title="🥭 Tropical Cremoso"
        desc="(Leve, refrescante e naturalmente doce, parece sobremesa, mas ajuda você a manter o foco na sua rotina saudável.)"
        img="https://i.ibb.co/G4DH980p/Tropical.webp"
      />
      <RecipeCard 
        title="🍎 Maçã & Canela Termogênico"
        desc="(Aquele sabor aconchegante que controla a vontade de doce e mantém você satisfeita por hours.)"
        img="https://i.ibb.co/Y43W1KNw/MA-COM-CANELA.png"
      />
      <RecipeCard 
        title="🍎 Morango Proteico"
        desc="(Delicado, leve e ideal pra quem quer algo gostoso que ajuda na saciedade e no emagrecimento.)"
        img="https://i.ibb.co/DHdwzSZY/Morango-Proteico.png"
      />
      <RecipeCard 
        title="☕ Café & Cacau Despertar"
        desc="(Combinação perfeita pra acordar de verdade e manter energia estável durante o dia.)"
        img="https://i.ibb.co/zWDQb9Jk/Caf.webp"
      />
      <RecipeCard 
        title="🍌 Banana com Linhaça Cremosa"
        desc="(Simples, nutritiva e perfeita pra quem quer praticidade sem abrir mão do resultado.)"
        img="https://i.ibb.co/yFm0NqF8/Banana.webp"
      />
    </div>
    <p className="text-center text-sm md:text-base font-bold italic text-[#4A4A4A] px-4">
      E muito mais… receitas saborosas e práticas que transformarão sua manhã de forma saudável sem precisar levar nada ao fogo.
    </p>
  </Section>
);

const Benefits = () => (
  <Section className="bg-[#F6F3ED] pt-2 pb-10">
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#F0EAD6]">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 uppercase tracking-wide text-[#2F7D32]">
        DURA ATÉ <Highlight>07 DIAS</Highlight> NA <Highlight>GELADEIRA</Highlight> SEM PERDER A QUALIDADE E SABOR!
      </h2>
      <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-[#F0EAD6]">
        <img 
          src="https://i.ibb.co/Tqd8stFF/DIAS-2.webp" 
          alt="Dias na geladeira" 
          className="w-full h-auto"
        />
      </div>
      <div className="space-y-2.5 max-w-sm mx-auto pl-2">
        {[
          "Sacia por muito tempo",
          "Pronto em poucos minutos",
          "Dura 07 dias na geladeira",
          "Promove o Emagrecimento rápido",
          "Elimina a vontade de doce",
          "Café saudável sem parecer dieta chata",
          "Várias opções de sabores"
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 py-0.5">
            <CheckCircle2 size={20} className="text-[#2F7D32] shrink-0" />
            <p className="text-base sm:text-lg font-bold text-[#4A4A4A] leading-tight">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

const ExtraLesson = () => (
  <Section className="bg-[#F6F3ED] pt-2 pb-10">
    <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-3xl shadow-xl border border-[#F0EAD6] max-w-lg mx-auto text-center">
      <div className="mb-6 rounded-2xl overflow-hidden shadow-md">
        <img 
          src="https://i.ibb.co/Q32xyg60/AULA-WEBP.webp" 
          alt="Aula Introdutória de Brinde" 
          className="w-full h-auto object-cover"
        />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] leading-snug mb-4">
        Além de adquirir o guia, você ganha <span className="text-[#B45309]">acesso a UMA aula introdutória totalmente de graça!</span>
      </h3>
      <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
        Onde eu te explico do zero e te ensino passo a passo como você irá fazer todos os seus <strong className="font-bold text-[#2F7D32]">cafés da manhã no pote!</strong>
      </p>
    </div>
  </Section>
);

const BonusCard = ({ img, bonusNum, title, price }: { img: string, bonusNum: string, title: string, price: string }) => (
  <div className="bg-white p-6 rounded-3xl shadow-2xl border border-[#F0EAD6] flex flex-col items-center text-center">
    <div className="w-full mb-5 relative">
      <img src={img} alt={title} className="w-full h-auto rounded-2xl shadow-sm" />
    </div>
    <h3 className="font-bold text-lg text-[#1C1C1C] leading-tight mb-4">
      <span className="text-[#B45309] block mb-2 uppercase text-xs tracking-[0.2em] font-bold">{bonusNum}</span>
      {title}
    </h3>
    <div className="flex flex-col items-center justify-center gap-0.5 bg-[#34A853]/5 px-4 py-2 rounded-2xl border border-[#34A853]/20 w-fit">
      <span className="line-through text-[#7A7A7A] text-[10px] font-bold tracking-tight opacity-60">Valor: {price}</span>
      <span className="text-[#34A853] font-bold text-xl leading-none">R$ 0,00</span>
    </div>
  </div>
);

const Bonus = () => (
  <Section className="bg-[#F6F3ED]">
    <h2 className="text-3xl font-bold text-center mb-10 text-[#2F7D32] leading-tight">
      Você Ainda Irá Receber <br/><Highlight>+3 Bônus Exclusivos</Highlight>:
    </h2>
    <div className="space-y-10">
      <BonusCard 
        img="https://i.ibb.co/B2YPt2J1/B-nus-1.webp"
        bonusNum="Bônus 01"
        title='"Lista de Compras Econômica + Substituições baratas"'
        price="R$ 29,90"
      />
      <BonusCard 
        img="https://i.ibb.co/5g2gC5bM/B-nus-2.webp"
        bonusNum="Bônus 02"
        title='"Sobremesas Fit no Pote (zero açúcar)"'
        price="R$ 29,90"
      />
      <BonusCard 
        img="https://i.ibb.co/JR1KkKFN/B-nus-3.webp"
        bonusNum="Bônus 03"
        title='"30 Marmitas Fit p/congelar"'
        price="R$ 29,90"
      />
    </div>
  </Section>
);

const PainPoints = () => (
  <div className="bg-[#1B3022] py-16 px-6">
    <div className="max-w-2xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 leading-tight">
        <span className="text-white">Você</span> <span className="text-[#F4B400]">Passa por Isso?</span>
      </h2>
      
      <div className="space-y-6 mb-12 max-w-lg mx-auto">
        {[
          "Preguiça de preparar café da manhã todo dia.",
          "Falta de opções saudáveis de café da manhã.",
          "Deixa de tomar café da manhã alguns dias da semana.",
          "Cansou de só pão e ovo.",
          "Já come saudável, mas às vezes falha no café."
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <div className="shrink-0 mt-1">
              <X size={24} className="text-[#E53935]" />
            </div>
            <p className="font-bold text-white text-lg md:text-xl leading-snug">{item}</p>
          </div>
        ))}
      </div>
      
      <p className="text-center text-2xl md:text-3xl font-bold tracking-widest text-[#F4B400] animate-pulse uppercase">
        ENTÃO VOCÊ PRECISA DISSO:
      </p>
    </div>
  </div>
);

const OfferBlock = () => {
  const [timeLeft, setTimeLeft] = useState(16 * 60);
  const timerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        setStarted(true);
      }
    }, { threshold: 0.1 });

    if (timerRef.current) {
      observer.observe(timerRef.current);
    }

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [started, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Section id="oferta" className="scroll-mt-10 bg-[#FFFFFF]">
      <div className="bg-[#FDFBF7] rounded-[40px] p-8 md:p-12 shadow-[0_20px_60px_rgba(47,125,50,0.12)] border border-[#2F7D32]/10 relative overflow-hidden flex flex-col items-center">
        <div className="mb-12 scale-125 md:scale-150 transform transition-transform duration-700 hover:scale-[1.55]">
          <img src="https://i.ibb.co/27HPPVZB/7.webp" alt="Mockup do Guia" className="w-full h-auto drop-shadow-2xl" />
        </div>
        
        <div className="space-y-4 mb-10 w-full max-w-sm mx-auto">
          <div className="flex gap-3 items-start">
            <CheckCircle2 className="text-[#2F7D32] shrink-0" size={22} /> 
            <span className="font-bold text-[#2F7D32] text-base md:text-lg leading-tight">+30 Receitas de Cafés da Manhã no Pote</span>
          </div>
          <div className="flex gap-3 items-center">
            <CheckCircle2 className="text-[#2F7D32] shrink-0" size={22} /> 
            <span className="font-bold text-[#2F7D32] text-base md:text-lg">Lista de Compras Econômica</span>
          </div>
          <div className="flex gap-3 items-center">
            <CheckCircle2 className="text-[#2F7D32] shrink-0" size={22} /> 
            <span className="font-bold text-[#2F7D32] text-base md:text-lg">Sobremesas Fit no Pote</span>
          </div>
          <div className="flex gap-3 items-center">
            <CheckCircle2 className="text-[#2F7D32] shrink-0" size={22} /> 
            <span className="font-bold text-[#2F7D32] text-base md:text-lg">30 Marmitas Fit P/Congelar</span>
          </div>
        </div>

        <div className="text-center mb-10">
          <p className="text-[#7A7A7A] line-through text-xl mb-1">De R$99,90</p>
          <p className="text-sm font-bold text-[#B45309] uppercase tracking-widest mb-2">POR APENAS</p>
          <p className="text-7xl font-bold text-[#34A853] tracking-tighter">R$27,00</p>
        </div>

        <div className="w-full mb-8 max-w-md mx-auto">
          <Button href={CHECKOUT_URL} className="py-5 shadow-[#2F7D32]/40">
            QUERO COMPRAR AGORA
          </Button>
        </div>

        <div ref={timerRef} className="text-center mb-10">
          <p className="text-[#E53935] font-bold text-sm sm:text-base flex items-center justify-center gap-2">
            <Clock size={18} /> ESSA OFERTA EXPIRA EM {formatTime(timeLeft)}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-semibold text-[#8C9BA5] tracking-tight pt-6 border-t border-gray-100 w-full">
          <ShieldCheck size={20} className="text-[#A1B1BC] shrink-0" />
          <span className="whitespace-nowrap">Compra 100% Segura • 7 Dias de Garantia</span>
        </div>
      </div>
    </Section>
  );
};

const Expert = () => (
  <Section className="bg-[#F6F3ED]">
    <div className="text-center mb-8">
      <div className="max-w-[320px] mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-6">
        <img 
          src="https://i.ibb.co/Df8Nw2qJ/EXPERT.webp" 
          alt="Laura Freitas" 
          className="w-full h-auto object-cover" 
        />
      </div>
      <h2 className="text-2xl font-bold text-[#2F7D32] mb-1">
        QUEM SOU EU?
      </h2>
      <h3 className="text-xl font-bold text-[#1B3022]">Overnight Oats da Laura</h3>
    </div>
    <div className="space-y-4 text-[#4A4A4A] leading-relaxed text-sm sm:text-base font-normal">
      <p>Meu nome é Laura Freitas e, por muito tempo, café da manhã era um problema pra mim. Eu acordava sem tempo, comia qualquer coisa e sentia fome rápido ou simplesmente pulava essa refeição… E isso bagunçava todo o resto do meu dia. Eu tentava me organizar, tentava ‘comer melhor’, mas sempre desistia depois de alguns dias.</p>
      <p>Tudo começou a mudar quando descobri uma forma simples de deixar meus cafés da manhã prontos com antecedência, práticos, saudáveis, gostosos e que realmente saciam.</p>
      <p>Não foi força de vontade que resolveu. Foi organização.</p>
      <p>Quando comecei a deixar meus cafés prontos em potes, parei de pular refeições, parei de comer besteira por falta de tempo e finalmente consegui manter constância sem sofrimento. E o melhor: são tão gostosos que parecem sobremesa, mas trabalham a favor do meu corpo e dos meus objetivos.</p>
    </div>
    <div className="mt-10 max-w-md mx-auto">
      <Button href={CHECKOUT_URL} className="py-5 shadow-[#2F7D32]/40">
        QUERO COMPRAR AGORA
      </Button>
    </div>
  </Section>
);

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const images = [
    "https://i.ibb.co/gbX0sd3v/Dep-1.webp",
    "https://i.ibb.co/TM1rnzZp/Dep-2.webp",
    "https://i.ibb.co/1GXZnFrd/Dep-3.webp",
    "https://i.ibb.co/HpH6VyPV/Dep-4.webp",
    "https://i.ibb.co/TDBMnxBh/Dep-5.webp"
  ];

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.95;
      scrollRef.current.scrollTo({
        left: dir === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Section className="bg-[#F6F3ED] overflow-hidden pt-2 pb-10">
      <h2 className="text-2xl font-bold text-center mb-8 text-[#2F7D32] leading-snug">
        Eu <Highlight>recebo</Highlight> mensagens como essas todo dia, e logo será <Highlight>você</Highlight> me enviando mensagens assim <Highlight>também</Highlight>!
      </h2>
      
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 hide-scrollbar pb-8 px-2"
        >
          {images.map((img, idx) => (
            <div key={idx} className="shrink-0 w-[96%] snap-center rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-[#6BCB77]/15 shake-hint">
              <img src={img} alt={`Depoimento ${idx+1}`} className="w-full h-auto object-contain max-h-[850px]" />
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => scroll('left')} 
          className="absolute left-1 top-1/2 -translate-y-1/2 p-4 bg-white/95 rounded-full shadow-2xl text-[#2F7D32] active:scale-90 transition-transform z-10 border border-[#2F7D32]/10"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={() => scroll('right')} 
          className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-white/95 rounded-full shadow-2xl text-[#2F7D32] active:scale-90 transition-transform z-10 border border-[#2F7D32]/10"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </Section>
  );
};

const FAQItem = ({ q, a }: { q: string, a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#6BCB77]/20 py-5">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left gap-4"
      >
        <span className="font-bold text-lg text-[#1C1C1C]">{q}</span>
        <ChevronDown className={`shrink-0 text-[#2F7D32] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-[#4A4A4A] leading-relaxed font-normal">{a}</p>
      </div>
    </div>
  );
};

const FAQ = () => (
  <Section className="bg-[#F6F3ED]">
    <h2 className="text-3xl font-bold text-center mb-10 text-[#2F7D32]">
      <Highlight>Dúvidas Frequentes</Highlight>
    </h2>
    <div className="divide-y divide-[#6BCB77]/20">
      <FAQItem 
        q="Como recebo minhas receitas?" 
        a="Assim que o pagamento for confirmado, o seu acesso será enviado imediatamente para o seu e-mail. Qualquer dúvida, é só entrar em contato pelo e-mail de suporte."
      />
      <FAQItem 
        q="O curso tem garantia?" 
        a="Sim! Você tem 7 dias de garantia incondicional para testar as receitas. Se não gostar por qualquer motivo, é só pedir o reembolso e devolvemos 100% valor investido. Simples assim."
      />
      <FAQItem 
        q="Preciso de potes especiais?" 
        a="Não precisa! Qualquer pote que você já tem em casa funciona perfeitamente. Pode ser de plástico, de vidro, grande ou pequeno. O importante é que feche bem para manter o overnight oat fresco"
      />
      <FAQItem 
        q="Quanto tempo dura o café no pote na geladeira?" 
        a="Quando montado corretamente seguindo o método das camadas que eu ensino, o café no pote dura de 5 a 7 dias fresquinho na geladeira."
      />
      <FAQItem 
        q="Posso vender café da manhã no pote? Quanto posso cobrar?" 
        a="Pode sim! Muitas alunas usam as receitas para vender e gerar renda extra. Dependendo da sua região e dos ingredientes, cafés da manhã no pote são vendidos entre R$ 11 e R$ 20 por pote (às vezes até mais)."
      />
      <FAQItem 
        q="As receitas são fáceis de fazer?" 
        a="Super fáceis e extremamente rápidas, sem nem precisar cozinhar nada! Todas as receitas têm instruções claras e passo a passo simples."
      />
      <FAQItem 
        q="Os ingredientes são fáceis de encontrar?" 
        a="Sim! Todas as receitas usam ingredientes simples e acessíveis que você encontra em qualquer supermercado."
      />
      <FAQItem 
        q="Preciso de ter balança ou utensílios específicos?" 
        a="Não precisa de nada disso. Você só precisa de potes, colheres, uma faca e uma tábua de corte."
      />
    </div>
    <div className="mt-12 max-w-md mx-auto">
      <Button href={CHECKOUT_URL} className="py-5 shadow-[#2F7D32]/40">
        QUERO COMPRAR AGORA
      </Button>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="bg-[#1C1C1C] text-white/50 py-10 px-6 text-center text-sm font-normal">
    <div className="max-w-2xl mx-auto space-y-4">
      <p>© 2024 Overnight Oats da Laura. Todos os direitos reservados.</p>
      <div className="flex justify-center gap-6">
        <a href="#" className="hover:text-white transition-colors">Políticas de Privacidade</a>
        <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
      </div>
      <p className="text-xs mt-6 border-t border-white/10 pt-6">
        Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site. Fazemos todos os esforços para indicar claramente e mostrar provas reais de resultados.
      </p>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#F6F3ED]">
      <TopBanner />
      <Hero />
      <WhatYouFind />
      <Testimonials />
      <Recipes />
      <Benefits />
      <ExtraLesson />
      <Bonus />
      <PainPoints />
      <OfferBlock />
      <Expert />
      <FAQ />
      <Footer />
    </div>
  );
}
