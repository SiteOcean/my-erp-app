import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';

export const getAllCustomersAndLoads = async () => {
  try {
    
    const querySnapshot = await getDocs(collection(db, 'customers'));
    const customerData = [];
  

    const q = query(collection(db, 'allLoads'), orderBy('timestamp', 'desc'));
    const querySnapshotLoads = await getDocs(q);
  
    const loads = [];
    querySnapshotLoads.forEach((doc) => {
      loads.push({ id: doc.id, ...doc.data() });
    });

    querySnapshot.forEach((doc) => {
      customerData.push({ id: doc.id, customerName:doc.data().customerName ,
        totalAmount:doc.data().totalAmount, totalReceived: doc.data().totalReceived,
        totalOutstanding:doc.data().totalOutstanding
      });
    });


    return {customerData, loads};
  } catch (error) {
    console.error('Error fetching customers:', error);
    return []; // Return empty array or handle error as needed
  }
};

