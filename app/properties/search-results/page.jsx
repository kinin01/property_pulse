'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();

  const location = searchParams.get('location');
  const propertyType = searchParams.get('propertyType');

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          console.log(data);
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [location, propertyType]);

  return <div>SearchResultsPage</div>;
};