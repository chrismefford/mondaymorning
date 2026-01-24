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
    src: "/images/beach-bonfire.jpg",
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
    <section className="py-12 lg:py-32 bg-ocean/10">
      <div className="lg:container lg:mx-auto lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-12 px-4 lg:px-0">
          <div className="inline-flex items-center gap-2 text-ocean mb-3 lg:mb-4">
            <MapPin className="h-3 w-3 lg:h-4 lg:w-4" />
            <span className="font-sans text-xs lg:text-sm font-medium">San Diego, California</span>
          </div>
          
          <a 
            href="https://instagram.com/mondaymorning.af" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-foreground hover:text-ocean transition-colors story-link"
          >
            <InstagramIcon className="h-4 w-4 lg:h-5 lg:w-5" />
            @mondaymorning.af
          </a>
          
          <h2 className="font-serif text-3xl lg:text-5xl font-medium mt-3 lg:mt-4">
            Follow the <span className="italic text-ocean">sunrise</span>
          </h2>
          <p className="font-sans text-sm text-muted-foreground mt-2">
            Tag us for a chance to be featured
          </p>
        </div>

        {/* MOBILE: Horizontal scroll strip - edge to edge */}
        <div className="lg:hidden overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex gap-2 px-4 pb-4">
            {instagramImages.map((image, index) => (
              <a
                key={index}
                href="https://instagram.com/mondaymorning.af"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-32 aspect-square overflow-hidden group relative"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-ocean/0 group-active:bg-ocean/30 transition-colors flex items-center justify-center">
                  <InstagramIcon className="h-6 w-6 text-cream opacity-0 group-active:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* DESKTOP: Grid layout */}
        <div className="hidden lg:grid grid-cols-6 gap-4">
          {instagramImages.map((image, index) => (
            <a
              key={index}
              href="https://instagram.com/mondaymorning.af"
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square rounded-xl overflow-hidden group relative"
            >
              <img
                src={image.src}
                alt={image.alt}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-ocean/0 group-hover:bg-ocean/30 transition-colors duration-300 flex items-center justify-center">
                <InstagramIcon className="h-8 w-8 text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instagram;
