function getGoal() {
    for (let i of $("input[name='goal']"))
        if (i.checked)
            return i.value
}