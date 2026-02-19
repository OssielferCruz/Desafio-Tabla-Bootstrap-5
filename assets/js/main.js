document.addEventListener("DOMContentLoaded", () => {
  const listView = document.getElementById("listView");
  const calendarView = document.getElementById("calendarView");
  const calendarContainer = document.getElementById("calendarContainer");
  const viewToggleBtn = document.getElementById("viewToggleBtn");
  const listTable = listView ? listView.querySelector("table") : null;

  if (!listView || !calendarView || !calendarContainer || !viewToggleBtn || !listTable) {
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
  const days = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
  const lunchSlot = "11:40 am - 1:00 pm";
  const timeOrder = [
    "08:00 - 09:40",
    "10:00 - 11:40",
    lunchSlot,
    "01:00 - 02:40",
    "03:00 - 04:40",
  ];
  const timeSlots = timeOrder.filter(
    (time) => time === lunchSlot || entries.some((entry) => entry.time === time)
  );

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
    table.className = "table table-hover align-middle";

    const thead = document.createElement("thead");
    thead.className = "table-dark";
    const headRow = document.createElement("tr");

    const corner = document.createElement("th");
    corner.scope = "col";
    corner.className = "text-white";
    corner.textContent = "HORA";
    headRow.appendChild(corner);

    days.forEach((day) => {
      const th = document.createElement("th");
      th.scope = "col";
      th.className = "text-center text-white";
      th.textContent = day;
      headRow.appendChild(th);
    });

    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    const subjectColorMap = {
      "PROGRAMACION WEB": "bg-primary-subtle",
      "INTRO. INGENIERIA": "bg-success-subtle",
    };

    const getSubjectClass = (subject) => subjectColorMap[subject] || "bg-secondary-subtle";
    timeSlots.forEach((time) => {
      const row = document.createElement("tr");

      const timeCell = document.createElement("th");
      timeCell.scope = "row";
      timeCell.className = "text-muted";
      timeCell.textContent = time;
      row.appendChild(timeCell);

      if (time === lunchSlot) {
        const lunchCell = document.createElement("td");
        lunchCell.className = "text-center fw-semibold text-muted bg-light";
        lunchCell.colSpan = days.length;
        lunchCell.textContent = "ALMUERZO";
        row.appendChild(lunchCell);
        tbody.appendChild(row);
        return;
      }

      days.forEach((day) => {
        const cell = document.createElement("td");
        cell.className = "text-center";
        const key = `${day}|${time}`;
        const items = entryMap.get(key) || [];

        items.forEach((entry) => {
          const block = document.createElement("div");
          block.className = `mb-1 p-1 rounded ${getSubjectClass(entry.subject)}`;

          const subject = document.createElement("div");
          subject.className = "fw-semibold";
          subject.textContent = entry.subject;

          const code = document.createElement("div");
          code.className = "text-muted";
          code.textContent = entry.code;

          const meta = document.createElement("div");
          meta.className = "";

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

  const updateToggleButton = (isList) => {
    viewToggleBtn.textContent = isList ? "Ver Calendario" : "Ver Lista";
    viewToggleBtn.classList.toggle("btn-primary", isList);
    viewToggleBtn.classList.toggle("btn-outline-primary", !isList);
  };

  const setActive = (isList) => {
    listView.classList.toggle("d-none", !isList);
    calendarView.classList.toggle("d-none", isList);
    updateToggleButton(isList);
  };

  let isListView = true;
  viewToggleBtn.addEventListener("click", () => {
    isListView = !isListView;
    setActive(isListView);
  });

  setActive(isListView);
});
