import {
  displayUserData,
  sortRevisionDate, 
  formatDate,
  submit,
} from "./script.js";

describe("App Functions", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="agenda-form">
        <input id="agenda" type="text" name="agenda">
        <input id="datepicker" type="date" name="datepicker">
      </form>
      <select id="user-drop-down"></select>
      <ul id="result-box"></ul>
    `;
    localStorage.clear();
  });

  test("sortRevisionDate() correctly sorts revision dates", () => {
    const data = [
      { topic: "Math", date: "5th March 2023" },
      { topic: "Science", date: "2nd March 2023" },
      { topic: "English", date: "10th March 2023" },
    ];

    const sorted = sortRevisionDate(data);

    expect(sorted[0].topic).toBe("Science");
    expect(sorted[1].topic).toBe("Math");
    expect(sorted[2].topic).toBe("English");
  });

  test("formatDate() returns correctly formatted date", () => {
    expect(formatDate(new Date("2023-02-21"))).toBe("21st February 2023");
    expect(formatDate(new Date("2023-03-22"))).toBe("22nd March 2023");
    expect(formatDate(new Date("2023-04-23"))).toBe("23rd April 2023");
    expect(formatDate(new Date("2023-05-01"))).toBe("1st May 2023");
    expect(formatDate(new Date("2023-06-02"))).toBe("2nd June 2023");
    expect(formatDate(new Date("2023-07-03"))).toBe("3rd July 2023");
  });

  test("displayUserData() updates the result-box with user data", () => {
    const resultBox = document.getElementById("result-box");

    const userId = "1";
    const sampleData = [
      { topic: "Math", date: "1st March 2023" },
      { topic: "Science", date: "5th March 2023" },
    ];

    displayUserData(userId, sampleData);

    expect(resultBox.children.length).toBe(1);
    expect(resultBox.textContent).toContain("The agenda for User 1 is shown");
    expect(resultBox.textContent).toContain("Math, 1st March 2023");
    expect(resultBox.textContent).toContain("Science, 5th March 2023");
  });

  test("displayUserData() shows empty message when user has no data", () => {
    const resultBox = document.getElementById("result-box");
    displayUserData("2", []);

    expect(resultBox.textContent).toContain("The User 2 is empty!");
  });

  test("submit() adds agenda and updates display", () => {
    const event = { preventDefault: jest.fn() };
    document.getElementById("agenda").value = "New Topic";
    document.getElementById("datepicker").value = "2023-03-01";

    submit(event);

    const storedData = JSON.parse(localStorage.getItem("stored-data-user-"));
    expect(storedData.length).toBe(5);
  });
});
