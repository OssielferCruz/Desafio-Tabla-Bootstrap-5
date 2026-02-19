document.addEventListener("DOMContentLoaded", () => {
  const listView = document.getElementById("listView");
  const calendarView = document.getElementById("calendarView");
  const calendarContainer = document.getElementById("calendarContainer");
  const viewListBtn = document.getElementById("viewListBtn");
  const viewCalendarBtn = document.getElementById("viewCalendarBtn");
  const listTable = listView ? listView.querySelector("table") : null;

  if (!listView || !calendarView || !calendarContainer || !viewListBtn || !viewCalendarBtn || !listTable) {
    return;
  }

  const extractEntriesFromTable = () => {
    const rows = Array.from(listTable.querySelectorAll("tbody tr"));
    return rows
      .map((row) => {
        const cells = row.querySelectorAll("td");
        if (cells.length < 6) {
          return null;
        }

        const code = cells[0].textContent.trim();
        const subject = cells[1].textContent.trim();
        const group = cells[2].textContent.trim();
        const day = cells[3].textContent.trim();
        const time = cells[4].textContent.trim();
        const room = cells[5].textContent.trim();

        return { code, subject, group, day, time, room };
      })
      .filter(Boolean);
  };

  const entries = extractEntriesFromTable();
  const dayOrder = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
  const days = dayOrder.filter((day) => entries.some((entry) => entry.day === day));
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
    const entryMap = buildEntryMap();
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

      days.forEach((day) => {
        const cell = document.createElement("td");
        cell.className = "text-center";
        const key = `${day}|${time}`;
        const items = entryMap.get(key) || [];

        items.forEach((entry) => {
          const block = document.createElement("div");
          block.className = "mb-1";

          const subject = document.createElement("div");
          subject.className = "fw-semibold small";
          subject.textContent = entry.subject;

          const code = document.createElement("div");
          code.className = "small text-muted";
          code.textContent = entry.code;

          const meta = document.createElement("div");
          meta.className = "small";

          const group = document.createElement("span");
          group.className = "badge bg-primary me-1";
          group.textContent = entry.group;

          const room = document.createElement("span");
          room.className = "badge bg-secondary";
          room.textContent = entry.room;

          meta.appendChild(group);
          meta.appendChild(room);

          block.appendChild(subject);
          block.appendChild(code);
          block.appendChild(meta);
          cell.appendChild(block);
        });
        row.appendChild(cell);
      });

      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    calendarContainer.innerHTML = "";
    calendarContainer.appendChild(table);
  };

  renderCalendar();

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
