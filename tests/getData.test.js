//============================Fetch-Client Unit Test
import { getData } from "../utils/fetchData";

describe("It should fetch data based on the URL passed", () => {
  test("See if data is retrieved", async () => {
    //make request to rest API from client-side an object should be returned
    const data = await getData("product");
    expect(typeof data === "object").toBeTruthy();
  });
});
