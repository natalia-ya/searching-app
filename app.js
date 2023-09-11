let jsonData = []; 


function loadData() {
    fetch('data.json') 
        .then(response => response.json())
        .then(data => {
            jsonData = data;
            console.log('Data loaded:', jsonData);
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
}

function search() {
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
    const resultsList = document.getElementById("resultsList");
    const notFoundMessage = document.getElementById("notFoundMessage");
    resultsList.innerHTML = "";
    notFoundMessage.style.display = "none"; 

    if (searchInput === "") {
        notFoundMessage.style.display = "block"; 
        return;
    }

    let found = false; 

    for (const person of jsonData) {
        const fullName = `${person.first_name} ${person.last_name}`;
        if (
            (searchInput === person.personnummer && searchInput.length === 10) || 
            (searchInput === fullName.toLowerCase()) || 
            (fullName.toLowerCase().includes(searchInput)) || 
            (searchInput === person.email.toLowerCase()) 
        ) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>ID:</strong> ${person.personnummer}<br>
                <strong>Name:</strong> ${fullName}<br>
                <strong>Email:</strong> ${person.email}<br>
                <strong>Gender:</strong> ${person.gender}<br>
                <strong>IP Address:</strong> ${person.ip_address}
            `;
            resultsList.appendChild(listItem);
            found = true; 
        }
    }


    if (!found) {
        notFoundMessage.style.display = "block"; 
    } else {
        resultsList.style.display = "block";
    }
}


document.getElementById("searchButton").addEventListener("click", search);


document.getElementById("searchInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        search();
    }
});


loadData();
