const addTodo=document.querySelector(".addTodo");
const todoinput=document.querySelector(".todoinput");
const save_task=document.querySelector('.save_task');

//////////////////////////////
let date= new Date();/////////
let day=date.getDate();////////
// let month=date.getMonth();////
let year=date.getFullYear();//
// let hour=date.getHours();/////
// let mint=date.getMinutes();///
// let sec=date.getSeconds();////
//////////////////////////////

const todo_Arr=[];
let todoId=1;
// Save Data in Local Storage .
function save_data(key,value){
    localStorage.setItem(key,value);
}
// view data in Table.
const show_data=()=>{
    let todo_temp="";
    todo_Arr.forEach((todo,index)=>{
        todo_temp+=`
        <tr data-id="${todo.id}">
            <td>${todo.taskName}</td>
            <td><span>  0${day}-${year}</span></td>
            <td>

            <button onclick="setdataform(${index})" id="editidpro"  class="btn btn-info btn-sm ">Edit</button>
            </td>
            <td><button class="btn btn-danger btn-sm " onclick="deleteProduct(${index})">Delete</button></td>
        </tr> 
        `
    });
    document.getElementById("showdata").innerHTML=todo_temp;
}

// creat data.
const createTodo=()=>{
    if(checkProductName()){
        let todo_info={
            id:todoId,
            taskName:todoinput.value
    }
    todo_Arr.push(todo_info);
    todoId++;
    save_data("product",JSON.stringify(todo_Arr));
    show_data();
    claer_input();
    }
    else{
        todoinput.placeholder = `Ivalid...`;
    }
    // Swal.fire("Good job!", `Task Name: ${todo_info.taskName}`, "success");

}
addTodo.addEventListener("click",createTodo);
////////////



//function load data
const load_data=()=>{
    if(localStorage.getItem("product")){
        todo_Arr.push(...JSON.parse(localStorage.getItem("product")));
        show_data();
    }
};
load_data();
function claer_input(){
    
    todoinput.value=""

}


function deleteProduct(index){
    // console.log(index);
    // let TodoIndex=todo_Arr.filter((todo)=>todo[index]!=index);  
    todo_Arr.splice(index,1);
    show_data();
    save_data("product",JSON.stringify(todo_Arr));
}
let x=0;


function setdataform(index){
x= index;

todoinput.value=todo_Arr[index].taskName;
addTodo.classList.add('d-none');
save_task.classList.remove('d-none');

}
const savedata=document.querySelector(".savedata");
function saveEidtData(){
    console.log("hello");
    todo_Arr[x].taskName=todoinput.value;
    save_data("product",JSON.stringify(todo_Arr));
    addTodo.classList.remove('d-none');
    save_task.classList.add('d-none');

    show_data();
    claer_input();
}
save_task.addEventListener("click",
saveEidtData
)




function checkProductName(){
    let regx = /^\w{4,15}$/;
    if(regx.test(todoinput.value)){
        return true
    }
    else {
        return false
    }
}
