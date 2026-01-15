import { Instagram as InstagramIcon, MapPin } from "lucide-react";

const instagramImages = [
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
    alt: "San Diego beach sunrise",
  },
  {
    src: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80",
    alt: "Cocktail at golden hour",
  },
  {
    src: "https://images.unsplash.com/photo-1473116763249-2fce8e5c4e4e?w=400&q=80",
    alt: "Beach bonfire vibes",
  },
  {
    src: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&q=80",
    alt: "Refreshing drinks",
  },
  {
    src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80",
    alt: "Ocean waves",
  },
  {
    src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80",
    alt: "Morning wellness",
  },
];

const Instagram = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-sans text-sm">San Diego, California</span>
          </div>
          
          <a 
            href="#" 
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-foreground hover:text-primary transition-colors story-link"
          >
            <InstagramIcon className="h-5 w-5" />
            @mondaymorningaf
          </a>
          
          <h2 className="font-serif text-4xl lg:text-5xl font-medium mt-4">
            Follow the sunrise
          </h2>
          <p className="font-sans text-muted-foreground mt-2">
            Tag us for a chance to be featured
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-4">
          {instagramImages.map((image, index) => (
            <a
              key={index}
              href="#"
              className="aspect-square rounded-xl overflow-hidden group relative"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                <InstagramIcon className="h-8 w-8 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instagram;
