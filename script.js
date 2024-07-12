document.getElementById('calculate-btn').addEventListener('click', function() {
    const ticker = document.getElementById('ticker').value;
    const windowSize = document.getElementById('window').value;
    const apiKey = 'nzXBqqzEoeKFhaf648lhOyL3B6Zzg4Gy'; // Replace with your actual API key

    if (ticker && windowSize) {
        const url = `https://api.polygon.io/v1/indicators/sma/${ticker}?timespan=day&adjusted=true&window=${windowSize}&series_type=close&order=desc&limit=10&apiKey=${apiKey}`;
        
        // Log the URL to check for correctness
        console.log('Fetching data from URL:', url);

        fetch(url)
            .then(response => {
                // Check if the response is okay
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                // Check if data contains the expected results
                if (data && data.results && data.results.values) {
                    displayResult(data.results.values);
                } else {
                    throw new Error('No data available for the given parameters.');
                }
            })
            .catch(error => {
                displayError(`Error fetching data: ${error.message}`);
                console.error('Error:', error);
            });
    } else {
        displayError('Please enter both the stock ticker and SMA window size.');
    }
});

function displayResult(values) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Date</th>
            <th>SMA</th>
        </tr>
    `;

    values.forEach(value => {
        const row = document.createElement('tr');
        const date = new Date(value.timestamp).toLocaleDateString();
        row.innerHTML = `
            <td>${date}</td>
            <td>${value.value.toFixed(2)}</td>
        `;
        table.appendChild(row);
    });

    resultDiv.appendChild(table);
}

function displayError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p style="color: red;">${message}</p>`;
}
