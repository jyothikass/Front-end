function setupTable() {
    const table = document.getElementById('studenttable')

    // const btnSearch = document.getElementById('btnSearch')
    
    //  btnSearch.onclick = () =>   {

    //      const api=apiFetchBooking(table, document.getElementById('id').value )
    //      console.log(api)
    // }
    
    apiFetchAllbookings(table)
}



function setUpTable() {
    const table = document.getElementById('studenttable')
    const courseSearch = document.getElementById('courseSearch')


    btnSearch.onclick = () => {

        const searchTerm = courseSearch.value.trim()

        if (searchTerm === '') {
            alert('Please enter the course')
            return
        }

        apiFetchAllCourseByName(table, document.getElementById('courseSearch').value)

    }

    apiFetchAllCourses(table)

}





 setupTable()


function propulateActualData(table, classes) {
    while (table.rows.length > 1) {
        table.deleteRow(1)
    }
    for(const classe of classes) {
        console.log(classe)
        const {id, courseName, date, time, link } = classe
       

        const row = table.insertRow()
        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = courseName
        row.insertCell(2).innerHTML = date
        row.insertCell(3).innerHTML = time
        row.insertCell(3).innerHTML = link
        
         
        
    }
}



function apiFetchAllbookings(table) {
    axios.get('http://localhost:8280/classes/fetch')
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
    const url = `http://localhost:8280/classes/${id}`
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

function apiFetchAllCourseByName(table, courseValue) {
    const url = 'http://localhost:8280/classes/name'
    axios.get(url, {
        params: {
            courseName: courseValue
        }
    })
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data

            if (bd.length === 0) alert("No course found")

            populateActualData(table, bd)


        })
        .catch(err => console.log(err))
}


console.log("View page")
function goBack() {
    window.history.back();
}
