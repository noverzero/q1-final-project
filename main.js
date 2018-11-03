document.addEventListener("DOMContentLoaded", function(){ console.log("developed by undefinedindustries.com")

axios.get('https://www.eventbriteapi.com/v3/events/45627816026/ticket_groups/?token=T4AWNLBLNDQD32SYGHHI&expand=tickets')
.then(function(res){
  console.log(res.data)
  for(let ii=0; ii < res.data.ticket_groups.length; ii++){
    let ticketGroup = res.data.ticket_groups[ii]
    console.log(ticketGroup.name, ticketGroup.tickets.length)
}

})





})
