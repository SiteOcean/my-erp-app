import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const getCustomerById = async (customerId) => {
  try {
    const customerRef = doc(db, 'customers', customerId);
    const customerDoc = await getDoc(customerRef);

    if (customerDoc.exists()) {
      const customerData = customerDoc.data();
      return customerData;
    } else {
      console.log('No such document!');
      return [];
    }
  } catch (error) {
    console.error('Error fetching customer loads:', error);
    return []; // Return empty array or handle error as needed
  }
};

export default getCustomerById;
