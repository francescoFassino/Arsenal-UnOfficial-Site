let requestUrl = 'https://francescofassino.github.io/Arsenal-UnOfficial-Site/players_data.json'; 
let request = new XMLHttpRequest();
request.open('GET', requestUrl);
request.responseType = 'json';
request.send();

request.onload = function(){
    const data = request.response;
    const playerTable = document.getElementById("firstTeam_body");
    let row, currentPlayer, role, roleString;
    let element_rowTable;
    for(let i in data.players){
      // creazione di un elemento
      row = document.createElement('tr');
      currentPlayer = data.players[i];

      element_rowTable = `
        <td><img class="img-fluid" src="${currentPlayer.pictures[0]}"></td>
        <td>${currentPlayer.number}</td>
        <td>${currentPlayer.name}</td>
        <td>${currentPlayer.nationality}</td>
        <td>${currentPlayer.birth}</td>
        <td>${(currentPlayer.value/1000000)+"M€"}</td>
      `;
      row.innerHTML = element_rowTable;
      roleString = JSON.stringify(data.players[i].role);
      role = JSON.parse(roleString);
      switch (role){
          case "goalkeeper":
              row.setAttribute("class", "table-warning");
              break;
          case "defender":
              row.setAttribute("class", "table-success");
              break;
          case "midfielder":
              row.setAttribute("class", "table-info");
              break;
          case "attacker":
              row.setAttribute("class", "table-danger");
              break;    
          default:
              console.log("none");
              break;    
      }
      playerTable.appendChild(row);
    }
}
  function sortTable(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("firstTeam");
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
        x = rows[i].getElementsByTagName('td')[n];
        y = rows[i + 1].getElementsByTagName('td')[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        console.log(n);
        if (dir == "asc") {
          // if the column is 0 or 4, parse it to sort 
          if(n == 1 || n == 5) {
            if(parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
              shouldSwitch = true;
              break;
            }
          } else {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        } else if (dir == "desc") {
          if(n == 1 || n == 5) {
            if(parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
              shouldSwitch = true;
              break;
            }
          } else {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
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