import React, { useState, useEffect } from "react";
import "./App.css";
import { getAll, getBlock } from "./api";
import { ExportToCsv } from "export-to-csv";

function App() {
  const [date, setDate] = useState(null);
  const [data, setData] = useState([]);
  const [onlyLocked, setOnlyLocked] = useState(false);

  useEffect(() => {
    if (date == null) {
      getAll().then((result) => {
        if (result) {
          // console.log(result);
          setData(result);
        }
      });
    } else {
      console.log(Date.parse(date) / 1000);
      const timestamp = Date.parse(date) / 1000;
      getBlock(timestamp).then((result) => {
        console.log(result);
        setData(result);
      });
    }
  }, [date]);

  const exportToCsv = () => {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: "Locked Events",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: "locked_events",
    };

    let exportData = [];
    data.forEach((item) => {
      const extract = {
        lockId: item.lockId,
        tierId: item.tierId,
        pairId: item.pairId,
        nftCollection: item.nftCollection,
        nftId: item.nftId,
        nftDiscount: item.nftDiscount,
        token1Amount: item.token1Amount,
        feeAmountInToken1: item.feeAmountInToken1,
        token1Rate: item.token1Rate,
        token2Amount: item.token2Amount,
        feeAmountInToken2: item.feeAmountInToken2,
        token2Rate: item.token2Rate,
        timestamp: item.timestamp,
        unlocked: item.unlocked ? "Yes" : "No",
      };
      exportData.push(extract);
    });

    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(exportData);
  };

  return (
    <div className="App">
      <div className="header">
        <input
          type="datetime-local"
          className="inputDate"
          onChange={(e) => setDate(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={onlyLocked}
            className="inputCheckBox"
            onChange={(e) => setOnlyLocked(e.target.checked)}
          />
          Show locked only
        </label>
        <button onClick={exportToCsv} className="exportButton">
          Export to CSV
        </button>
      </div>
      <div className="table-container">
        <table>
          <tr>
            <th>lockId</th>
            <th>tierId</th>
            <th>pairId</th>
            <th>nftCollection</th>
            <th>nftId</th>
            <th>nftDiscount</th>
            <th>token1Amount</th>
            <th>feeAmountInToken1</th>
            <th>token1Rate</th>
            <th>token2Amount</th>
            <th>feeAmountInToken2</th>
            <th>token2Rate</th>
            <th>timestamp</th>
            <th>Unlocked</th>
          </tr>
          {data
            .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
            .map((item, index) => {
              if (onlyLocked)
                return (
                  !item.unlocked && (
                    <tr key={index}>
                      <td>{item.lockId}</td>
                      <td>{item.tierId}</td>
                      <td>{item.pairId}</td>
                      <td>{item.nftCollection}</td>
                      <td>{item.nftId}</td>
                      <td>{item.nftDiscount}</td>
                      <td>{item.token1Amount}</td>
                      <td>{item.feeAmountInToken1}</td>
                      <td>{item.token1Rate}</td>
                      <td>{item.token2Amount}</td>
                      <td>{item.feeAmountInToken2}</td>
                      <td>{item.token2Rate}</td>
                      <td>{item.timestamp}</td>
                      <td>{item.unlocked ? "Yes" : "No"}</td>
                    </tr>
                  )
                );
              else
                return (
                  <tr key={index}>
                    <td>{item.lockId}</td>
                    <td>{item.tierId}</td>
                    <td>{item.pairId}</td>
                    <td>{item.nftCollection}</td>
                    <td>{item.nftId}</td>
                    <td>{item.nftDiscount}</td>
                    <td>{item.token1Amount}</td>
                    <td>{item.feeAmountInToken1}</td>
                    <td>{item.token1Rate}</td>
                    <td>{item.token2Amount}</td>
                    <td>{item.feeAmountInToken2}</td>
                    <td>{item.token2Rate}</td>
                    <td>{item.timestamp}</td>
                    <td>{item.unlocked ? "Yes" : "No"}</td>
                  </tr>
                );
            })}
        </table>
      </div>
    </div>
  );
}

export default App;
