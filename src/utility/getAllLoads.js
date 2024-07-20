import { getFirestore, collection, getDocs } from "firebase/firestore";

import { db } from '../../firebase';

const getAllLoads = async () => {
  const querySnapshot = await getDocs(collection(db, 'allLoads'));
  let loadDetail = [];

  querySnapshot.forEach((doc) => {
    loadDetail.push({ id: doc.id,...doc.data().loadData });
  });

  return loadDetail;
};
export default getAllLoads
