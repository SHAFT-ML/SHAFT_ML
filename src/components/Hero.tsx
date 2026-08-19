

const Hero = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero.png" 
          alt="SHAFT ML Photography" 
          className="w-full h-full object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base/20 via-base/60 to-base"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display text-white mb-2 tracking-tighter drop-shadow-2xl">
          SHAFT <span className="text-accent">ML</span>
        </h1>
        <h2 className="text-xl md:text-3xl text-gray-300 font-display tracking-widest mb-6">
          Fotografía Deportiva 4K
        </h2>
        <p className="text-lg md:text-xl text-gray-400 font-body mb-10 max-w-2xl mx-auto">
          "Porque cada curva merece ser eterna. Capturando el pulso de la calle y la adrenalina del asfalto."
        </p>
        <a 
          href="#galeria" 
          className="inline-block bg-accent text-white font-display text-xl px-10 py-4 rounded-sm uppercase tracking-widest hover:bg-white hover:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,107,0,0.5)] cursor-pointer"
        >
          Explorar el Asfalto
        </a>
      </div>
    </section>
  );
};

export default Hero;
