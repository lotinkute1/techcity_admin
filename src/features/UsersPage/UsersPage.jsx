import React from "react";
import TableData from "../../components/TableData/TableData";
export default function UsersPage() {
  return (
    <>
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Users</h1>
      </div>
      <div className="row">
        <div className="col-lg mb-2">
          <div className="card shadow mb-4">
            <TableData/>
          </div>
        </div>
      </div>
    </>
  );
}
