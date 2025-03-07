// Initialize an empty array to store product data
let productsData = [];

// Function to fetch product data from the JSON file
fetch('https://raw.githubusercontent.com/Gimmicks312/Adhesive-products/main/products.json')
    .then(response => {
        console.log('Response Status:', response.status);  // Log status code for debugging
        console.log('Response Headers:', response.headers);  // Log response headers for debugging
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        productsData = data;  // Store the fetched data in the productsData array
        displayProducts(productsData);  // Display products after fetching the data
        populateCategoryFilter(productsData);  // Populate the category filter after fetching
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
        
        // Create a list of the properties in the correct order
        const rowData = [
            product.id || '', // ID
            product.name || '', // Name
            product.category || '', // Category
            product.softeningPoint || '', // Softening Point
            product.density || '', // Density
            product.color || '', // Color
            product.viscosity && product.viscosity[30] || '', // Viscosity at 30°C
            product.viscosity && product.viscosity[120] || '', // Viscosity at 120°C
            product.viscosity && product.viscosity[140] || '', // Viscosity at 140°C
            product.viscosity && product.viscosity[160] || '', // Viscosity at 160°C
            product.viscosity && product.viscosity[180] || '', // Viscosity at 180°C
            product.viscosity && product.viscosity[200] || '', // Viscosity at 200°C
            product.solidContent || '', // Solid Content
            product.ph || '' // pH
        ];

        // Loop through each rowData and create a cell for each piece of data
        rowData.forEach(data => {
            let cell = document.createElement('td');
            cell.textContent = data;
            row.appendChild(cell);
        });

        tableBody.appendChild(row);  // Append the new row to the table
    });
}

// Function to populate the category filter dropdown
function populateCategoryFilter(products) {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = new Set();

    products.forEach(product => {
        if (product.category) {
            categories.add(product.category);
        }
    });

    // Clear existing options and add the new ones
    categoryFilter.innerHTML = ''; // Clear previous filter options
    let defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'All Categories';
    categoryFilter.appendChild(defaultOption);

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
    if (selectedCategory) {
        const filteredProducts = productsData.filter(product => product.category === selectedCategory);
        displayProducts(filteredProducts);
    } else {
        displayProducts(productsData); // Show all products if no category is selected
    }
});
