document.addEventListener("DOMContentLoaded", () => {
  const listView = document.getElementById("listView");
  const calendarView = document.getElementById("calendarView");
  const calendarContainer = document.getElementById("calendarContainer");
  const viewListBtn = document.getElementById("viewListBtn");
  const viewCalendarBtn = document.getElementById("viewCalendarBtn");

  if (!listView || !calendarView || !calendarContainer || !viewListBtn || !viewCalendarBtn) {
    return;
  }

  const entries = [
    { code: "0413", subject: "PROGRAMACION WEB", group: "Gpo1", day: "MARTES", time: "10:00 - 11:40", room: "E201" },
    { code: "0413", subject: "PROGRAMACION WEB", group: "Gpo1", day: "JUEVES", time: "15:00 - 16:40", room: "E201" },
    { code: "0402", subject: "INTRO. INGENIERIA", group: "Gpo3", day: "LUNES", time: "08:00 - 09:40", room: "D104" },
    { code: "0402", subject: "INTRO. INGENIERIA", group: "Gpo3", day: "MIERCOLES", time: "08:00 - 09:40", room: "D104" },
    { code: "0402", subject: "INTRO. INGENIERIA", group: "Gpo4", day: "LUNES", time: "10:00 - 11:40", room: "E201" },
    { code: "0402", subject: "INTRO. INGENIERIA", group: "Gpo4", day: "JUEVES", time: "08:00 - 09:40", room: "E201" },
    { code: "0402", subject: "INTRO. INGENIERIA", group: "Gpo7", day: "LUNES", time: "03:00 - 04:40", room: "D104" },
    { code: "0402", subject: "INTRO. INGENIERIA", group: "Gpo7", day: "JUEVES", time: "01:00 - 02:40", room: "D104" },
    { code: "0402", subject: "INTRO. INGENIERIA", group: "Gpo8", day: "MARTES", time: "03:00 - 04:40", room: "D104" },
    { code: "0402", subject: "INTRO. INGENIERIA", group: "Gpo8", day: "MIERCOLES", time: "01:00 - 02:40", room: "D104" },
  ];

  const days = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
  const timeOrder = [
    "08:00 - 09:40",
    "10:00 - 11:40",
    "01:00 - 02:40",
    "03:00 - 04:40",
    "15:00 - 16:40",
  ];
  const timeSlots = timeOrder.filter((time) => entries.some((entry) => entry.time === time));

  const buildEntryMap = () => {
    const map = new Map();
    entries.forEach((entry) => {
      const key = `${entry.day}|${entry.time}`;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(entry);
    });
    return map;
  };

  const renderCalendar = () => {
    const table = document.createElement("table");
    table.className = "table table-bordered table-sm align-middle";

    const thead = document.createElement("thead");
    thead.className = "table-light";
    const headRow = document.createElement("tr");

    const corner = document.createElement("th");
    corner.scope = "col";
    corner.textContent = "HORA";
    headRow.appendChild(corner);

    days.forEach((day) => {
      const th = document.createElement("th");
      th.scope = "col";
      th.className = "text-center";
      th.textContent = day;
      headRow.appendChild(th);
    });

    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    timeSlots.forEach((time) => {
      const row = document.createElement("tr");

      const timeCell = document.createElement("th");
      timeCell.scope = "row";
      timeCell.textContent = time;
      row.appendChild(timeCell);

      days.forEach(() => {
        const cell = document.createElement("td");
        cell.className = "text-center";
        row.appendChild(cell);
      });

      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    calendarContainer.innerHTML = "";
    calendarContainer.appendChild(table);
  };

  const setActive = (isList) => {
    listView.classList.toggle("d-none", !isList);
    calendarView.classList.toggle("d-none", isList);

    viewListBtn.classList.toggle("btn-primary", isList);
    viewListBtn.classList.toggle("btn-outline-primary", !isList);
    viewCalendarBtn.classList.toggle("btn-primary", !isList);
    viewCalendarBtn.classList.toggle("btn-outline-primary", isList);
  };

  viewListBtn.addEventListener("click", () => setActive(true));
  viewCalendarBtn.addEventListener("click", () => setActive(false));

  setActive(true);
});
