function renderChartDays() {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: datetimes,
            datasets: [{
                label: 'Tägliche Temperatur',
                data: temperatures,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function renderChartToday() {
    const ctx = document.getElementById('myChartToday');
        let apiLabels = hoursToday;

        let apiData = [{
            label: 'Heutige stündliche Temperaturen',
            data: temperaturesToday,
            borderWidth: 1
        },
        {
            label: 'Heutige stündliche Feuchtigkeit',
            data: humiditiesToday,
            borderWidth: 1
        }];

        let apiOptions = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: apiLabels,
                datasets: apiData
            },
            options: apiOptions
        });
}