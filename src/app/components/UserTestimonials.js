import { Star, Quote } from "lucide-react";
import Image from "next/image";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Alex Rodriguez",
      location: "Mumbai, India",
      rating: 5,
      review:
        "MotoPulse saved me hours of searching! Found a trusted mechanic nearby who fixed my Royal Enfield perfectly. The booking system is seamless.",
      image: "/user1image.jpg",
      bike: "Royal Enfield Classic 350",
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Bangalore, India",
      rating: 5,
      review:
        "Best motorcycle service app! Quick service, transparent pricing, and excellent communication. My Yamaha runs like new after their maintenance.",
      image: "/user2image.jpg",
      bike: "Yamaha MT-15",
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      location: "Delhi, India",
      rating: 5,
      review:
        "Professional service at fair prices. The mechanics are skilled and honest. MotoPulse has become my go-to for all motorcycle needs.",
      image: "/user4image.jpeg",
      bike: "Honda CB Hornet 160R",
    },
    {
      id: 4,
      name: "Sneha Patel",
      location: "Pune, India",
      rating: 4,
      review:
        "Great experience! Emergency breakdown service was quick and efficient. The app made everything so convenient during a stressful situation.",
      image: "/user3image.webp",
      bike: "TVS Apache RTR 200",
    },
  ];

  const partners = [
    { name: "Hero MotoCorp", logo: "/herologo.jpg" },
    { name: "Bajaj Auto", logo: "/bajajlogo.png" },
    { name: "TVS Motor", logo: "/tvslogo.png" },
    { name: "Honda", logo: "/hondalogo.png" },
    { name: "Yamaha", logo: "/yamahalogo.jpg" },
    { name: "Royal Enfield", logo: "/relogo.png" },
    { name: "KTM", logo: "/ktmlogo.png" },
    { name: "Suzuki", logo: "/suzukilogo.png" },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "fill-red-500 text-red-500" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="text-red-500">Riders</span> Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of satisfied motorcycle owners who trust MotoPulse
            for their service needs
          </p>
          <div className="mt-8 flex justify-center items-center space-x-8 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">50K+</div>
              <div className="text-sm text-gray-400">Happy Riders</div>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">4.9</div>
              <div className="text-sm text-gray-400">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">1M+</div>
              <div className="text-sm text-gray-400">Services Completed</div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-red-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-red-500 mb-4" />

              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Review Text */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                &quot;{testimonial.review}&quot;
              </p>

              {/* User Info */}
              <div className="flex items-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-red-500"
                />
                <div className="ml-4">
                  <h4 className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 text-xs">
                    {testimonial.location}
                  </p>
                  <p className="text-red-500 text-xs font-medium">
                    {testimonial.bike}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-800">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by Leading{" "}
              <span className="text-red-500">Motorcycle Brands</span>
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We&apos;re proud to partner with India&apos;s top motorcycle manufacturers
              and service centers
            </p>
          </div>

          {/* Partner Logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center group"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-110 opacity-70 hover:opacity-100"
                />
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-black rounded-xl border border-gray-800">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">
                Certified Mechanics
              </h4>
              <p className="text-gray-400 text-sm">
                All our partner mechanics are certified and background-verified
                professionals
              </p>
            </div>

            <div className="text-center p-6 bg-black rounded-xl border border-gray-800">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Quote className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">
                Quality Guarantee
              </h4>
              <p className="text-gray-400 text-sm">
                30-day warranty on all services with 100% satisfaction guarantee
              </p>
            </div>

            <div className="text-center p-6 bg-black rounded-xl border border-gray-800">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Secure Payments</h4>
              <p className="text-gray-400 text-sm">
                Safe and secure payment processing with multiple payment options
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
