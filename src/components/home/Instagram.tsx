import { Instagram as InstagramIcon, MapPin } from "lucide-react";
import igNews from "@/assets/instagram/ig-news.png";
import igFriendsCheers from "@/assets/instagram/ig-friends-cheers.png";
import igBeerShelf from "@/assets/instagram/ig-beer-shelf.png";
import igStorefront from "@/assets/instagram/ig-storefront.png";
import igAmethyst from "@/assets/instagram/ig-amethyst.png";
import igShopInterior from "@/assets/instagram/ig-shop-interior.png";

const instagramImages = [
  { src: igStorefront, alt: "Monday Morning Bottle Shop storefront" },
  { src: igFriendsCheers, alt: "Friends cheersing with NA cocktails" },
  { src: igBeerShelf, alt: "NA beer selection on shelves" },
  { src: igAmethyst, alt: "Amethyst botanical spirits lineup" },
  { src: igNews, alt: "NA industry news" },
  { src: igShopInterior, alt: "Inside Monday Morning bottle shop" },
];

const Instagram = () => {
  return (
    <section className="py-12 lg:py-32 bg-ocean/10">
      <div className="lg:container lg:mx-auto lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-12 px-4 lg:px-0">
          <div className="inline-flex items-center gap-2 text-ocean mb-4 lg:mb-5 mr-6 lg:mr-8">
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
