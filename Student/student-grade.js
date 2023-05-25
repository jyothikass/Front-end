function setupTable() {
    const table = document.getElementById('studenttable')


    
    apiFetchAllbookings(table)
}

 setupTable()


function propulateActualData(table, userBookings) {
    while (table.rows.length > 1) {
        table.deleteRow(1)
    }
    for(const userBooking of userBookings) {
        console.log(userBooking)
        const {id, name, assignmentName, feedback, grade } = userBooking 
       

        const row = table.insertRow()
        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = name
        row.insertCell(2).innerHTML = assignmentName
        row.insertCell(3).innerHTML = feedback
        row.insertCell(3).innerHTML = grade
        
         
        
    }
}



function apiFetchAllbookings(table) {
    axios.get('http://localhost:8280/grades/fetch')
        .then(res => {
           
            const { data } = res
             
            const { sts, msg, bd } = data
            console.log(data) 
            propulateActualData(table, bd)
        })
        .catch(err => console.log(err))
}

function apiFetchBooking(table, id) {
    console.log(table)
    console.log(id)
    const url = `http://localhost:8280/grades/${id}`
    axios.get(url,{
        params: {
            id: id
        }
    })
        .then(res => {
            const { data } = res
            console.log(data)  
            const { sts, msg, bd } = data

            propulateActualData(table, bd)
        })
        .catch(err => console.log(err))
}


console.log("View page")
function goBack() {
    window.history.back();
}
