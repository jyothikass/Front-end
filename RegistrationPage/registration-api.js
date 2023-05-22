const validateForm=({role,name,email,password}) =>{

    function isvalidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    const roles=document.getElementById('roles')
    
    if(!roles.value) return {msg:'Please select the role', sts: false}
    if(name.length < 4) return {msg:'Please enter a valid name', sts: false}
    if(isvalidEmail()) return {msg:'Please enter a valid email ', sts: false}
    if(password.length<=6 ) return {msg:'Please enter a valid password ', sts: false}
    if (!isvalidEmail || password.length<=5 ) return {msg:'Please enter a valid email and password', sts: false}
    

    return {sts: 'success', msg:'Valid registration"'}
}

function setUpRegistrationForm() {

    const errDiv=document.getElementById('errDiv')
    errDiv.style.display='none'

    const formRegistration = document.getElementById('formRegistration')
    formRegistration.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const formData=new FormData(event.target)
        const registration = Object.fromEntries(formData.entries())
        console.log(registration)
        
        const {sts,msg} =validateForm((registration))
        if(sts) apiRegisterUser(registration, formRegistration);
        else{
            errDiv.style.display='block'
            errDiv.innerHTML=`<strong>${msg}</strong>`
        }
    });
}

function onAgreement() {

    var agrement = document.getElementById('agreement');
    console.log(agrement.checked);
    if (agrement.checked) {
        document.getElementById('submitId').disabled = false;
    } else {
        document.getElementById('submitId').disabled = 'disabled';
    }

}

function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function ValidePassword() {
    var userPassword = document.getElementById('password');
    var userConfirmPassword = document.getElementById('password1');

    var userPasswordvalue = password.value;
    var userConfirmPasswordvalue = password1.value;
    console.log(userPasswordvalue);
    if (userPasswordvalue != null && userPasswordvalue != ""
        && userPasswordvalue.length > 4
        && userPasswordvalue.length < 12) {
        if (userPasswordvalue == userConfirmPasswordvalue) {
            console.log('valide both password are same');
            document.getElementById('passwordCompare').innerHTML = '';
        } else {
            console.log('valide both password are not same');
            document.getElementById('passwordCompare').innerHTML = 'Password and ConfirmPassword must be same';
        }
        console.log('valide password');
        document.getElementById('passwordError').innerHTML = '';
    } else {
        console.log('invalide password');
        document.getElementById('passwordError').innerHTML = 'Plese enter valide password';
    }
}


setUpRegistrationForm()


function apiRegisterUser(registration, form) {

    const headers = {
        'content-type': 'application/json'

    }

    axios.post('http://localhost:8280/users/register', registration, { headers })  
        .then(res => {
            console.log(res.data)
            //showSuccessModal()
            alert("User Registered Successfully")
            window.location.href="../Loginpage/login.html"
            form.reset()
           
            
        })
        .catch(err => {
            console.log(err)
            alert("User Registration unsuccessful")
        })
}


// function showSuccessModal() {
//     const myModalEl = document.getElementById('successModal');
//     const modal = new bootstrap.Modal(myModalEl)
//     modal.show()
// }