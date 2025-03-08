// Function to open the advanced search popup
function openAdvancedSearch() {
    document.getElementById("advancedSearchPopup").style.display = "block";
}

// Function to close the advanced search popup
function closeAdvancedSearch() {
    document.getElementById("advancedSearchPopup").style.display = "none";
}

// Function to apply the advanced search filters
function applyAdvancedSearch() {
    let table = document.getElementById("productTable");
    let rows = table.rows;
    
    // Get filter values from the advanced search form
    let filters = {
        softeningPointMin: parseFloat(document.getElementById("softeningPointMin").value) || null,
        softeningPointMax: parseFloat(document.getElementById("softeningPointMax").value) || null,
        
        viscosity30Min: parseFloat(document.getElementById("viscosity30Min").value) || null,
        viscosity30Max: parseFloat(document.getElementById("viscosity30Max").value) || null,
        
        viscosity120Min: parseFloat(document.getElementById("viscosity120Min").value) || null,
        viscosity120Max: parseFloat(document.getElementById("viscosity120Max").value) || null,
        
        viscosity140Min: parseFloat(document.getElementById("viscosity140Min").value) || null,
        viscosity140Max: parseFloat(document.getElementById("viscosity140Max").value) || null,
        
        viscosity160Min: parseFloat(document.getElementById("viscosity160Min").value) || null,
        viscosity160Max: parseFloat(document.getElementById("viscosity160Max").value) || null,
        
        viscosity180Min: parseFloat(document.getElementById("viscosity180Min").value) || null,
        viscosity180Max: parseFloat(document.getElementById("viscosity180Max").value) || null,
        
        viscosity200Min: parseFloat(document.getElementById("viscosity200Min").value) || null,
        viscosity200Max: parseFloat(document.getElementById("viscosity200Max").value) || null,
        
        densityMin: parseFloat(document.getElementById("densityMin").value) || null,
        densityMax: parseFloat(document.getElementById("densityMax").value) || null,
        
        solidContentMin: parseFloat(document.getElementById("solidContentMin").value) || null,
        solidContentMax: parseFloat(document.getElementById("solidContentMax").value) || null,
        
        phMin: parseFloat(document.getElementById("phMin").value) || null,
        phMax: parseFloat(document.getElementById("phMax").value) || null,
        
        applicationTempMin: parseFloat(document.getElementById("applicationTempMin").value) || null,
        applicationTempMax: parseFloat(document.getElementById("applicationTempMax").value) || null,
        
        feedingSpeedMin: parseFloat(document.getElementById("feedingSpeedMin").value) || null,
        feedingSpeedMax: parseFloat(document.getElementById("feedingSpeedMax").value) || null,
        
        applicationQuantityMin: parseFloat(document.getElementById("applicationQuantityMin").value) || null,
        applicationQuantityMax: parseFloat(document.getElementById("applicationQuantityMax").value) || null,
        
        openTimeMin: parseFloat(document.getElementById("openTimeMin").value) || null,
        openTimeMax: parseFloat(document.getElementById("openTimeMax").value) || null
    };
    
    // Loop through each row in the table
    for (let i = 1; i < rows.length; i++) { // starting from 1 to skip the header
        let row = rows[i];
        let data = row.cells;
        
        let match = true;

        // Check each filter condition against the row data
        if (filters.softeningPointMin !== null && parseFloat(data[6].innerText) < filters.softeningPointMin) match = false;
        if (filters.softeningPointMax !== null && parseFloat(data[6].innerText) > filters.softeningPointMax) match = false;
        
        if (filters.viscosity30Min !== null && parseFloat(data[7].innerText) < filters.viscosity30Min) match = false;
        if (filters.viscosity30Max !== null && parseFloat(data[7].innerText) > filters.viscosity30Max) match = false;
        
        if (filters.viscosity120Min !== null && parseFloat(data[8].innerText) < filters.viscosity120Min) match = false;
        if (filters.viscosity120Max !== null && parseFloat(data[8].innerText) > filters.viscosity120Max) match = false;
        
        if (filters.viscosity140Min !== null && parseFloat(data[9].innerText) < filters.viscosity140Min) match = false;
        if (filters.viscosity140Max !== null && parseFloat(data[9].innerText) > filters.viscosity140Max) match = false;
        
        if (filters.viscosity160Min !== null && parseFloat(data[10].innerText) < filters.viscosity160Min) match = false;
        if (filters.viscosity160Max !== null && parseFloat(data[10].innerText) > filters.viscosity160Max) match = false;
        
        if (filters.viscosity180Min !== null && parseFloat(data[11].innerText) < filters.viscosity180Min) match = false;
        if (filters.viscosity180Max !== null && parseFloat(data[11].innerText) > filters.viscosity180Max) match = false;
        
        if (filters.viscosity200Min !== null && parseFloat(data[12].innerText) < filters.viscosity200Min) match = false;
        if (filters.viscosity200Max !== null && parseFloat(data[12].innerText) > filters.viscosity200Max) match = false;
        
        if (filters.densityMin !== null && parseFloat(data[13].innerText) < filters.densityMin) match = false;
        if (filters.densityMax !== null && parseFloat(data[13].innerText) > filters.densityMax) match = false;
        
        if (filters.solidContentMin !== null && parseFloat(data[14].innerText) < filters.solidContentMin) match = false;
        if (filters.solidContentMax !== null && parseFloat(data[14].innerText) > filters.solidContentMax) match = false;
        
        if (filters.phMin !== null && parseFloat(data[15].innerText) < filters.phMin) match = false;
        if (filters.phMax !== null && parseFloat(data[15].innerText) > filters.phMax) match = false;
        
        if (filters.applicationTempMin !== null && parseFloat(data[16].innerText) < filters.applicationTempMin) match = false;
        if (filters.applicationTempMax !== null && parseFloat(data[16].innerText) > filters.applicationTempMax) match = false;
        
        if (filters.feedingSpeedMin !== null && parseFloat(data[17].innerText) < filters.feedingSpeedMin) match = false;
        if (filters.feedingSpeedMax !== null && parseFloat(data[17].innerText) > filters.feedingSpeedMax) match = false;
        
        if (filters.applicationQuantityMin !== null && parseFloat(data[18].innerText) < filters.applicationQuantityMin) match = false;
        if (filters.applicationQuantityMax !== null && parseFloat(data[18].innerText) > filters.applicationQuantityMax) match = false;
        
        if (filters.openTimeMin !== null && parseFloat(data[19].innerText) < filters.openTimeMin) match = false;
        if (filters.openTimeMax !== null && parseFloat(data[19].innerText) > filters.openTimeMax) match = false;

        // If the row doesn't match the filter criteria, hide it
        if (match) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }

    closeAdvancedSearch(); // Close the popup after applying the filters
}

// Function to reset the advanced search filters
function resetAdvancedSearch() {
    // Reset all filter fields
    document.getElementById("advancedSearchForm").reset();

    // Reset table display
    let table = document.getElementById("productTable");
    let rows = table.rows;
    for (let i = 1; i < rows.length; i++) {
        rows[i].style.display = "";
    }

    closeAdvancedSearch(); // Close the popup after resetting
}
