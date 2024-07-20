import { getFirestore, collection, getDocs } from "firebase/firestore";

import { db } from '../../firebase';

const getLoadsById = async (loadId) => {
  const querySnapshot = await getDocs(collection(db, 'allLoads'));
  let loadDetail = [];

  querySnapshot.forEach((doc) => {
  
    if(loadId === doc.data().loadData.id){
    loadDetail.push({ id: doc.id,...doc.data().loadData });
    } 
  });

  return loadDetail;
};
export default getLoadsById
