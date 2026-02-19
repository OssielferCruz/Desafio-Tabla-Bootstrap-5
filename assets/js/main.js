document.addEventListener("DOMContentLoaded", () => {
  const listView = document.getElementById("listView");
  const calendarView = document.getElementById("calendarView");
  const viewListBtn = document.getElementById("viewListBtn");
  const viewCalendarBtn = document.getElementById("viewCalendarBtn");

  if (!listView || !calendarView || !viewListBtn || !viewCalendarBtn) {
    return;
  }

  const setActive = (isList) => {
    listView.classList.toggle("d-none", !isList);
    calendarView.classList.toggle("d-none", isList);

    viewListBtn.classList.toggle("btn-primary", isList);
    viewListBtn.classList.toggle("btn-outline-primary", !isList);
    viewCalendarBtn.classList.toggle("btn-primary", !isList);
    viewCalendarBtn.classList.toggle("btn-outline-primary", isList);
  };
});
