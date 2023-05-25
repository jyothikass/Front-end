function setupTable() {
    const table = document.getElementById('studenttable')

    // const btnSearch = document.getElementById('btnSearch')
    
    //  btnSearch.onclick = () =>   {

    //      const api=apiFetchBooking(table, document.getElementById('id').value )
    //      console.log(api)
    // }
    
    apiFetchAllbookings(table)
}

 setupTable()


function propulateActualData(table, classes) {
    while (table.rows.length > 1) {
        table.deleteRow(1)
    }
    for(const classe of classes) {
        console.log(classe)
        const {id, courseName, courseId, name} = classe
        const viewPageUrl = `../Student/student-courses.html?id=${id}`

        const row = table.insertRow()
        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = courseName
        row.insertCell(2).innerHTML = courseId
        row.insertCell(3).innerHTML = name
        row.insertCell(4).innerHTML = `
            <a class = "btn btn-primary" href='${viewPageUrl}'>View</a>
            <a class="btn btn-danger" onclick='deleteCourse(${id})'>Cancel</a>`
        
         
        
    }
}



function apiFetchAllbookings(table) {
    axios.get('http://localhost:8280/enroll/fetch')
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
    const url = `http://localhost:8280/enroll/${id}`
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

function deleteCourse(id) {
    console.log(id)
    //id = Number(id);
    axios.delete(`http://localhost:8280/enroll/${id}`)
        .then(function (response) {
            console.log('Course deleted')
            window.alert("Course deleted successfully")

        })
        .catch(function (error) {
            // Handle error response
            console.log(error)
        })
}

console.log("View page")
function goBack() {
    window.history.back();
}

