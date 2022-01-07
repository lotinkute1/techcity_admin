import { useEffect, useState } from "react";
import Firebase from "../features/Firebase/Firebase";
import {
  getDatabase,
  ref,
  onValue,

} from "firebase/database";

function GetRaitingsData(productID = "",userID="") {
  const db = getDatabase();
  const [proData, setProData] = useState([]);
  //   child(dbRef, `/${productsType}`)
  useEffect(() => {
    try {
      onValue(ref(db, "/raitings"), (snapshot) => {
        if (snapshot.exists()) {
          let temp = [];
          snapshot.forEach((item) => {
              
            if (item.val().product_id?.search(productID) >= 0&&item.val().user_id?.search(userID)>=0) {

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
  }, [productID,userID]);

  return proData;
}
export default GetRaitingsData;
