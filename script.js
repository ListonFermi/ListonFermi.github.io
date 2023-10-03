
window.onscroll=()=>{
    let header=document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100)
}

// toggle icon and nav bar

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick= () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

//Contact-Me form validation

$(document).ready(function(){
    $("#submit-form").validate({
        rules:{
            FullName:{
                required:true,
                minlength:4
            },
            Email:{
                required:true,
                email: true
            },
            Phone:{
                required:true,
                minlength:10
            },
            Message:{
                required:true
            }
        }
    })
})

//Contact-Me form submission

$("#submit-form").submit((e)=>{
    e.preventDefault()
    $.ajax({
        url:"https://script.google.com/macros/s/AKfycbzOsjRck7maH-9CA-ggtilJgbTkgqId54-nRiouxkPoTRuftqZhMGhK04oO9R22FsHnsQ/exec",
        data:$("#submit-form").serialize(),
        method:"post",
        success:function (response){
            alert("Form submitted successfully")
            window.location.reload()
            //window.location.href="https://google.com"
        },
        error:function (err){
            alert("Something Error")

        }
    })
})
