import React, {useState} from 'react';
import { getForecastForPostcode } from "./Api.ts";


function App(): React.ReactElement {
  const [postcode, setPostcode] = useState<string>("");
  const [tableData, setTableData] = useState<string>("");

  async function getTableData(event: React.FormEvent, postcode: string) {
    event.preventDefault();
    const data = await getForecastForPostcode(postcode);
    setTableData(data);
  }
  function updatePostcode(data: React.ChangeEvent<HTMLInputElement>): void {
    setPostcode(data.target.value);
  }
  return <>
    <h1> Met Office Weather </h1>
    <form onSubmit={(event) => getTableData(event, postcode)}>
      <label htmlFor="postcodeInput"> Postcode: </label>
      <input type="text" id="postcodeInput" onChange={updatePostcode}/>
      <input type="submit" value="Submit"/>
    </form>
    {JSON.stringify(tableData, null, 4)}
  </>;
}
export default App;