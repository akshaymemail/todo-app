// fires up when confirmPassword fires
$('#confirmPassword, #password').keyup( () => {
    // password
    const password = $('#password')
    // confirm Password

    const confirmPassword = $('#confirmPassword')

    // match the password
    if(password.val() === confirmPassword.val()){
        // password is matched 
        confirmPassword.css('border-bottom', 'dashed 3px #A683E3')
        $('#submitbtn').prop('disabled',false)
    }else{
        // password didn't match
        confirmPassword.css('border-bottom', 'dashed 3px red')
        $('#submitbtn').prop('disabled',true)
    }
})