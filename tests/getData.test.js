//============================Fetch-Client Unit Test
import { getData } from "../utils/fetchData";

describe("It should fetch data based on the URL passed", () => {
  test("See if data is retrieved", async () => {
    const data = await getData("product");
    expect(typeof data === "object").toBeTruthy();
  });
});
