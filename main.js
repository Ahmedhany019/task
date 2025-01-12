let price = document.getElementById("price")
let title = document.getElementById("title")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let yes = document.getElementsByClassName("yes")
let no = document.getElementsByClassName("no")

let mood = "create"
let index;

function getTotal(){

  if(price.value!=""){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value
    total.innerHTML = result
    total.style.backgroundColor="green"
  }else{
    total.innerHTML=""
    total.style.backgroundColor="red"
  }

}

//Create Product
  let dataPro;
  if(localStorage.product!=null){
  dataPro = JSON.parse(localStorage.product)
  }else{

    dataPro = []
  }

submit.onclick = function(){

  let newPro = {
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value
  }
  
  if(mood==="create"){
    if(newPro.count>1){
      for(let i =0; i<newPro.count;i++){
        
        dataPro.push(newPro)
      }
    }else{
      dataPro.push(newPro)
    }
  }else{

    dataPro[index] = newPro;
    mood = "create"
    submit.innerHTML = "create"
    count.style.display="block"
  }

  localStorage.setItem("product", JSON.stringify(dataPro))
  clearData()
  showData()
}
function clearData()  {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
    category.value = "";
}

function showData(){
  getTotal()
  let table ="";
  for(i=0;i<dataPro.length;i++){
    table +=
      `<tr id="tr">
      <td>${i+1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button id="update" onclick="updateData(${i})">update</button></td>
      <td><button id="delete" onclick="delEl(${i})">delete</button></td>
    </tr>`
  }
  document.getElementById('table').innerHTML = table;
}
showData()

function delEl(td){
  showPopup()
  document.addEventListener("click",function(e){
    if(e.target.className=="yes"){
      dataPro.splice(td,1)
      localStorage.product = JSON.stringify(dataPro)
      showData()
      closePopup()
    }else if(e.target.className=="no"){
      closePopup()
    }
  })
  showData()
}

function showPopup(){
  document.getElementById("popup").style.display="flex"
}
function closePopup(){
  document.getElementById("popup").style.display="none"
}

function updateData(i){

  title.value = dataPro[i].title
  price.value = dataPro[i].price
  taxes.value = dataPro[i].taxes
  ads.value = dataPro[i].ads
  discount.value = dataPro[i].discount
  count.style.display="none"
  category.value = dataPro[i].category
  getTotal()
  submit.innerHTML = "Update"
  mood = 'Update'
  tmp = i
}
