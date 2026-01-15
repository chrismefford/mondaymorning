import { Instagram as InstagramIcon } from "lucide-react";

const instagramImages = [
  "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80",
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
  "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&q=80",
  "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80",
  "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80",
];

const Instagram = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <InstagramIcon className="h-5 w-5" />
            @mondaymorningaf
          </a>
          <h2 className="font-serif text-4xl lg:text-5xl font-medium mt-4">
            Join the community
          </h2>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-4">
          {instagramImages.map((image, index) => (
            <a
              key={index}
              href="#"
              className="aspect-square rounded-lg overflow-hidden group"
            >
              <img
                src={image}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instagram;
