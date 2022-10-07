import React, { useState, useEffect } from "react";
import axios from "axios";
import client from "./component/MyWeatherAppClient";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";

import { Scrollbars } from "react-custom-scrollbars";
import { RotatingLines } from "react-loader-spinner";

const App = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [stationId, setStationId] = useState("");

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      getRecordList();
      setIsLoading(true);
      setStationId("");
    }
  };

  async function getRecordList() {
    try {
      const response = await client.getRecordings(stationId);
      if (response && response.status === 200) {
        setIsLoading(false);
        const recordings = response.data;
        setData(recordings);
      }
    } catch (error) {
      // toastError(error);
    }
  }

  useEffect(() => {
    getRecordList();
  }, [getRecordList, data]);

  return (
    <div className="app">
      <div className="search">
        <input
          value={stationId}
          onChange={(event) => setStationId(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter StationId"
          type="text"
          style={{paddingLeft:"100px"}}
        />

        <h1 className="text-center display-5 mt-5">Recording List</h1>
        {isLoading ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
        ) : (
          <Scrollbars style={{ width: 1200, height: 500, margin: "30px 0" }}>
            <Table striped bordered hover >
              <thead>
                <tr className="text-light">
                  <th>No.</th>
                  <th>date</th>
                  <th>element</th>
                  <th>value1</th>
                  <th>mFlag</th>
                  <th>qFlag</th>
                  <th>sFlag</th>
                  <th>value2</th>
                </tr>
              </thead>

              <tbody>
                {data != undefined
                  ? data.weatherList.map((item, index) => (
                      <tr key={index}>
                        <td className="text-light">{index + 1}</td>
                        <td className="text-light">{item.date}</td>
                        <td className="text-light">{item.element}</td>
                        <td className="text-light">{item.value1}</td>
                        <td className="text-light">{item.mFlag}</td>
                        <td className="text-light">{item.qFlag}</td>
                        <td className="text-light">{item.sFlag}</td>
                        <td className="text-light">{item.value2}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
          </Scrollbars>
        )}
      </div>
    </div>
  );
};

export default App;
