function log_fun(msg) {
    if (!debug_function) return
    console.log(`### FUNCTION: ${msg} ###`)
}

function log_res(msg) {
    if (!debug_response) return
    console.log(`!! Response !!`)
    console.log(msg)
    console.log(`!!!`)
}

function log_con(msg) {
    if (!debug_construction) return
    console.log(`- ${msg}`)
}
