$(document).ready(function () {

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
        selectable: true,
        selectHelper: true,
        events: {
            url: 'http://localhost:8080/teststudent/list',
            failure: function () {
                document.getElementById('script-warning').style.display = 'block'
            }
        },
        
        // backgroundColor: '#ED1317',
        color: 'yellow',   // a non-ajax option
        textColor: 'black',
    });

    calendar.render();


});
