let detailCategories = {};
function showDetails(selected) {
    $("#info-div").addClass("active");
    $("#info-div").append("<p>" + prettyPrint(selected.name) + "</p>");
    $("#info-div").append("<p class='clickable' onclick='toggleDisplay(\"inventory\")'></p>");
    $("#info-div p:last").append("<span class='title'>Inventory</span><span id='inventory-sign'>+</span>");
    $("#info-div").append("<div class='detail-sub' id='inventory-detail'></div>");
    detailCategories.inventory = false;
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
        detailCategories.attr = false;
    }
    $(".detail-sub").hide()
}

function toggleDisplay(val) {
    if (!detailCategories[val]) 
        detailExpand(val);
    else
        detailContract(val);
}

function detailExpand(val) {
    $(".detail-sub").hide()
    $("#" + val + "-detail").show();
    $("#" + val + "-sign").html('-');
    detailCategories[val] = true;
}

function detailContract(val) {
    $("#" + val + "-detail").hide();
    $("#" + val + "-sign").html('+');
    detailCategories[val] = false;
    
}