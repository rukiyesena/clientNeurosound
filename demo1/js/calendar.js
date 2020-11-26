document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var initialLocaleCode = 'tr';
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        initialDate: '2020-09-12',
        locale: initialLocaleCode,
        editable: true,
        navLinks: true, // can click day/week names to navigate views
        dayMaxEvents: true, // allow "more" link when too many events
        events: {
            url: 'http://localhost:8080/teststudent/list',
            failure: function () {
                document.getElementById('script-warning').style.display = 'block'
            }
        },
    });

    calendar.render();
});
