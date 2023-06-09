const registration = document.getElementById('register-page')
registration.addEventListener("click", (event) => {
  window.location.href = "./registration.html"
})

const validateForm = ({ email, password }) => {

  function isvalidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  //if (!email.validity.valid || !password.validity.valid) return {msg:'Please enter a valid email and password', sts: false}
  if (!isvalidEmail(email)) return { msg: 'Please enter a valid email ', sts: false }
  if (password.length <= 6) return { msg: 'Please enter a valid password ', sts: false }

  return { sts: 'success', msg: 'Valid email and password' }
}

function setUpLoginForm() {

  const errorDiv = document.getElementById('errorDiv');
  errorDiv.style.display = 'none'
  const formLogin = document.getElementById('formLogin');

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const login = Object.fromEntries(formData.entries());
    console.log(login)

    const { sts, msg } = validateForm(login)
    if (sts) apiLoginUser(login, formLogin)

    else {
      errorDiv.style.display = 'block';
      errorDiv.innerHTML = `<strong>${msg}</strong>`
    }

  });

}

setUpLoginForm()



function apiLoginUser(login, form) {

  const headers = {
    'content-type': 'application/json'

  }

  axios.post('http://localhost:8280/users/login', login, { headers })
    .then(res => {
      console.log(res)
      console.log(res.data.bd)
      form.reset()
      alert("Logged-in successfully")
      //showSuccessModal()
      return res.data
    })
    .then(data => {
      const role = data.bd
      if (role === 'student') {
        window.location.href = '../Student/student-dashboard.html'
      }
      else if (role === 'faculty') {
        window.location.href = '../Faculty/faculty-dashboard.html'
      }
      else window.location.href = '../Admin/admin-dashboard.html'
    })
    .catch(err => {
      console.log(err)
      const errorMsg = document.getElementById('errorDiv');
      errorMsg.style.display = 'block'
      errorMsg.innerHTML = `<strong>${err.response.data.msg}</strong>`

    })

}

const forgotPasswordLink = document.getElementById("forgot-password");

forgotPasswordLink.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "../Loginpage/forgot-password.html";
});

// function showSuccessModal() {
//   const myModalEl = document.getElementById('successModal');
//   const modal = new bootstrap.Modal(myModalEl)
//   modal.show()
// }

















