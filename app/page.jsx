
import Hero from '../components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/utils/requests';

const HomePage = async () => {
  const properties = await fetchProperties();

  const randomProperties = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  return (
    <>
      <Hero />
      <InfoBoxes />
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
            Recent Properties
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {randomProperties.map((property, index) => (
              <PropertyCard property={property} key={index} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
