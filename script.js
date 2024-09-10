// Simulated API response
const searchResults = ["Apple", "Apricot", "Application", "Banana", "Orange", "Mango", "Grape", "Pineapple"];

// Debounce function to limit API calls
function debounce(func, delay) {
    let debounceTimer;
    return function(...args) {
        const context = this;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

// Simulate API call using a Promise and a delay
function simulateApiCall(query) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const filteredResults = searchResults.filter(item => 
                item.toLowerCase().includes(query.toLowerCase()));
            resolve(filteredResults);
        }, 1000); // Simulate 1-second delay for the API call
    });
}

// Function to handle search input
function handleSearch() {
    const query = document.getElementById('search').value;

    // If the input is empty, clear the results
    if (!query) {
        displayResults([]);
        return;
    }

    // Simulate the API call and display the results
    simulateApiCall(query).then(results => {
        displayResults(results);
    });
}

// Function to display the results in the DOM
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = '<li>No results found</li>';
        return;
    }

    // Create list items for each result
    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result;
        li.classList.add('result-item');
        resultsContainer.appendChild(li);
    });
}

// Debounced search handler
const debouncedSearch = debounce(handleSearch, 500);

// Event listener for search input
document.getElementById('search').addEventListener('input', debouncedSearch);
