let playerSetGoal = 'gather_berries';

function setGoal(val) {
    playerSetGoal = val;
    $("#curr-goal-text").html(prettyPrint(val));
}

function setupResourceGatherGui() {
    let resources = ['berries','iron_ore','coal_ore','flax','pine_logs','oak_logs'];
    for (let i of resources) {
        $("#goal-container").append(
            `<input type="radio" id="${i}-input" name="goal" value="${i}" onclick="setGoal('gather_${i}')" ` + 
            (i == 'berries' ? 'checked' : '') + `>
            <label for="${i}">${prettyPrint(i)}</label><br>`
        )
    }
}