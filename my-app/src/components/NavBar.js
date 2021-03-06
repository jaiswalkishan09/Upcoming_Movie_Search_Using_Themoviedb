import React, { useEffect } from "react";
import home from "../images/home.svg";
import { useSelector, useDispatch } from "react-redux";
import { addList, searchPageInitial } from "../action";
import { notShowNext, pageInitial, setInput } from "../action";
export default function NavBar() {
  const input = useSelector((state) => state.inputReducer);
  const dispatch = useDispatch();
  const searchPageNo = useSelector((state) => state.searchPageReducer);

  useEffect(async () => {
    try {
      if (input == "") {
        dispatch(pageInitial(1));
        dispatch(searchPageInitial(0));
      }
      if (input != "" && searchPageNo != 0) {
        const response = await fetch(
          `${process.env.REACT_APP_CONFIG_API_SEARCH_MOVIE}?api_key=${process.env.REACT_APP_DOMAIN_API_KEY}&query=${input}%202&page=${searchPageNo}`,
          {
            method: "GET",
          }
        );

        let json_res = await response.json();
        if (json_res) {
          dispatch(addList(json_res));
          dispatch(notShowNext());
          dispatch(pageInitial(0));
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [input, searchPageNo]);

  return (
    <div style={{ marginTop: "20px" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6" style={{ paddingLeft: "0px" }}>
            <div
              className="input-group"
              style={{ backgroundColor: "#DFDFDF", borderRadius: "10px" }}
            >
              <div className="input-group-append">
                <button
                  className="btn  py-2"
                  type="button"
                  onClick={() => {
                    dispatch(searchPageInitial(1));
                  }}
                  style={{ boxShadow: "none" }}
                >
                  <i className="bi bi-search" style={{ color: "#9B9B9B" }}></i>
                </button>
              </div>
              <input
                className="form-control py-2"
                type="search"
                placeholder="Search"
                value={input}
                onChange={(e) => {
                  dispatch(setInput(e.target.value));
                  if (input == "") {
                    dispatch(searchPageInitial(0));
                  } else dispatch(searchPageInitial(1));
                }}
                style={{
                  border: "none",
                  backgroundColor: "#DFDFDF",
                  borderRadius: "7px",
                  boxShadow: "none",
                }}
              />
            </div>
          </div>
          <div className="col-6" style={{ textAlign: "right" }}>
            <img
              onClick={() => window.location.reload(false)}
              src={home}
              style={{ height: "16px", width: "16px", cursor: "pointer" }}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
