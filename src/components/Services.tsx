

const Services = () => {
  const servicesList = [
    {
      title: "Cobertura en Rodadas",
      description: "Fotografía dinámica en salidas grupales. Capturo la acción, la velocidad y la camaradería del asfalto.",
      icon: (
        <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 22V12h6v10" />
        </svg>
      )
    },
    {
      title: "Sesiones Personalizadas",
      description: "Fotos de tu moto en el escenario que elijas. Iluminación profesional y un estilo agresivo.",
      icon: (
        <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Colaboraciones",
      description: "Para marcas, pilotos, refaccionarias o eventos que quieran contenido visual de alto impacto.",
      icon: (
        <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#0a0a0a] relative border-t border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl text-white font-display mb-4">¿Qué <span className="text-accent">Ofrezco?</span></h2>
          <p className="text-gray-400 font-body text-lg">Servicios profesionales para que tú y tu máquina destaquen.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div 
              key={index} 
              className="bg-[#111] border border-white/10 p-10 hover:border-accent/50 hover:bg-[#151515] transition-all duration-300 group"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 origin-left">
                {service.icon}
              </div>
              <h3 className="text-2xl text-white font-display mb-4 uppercase tracking-wide">{service.title}</h3>
              <p className="text-gray-400 font-body leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="#contacto" className="inline-block bg-white text-base font-display text-lg px-8 py-3 uppercase tracking-widest hover:bg-accent hover:text-white transition-colors duration-300">
            Hablemos de tu Proyecto
          </a>
        </div>

      </div>
    </section>
  );
};

export default Services;
