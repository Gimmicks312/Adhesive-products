// Fetch product data
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        productsData = data;
        displayProducts(productsData);
        populateCategoryFilter(productsData);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Function to display products in the table
function displayProducts(products) {
    const tableBody = document.getElementById('productTableBody');
    if (tableBody) {
        tableBody.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            for (const key in product) {
                const cell = document.createElement('td');
                cell.textContent = product[key];
                row.appendChild(cell);
            }
            tableBody.appendChild(row);
        });
    } else {
        console.error('Table body not found.');
    }
}

// Function to populate category filter
function populateCategoryFilter(products) {
    const categorySet = new Set(products.map(product => product.Category));
    const categoryFilter = document.getElementById('filterCategory');
    if (categoryFilter) {
        categorySet.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    } else {
        console.error('Category filter element not found.');
    }
}

// Filter products by category
function filterTableByCategory() {
    const categoryFilter = document.getElementById('filterCategory');
    const selectedCategory = categoryFilter ? categoryFilter.value : '';
    const filteredData = selectedCategory
        ? productsData.filter(product => product.Category === selectedCategory)
        : productsData;
    displayProducts(filteredData);
}

// Dynamic filter function for table
function dynamicFilterTable() {
    const filterValue = document.getElementById('dynamicFilter').value.toLowerCase();
    const filteredData = productsData.filter(product =>
        Object.values(product).some(val =>
            val.toString().toLowerCase().includes(filterValue)
        )
    );
    displayProducts(filteredData);
}

// Function to reset all filters (category and dynamic)
function resetFilters() {
    const categoryFilter = document.getElementById('filterCategory');
    if (categoryFilter) categoryFilter.value = ''; // Reset category filter
    const dynamicFilter = document.getElementById('dynamicFilter');
    if (dynamicFilter) dynamicFilter.value = ''; // Reset dynamic filter
    displayProducts(productsData); // Show all products
}
