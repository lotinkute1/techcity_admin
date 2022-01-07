import React from "react";
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
function GetDiscountsData(dictCountID = "") {
  const db = getDatabase();
  //   const dbRef = ref(db, "/");
  const [proData, setProData] = useState([]);
  //   child(dbRef, `/${productsType}`)

  useEffect(() => {
    // get(query(ref(db, "/discounts")))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       let temp = [];
    //       snapshot.forEach((item) => {
    //         if (item.key.indexOf(dictCountID) >= 0) {
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
      onValue(ref(db, "/discounts"), (snapshot) => {
        if (snapshot.exists()) {
          let temp = [];
          snapshot.forEach((item) => {
            if (item.key.search(dictCountID)>=0&&item.val().status===1) {
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
export default GetDiscountsData;
