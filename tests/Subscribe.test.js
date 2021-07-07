//============================Component Snapshot test
import React from "react";

//import to render react component
import renderer from "react-test-renderer";

//component with subscription form
import Subscribe from "../components/Subscribe";

//snapshot test
it("renders correctly", () => {
  const tree = renderer.create(<Subscribe />).toJSON();
  //compare with snapshot
  expect(tree).toMatchSnapshot();
});
