import React, { useState } from "react";
import PropTypes from "prop-types";
import FormInput from "./components/FormInput";
import TableDataCategories from "../../components/TableDataCategories/TableDataCategories";
import "../../components/TableDataCategories/js/main";
import firebase from "../../utils/firebase";
import { v4 as uuidv4 } from "uuid";

import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  update,
  child,
} from "firebase/database";
CategoriesPage.propTypes = {};

function CategoriesPage(props) {
  const [openForm, setOpenForm] = useState(false);
  // const [formValue, setFormValue] = useState({});
  const handleClickOpenForm = () => {
    setOpenForm((x) => !x);
  };

  const handleAddBtn = (formValue) => {
    // setFormValue({
    //   category_name: formValue.category_name.trim(),
    //   status: formValue.status.trim(),
    // });

    const db = getDatabase();
    set(ref(db, "categories/" + uuidv4()), {
      ...formValue,
      category_name: formValue.category_name.trim(),
      status: formValue.status.trim(),
    });
  };

  const handleEditClick = (categoryId) => {
    console.log(categoryId);
    const db = getDatabase();

    const categoryRef = ref(db, "categories");
    // set(ref(db,'/categories/' + categoryId),{})
  };
  return (
    <>
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Categories</h1>
      </div>
      <div className="row">
        <div className="col-lg mb-3">
          {openForm && (
            <>
              <div className="row g-3 mb-2 ">
                <FormInput onChange={handleAddBtn} />
              </div>
            </>
          )}
          <div className="row g-3 mb-2 ">
            <div className="col mt-0 text-end">
              <button
                onClick={handleClickOpenForm}
                type="button"
                className="btn btn-primary"
              >
                New category
              </button>
            </div>
          </div>

          <div className="card shadow mb-4">
            <TableDataCategories
              onClick={handleClickOpenForm}
              onEditClick={handleEditClick}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoriesPage;
