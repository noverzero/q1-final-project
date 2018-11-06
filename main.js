document.addEventListener("DOMContentLoaded", function(){ console.log("developed by undefinedindustries.com")

//Server call for event data
    axios.get('https://www.eventbriteapi.com/v3/users/me/owned_events/?token=T4AWNLBLNDQD32SYGHHI&status=live&order_by=start_desc&expand=ticket_classes')
    .then(function(response){
      console.log("response.data:::" , response.data)

//create a variable and set it equal to our first level of relevant data for easy access
      const eventsArr = response.data.events
      console.log("eventsArr!!!!" , eventsArr)

//create an array of headliner names
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

//Build the table!

      function createMainRows(){
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
          let savingsCellContents = document.createTextNode(`need`)
          savingsCell.appendChild(savingsCellContents)
          newRow.appendChild(savingsCell)

          let tableBody = document.getElementsByTagName("tbody")[0]
          console.log(`This is tableBody:: ${tableBody}`)
          tableBody.appendChild(newRow)
        }
      }
      createMainRows()



      //create object with key = pick-up location name, value = quantity_sold
      // ridersByLocation[ticketClasses[ii].name.substring(5, 10)] = ticketClasses[ii].quantity_sold
      // let ridersByLocation = {}
      // console.log("ridersByLocation*****" , ridersByLocation)

    })
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

})
