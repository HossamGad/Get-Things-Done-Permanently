//fetchLists();
var Listor = document.getElementById("flex-container");
var Listsbuttons = document.getElementById("Lists-button");
function fetchRegister() {
    Listor.innerHTML = "";
    Listsbuttons.innerHTML = "";
    Listor.insertAdjacentHTML("beforeend", "<div><input id='get-username' type='text'placeholder='User namn..' /><div><input id='get-password' type='text'placeholder='Password...' /><div><input id='get-email' type='text'placeholder='Email...' /><button onclick='addUser()'>Registrera</button></div>");
}
function addUser() {
    var userInput = document.getElementById("get-username").value;
    var passwordInput = document.getElementById("get-password").value;
    var emailInput = document.getElementById("get-email").value;
    fetch('/api/auth/register', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            userName: userInput,
            password: passwordInput,
            email: emailInput,
        })
    })
        .then((res) => console.log("res", res))
        .catch(err => console.log(JSON.stringify(err)));
    alert("Registrerad");

    fetchLogin();
}
function fetchLogin() {
    Listor.innerHTML = "";
    Listsbuttons.innerHTML = "";
    Listor.insertAdjacentHTML("beforeend", "<div><input id='get-username' type='text'placeholder='User namn..' /><div><input id='get-password' type='text'placeholder='Password...' /><button onclick='login()'>Logga in</button></div>");
}
function login() {
    var userInput = document.getElementById("get-username").value;
    var passwordInput = document.getElementById("get-password").value;
    fetch('/api/auth/login', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            username: userInput,
            password: passwordInput,
        })
    })
        .then((res) => console.log("res", res))
        .catch(err => console.log(JSON.stringify(err)));
    var nav = document.getElementById("nav");
    nav.insertAdjacentHTML("beforeend", "<li id='logout'><a onclick='fetchLogout()'>Logga ut</a></li>");
    nav.insertAdjacentHTML("beforeend", "<li><a onclick='fetchLists()'>Listor</a></li>");
    nav.insertAdjacentHTML("beforeend", "<li><a onclick='deleteuser()'>Ta bort användaren</a></li>");
    var login = document.getElementById("login");
    login.style.display = "none";
    alert("Du är inloggad");
    fetchLists();
}
function deleteuser() {
    Listor.innerHTML = "";
    Listsbuttons.innerHTML = "";
    Listor.insertAdjacentHTML("beforeend", "<div><input id='get-username' type='text'placeholder='User namn..' /><div><input id='get-password' type='text'placeholder='Password...' /><div><button onclick='fetchdeleteUser()'>Avregistrera</button></div>");
}
// ta bort user
function fetchdeleteUser() {
    var userInput = document.getElementById("get-username").value;
    var passwordInput = document.getElementById("get-password").value;
    fetch('/api/auth/delete', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            username: userInput,
            password: passwordInput,
        })
    })
    .then((res) => console.log("res", res))
    .catch(err => console.log(JSON.stringify(err)));

    alert("tagit bort user");

    location.reload();
}
function fetchLogout() {
    fetch('/api/auth/logout', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
    })
        .then((res) => console.log("res", res))
        .catch(err => console.log(JSON.stringify(err)));
    var logout = document.getElementById("logout");
    logout.style.display = "none";
    alert("Du har loggat ut");
    location.reload();
}
function fetchLists() {
    fetch("/api/MinLista")
        .then(function (response) {
            return response.json();
        })
        .then(function (Lists) {
            Listor.innerHTML = "";
            Listsbuttons.innerHTML = "";
            if (Lists.length != 0) {
                Listor.insertAdjacentHTML("beforeend", "<p> Username: (" + " " + Lists[0].user + " " + ") </p>")
            }
            Listor.insertAdjacentHTML("beforeend", "<p> Listanamn / Beskrivning </p>")
            for (i = 0; i < Lists.length; i++) {
                Listor.insertAdjacentHTML("beforeend", "<div class='Lists-container' id='MinListaId' onclick='GetMinLista(" + Lists[i].id + ")'>" + Lists[i].minListaNamn + " " + Lists[i].beskrivning + "</div>")
            }
            Listor.insertAdjacentHTML("beforeend", "<div><input id='get-listname' type='text'placeholder='Lista namn..' /><div><input id='get-listtext' type='text'placeholder='Lista beskrivning...' /><button onclick='addLista()'>Lägg till lista</button></div>");
            Listor.insertAdjacentHTML("beforeend", "<div><button onclick='GuestLista()'>Visa inbjudna listor</button></div>");
        })
}
function GetMinLista(minListaId) {
    fetch("/api/MinLista")
        .then(function (response) {
            return response.json();
        })
        .then(function (List) {
            console.log(minListaId);
            Listor.innerHTML = "";
            Listsbuttons.innerHTML = "";
            var getList = List.find(a => a.id == minListaId)
            console.log(getList);
            Listor.insertAdjacentHTML("beforeend", "<div class='container'>" + getList.minListaNamn + "<br> " + getList.beskrivning + "</div>")
            Listsbuttons.insertAdjacentHTML("beforeend", "<button onclick=\'fetchuppgifter(" + getList.id + ")\'>Uppgifter</button>");
            Listsbuttons.insertAdjacentHTML("beforeend", "<button onclick=\'fetchusers(" + getList.id + ")\'> Bjuda in andra användare </button>");
            Listsbuttons.insertAdjacentHTML("beforeend", "<div id='list-button'><button onclick='deleteList(" + getList.id + ")'>Ta bort Lista</button></div>")
            Listsbuttons.insertAdjacentHTML("beforeend", '<div><button id=\'back\' onclick=\'fetchLists()\'>Gå tillbaka</button></div>');
            Listsbuttons.insertAdjacentHTML("beforeend", "<div><input id='get-list' type='text' value='" + getList.minListaNamn + "' /><div><input id='get-listText' type='text' value='" + getList.beskrivning + "' /><button onclick='editList(" + getList.id + ")'>Ändra Lista egenskaper</button></div>");
        })
}
//Add List
function addLista() {
    var nameInput = document.getElementById("get-listname").value;
    var textInput = document.getElementById("get-listtext").value;
    fetch('/api/MinLista', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            minListaNamn: nameInput,
            beskrivning: textInput,
        })
    })
        .then((res) => console.log("res", res))
        .catch(err => console.log(JSON.stringify(err)));
    alert("Lista skapad");
    fetchLists();
}
//Edit List
function editList(MinListaId) {
    var nameInput = document.getElementById("get-list").value;
    var textInput = document.getElementById("get-listText").value;
    fetch('/Api/MinLista/' + MinListaId, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PUT',
        body: JSON.stringify({
            id: MinListaId,
            minListaNamn: nameInput,
            beskrivning: textInput,
        })
    })
        .then((res) => console.log("res", res))
        .catch(err => console.log(JSON.stringify(err)));
    alert("Lista uppdaterad");
    fetchLists();
}
// Tar bort Lista
function deleteList(minListaId) {
    fetch('/Api/MinLista/' + minListaId, {
        method: 'DELETE'
    }).then(function (reponse) {
        response = reponse.json();
        return reponse;
    }).then(function (data) {
        console.log(data);
    });
    alert("tagit bort Lista");
}

function fetchuppgifter(minListaId) {
    fetch("/api/uppgifter")
        .then(function (response) {
            return response.json();
        })
        .then(function (uppgift) {
            Listor.innerHTML = "";
            Listsbuttons.innerHTML = "";
            Listor.insertAdjacentHTML("beforeend", "<p> uppgift namn </p>")
            for (i = 0; i < uppgift.length; i++) {
                if (uppgift[i].minListaId == minListaId) {
                    
                    if (uppgift[i].utford == true) {
                        Listor.insertAdjacentHTML("beforeend", "<div class='Lists-container' id='uppgiftid' onclick='getuppgiftid(" + uppgift[i].uppgiftId + ', ' + minListaId + ")'>" + uppgift[i].uppgiftNamn + " " + uppgift[i].text + "  " + uppgift[i].tag + "</div><input type='checkbox' onclick='checkbox(" + uppgift[i].uppgiftId + ', ' + false + ")' id='finished' name='check' value='finish'><label for='finished'>utförd/inte utförd</label><p><p/>")
                        document.getElementById('finished').checked = true;
                    }
                    else
                    {
                        Listor.insertAdjacentHTML("beforeend", "<div class='Lists-container' id='uppgiftid' onclick='getuppgiftid(" + uppgift[i].uppgiftId + ', ' + minListaId + ")'>" + uppgift[i].uppgiftNamn + " " + uppgift[i].text + "  " + uppgift[i].tag + "</div><input type='checkbox' onclick='checkbox(" + uppgift[i].uppgiftId + ', ' + true + ")' id='finished' name='check' value='finish'><label for='finished'>utförd/inte utförd</label><p><p/>")
                        document.getElementById('finished').checked = false;
                    }
                }  
            }
            Listsbuttons.insertAdjacentHTML("beforeend", "<div><input id='uppgift-namn' type='text' placeholder='uppgift namn..' /><input id='text' type='text' placeholder='Text..' /><input id='tag' type='text' placeholder='Tag..' /><button onclick='skapaUppgift(" + minListaId + ")'>Lägg till uppgift</button></div>");
            Listsbuttons.insertAdjacentHTML("beforeend", "<div><input id='tag2' type='text' placeholder='Tag..' /><button onclick='gettags()'>Hämta taggar</button></div>");
        })
}

function checkbox(uppgiftId, checked) {
    fetch('/Api/checkbox/' + uppgiftId, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PUT',
        body: JSON.stringify({
            uppgiftId: uppgiftId,
            utford: checked,
        })
    })
        .then((res) => console.log("res", res))
        .catch(err => console.log(JSON.stringify(err)));
    alert("Uppgiften utförd");
}

function gettags() {

    var tagInput = document.getElementById("tag2").value;

    fetch("/api/tags/" + tagInput)
        .then(function (response) {
            return response.json();
        })
        .then(function (uppgift) {
            Listor.innerHTML = "";
            Listsbuttons.innerHTML = "";
            Listor.insertAdjacentHTML("beforeend", "<p> uppgift namn </p>")
            for (i = 0; i < uppgift.length; i++) {
                Listor.insertAdjacentHTML("beforeend", "<div class='Lists-container' id='uppgiftid' >" + uppgift[i].uppgiftNamn + " " + uppgift[i].text + "  " + uppgift[i].tag + "</div>")
            }
        })
}
//skapa ny uppgift
function skapaUppgift(listaId) {
    var namnInput = document.getElementById("uppgift-namn").value;
    var textInput = document.getElementById("text").value;
    var tagInput = document.getElementById("tag").value;

    fetch('/api/uppgifter', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            uppgiftNamn: namnInput,
            text: textInput,
            minListaId: listaId,
            tag: tagInput
        })
    })
        .then((res) => console.log("res", res))
        .catch(err => console.log(JSON.stringify(err)));
    alert("Uppgift skapad");

    fetchuppgifter(listaId);
}
function getuppgiftid(Id, minListaId) {
    fetch("/api/uppgifter")
        .then(function (response) {
            return response.json();
        })
        .then(function (uppgift) {
            console.log(Id);
            Listor.innerHTML = "";
            Listsbuttons.innerHTML = "";
            var getuppgift = uppgift.find(a => a.uppgiftId == Id)
            console.log(getuppgift);
            Listor.insertAdjacentHTML("beforeend", "<div class='studio-container'>" + getuppgift.uppgiftNamn + "<br> " + getuppgift.text + "</div>")
            Listsbuttons.insertAdjacentHTML("beforeend", "<div id='studio-button'><button onclick='deleteuppgift(" + getuppgift.uppgiftId + ")'>Ta bort uppgiften</button></div>")
            Listsbuttons.insertAdjacentHTML("beforeend", "<div><button id=\'back\' onclick=\'fetchuppgifter(" + minListaId + ")\'>Gå tillbaka</button></div>");
            Listsbuttons.insertAdjacentHTML("beforeend", "<div><input id='get-uppgifttitle' type='text' value='" + getuppgift.uppgiftNamn + "' /><div><input id='get-uppgifttext' type='text' value='" + getuppgift.text + "' /><div><input id='get-minlistaid' type='hidden' value='" + getuppgift.minListaId + "' /><div><input id='get-tag' type='text' value='" + getuppgift.tag + "' /><button onclick='edituppgift(" + getuppgift.uppgiftId + ")'>Ändra uppgift egenskaper</button></div>");
        })
}
//Edit uppgift
function edituppgift(uppgiftid) {
    var nameInput = document.getElementById("get-uppgifttitle").value;
    var textInput = document.getElementById("get-uppgifttext").value;
    var listaidInput = document.getElementById("get-minlistaid").value;
    var tagInput = document.getElementById("get-tag").value;
    var listaidInputNumber = Number(listaidInput);
    fetch('/api/uppgifter/' + uppgiftid, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PUT',
        body: JSON.stringify({
            uppgiftId: uppgiftid,
            uppgiftNamn: nameInput,
            text: textInput,
            minListaId: listaidInputNumber,
            tag : tagInput
        })
    })
        .then((res) => console.log("res", res))
        .catch(err => console.log(JSON.stringify(err)));
    alert("Uppgift uppdaterad");
}
// Tar bort uppgift
function deleteuppgift(uppgiftid) {
    fetch('/api/uppgifter/' + uppgiftid, {
        method: 'DELETE'
    }).then(function (reponse) {
        response = reponse.json();
        return reponse;
    }).then(function (data) {
        console.log(data);
    });
    alert("tagit bort uppgiften");
}

function fetchusers(minListaId) {
    
    fetch("/api/users")
        .then(function (response) {
            return response.json();
        })
        .then(function (Users) {
            Listor.innerHTML = "";
            Listsbuttons.innerHTML = "";
            Listor.insertAdjacentHTML("beforeend", "<p> Namn / Email </p>")
            console.log(Users[0].userName);
            for (i = 0; i < Users.length; i++) {
                Listor.insertAdjacentHTML("beforeend", "<div class='Users-container' id='UserId' >" + Users[i].userName + " " + Users[i].email + " " + "<button onclick='Bjudain(" + JSON.stringify(Users[i].userName) + ', ' + minListaId + ")' >Bjud in</button></div>")
            }
        })
}

function Bjudain(userName, minListaid) 
{
    fetch('/api/guest', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            userName: userName,
            minListaId: minListaid,
        })
    })
        .then((res) => console.log("res", res))
        .catch(err => console.log(JSON.stringify(err)));
        alert("Sida bjuda in!");
    fetchuppgifter(listaId);
}

function GuestLista() {

    fetch("/api/guest")
        .then(function (response) {
            return response.json();
        })
        .then(function (guestlist) {
            Listor.innerHTML = "";
            Listsbuttons.innerHTML = "";
            Listor.insertAdjacentHTML("beforeend", "<p> List namn </p>")
            for (i = 0; i < guestlist.length; i++) {
                if(guestlist[i] != null) {
                    Listor.insertAdjacentHTML("beforeend", "<div class='Lists-container' id='uppgiftid' onclick='GetGuestLista(" + guestlist[i].minLista.id + ")' >" + guestlist[i].minLista.minListaNamn + " " + guestlist[i].minLista.beskrivning + "</div>")
                }
            }
        })
}
function GetGuestLista(minListaId) {
    fetch("/api/MinLista/" + minListaId)
        .then(function (response) {
            return response.json();
        })
        .then(function (List) {
            console.log(minListaId);
            Listor.innerHTML = "";
            Listsbuttons.innerHTML = "";
            Listor.insertAdjacentHTML("beforeend", "<p> Listanamn / Beskrivning </p>")
            Listor.insertAdjacentHTML("beforeend", "<div class='container'>" + List.minListaNamn + "<br> " + List.beskrivning + "</div>")
            Listsbuttons.insertAdjacentHTML("beforeend", "<button onclick=\'Guestuppgifter(" + List.id + ")\'>Uppgifter</button>");
            Listsbuttons.insertAdjacentHTML("beforeend", '<div><button id=\'back\' onclick=\'GuestLista()\'>Gå tillbaka</button></div>');
        })
}
function Guestuppgifter(minListaId) {
    
    fetch("/api/guestuppgifter/" + minListaId)
        .then(function (response) {
            return response.json();
        })
        .then(function (uppgift) {
            Listor.innerHTML = "";
            Listsbuttons.innerHTML = "";
            Listor.insertAdjacentHTML("beforeend", "<p> uppgift namn </p>")
            for (i = 0; i < uppgift.length; i++) {
                if (uppgift[i].utford == true) {
                    Listor.insertAdjacentHTML("beforeend", "<div class='Lists-container' id='uppgiftid' onclick='getuppgiftid(" + uppgift[i].uppgiftId + ', ' + minListaId + ")'>" + uppgift[i].uppgiftNamn + " " + uppgift[i].text + "  " + uppgift[i].tag + "</div><input type='checkbox' onclick='checkbox(" + uppgift[i].uppgiftId + ', ' + false + ")' id='finished' name='check' value='finish'><label for='finished'>utförd/inte utförd</label><p><p/>")
                    document.getElementById('finished').checked = true;
                }
                else {
                    Listor.insertAdjacentHTML("beforeend", "<div class='Lists-container' id='uppgiftid' onclick='getuppgiftid(" + uppgift[i].uppgiftId + ', ' + minListaId + ")'>" + uppgift[i].uppgiftNamn + " " + uppgift[i].text + "  " + uppgift[i].tag + "</div><input type='checkbox' onclick='checkbox(" + uppgift[i].uppgiftId + ', ' + true + ")' id='finished' name='check' value='finish'><label for='finished'>utförd/inte utförd</label><p><p/>")
                    document.getElementById('finished').checked = false;
                }
            }
         })
}