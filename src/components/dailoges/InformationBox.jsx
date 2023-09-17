import React, { useEffect } from "react";
import "./InformationBox.css";

const InformationBox = ({
  setUpdateDailogOpen,
  onOpenBox,
  setInfo,
  infoList,
  getInfo,
}) => {
  useEffect(() => {
    getInfo();
    // eslint-disable-next-line
  }, []);

  const sortedInfoList = [...infoList].sort((a, b) => a.index - b.index);
  return (
    <div className="information-box-container">
      <div className="information-box">
        <ol>
          <h2>Information section</h2>
          {sortedInfoList.map((info) => (
            <li key={info.id}>
              {info.info}
            </li>
          ))}
        </ol>
        <div className="info-box-input">
          <input
            type="text"
            placeholder="Add new info!"
            onChange={(e) => setInfo(e.target.value)}
          />
          <div className="information-box-btns">
            <button
              onClick={setUpdateDailogOpen}
              className="information-box-red-btn"
            >
              Cancel
            </button>
            <button onClick={onOpenBox} className="information-box-green-btn">
              Add info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationBox;
