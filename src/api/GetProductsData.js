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

function GetProductsData(categoryID = "", productsID = "") {
  const db = getDatabase();
  const [proData, setProData] = useState([]);
  //   child(dbRef, `/${productsType}`)

  useEffect(() => {
    // get(query(ref(db, "/products")))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       let temp = [];
    //       snapshot.forEach((item) => {
    //         if (
    //           item.val().category_id.search(categoryID) >= 0 &&
    //           item.key.search(productsID) >= 0
    //         ) {
    //           temp.push({
    //             id: item.key,
    //             ...item.val(),
    //           });
    //         }
    //       });
    //       setProData(temp);
    //     } else {
    //       console.log("No data available");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    try {
      onValue(ref(db, "/products"), (snapshot) => {
        if (snapshot.exists()) {
          let temp = [];
          snapshot.forEach((item) => {
            if (
              item.val().category_id?.search(categoryID) >= 0 &&
              item.key.search(productsID) >= 0
            ) {
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
  }, []);

  return proData;
}

export default GetProductsData;
