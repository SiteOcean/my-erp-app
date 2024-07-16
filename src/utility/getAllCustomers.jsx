import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export const getAllCustomers = async () => {
  try {
  
    const querySnapshot = await getDocs(collection(db, 'customers'));
    const studentData = [];

    querySnapshot.forEach((doc) => {
      studentData.push({ id: doc.id, name:doc.data().customer.name });
    });

  

    return studentData;
  } catch (error) {
    console.error('Error fetching customers:', error);
    return []; // Return empty array or handle error as needed
  }
};

