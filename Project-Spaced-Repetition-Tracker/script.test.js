const { userSelected, displayUserData, formatDate, submit } = "./script.js";
const { getUserIds, getData, addData } = "./storage.js";

jest.mock("./storage.js");


beforeEach(() => {
  document.body.innerHTML = `
    <form id="agenda-form">
      <select id="user-drop-down"><option value="1">User 1</option></select>
      <input id="agenda" type="text" name="agenda">
      <input id="datepicker" type="date" name="datepicker">
      <button type="submit">SUBMIT</button>
    </form>
    <ul id="result-box"></ul>
  `;

  getUserIds.mockReturnValue(["1"]);
  getData.mockReturnValue([{ topic: "Test", date: "1st January 2025" }]);
  addData.mockImplementation(() => {});
});


test("formatDate correctly formats a date", () => {
  expect(formatDate(new Date("2025-01-01"))).toBe("1st January 2025");
});


test("userSelected updates result box", () => {
  document.getElementById("user-drop-down").value = "1";
  userSelected();
  expect(document.getElementById("result-box").innerHTML).toContain("User 1");
});


test("submit adds new data", () => {
  const event = { preventDefault: jest.fn() };
  document.getElementById("agenda").value = "New Topic";
  document.getElementById("datepicker").value = "2025-01-01";

  submit(event);

  expect(addData).toHaveBeenCalled();
});
