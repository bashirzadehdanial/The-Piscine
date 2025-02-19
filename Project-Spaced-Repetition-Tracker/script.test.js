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
});
