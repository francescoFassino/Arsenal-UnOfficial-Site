let requestUrl = 'https://francescofassino.github.io/Arsenal-UnOfficial-Site/players_data.json'; 
let request = new XMLHttpRequest();
request.open('GET', requestUrl);
request.responseType = 'json';
request.send();

request.onload = function(){
    const data = request.response;
    let currentPlayer, element_card, card, rowTable, roleString, role;
    const goalkeepers = document.querySelector("#goalkeepers");
    const defenders = document.querySelector("#defenders");
    const midfielders = document.querySelector("#midfielders");
    const attackers = document.querySelector("#attackers");
    for(let i in data.players){
      card = document.createElement('div');
      rowTable = document.createElement('tr');
      currentPlayer = data.players[i];

      // elemento card del giocatore
      element_card = `
      <div class="col">
        <div class="card h-100" style="width: 18rem;" >
          <img src="${currentPlayer.pictures[1]}" class="card-img-top" alt="card image">
          <div class="card-body">
            <p class="card-text text-center">
              <span class="badge rounded-pill text-bg-danger">${currentPlayer.number}</span>
               ${currentPlayer.name}
            </p>
          </div>
        </div>
      </div>  
      `;

      card.innerHTML = element_card;

      // dividere in base al ruolo
      roleString = JSON.stringify(currentPlayer.role);
      role = JSON.parse(roleString);
      switch(role){
        case "goalkeeper":
          goalkeepers.appendChild(card);
          break;
        case "defender":
          defenders.appendChild(card);
          break;
        case "midfielder":
          midfielders.appendChild(card);
          break;
        case "attacker":
          attackers.appendChild(card);
          break;    
        default:
          console.log("none");
          break;
      }
    }
} 


function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("firstTeam_table");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}