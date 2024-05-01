'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaPaperPlane,
  FaBookmark,
  FaShare,
  FaMapMarker,
  FaArrowLeft,
} from 'react-icons/fa';
import { fetchProperty } from '@/utils/requests';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import Spinner from '@/components/spinner';
import Image from 'next/image';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyImages from '@/components/PropertyImages';



const PropertyPage = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
    if (!id) return;
    try {
      const property = await fetchProperty(id);
      setProperty(property);
    } catch (error) {
      console.error('Error fetching property data:', error);
    } finally {
      setLoading(false); 
    }
  };

  if (property === null) {
    fetchPropertyData();
  }
  
  }, [id, property]);

  if (!property && !loading)
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );

  return (
  <>
    { loading && <Spinner loading={loading } />}
    {!loading && property && (<>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
              <div className='container m-auto py-6 px-6'>
                <Link
                  href='/properties'
                  className='text-blue-500 hover:text-blue-600 flex items-center'
                >
                  <i className='fas fa-arrow-left mr-2'></i> Back to Properties
                </Link>
              </div>
            </section>

            <section className='bg-blue-50'>
            <div className='container m-auto py-10 px-6'>
              <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                
                <PropertyDetails property={property} />
                
                <aside className='space-y-4'>
                  <div>
                    <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
                      <FaBookmark className='mr-2' />
                      Bookmark Property
                    </button>
                  </div>
                  <div>
                    <button className='bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
                      <FaShare className='mr-2' /> Share Property
                    </button>
                  </div>

                  {/* <!-- Contact Form --> */}
                  <div className='bg-white p-6 rounded-lg shadow-md'>
                    <h3 className='text-xl font-bold mb-6'>
                      Contact Property Manager
                    </h3>
                    <form
                      action='mailto:support@traversymedia.com'
                      method='post'
                      encType='text/plain'
                    >
                      <div className='mb-4'>
                        <label
                          className='block text-gray-700 text-sm font-bold mb-2'
                          htmlFor='email'
                        >
                          Email:
                        </label>
                        <input
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          id='email'
                          type='email'
                          placeholder='Enter your email'
                        />
                      </div>
                      <div className='mb-4'>
                        <label
                          className='block text-gray-700 text-sm font-bold mb-2'
                          htmlFor='message'
                        >
                          Message:
                        </label>
                        <textarea
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
                          id='message'
                          placeholder='Enter your message'
                        ></textarea>
                      </div>
                      <div>
                        <button
                          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
                          type='submit'
                        >
                          <FaPaperPlane className='mr-2' /> Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />


      </>)
      }</>);
};

export default PropertyPage;