import React, { useState } from "react";
import PropTypes from "prop-types";
import FormInput from "./components/FormInput";
import TableDataCategories from "../../components/TableDataCategories/TableDataCategories";

CategoriesPage.propTypes = {};

function CategoriesPage(props) {
  const [openForm, setOpenForm] = useState(false);
  const handleClick = () => {
    setOpenForm((x) => !x);
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
                <FormInput />
              </div>
            </>
          )}
          <div className="row g-3 mb-2 ">
            <div className="col mt-0 text-end">
              <button
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                New category
              </button>
            </div>
          </div>

          <div className="card shadow mb-4">
            <TableDataCategories />
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoriesPage;
