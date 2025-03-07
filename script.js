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
        productsData = data;  // Store the data in the productsData variable
        displayProducts(productsData);  // Call the function to display the products
        populateCategoryFilter(productsData);  // Populate category filter dropdown
    })
    .catch(error => {
        console.error('Error fetching data:', error);  // Catch any errors in fetching the data
    });

// Function to display products in the table
function displayProducts(products) {
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = '';  // Clear existing table data

    products.forEach(product => {
        let row = document.createElement('tr');
        
        // Create an ordered array of fields in the correct column order
        const orderedData = [
            product.ID || '', // If no ID, show empty
            product.Name || '', // If no Name, show empty
            product.SofteningPoint || '', // If no SofteningPoint, show empty
            product.Viscosity || '', // If no Viscosity, show empty
            product.Density || '', // If no Density, show empty
            product.Color || '', // If no Color, show empty
            product.ApplicationTemperature || '', // If no ApplicationTemperature, show empty
            product.FeedingSpeed || '', // If no FeedingSpeed, show empty
            product.Basis || '', // If no Basis, show empty
            product.Category || '', // If no Category, show empty
            product.SolidContent || '', // If no SolidContent, show empty
            product.pH || '' // If no pH, show empty
        ];

        // Loop through each value in the orderedData array and create cells
        orderedData.forEach(value => {
            let cell = document.createElement('td');
            cell.textContent = value;  // Insert value into the cell
            row.appendChild(cell);  // Append the cell to the row
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
    displayProducts(filteredProducts);  // Display the filtered products
});
