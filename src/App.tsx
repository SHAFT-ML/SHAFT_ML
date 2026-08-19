import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';

function App() {
  return (
    <div className="bg-base min-h-screen text-white font-body selection:bg-accent selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
      </main>
      
      {/* Footer */}
      <footer id="contacto" className="bg-[#030303] py-12 border-t border-accent/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-display text-white mb-6">SHAFT <span className="text-accent">ML</span></h2>
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://instagram.com/el_de_la_n160_" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-accent transition-colors">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-accent transition-colors">
              WhatsApp
            </a>
          </div>
          <p className="text-gray-600 text-sm font-body">
            &copy; {new Date().getFullYear()} SHAFT ML - Fotografía Deportiva. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
