$('#menubar').click(()=>{
    $('#sidebar').addClass('opensidebar')
})

$('.container, .closeBtnSide').click(()=>{
    $('#sidebar').removeClass('opensidebar')
})


document.getElementsByTagName('button')[0].addEventListener("click",function(){
    new Audio('click.mp3').play()
    document.getElementsByTagName('button')[0].classList.add('pressed')
    setTimeout(() => {
        document.getElementsByTagName('button')[0].classList.remove('pressed')
    }, 200);
})

// profiles

$('#profile').click(() => {
    $('#profile-card').toggle("active")
})

$('.container').click(() => {
    $('#profile-card').css('display', 'none')
})

// ------------------Modals----------------

$('#floating, #close, #close-modal').click(() => {
    $('.modal').toggle('active')
})
