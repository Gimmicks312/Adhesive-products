// Initialize an empty array to store product data
let productsData = [];

// Function to fetch product data from the JSON file
fetch('https://raw.githubusercontent.com/Gimmicks312/Adhesive-products/main/products.json')
    .then(response => {
        // Log the status and headers for debugging
        console.log('Response Status:', response.status);  // Log status code for debugging
        console.log('Response Headers:', response.headers);  // Log response headers for debugging
        // Check if response is okay (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);  // Log the JSON data to check if it's correct
        productsData = data;  // Store the data in productsData array
        displayProducts(productsData);  // Call function to display products
        populateCategoryFilter(productsData);  // Call function to populate category filter
    })
    .catch(error => {
        console.error('Error fetching data:', error);  // Catch any errors in fetching the data
    });

// Function to display products in the table
function displayProducts(products) {
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = ''; // Clear existing table data

    products.forEach(product => {
        let row = document.createElement('tr');
        
        // Loop through each key-value pair in the product object
        Object.keys(product).forEach(key => {
            if (product[key] !== null && product[key] !== '') {
                let cell = document.createElement('td');
                cell.textContent = product[key];
                row.appendChild(cell);
            }
        });

        tableBody.appendChild(row);  // Append the new row to the table
    });
}

// Function to populate the category filter dropdown
function populateCategoryFilter(products) {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = new Set();

    products.forEach(product => {
        if (product.Category) {
            categories.add(product.Category);
        }
    });

    categories.forEach(category => {
        let option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter products based on selected category
document.getElementById('categoryFilter').addEventListener('change', function() {
    const selectedCategory = this.value;
    const filteredProducts = productsData.filter(product => product.Category === selectedCategory);
    displayProducts(filteredProducts);
});
