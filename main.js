document.addEventListener("DOMContentLoaded", function(){ console.log("developed by undefinedindustries.com")

  //create 'calculate' button event listener and calculate function.
  let calculate = document.getElementById('calculate')
  calculate.addEventListener("click" , function(){
    console.log("I hear a click!")

    //Server call for event data
    axios.get('https://www.eventbriteapi.com/v3/users/me/owned_events/?token=T4AWNLBLNDQD32SYGHHI&order_by=start_desc&expand=ticket_classes')
    .then(axiosDone)

    function axiosDone(response){
      console.log("response.data:::" , response.data)

    //create a variable and set it equal to our first level of relevant data for easy access
      const eventsArr = response.data.events
      console.log("eventsArr!!!!" , eventsArr)

      localStorage.setItem("array" , JSON.stringify(eventsArr))

      loadStored()
    }
  })

  function loadStored(){
  //retreive previous stored eventsArr from local storage
    let storedEvents = JSON.parse(localStorage.getItem("array"))
  //  console.log("eventsArr:o :o :o :o" , storedEvents)

    if(storedEvents){
      //create an array of headliner names
      let eventsArr = storedEvents
      let headlinersArr = []
      function getHeadliners(){
        for(let ii = 0; ii < eventsArr.length; ii++){
        headlinersArr.push(eventsArr[ii].name.text.substring((0), eventsArr[ii].name.text.indexOf("*")-1))
        }
        return headlinersArr
      }
      //getHeadliners()
      console.log("getHeadliners():::" , getHeadliners())

      let datesArr = []
      function getDates(){
        for(let ii = 0; ii < eventsArr.length; ii++){
        datesArr.push(eventsArr[ii].start.local.substring(0, 10))
        }
        return datesArr
      }
      //getDates()
      console.log("getDates()!!!" , getDates())

      let venuesArr = []
      function getVenues(){
        for(let ii = 0; ii < eventsArr.length; ii++){
          venuesArr.push(eventsArr[ii].name.text.substring((eventsArr[ii].name.text.lastIndexOf("*")+5), eventsArr[ii].name.text.lastIndexOf("(")-1))
        }
        return venuesArr
      }
      //getVenues()
      console.log("getVenues()>>>>" , getVenues())

            //Write a function that takes the eventsArr, and returns an Array with the sum of riders from all locations as an index an array.
            //iterate through the eventsArr
            //iterate through each pick up location.
            //get the quantity and add it to the eventTotal accumulator variable for that event
            //push the total to the totalRidersArr
            //

      let totalRidersArr = []
      function getRidersTotal(){
        for(let ii = 0; ii < eventsArr.length; ii++){
          let ticketClasses = eventsArr[ii].ticket_classes
          let eventTotal = 0
          for(let ii = 0; ii < ticketClasses.length; ii++){
            eventTotal += ticketClasses[ii].quantity_sold
          }
          totalRidersArr.push(eventTotal)
        }
        console.log("totalRidersArr:o:o:o:o: " , totalRidersArr)
      }
      getRidersTotal()

//begin fuel savings calculation
      let miles = {
        boulderRrx: 54.2,
        focoRrx: 145.4,
        denverRrx: 43.2,
        boulderDen: 54.8,
        focoDen: 126.4,
        denverDen: 0,
        boulder1stbank: 25.8,
        foco1stbank: 99.6,
        denver1stbank: 31.6,
      }
      //create object of MPG and average capacity for bus
      let bus = {
        mpg: 7,
        cap: 48,
      }
      //create object of MPG and average capacity for car (this will be editable by user)
      let car={
        mpg: 30,
        cap: 3,
      }

      let carFuelArr = []
      let busFuelArr = []
      let fuelSavingsArr = []
      function getFuelSavings(){
        for(let ii = 0; ii < totalRidersArr.length; ii++){
          let busesUsed = Math.ceil(totalRidersArr[ii] / bus.cap)
          let busFuel = Math.round(busesUsed * miles.boulderRrx / bus.mpg)
          busFuelArr.push(busFuel)

          let carsReplaced = Math.ceil(totalRidersArr[ii] / car.cap)
          let carFuel = Math.round(carsReplaced * miles.boulderRrx / car.mpg)
          carFuelArr.push(carFuel)

          fuelSavingsArr.push(carFuel - busFuel)
        }
        console.log("fuelSavingsArr}}DDDDD" , fuelSavingsArr)
      }
      getFuelSavings()


  //Build the table!

        function createMainRows(){
          let tableBody = document.getElementsByTagName("tbody")[0]
          while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild)
            }
          for(let ii = 0; ii < eventsArr.length; ii++){
            let newRow = document.createElement("tr")
            newRow.class = "btsorange"

            let dateCell = document.createElement("td")
            let dateCellContents = document.createTextNode(`${datesArr[ii]}`)
            dateCell.appendChild(dateCellContents)
            newRow.appendChild(dateCell)

            let headlinerCell = document.createElement("td")
            let headlinerCellContents = document.createTextNode(`${headlinersArr[ii]}`)
            headlinerCell.appendChild(headlinerCellContents)
            newRow.appendChild(headlinerCell)

            let venueCell = document.createElement("td")
            let venueCellContents = document.createTextNode(`${venuesArr[ii]}`)
            venueCell.appendChild(venueCellContents)
            newRow.appendChild(venueCell)

            let ridersCell = document.createElement("td")
            let ridersCellContents = document.createTextNode(`${totalRidersArr[ii]}`)
            ridersCell.appendChild(ridersCellContents)
            newRow.appendChild(ridersCell)

            let savingsCell = document.createElement("td")
            let savingsCellContents = document.createTextNode(`${fuelSavingsArr[ii]}`)
            savingsCell.appendChild(savingsCellContents)
            newRow.appendChild(savingsCell)

            console.log(`This is tableBody:: ${tableBody}`)
            tableBody.appendChild(newRow)
          }
        }
        createMainRows()

        function sortTable() {
          let table, rows, switching, i, x, y, shouldSwitch;
          table = document.getElementById("myTable");
          switching = true;
          /*Make a loop that will continue until
          no switching has been done:*/
          while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 1; i < (rows.length - 1); i++) {
              //start by saying there should be no switching:
              shouldSwitch = false;
              /*Get the two elements you want to compare,
              one from current row and one from the next:*/
              x = rows[i].getElementsByTagName("TD")[0];
              y = rows[i + 1].getElementsByTagName("TD")[0];
              //check if the two rows should switch place:
              if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
              }
            }
            if (shouldSwitch) {
              /*If a switch has been marked, make the switch
              and mark that a switch has been done:*/
              rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
              switching = true;
            }
          }
        }
        sortTable()

          let riderSum = totalRidersArr.reduce((accumulator, currentValue) => accumulator + currentValue)

          let savedSum = fuelSavingsArr.reduce((accumulator, currentValue) => accumulator + currentValue)

          let carSum = carFuelArr.reduce((accumulator, currentValue) => accumulator + currentValue)

          let busSum = busFuelArr.reduce((accumulator, currentValue) => accumulator + currentValue)

          function buildSummary(){
            let events = document.getElementById("events")
              events.innerText= `# of Events: ${eventsArr.length}`
            let riders = document.getElementById("riders")
              riders.innerHTML=`# of Riders: ${riderSum}`
            let saved = document.getElementById("saved")
              saved.innerText=`Gallons Saved: ${savedSum}`
            let carpool = document.getElementById("carpool")
              carpool.innerText=`Avg: ${car.cap} ppl / ${car.mpg} mpg car`
          }
          buildSummary()
          let busPercent = Math.round((busSum / (busSum + carSum)*100))
        console.log(`busPercent` , busPercent )
          let carPercent = Math.round((carSum / (busSum + carSum)*100))
        console.log(`carPercent` , carPercent )

          function buildVisualizer(){
            let busBar = document.getElementById("busBar")
            busBar.style.paddingBottom = `${busPercent}%`
              console.log("busBar>>>>:", busPercent)
            let carBar = document.getElementById("carBar")
            carBar.style.paddingBottom = `${carPercent}%`
              console.log("carBar>>>>:", carPercent)
          }
          buildVisualizer()

    } else {
      axios.get('https://www.eventbriteapi.com/v3/users/me/owned_events/?token=T4AWNLBLNDQD32SYGHHI&order_by=start_desc&expand=ticket_classes')
      .then(axiosDone)

      function axiosDone(response){
        console.log("response.data:::" , response.data)

      //create a variable and set it equal to our first level of relevant data for easy access
        const eventsArr = response.data.events
        console.log("eventsArr!!!!" , eventsArr)

        localStorage.setItem("array" , JSON.stringify(eventsArr))

        loadStored()
      }
    }
  }
  loadStored()



})


//BONEYARD

//fuel per bus = roundtrip miles / bus mpg

//bus fuel consumed per event = fuel per bus * number of buses used
//
//calculate parallel universe car fuel consumed
//number of cars used = number of riders / average car capacity
//fuel per car = roundtrip miles / car MPG
//car fuel consumed per event = fuel per car * number of cars used
//
//calculate fuel savings for each event
//fuel not consumed = parallel universe fuel consumed per event - bus fuel consumed per event
//
//total fuel saved = sum of fuel not consumed throughout all events in question.

//only display date range (Last 50, 2018, Live, top 10, userInput)
//only display headliner === userInput

//function findHeadliner()

// axios.get('https://www.eventbriteapi.com/v3/users/me/owned_events/?token=T4AWNLBLNDQD32SYGHHI&status=live&order_by=start_desc&expand=ticket_classes')
// .then(function(response){
//   console.log("this is response.data::" , response.data)
//   for(let ii=0; ii < response.data.events.length; ii++){
//     let myEvent = response.data.events[ii]
//           console.log("this is myEvent.name.text::" , myEvent.name.text)
//           let headliner = myEvent.name.text.substring((0), myEvent.name.text.indexOf("*")-1)
//           console.log("this is headliner:::" , headliner)
//           // var res = str.substring(str.indexOf("e"), str.indexOf("o"))
//           for(let ii=0; ii < myEvent.ticket_classes.length; ii++){
//                 let ticketClass = myEvent.ticket_classes[ii]
//                 console.log("this is ticketClass.name::" , ticketClass.name, "this is quantity sold::" , ticketClass.quantity_sold)
//               }
//   }
// })
