import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the import path based on your project structure
import NavBar from '@/components/navBar';

const ViewCustomer = () => {
  const router = useRouter();
  const { id } = router.query;
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const docRef = doc(db, 'customers', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const customerData = docSnap.data().customer;
          setCustomer(customerData);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);


  return (
    <div>
      <NavBar/>
      {customer ? 
      <div>
        <h2>Customer Details</h2>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Mobile:</strong> {customer.mobile}</p>
      <p><strong>Address:</strong> {customer.address}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      </div>
      : <div>Loading...</div>}
      
    </div>
  );
};

export default ViewCustomer;
