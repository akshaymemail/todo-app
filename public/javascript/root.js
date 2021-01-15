document.getElementById('menubar').addEventListener('click',function(){
    document.getElementById('sidebar').classList.toggle('opensidebar');
})

document.getElementsByClassName('closeBtnSide')[0].addEventListener('click',function(){
    document.getElementById('sidebar').classList.remove('opensidebar');
})

document.getElementsByClassName('box')[0].addEventListener('click',function(){
    document.getElementById('sidebar').classList.remove('opensidebar')
})

document.getElementsByTagName('button')[0].addEventListener("click",function(){
    new Audio('click.mp3').play()
    document.getElementsByTagName('button')[0].classList.add('pressed')
    setTimeout(() => {
        document.getElementsByTagName('button')[0].classList.remove('pressed')
    }, 200);
})