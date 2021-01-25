/** fade in for index page */
var dataArray = [];
/*$(document).ready(function(){
    $(".items").fadeIn(2000);
});*/
//read json data
/*function readData(callback){
    $.getJSON("./data.json",function(res){
       for(var i = 0; i < res.length; i++){
           dataArray.push(res[i]);
       }
       dataArray.length = 10;
       callback(dataArray);
    });
}*/
function readData(callback){
    var xobj = new XMLHttpRequest();
    var path = "./data.json";
    xobj.open('GET',path,true)
    xobj.onreadystatechange = function(){
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send();
}

//callbacks to grab data from array
readData(function(arr){
    createDivs(arr);
});

readData(function(arr){
    checkClick(arr);
});
readData(function(arr){
    displayInfo(arr);
});


/** make 10 divs for flowwers
 * each div has the flower name, set ids, text
 */
function createDivs(arr){
    for(var i = 0; i < 10; i++){
        for(var j = 0; i < arr.length; j++){
            let flowerElm = document.createElement("div");
            let flowerName = document.createElement("p");
            flowerName.id = arr[j]["Flower Name"];
            flowerName.textContent = arr[j]["Flower Name"];
            flowerName.style.backgroundImage = "none"

            flowerElm.id = arr[j]["Flower Name"];
            flowerElm.append(flowerName);
            let parent = document.getElementsByClassName("flowerItems");
            let parentElm = parent[0];
            parentElm.append(flowerElm);
        }    
    }
       
}
//check  for when a user clicks on the div
/**use an anynomous function that calls the specified function with the parameters:

 */
function checkClick(arr){
    var flowerChildren = document.getElementsByClassName("flowerItems")[0].children;
    for(var i = 0; i < flowerChildren.length; i++){
        flowerChildren[i].addEventListener("click",function(){
            localStorage.setItem("selectedFlower",this.id)
            window.location.href = "details.html"
            displayInfo(arr);
        })
    }
}
/**
 * function to diplay flower info when said flower is clicked
 * and set background image
 */
function displayInfo(arr){
    //all info elements
    let parentElm = document.getElementsByClassName("flowerLog")[0];
    let outsideImg = document.getElementById("outsideImage");
    let flowerDiv = document.createElement("div");
    //titles
    let flowerTtile = document.createElement("h1");
    let scienceTitle = document.createElement("h3");
    scienceTitle.textContent = "Scientific Name:"
    let orderTitle = document.createElement("h3");
    orderTitle.textContent = "Order:"
    let familyTitle = document.createElement("h3");
    familyTitle.textContent = "Family:"
    let descTitle = document.createElement("h3");
    descTitle.textContent = "Description:"

    //info
    let scientificName = document.createElement("p");
    let orderName = document.createElement("p");
    let familyName = document.createElement("p");
    let description = document.createElement("p");
    //setting the text for info
    for(var i = 0; i < arr.length; i++){
        if(localStorage.getItem("selectedFlower") == arr[i]["Flower Name"]){
            scientificName.textContent = arr[i]["Scientific Name"];
            flowerTtile.textContent = arr[i]["Flower Name"];
            orderName.textContent = arr[i]["Order"];
            familyName.textContent = arr[i]["Family"];
            description.textContent = arr[i]["Description"];
            let picName = arr[i]["Flower Name"];
            let lowerPicName = picName.toLowerCase();
            outsideImg.style.backgroundImage =`url(./pictures/${lowerPicName}.jpg)`;
            outsideImg.style.backgroundSize = "cover"; 
            flowerDiv.style.backgroundColor = arr[i]["color"];
            flowerDiv.append(flowerTtile,
                scienceTitle,
                scientificName,
                orderTitle,
                orderName,
                familyTitle,
                familyName,
                descTitle,
                description);
            parentElm.append(flowerDiv);

        }
    }
    if(window.location.href == "menu.html"){
        document.body.style.backgroundColor = "#E8F8F5;"
    }
}
function start(){
   readData();
}



