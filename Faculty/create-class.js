const validateForm = ({courseName, date, time, link}) => {

    if (courseName.length <= 0) return { msg: 'invalid courseName', sts: false }
    if (date.length <= 0) return { msg: 'invalid date', sts: false }
    if (time.length <= 0) return { msg: 'invalid time', sts: false }
    if (link.length <= 0) return { msg: 'invalid link', sts: false }
    
    return { sts: 'success', msg: 'all fields are valid' }
}

function setupForm() {

    const err = document.getElementById('errMsg')
    err.style.display = 'none'

    const formSignup = document.getElementById('new-event-link')

    formSignup.onsubmit = ev => {
        ev.preventDefault()

        const formData = new FormData(ev.target)

        const user = Object.fromEntries(formData.entries())
        console.log(user)

        const { sts, msg } = validateForm(user)

        if (sts) apiSignup(user, formSignup)
        else {
            err.style.display = 'block'
            err.innerHTML = `<strong>${msg}</strong>`
        }
    }
}

setupForm()

function apiSignup(user, form) {
    const headers = {
        'content-type': 'application/json'
    }
    axios.post('http://localhost:8280/classes/', user, { headers })

        .then(res => {
            form.reset()
            showSuccessModal()
        }).catch(err => console.log(err))
}

function showSuccessModal() {
    const myModalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
}

function logOut() {
    localStorage.setItem("userId", null)
    window.location.href = "../Student/Student-classes.html"
}
