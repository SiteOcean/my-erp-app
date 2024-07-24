import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from '../../firebase';

const getLoadsById = async (loadId) => {
  const q = query(collection(db, 'allLoads'), orderBy('timestamp', 'asc'));
  const querySnapshotLoads = await getDocs(q);

  let loadDetail = [];

  querySnapshotLoads.forEach((doc) => {
  
    if(loadId === doc.data().id){
    loadDetail.push({ id: doc.id,...doc.data() });
    } 
  });

  return loadDetail;
};
export default getLoadsById
