// const readIdQueryParam = () => {
//     const params = new Proxy(new URLSearchParams(window.location.search), {
//         get: (searchParams, prop) => searchParams.get(prop),
//     });
//     return params.id
// }

// function apiGetCourseDetails() {
//     const id = readIdQueryParam()

//     axios.get('http://localhost:8280/course/fetch')
//         .then(httpReponse => httpReponse.data)
//         .then(data => populateTableDetails(data.bd))
//         .catch(err => console.log(err))
// }

// // function populateDetails({ id, courseName, facultyName, startDate, endDate, material, recording }) {
// //     // populating invoice details without table
// //     document.getElementById("invId").innerHTML = `<strong> Id </strong> : ${id}`
// //     document.getElementById("client").innerHTML = `<strong> Client </strong> : ${client}`
// //     document.getElementById("amt").innerHTML = `<strong> Amount </strong> : ${amt}`
// //     document.getElementById("invDt").innerHTML = `<strong> Date </strong> : ${invDt}`
// // }

// function populateTableDetails({ id, courseName, facultyName, startDate, endDate, material, recording }) {
//     // populating invoice details inside a table
//     const table = document.getElementById('tableDetails')
//     const row = table.insertRow()
//     row.insertCell(0).innerHTML = id
//     row.insertCell(1).innerHTML = courseName
//     row.insertCell(2).innerHTML = facultyName
//     row.insertCell(3).innerHTML = startDate
//     row.insertCell(4).innerHTML = endDate
//     row.insertCell(5).innerHTML = material
//     row.insertCell(6).innerHTML = recording

// }

// apiGetCourseDetails()






function setUpTable() {
    const table = document.getElementById('tableCourse')
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







setUpTable()

function populateActualData(table, courses) {


    while (table.rows.length > 1) {
        table.deleteRow(1)
    }

    if (courses.length === 0) {
        alert('No course found')
        const row = table.insertRow()
        const cell = row.insertCell(0)
        cell.colSpan = 7
        cell.innerHTML = 'No courses found.'
        return
    }



    for (const course of courses) {

        const { id, courseName, facultyName, startDate, endDate, material, recording } = course
        const updatePageUrl = `./update-course.html?id=${id}`


        // './update-course.html?id=${id}'
        const viewPageUrl = `./view-course.html?id=${id}`

        const row = table.insertRow()

        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = courseName
        row.insertCell(2).innerHTML = facultyName
        row.insertCell(3).innerHTML = startDate
        row.insertCell(4).innerHTML = endDate
        row.insertCell(5).innerHTML = material
        row.insertCell(6).innerHTML = recording
        row.insertCell(7).innerHTML=`
        <a class = "btn btn-primary" href='${updatePageUrl}'>Enroll</a> `
        // row.insertCell(7).innerHTML = `
        //     <a class = "btn btn-primary" href='${viewPageUrl}'>View</a>
        //     <a class = "btn btn-primary" href='${updatePageUrl}'>Enroll</a>
        //   <a class="btn btn-danger" onclick='deleteCourse(${id})'>Delete</a>
        //   `

    }
}

function apiFetchAllCourse(table) {
    axios.get('http://localhost:8280/course/fetch')
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
    axios.delete(`http://localhost:8280/course/${id}`)
        .then(function (response) {
            console.log('Course deleted')
            window.alert("Course deleted successfully")

        })
        .catch(function (error) {
            // Handle error response
            console.log(error)
        })
}


function apiFetchAllCourseByName(table, courseValue) {
    const url = 'http://localhost:8280/course/name'
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



// function showConfirmDeleteModal(id) {
//     console.log('clicked ' + id)
//     const myModalEl = document.getElementById('deleteModal');
//     const modal = new bootstrap.Modal(myModalEl)
//     modal.show()


//     const btDl = document.getElementById('btDl')
//     btDl.onclick = () => {
//         apiCallDeleteCourse(id, modal)
//     }
// }

// function showConfirmDeleteModal(id) {

//     document.getElementById('confirm-delete-btn').addEventListener('click', function(){
//         axios.delete('http://localhost:8080/course/${id}')
//         .then(res => res.data) 
//         .then( () =>  window.alert("Student deleted successfully"))
//         .catch(console.log)
//     })


// }




function apiFetchAllCourses(table) {
    axios.get('http://localhost:8280/course/fetch')
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data
            populateActualData(table, bd)
        })
        .catch(err => console.log(err))
}

// function apiCallDeleteCourse(id, modal){
//     const url= 'http://localhost:8080/course/${id}'
//     axios.delete(url)
//         .then(res => res.data)
//         .then( ({ sts, msg, bd }) =>  modal.hide() )
//         .catch(console.log)
// }


