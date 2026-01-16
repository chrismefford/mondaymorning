import naBeer from "@/assets/na-beer.jpg";
import naWine from "@/assets/na-wine.jpg";
import naOldFashioned from "@/assets/na-old-fashioned.jpg";

interface PolaroidItem {
  image: string;
  label: string;
  rotation: string;
  position: string;
}

const polaroids: PolaroidItem[] = [
  {
    image: naBeer,
    label: "NA Beer",
    rotation: "-rotate-6",
    position: "left-[5%] top-[10%]"
  },
  {
    image: naWine,
    label: "NA Wine", 
    rotation: "rotate-3",
    position: "left-[35%] top-[5%]"
  },
  {
    image: naOldFashioned,
    label: "Old Fashioned",
    rotation: "rotate-6",
    position: "right-[5%] top-[15%]"
  }
];

const PolaroidGallery = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-sage overflow-hidden">
      {/* Background texture overlay */}
      <div className="grain absolute inset-0 z-10 pointer-events-none opacity-50" />
      
      {/* Polaroid cards */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center mb-16">
          <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.3em] text-forest mb-4">
            Our Collection
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl text-forest">
            Zero Proof, <span className="italic text-gold">Full Flavor</span>
          </h2>
        </div>

        {/* Polaroid Grid */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {polaroids.map((item, index) => (
            <div 
              key={item.label}
              className={`
                group relative
                ${item.rotation}
                hover:rotate-0 transition-transform duration-300
                animate-float
              `}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Polaroid frame */}
              <div className="bg-cream p-3 pb-12 border-2 border-forest shadow-brutal">
                {/* Image container */}
                <div className="w-48 h-64 lg:w-56 lg:h-72 overflow-hidden border border-forest/20">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Label */}
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <span className="font-serif text-lg text-forest italic">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PolaroidGallery;
