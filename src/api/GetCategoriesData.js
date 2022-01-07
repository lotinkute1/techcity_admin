import { useEffect, useState } from "react";
import Firebase from "../features/Firebase/Firebase";
import {
  getDatabase,
  ref,
  push,
  child,
  onValue,
  get,
  limitToLast,
  query,
  equalTo,
  orderByChild,
} from "firebase/database";

function GetCategoriesData(categoryID = "") {
  const db = getDatabase();
  const [proData, setProData] = useState([]);
  //   child(dbRef, `/${productsType}`)
  useEffect(() => {
    try {
      onValue(ref(db, "/categories"), (snapshot) => {
        if (snapshot.exists()) {
          let temp = [];
          snapshot.forEach((item) => {
            if (item.key.search(categoryID) >= 0) {
              temp.push({
                id: item.key,
                ...item.val(),
              });
            }
          });
          setProData(temp);
        } else {
          console.log("No data available");
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, [categoryID]);

  return proData;
}
export default GetCategoriesData;
