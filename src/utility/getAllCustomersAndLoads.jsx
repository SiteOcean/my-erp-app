import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export const getAllCustomersAndLoads = async () => {
  try {
    
    const querySnapshot = await getDocs(collection(db, 'customers'));

    const querySnapshotAllLoads = await getDocs(collection(db, 'allLoads'));
    const customerData = [];
    let loads = [];
    
    querySnapshotAllLoads.forEach((doc)=>{
      loads.push({...doc.data()})
    })
    querySnapshot.forEach((doc) => {
      customerData.push({ id: doc.id, name:doc.data().name ,
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

