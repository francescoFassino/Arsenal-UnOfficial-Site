let requestUrl = 'https://francescofassino.github.io/Arsenal-UnOfficial-Site/players_data.json'; 
let request = new XMLHttpRequest();
request.open('GET', requestUrl);
request.responseType = 'json';
request.send();

request.onload = function(){
    const data = request.response;
    const firstTeam = document.querySelector("#first_team");
    const firstTeam_table = document.querySelector("#firstTeam_table_body");
    let currentPlayer, element_card, card, element_rowTable, row;
    for(let i in data.players){
      card = document.createElement('div');
      row = document.createElement('tr');
      // card.setAttribute("class", "card-group");
      currentPlayer = data.players[i];
      element_card = `
      <div class="col">
        <div class="card h-100" style="width: 18rem;" >
          <img src="${currentPlayer.pictures[1]}" class="card-img-top" alt="card image">
          <div class="card-body">
            <p class="card-text text-center">
              ${currentPlayer.name}
            </p>
          </div>
        </div>
      </div>  
      `;
      // https://ssl.gstatic.com/onebox/media/sports/logos/z44l-a0W1v5FmgPnemV6Xw_48x48.png

      element_rowTable = `
        <td><img src="${currentPlayer.pictures[0]}"></td>
        <td>${currentPlayer.number}</td>
        <td>${currentPlayer.name}</td>
        <td>${currentPlayer.nationality}</td>
        <td>${currentPlayer.birth}</td>
        <td>${(currentPlayer.value/1000000)+"M€"}</td>
      `;
      card.innerHTML = element_card;
      // row.innerHTML = element_rowTable;
      firstTeam.appendChild(card);
      // firstTeam_table.appendChild(table);
    }
//         // creazione di un elemento
//         row = document.createElement('tr');
//         numberColumn = document.createElement('td');
//         nameColumn = document.createElement('td');
//         nationalityColumn = document.createElement('td');
//         birthColumn = document.createElement('td');
//         valueColumn = document.createElement('td');
//         playerImage = document.createElement('img');

//         number = document.createTextNode(data.players[i].number);
//         name = document.createTextNode(data.players[i].name);
//         nationality = document.createTextNode(data.players[i].nationality);
//         birth = document.createTextNode(data.players[i].birth);
//         value = document.createTextNode(transform(data.players[i].value));
//         // setAttribute, setta il src dell'elemento img al secondo parametro
//         // append: aggiunge testo o immagine all'elemento chiamante del metodo
//         playerImage.setAttribute("src", data.players[i].pictures[0]);
//         playerImage.setAttribute("class", "img-fluid");
//         playerImage.setAttribute("height", "80px");

//         numberColumn.appendChild(number);
//         nameColumn.appendChild(name);
//         nationalityColumn.appendChild(nationality);
//         birthColumn.appendChild(birth);
//         valueColumn.appendChild(value);
        
//         row.appendChild(playerImage);
//         row.appendChild(numberColumn);
//         row.appendChild(nameColumn);
//         row.appendChild(nationalityColumn);
//         row.appendChild(birthColumn);
//         row.appendChild(valueColumn);

//         let roleString = JSON.stringify(data.players[i].role);
//         let role = JSON.parse(roleString);
//         switch (role){
//             case "goalkeeper":
//                 row.setAttribute("class", "table-warning");
//                 break;
//             case "defender":
//                 row.setAttribute("class", "table-success");
                // break;
//             case "midfielder":
//                 row.setAttribute("class", "table-info");
//                 break;
//             case "attacker":
//                 row.setAttribute("class", "table-danger");
//                 break;    
//             default:
//                 console.log("none");
//                 break;    
//         }
//         // console.log("£");
//         playerTable.appendChild(row);
} 

// // this function transform the value of the player to the match value express in €M
function transform(value){
    return (parseInt(value)/1000000) + "M€";
}


function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("firstTeam_table");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}