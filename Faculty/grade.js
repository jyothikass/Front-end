const validateForm= ({name,  assignmentName, grades, feedback}) => {

    if (name.length <= 0) return { msg: 'Invalid name', sts: false }
    if ( assignmentName.length <= 0) return { msg: 'Invalid assignment name', sts: false }
    if (grades.length <= 0) return { msg: 'Invalid grades', sts: false }
    if (feedback.length <= 0) return { msg: 'Invalid feedback', sts: false }
  

    return { sts: 'success', msg: 'All fields are valid' }

    
}


function apiCreateNewCourse(grades, form){
    const headers= {
        'content-type' : 'application/json'
    }
    axios.post('http://localhost:8280/grades/', grades, {headers})
        .then(res => {
            form.reset()
            window.alert("Grade added successfully")
            
            window.location.href="../Faculty/list-course.html"
            //showSuccessModal()
        })
        .catch(err => console.log(err))

}

function setUpForm(){
    const err=document.getElementById('errDiv')
    err.style.display='none'
    const formCourse=document.getElementById('formCourse')
    formCourse.onsubmit=ev => {
        ev.preventDefault()
        console.log(ev)
        const formData = new FormData(ev.target)
        const grades = Object.fromEntries(formData.entries())
        console.log(grades)
        const {sts, msg} = validateForm(grades)
        if (sts) apiCreateNewCourse(grades, formCourse)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }
    }
}

 setUpForm()

// function showSuccessModal(){
//     const myModalEl = document.getElementById('successModal');
//     const modal = new bootstrap.Modal(myModalEl)
//     modal.show()
// }

