import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import TestimonialsSection from "./components/UserTestimonials";


export default function Home() {
  return (
    <>
    <HeroSection/>
    <FeaturesSection/>
    <TestimonialsSection/>
    </>
  )

}
// # Note

// Here currently using all static data already so there is no need of getStaticProps here if you want to add real user testimonial and 
// want it to be static you can use getStaticProps method and use fetched data as props like :

// export async function getStaticProps() {
//   const res = await fetch("https://api.example.com/testimonials");
//   const testimonials = await res.json();

//   return {
//     props: { testimonials },
//   };
// }

// export default function Home({ testimonials }) {
//   return (
//     <>
//       <HeroSection />
//       <FeaturesSection />
//       <TestimonialsSection data={testimonials} />
//     </>
//   );
// }
