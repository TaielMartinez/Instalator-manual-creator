$(document).ready(function () {
    log_fun('Init')
    load_json('test', (json) => {
        contruct_instruction(json)

        msg_err()
    })
});

var error_msg = []
function msg_err() {
    log_fun('msg_err')
    if (!error_msg || error_msg.length === 0) return
    let html = `<h1>Ocurrio un error!</h1>
    </br>
    `
    error_msg.forEach(err => {
        html += `<p>• ${err}</p>`
    });
    $('#instruction').html(html)
}


function load_json(json_name, callback) {
    log_fun('load_json')
    $.getJSON(`json/${json_name}.json`, function (json) {
        log_res(json)
        callback(json)
    });
}

function contruct_instruction(json) {
    log_fun('contruct_instruction')

    // Comprobar que el json este bien construido
    if (!json.name) error_msg.push(`Falta name`)
    if (!json.var) error_msg.push(`Falta var`)
    if (typeof (json.var) != 'object') error_msg.push(`Var tiene que ser un objeto`)
    if (!json.tutorial) error_msg.push(`Falta tutorial`)
    if (typeof (json.tutorial) != 'object') error_msg.push(`Tutorial tiene que ser un objeto`)


    if (!error_msg.length === 0) return

    // contruir el HTML
    log_res(json.tutorial)
    var html = ''
    json.tutorial.forEach(async tut => {
        log_con('------')
        log_con(tut.type)
        log_con(tut.text)
        log_con('------')
        if (tut.type === 'h1') {
            html += `<p class="h3">${tut.text}</p>`
        } else if (tut.type === 'h2') {
            html += `<p class="h4">${tut.text}</p>`
        } else if (tut.type === 'h3') {
            html += `<p class="">${tut.text}</p>`
        } else if (tut.type === 'code') {
            html += `<code class="">${tut.text}</code>`
        } else if (tut.type === 'code_ext') {
            await $.get(`../../json/code/${tut.text}`, function (text) {
                log_res(text)
                html += `<code class="pre-scrollable">${text}</code>`
            }, 'text');
        }
    });
    log_res(html)
    $('#instruction').html(html)
}
