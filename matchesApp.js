let requestUrl = 'https://francescofassino.github.io/Arsenal-UnOfficial-Site/scoreboard.json'; 
let request = new XMLHttpRequest();
request.open('GET', requestUrl);
request.responseType = 'json';
request.send();

request.onload = function(){
    // #   Image   Team    Games Played     Wins    Losses    Ties    Goals Scored    Goal Conceded      Goal Difference     Points   
    const data = request.response;
    const table_body = document.querySelector('#matchesTable_body');
    // week [from 0 to 37]
    const prem_week = data.week;
    // teams [from 0 to 19]
    const teams = data.teams;
    let columns, row, stats;
    for(let i = 0; i < 20; i++){
        row = document.createElement('tr');
        stats = getStats(prem_week, teams[i].name);
        columns = `   
            <td scope="row">${(i+1)}</td>
            <td><img height="20px" class="img-thumbnail" src="team_images/${teams[i].code}.png"></td>
            <td>${teams[i].name}</td>
            <td>${stats[0]}</td>
            <td>${stats[1]}</td>
            <td>${stats[2]}</td>
            <td>${stats[3]}</td>
            <td>${stats[4]}</td>
            <td>${stats[5]}</td>
            <td>${stats[6]}</td>
            <td style="font-weight: bold;">${stats[7]}</td>
        `;
        row.innerHTML = columns;
        table_body.appendChild(row);
    }
    sortTable(10, "desc");
}

// this function get as parameters the prem_week array, which contains all the matches for every week
// and the team_name to calculate the stats from  
function getStats(prem_week, team_name){
    // [games played, wins, losses, ties, goal scored, goal conceded, goal difference, points]
    let stats=[], score=[];
    // wins, losses, ties, games played, goal scored, goal conceded, goal difference, points
    let team1, team2, wins=0, losses=0, ties=0, games_played=0, goal_scored=0, goal_conceded=0, goal_difference=0, pts=0;
    for(let i = 0; i < prem_week.length; i++){
        for(let j = 0; j < prem_week[i].matches.length; j++){
            team1 = prem_week[i].matches[j].team1;
            team2 = prem_week[i].matches[j].team2;
            // split the score in an array of two cells: score[0] and score[1]
            score = prem_week[i].matches[j].score.split("-");
            // if i find the team I'm looking for
            if(team1 == team_name || team2 == team_name){
                // if the match has been played and score and is not "NP" (Not Played)
                if(score[0] != "NP" && score[0] != "NP"){
                    // parseInt() score[0] and score[1]
                    score[0] = parseInt(score[0]);
                    score[1] = parseInt(score[1]);
                    // if the team searched is the first
                    if(team1 == team_name){
                        if(score[0] > score[1]){
                            // if the first score is grather than the second one it's a win
                            wins++;
                        }else if(score[0] < score[1]){
                            // if the first score is smaller than the second one it's a loss
                            losses++;
                        }else{
                            ties++;
                        }
                        // goal scored = goal scored + the first score
                        goal_scored += (score[0]);
                        goal_conceded += (score[1]);
                    }
                    // if the team searched is the second
                    else{
                        if(score[0] > score[1]){
                            losses++;
                        }else if(score[0] < score[1]){
                            wins++;
                        }else{
                            ties++;
                        }
                        goal_scored += score[1];
                        goal_conceded += score[0];
                    }
                }
            }
        }
    }
    // goal difference is goal scored - goal conceded
    goal_difference = goal_scored - goal_conceded;
    games_played = wins + losses + ties;
    // points = wins * 3 + ties * 1
    pts = wins * 3 + ties;

    stats[0] = games_played;
    stats[1] = wins;
    stats[2] = losses;
    stats[3] = ties;
    stats[4] = goal_scored;
    stats[5] = goal_conceded;
    stats[6] = goal_difference;
    stats[7] = pts;
    return stats;
}

// function that changes the visibility of the table according to the sort selected
// points order(default), wins order, losses order, ties order, goal scored order, goal conceded order, goal difference order
function sortTable(n, dir = "asc") {
    let table, rows, switching, i, x, y, shouldSwitch, switchcount = 0;
    table = document.getElementById("matchesTable");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName('td')[n];
        y = rows[i + 1].getElementsByTagName('td')[n];
        if (dir == "asc") {
            if(parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
              shouldSwitch = true;
              break;
            }
        } else if (dir == "desc") {
            if(parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
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

    adjust(table);
  }
  
  function adjust(table){
    let rows = table.rows;
    let cols = table.cols;
    for(let i = 1; i < rows.length; i++) {
        rows[i].children[0].innerHTML = i;
    }
  }