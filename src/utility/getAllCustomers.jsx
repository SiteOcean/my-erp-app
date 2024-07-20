import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export const getAllCustomers = async () => {
  try {
    
    const querySnapshot = await getDocs(collection(db, 'customers'));

    const querySnapshotAllLoads = await getDocs(collection(db, 'allLoads'));
    const studentData = [];
let loads = [];
querySnapshotAllLoads.forEach((doc)=>{
  loads.push({...doc.data().loadData})
})
    querySnapshot.forEach((doc) => {
      studentData.push({ id: doc.id, name:doc.data().customer.name ,
        totalAmount:doc.data().customer.totalAmount, totalReceived: doc.data().customer.totalReceived,
        totalOutstanding:doc.data().customer.totalOutstanding
      });
    });


    return {studentData, loads};
  } catch (error) {
    console.error('Error fetching customers:', error);
    return []; // Return empty array or handle error as needed
  }
};

