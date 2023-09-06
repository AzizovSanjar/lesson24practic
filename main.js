const usersList = document.getElementById("users");
const formFilter = document.getElementById("filter");
const BASE_URL = "http://localhost:3000/users";

const btnClick = document.getElementById('btnClick')

async function getUsers() {

 /// отловить ошибки в запросах

  try {
    const response = await fetch(BASE_URL);
   if(response.status >= 200 && response.status <= 204) { 
    const users = await response.json()
    return users
   }

    else if (response.status == 404) {
       throw new Error(`${response.status}: Not found`)
      }

      else if (response.status == 500) {
        throw new Error(`${response.status}: Server not working`)
      }
  
    
  } catch (error) {
    usersList.innerHTML = ''
    const h1 = document.createElement("h1")
    h1.innerText = error.message
    usersList.before(h1);
  }
}

getUsers().then((users) => {
  users.forEach((user) => {
    usersList.innerHTML += `<li>${user.name}</li>`
  })
})

   /// отловить ошибки в запросах


  formFilter.addEventListener("submit", async function (event) {
     event.preventDefault();
      const select = formFilter.querySelector('[name="position"]');


 if(select.value === '') {
      getUsers().then(users =>{
        usersList.innerHTML = ''
           users.forEach(user => {
              usersList.innerHTML += `<li>${user.name}</li>`
  })
})
  
}
 
else {
  const response = await fetch(`${BASE_URL}?${select.name}=${select.value}`);
    const users = await response.json();
      usersList.innerHTML = ''
        users.forEach((user) => {
          usersList.innerHTML += `<li>${user.name}</li>`;

  })

}
})

formFilter.addEventListener('reset', async function (event) {
  event.preventDefault()
    const response = await fetch(`${BASE_URL}`)
      const users = await response.json()
        usersList.innerHTML = ''
          users.forEach(user => {
            usersList.innerHTML += `<li>${user.name}</li>`;
  })
})
 

 