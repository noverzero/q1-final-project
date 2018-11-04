document.addEventListener("DOMContentLoaded", function(){ console.log("developed by undefinedindustries.com")

    axios.get('https://www.eventbriteapi.com/v3/users/me/owned_events/?token=T4AWNLBLNDQD32SYGHHI&status=live&order_by=start_desc&expand=ticket_classes')
    .then(function(response){
      console.log("response.data:::" , response.data)

      let eventsArr = []

      function getEvents(){
        eventsArr = response.data.events
        return eventsArr
      }
      getEvents()
      //console.log("getEvents()" , getEvents())


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

      //let venueArr = []


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
