import dynamic from "next/dynamic";
import HeroSection from "./components/HeroSection";
import Spinner from "./components/Spinner";

// this is like React lazy loading and Suspense for the components so that the components are loaded only when they are needed

const FeaturesSection = dynamic(() => import("./components/FeaturesSection"), {
  loading: () => <Spinner />,
});
const TestimonialsSection = dynamic(
  () => import("./components/UserTestimonials"),
  {
    loading: () => <Spinner />,
  }
);

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
    </>
  );
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
