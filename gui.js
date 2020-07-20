let detailCategories = {};
function showDetails(selected) {
    $("#info-div").addClass("active");
    $("#info-div").append("<p>" + prettyPrint(selected.name) + "</p>");
    $("#info-div").append("<p class='clickable' onclick='toggleDisplay(\"inventory\")'></p>");
    $("#info-div p:last").append("<span class='title'>Inventory</span><span id='inventory-sign'>+</span>");
    $("#info-div").append("<div class='detail-sub' id='inventory-detail'></div>");
    for (let i in selected.inventory)
        $("#inventory-detail").append("<p>" + prettyPrint(i) + ": " + selected.inventory[i].amount + "</p>");
    if (!Object.keys(selected.inventory).length)
        $("#inventory-detail").append("<p>Inventory is empty.</p>");
    if (selected.attr != undefined){
        $("#info-div").append("<p class='clickable' onclick='toggleDisplay(\"attr\")'></p>");
        $("#info-div p:last").append("<span class='title'>Attributes</span><span id='attr-sign'>+</span>")
        $("#info-div").append("<div class='detail-sub' id='attr-detail'></div>");
        for (let i in selected.attr)
            $("#attr-detail").append("<p>" + prettyPrint(i) + ": " + selected.attr[i] + "</p>");
    }
    if (selected.equipment != undefined){
        $("#info-div").append("<p class='clickable' onclick='toggleDisplay(\"equipment\")'></p>");
        $("#info-div p:last").append("<span class='title'>Equipment</span><span id='equipment-sign'>+</span>")
        $("#info-div").append("<div class='detail-sub' id='equipment-detail'></div>");
        for (let i in selected.equipment)
            $("#equipment-detail").append("<p>" + prettyPrint(selected.equipment[i].name) + "</p>");
    }
    for (let i of ["inventory","attr","equipment"])
        detailContract(i)
}

function toggleDisplay(val) {
    if (!detailCategories[val]) 
        detailExpand(val);
    else
        detailContract(val);
}

function detailExpand(val) {
    for (let i of ["inventory","attr","equipment"])
        detailContract(i)
    $("#" + val + "-detail").show();
    $("#" + val + "-sign").html('-');
    detailCategories[val] = true;
}

function detailContract(val) {
    $("#" + val + "-detail").hide();
    $("#" + val + "-sign").html('+');
    detailCategories[val] = false;
    
}