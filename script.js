let out = ""
let ut = document.getElementById("out")
let checkmark

function klikk(){
 fetch("https://jsonplaceholder.typicode.com/todos/10")
	 .then(respons => {
		 out += respons.status
		 return respons.json()
	 })
	 .then(data => {
		 checkmark = data.completed ? "☑":"☐"
		 out += "<br>"+checkmark+" "+data.title
	 })
	
 ut.innerHTML = out
 out = ""
}

ut.textContent = out