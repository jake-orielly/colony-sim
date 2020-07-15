let playerSetGoal = 'gather_berries';

function setGoal(val) {
    playerSetGoal = val;
    $("#curr-goal-text").html(prettyPrint(val));
}

function setupResourceGatherGui() {
    let resources = ['berries','iron_ore','coal_ore','flax','pine_logs','oak_logs'];
    $("#goal-container").append("<p>Gather:</p>");
    for (let i of resources) {
        $("#goal-container").append(
            `<input type="radio" id="${i}-input" name="goal" value="${i}" onclick="setGoal('gather_${i}')" ` + 
            (i == 'berries' ? 'checked' : '') + `>
            <label for="${i}">${prettyPrint(i)}</label><br>`
        )
    }
}

function setupCraftGui() {
    let resources = ['iron_ingot'];
    $("#goal-container").append("<p>Craft:</p>");
    for (let i of resources) {
        $("#goal-container").append(
            `<input type="radio" id="${i}-input" name="goal" value="${i}" onclick="setGoal('craft_${i}')">
            <label for="${i}">${prettyPrint(i)}</label><br>`
        )
    }
}

function setupGui() {
    setupResourceGatherGui();
    setupCraftGui();
    $("#goal-container").append(
        `<input type="radio" id="idle-input" name="goal" value="idle" onclick="setGoal('idle')"><label for="idle">Idle</label><br>`
    )
}

function showDetails(selected) {
    $("#info-div").addClass("active");
    $("#info-div").append("<p>" + prettyPrint(selected.name) + "</p>");
    $("#info-div").append("<p class='clickable' onclick='detailExpand(\"inventory\")'></p>");
    $("#info-div p:last").append("<span class='title'>Inventory</span><span>+</span>");
    $("#info-div").append("<div class='detail-sub' id='inventory-detail'></div>");
    for (let i in selected.inventory)
        $("#inventory-detail").append("<p>" + prettyPrint(i) + ": " + selected.inventory[i].amount + "</p>");
    if (!Object.keys(selected.inventory).length)
        $("#inventory-detail").append("<p>Inventory is empty.</p>");
    if (selected.attr != undefined){
        $("#info-div").append("<p class='clickable' onclick='detailExpand(\"attr\")'></p>");
        $("#info-div p:last").append("<span class='title'>Attributes</span><span>+</span>")
        $("#info-div").append("<div class='detail-sub' id='attr-detail'></div>");
        for (let i in selected.attr)
            $("#attr-detail").append("<p>" + prettyPrint(i) + ": " + selected.attr[i] + "</p>");
    }
    $(".detail-sub").hide()
}

function detailExpand(val) {
    $(".detail-sub").hide()
    $("#" + val + "-detail").show();
}