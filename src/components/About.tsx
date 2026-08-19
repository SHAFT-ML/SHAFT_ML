

const About = () => {
  return (
    <section id="about" className="py-24 bg-base relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 before:content-[''] before:absolute before:-inset-4 before:border-2 before:border-accent/30 before:z-[-1] before:translate-x-4 before:translate-y-4">
              <img 
                src="/about.png" 
                alt="SHAFT ML Detrás del lente" 
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
              />
            </div>
            {/* Decals */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 font-display text-accent/10 text-9xl select-none z-0">
              N160
            </div>
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1 w-12 bg-accent"></div>
              <h2 className="text-4xl md:text-6xl text-white font-display">Detrás del <span className="text-accent">Lente</span></h2>
            </div>
            
            <p className="text-gray-400 text-lg md:text-xl font-body leading-relaxed mb-6">
              Soy <span className="text-white font-bold">SHAFT ML</span>, fotógrafo deportivo especializado en capturar la adrenalina y la pasión del mundo de las motos. Mi objetivo no es solo tomar fotos, es contar historias de velocidad, esfuerzo y comunidad.
            </p>
            <p className="text-gray-400 text-lg md:text-xl font-body leading-relaxed mb-10">
              Colaboro en rodadas urbanas, salidas nocturnas y eventos de pista para que tú y tu moto luzcan como nunca. Si te mueve la velocidad, te entiendo. <span className="text-accent">Y te fotografío.</span>
            </p>

            <a 
              href="https://instagram.com/el_de_la_n160_" 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 border-2 border-white/20 text-white font-display text-lg px-8 py-3 uppercase tracking-widest hover:border-accent hover:text-accent transition-colors duration-300"
            >
              Sígueme en Instagram
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
