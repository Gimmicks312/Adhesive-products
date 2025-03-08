document.addEventListener('DOMContentLoaded', function () {
  // Handling "Advanced Search" button click
  const advancedSearchButton = document.getElementById('advancedSearchButton');
  if (advancedSearchButton) {
    advancedSearchButton.addEventListener('click', function () {
      // Open the advanced search pop-up
      document.getElementById('advancedSearchPopup').style.display = 'block';
    });
  } else {
    console.error('Advanced Search button not found!');
  }

  // Handling "Close" button for the pop-up
  const closePopupButton = document.getElementById('closePopupButton');
  if (closePopupButton) {
    closePopupButton.addEventListener('click', function () {
      // Close the advanced search pop-up
      document.getElementById('advancedSearchPopup').style.display = 'none';
    });
  } else {
    console.error('Close button for pop-up not found!');
  }

  // Fetch and display the product data
  function fetchProductData() {
    fetch('products.json')
      .then((response) => response.json())
      .then((data) => {
        displayProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  function displayProducts(products) {
    const tableBody = document.getElementById('productTableBody');
    if (!tableBody) {
      console.error('Table body element not found!');
      return;
    }

    tableBody.innerHTML = ''; // Clear any existing rows

    products.forEach((product) => {
      let row = `<tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.basis}</td>
                    <td>${product.appearance || ''}</td>
                    <td>${product.color || ''}</td>
                    <td>${product.softeningPoint || ''}</td>
                    <td>${product.viscosity ? product.viscosity['30'] : ''}</td>
                    <td>${product.viscosity ? product.viscosity['120'] : ''}</td>
                    <td>${product.viscosity ? product.viscosity['140'] : ''}</td>
                    <td>${product.viscosity ? product.viscosity['160'] : ''}</td>
                    <td>${product.viscosity ? product.viscosity['180'] : ''}</td>
                    <td>${product.viscosity ? product.viscosity['200'] : ''}</td>
                    <td>${product.density || ''}</td>
                    <td>${product.solidContent || ''}</td>
                    <td>${product.pH || ''}</td>
                    <td>${product.applicationTemperature || ''}</td>
                    <td>${product.feedingSpeed || ''}</td>
                    <td>${product.applicationQuantity || ''}</td>
                    <td>${product.openTime || ''}</td>
                  </tr>`;

      tableBody.innerHTML += row;
    });
  }

  // Initial fetch on page load
  fetchProductData();
});
