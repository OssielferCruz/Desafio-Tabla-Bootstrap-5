document.addEventListener("DOMContentLoaded", () => {
  const listView = document.getElementById("listView");
  const calendarView = document.getElementById("calendarView");
  const viewListBtn = document.getElementById("viewListBtn");
  const viewCalendarBtn = document.getElementById("viewCalendarBtn");

  if (!listView || !calendarView || !viewListBtn || !viewCalendarBtn) {
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
