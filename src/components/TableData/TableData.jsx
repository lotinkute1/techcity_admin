import React from "react";
import "./fonts/icomoon/style.css";
// import "./css/owl.carousel.min.css";
//  Bootstrap CSS
// import "./css/bootstrap.min.css";
// Style
import "./css/style.css";
// import "./js/popper.min.js";
// import "./js/bootstrap.min.js";
// import "./js/jquery-3.3.1.min.js";
import "./js/main.js";

export default function TableData() {
  return (
    <div className="table-responsive">
      <table className="table table-striped custom-table">
        <thead>
          <tr>
            
            <th scope="col">Order</th>
            <th scope="col">Name</th>
            <th scope="col">Occupation</th>
            <th scope="col">Contact</th>
            <th scope="col">Education</th>
            <th scope="col">status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            
            <td>1392</td>
            <td className="pl-0">
              <div className="d-flex align-items-center">
                <a href="/#" className="name">
                  James Yates
                </a>
              </div>
            </td>
            <td>
              Web Designer
              <small className="d-block">
                Far far away, behind the word mountains
              </small>
            </td>
            <td>+63 983 0962 971</td>
            <td>NY University</td>
            <td>
              <label className="custom-control ios-switch">
                <input
                  type="checkbox"
                  className="ios-switch-control-input"
                  defaultChecked
                />
                <span className="ios-switch-control-indicator" defaultChecked/>
              </label>
            </td>
          </tr>
          <tr className="">
            
            <td>4616</td>
            <td className="pl-0">
              <div className="d-flex align-items-center">
                <a href="/#" className="name">
                  Matthew Wasil
                </a>
              </div>
            </td>
            <td>
              Graphic Designer
              <small className="d-block">
                Far far away, behind the word mountains
              </small>
            </td>
            <td>+02 020 3994 929</td>
            <td>London College</td>
            <td>
              <label className="custom-control ios-switch">
                <input
                  type="checkbox"
                  className="ios-switch-control-input"
                  defaultChecked
                />
                <span className="ios-switch-control-indicator" />
              </label>
            </td>
          </tr>
          <tr>
            
            <td>9841</td>
            <td className="pl-0">
              <div className="d-flex align-items-center">
                <a href="/#" className="name">
                  Sampson Murphy
                </a>
              </div>
            </td>
            <td>
              Mobile Dev
              <small className="d-block">
                Far far away, behind the word mountains
              </small>
            </td>
            <td>+01 352 1125 0192</td>
            <td>Senior High</td>
            <td>
              <label className="custom-control ios-switch">
                <input type="checkbox" className="ios-switch-control-input" defaultChecked/>
                <span className="ios-switch-control-indicator" />
              </label>
            </td>
          </tr>
          <tr>
            
            <td>9548</td>
            <td className="pl-0">
              <div className="d-flex align-items-center">
                <a href="/#" className="name">
                  Gaspar Semenov
                </a>
              </div>
            </td>
            <td>
              Illustrator
              <small className="d-block">
                Far far away, behind the word mountains
              </small>
            </td>
            <td>+92 020 3994 929</td>
            <td>College</td>
            <td>
              <label className="custom-control ios-switch">
                <input type="checkbox" className="ios-switch-control-input" defaultChecked/>
                <span className="ios-switch-control-indicator" />
              </label>
            </td>
          </tr>
          <tr className="">
            
            <td>4616</td>
            <td className="pl-0">
              <div className="d-flex align-items-center">
                <a href="/#" className="name">
                  Matthew Wasil
                </a>
              </div>
            </td>
            <td>
              Graphic Designer
              <small className="d-block">
                Far far away, behind the word mountains
              </small>
            </td>
            <td>+02 020 3994 929</td>
            <td>London College</td>
            <td>
              <label className="custom-control ios-switch">
                <input
                  type="checkbox"
                  defaultChecked
                  className="ios-switch-control-input"
                />
                <span className="ios-switch-control-indicator" defaultChecked/>
              </label>
            </td>
          </tr>
          <tr className="">
            
            <td>9841</td>
            <td className="pl-0">
              <div className="d-flex align-items-center">
                <a href="/#" className="name">
                  Sampson Murphy
                </a>
              </div>
            </td>
            <td>
              Mobile Dev
              <small className="d-block">
                Far far away, behind the word mountains
              </small>
            </td>
            <td>+01 352 1125 0192</td>
            <td>Senior High</td>
            <td>
              <label className="custom-control ios-switch">
                <input
                  type="checkbox"
                  defaultChecked
                  className="ios-switch-control-input"
                />
                <span className="ios-switch-control-indicator" defaultChecked/>
              </label>
            </td>
          </tr>
          <tr>
            
            <td>9548</td>
            <td className="pl-0">
              <div className="d-flex align-items-center">
                <a href="/#" className="name">
                  Gaspar Semenov
                </a>
              </div>
            </td>
            <td>
              Illustrator
              <small className="d-block">
                Far far away, behind the word mountains
              </small>
            </td>
            <td>+92 020 3994 929</td>
            <td>College</td>
            <td>
              <label className="custom-control ios-switch">
                <input type="checkbox" className="ios-switch-control-input" defaultChecked/>
                <span className="ios-switch-control-indicator" />
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
