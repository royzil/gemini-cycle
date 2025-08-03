// script.js

document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.getElementById('calendar-container');
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    // Load marked dates from local storage (so it remembers your input)
    let markedDates = JSON.parse(localStorage.getItem('markedDates')) || {};

    function renderCalendar(month, year) {
        calendarContainer.innerHTML = '';
        
        // Add day labels (Sun, Mon, etc.)
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const dayLabel = document.createElement('div');
            dayLabel.textContent = day;
            dayLabel.classList.add('day-label');
            calendarContainer.appendChild(dayLabel);
        });

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Add blank squares for the start of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarContainer.appendChild(document.createElement('div'));
        }

        // Add a square for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.classList.add('calendar-day');

            // Add an event listener to toggle marking a date
            dayElement.addEventListener('click', () => {
                const dateKey = `${year}-${month}-${day}`;
                if (markedDates[dateKey]) {
                    delete markedDates[dateKey];
                } else {
                    markedDates[dateKey] = true;
                }
                localStorage.setItem('markedDates', JSON.stringify(markedDates));
                renderCalendar(currentMonth, currentYear); // Re-render to show changes
            });

            // Check if the date is marked and apply a special style
            const dateKey = `${year}-${month}-${day}`;
            if (markedDates[dateKey]) {
                dayElement.classList.add('marked-day');
            }
            
            calendarContainer.appendChild(dayElement);
        }
    }

    renderCalendar(currentMonth, currentYear);
});
                    
