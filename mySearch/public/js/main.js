function submit(){


    var key=document.getElementById("key").value
    location.href=location.href+"list?query="+encodeURIComponent(key)


}