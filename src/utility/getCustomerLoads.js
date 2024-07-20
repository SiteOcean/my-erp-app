import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the import path based on your project structure

const getCustomerLoads = async (customerId) => {
  try {
    const customerRef = doc(db, 'customers', customerId);
    const customerDoc = await getDoc(customerRef);

    if (customerDoc.exists()) {
      const loadsData = customerDoc.data().loads || []; // Get loads array or initialize as empty array
      return loadsData;
    } else {
      console.log('No such document!');
      return [];
    }
  } catch (error) {
    console.error('Error fetching customer loads:', error);
    return []; // Return empty array or handle error as needed
  }
};

export default getCustomerLoads;
