import React, {useState} from 'react';
import { getForecastForPostcode } from "./Api.ts";
import './App.css'


function App(): React.ReactElement {
  const [postcode, setPostcode] = useState<string>("");
  const [tableData, setTableData] = useState<string|null>("");

  async function getTableData(event: React.FormEvent, postcode: string) {
    event.preventDefault();
    const data = await getForecastForPostcode(postcode);
    setTableData(data);
  }
  function updatePostcode(data: React.ChangeEvent<HTMLInputElement>): void {
    setPostcode(data.target.value);

    if (data.target.value.trim() === "") {
      setTableData(null);
    }
  }
  return (
      <div className="app-container">
        <div className="app-card">
          <h1>Met Office Weather</h1>

          <form className="postcode-form" onSubmit={(event) => getTableData(event, postcode)}>
            <label htmlFor="postcodeInput">Postcode</label>
            <div className="input-row">
              <input
                  type="text"
                  id="postcodeInput"
                  placeholder="e.g. M13 0JQ"
                  onChange={updatePostcode}
              />
              <button type="submit" disabled={postcode.trim() === ""}>Search</button>
            </div>
          </form>

          {tableData && (
              <div className="forecast-section">
                <table className="forecast-table">
                  <thead>
                  <tr>
                    <th>Date/Hour</th>
                    <th>Temperature</th>
                    <th>Weather</th>
                  </tr>
                  </thead>
                  <tbody>
                  {tableData.result.temperature.map((temp, index) => (
                      <tr key={index}>
                        <td>{tableData.result.timestamp[index]}</td>
                        <td className="temp-cell">{temp}</td>
                        <td>{tableData.result.weatherType[index]}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>

                {tableData.result.willRain && (
                    <p className="rain-warning">☔ You'll need an umbrella</p>
                )}
              </div>
          )}
        </div>
      </div>
  );
}
export default App;