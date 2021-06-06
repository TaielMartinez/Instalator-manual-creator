var var_keys, variables, tutoriales

$(document).ready(function () {
    fetch("json/test.json")
        .then(response => {
            return response.json();
        })
        .then(res => {
            console.log(res)
            tutoriales = res.tutorial
            var_keys = Object.keys(res.variables)
            variables = res.variables

            var html = ""
            let i = 0
            loop_tutoriales()
            function loop_tutoriales() {
                if (i < tutoriales.length) {
                    let tuto = tutoriales[i]

                    for (let e = 0; e < var_keys.length; e++) {
                        console.log(var_keys[e])
                        console.log(variables[var_keys[e]])
                        tuto = tuto.replaceAll(var_keys[e], variables[var_keys[e]])
                        console.log(tuto)
                        console.log("--------------------")
                    }

                    html += `<div class="highlight copy" data-copy="${tuto}">
                <pre><code class="language-html" data-lang="html">${tuto}</code></pre>
            </div>`
                    i++
                    loop_tutoriales()
                }
            }

            $('#tutoriales').html(html)

            $('.copy').on('click', function () {
                var text_to_copy = $(this).data('copy')
                $(this).addClass('copiado')
                if (text_to_copy.startsWith('_FILE:')) {
                    console.log('file')
                    $.get('../../json/file/' + text_to_copy.replace('_FILE:', ''), function (data) {
                        text_to_copy = data
                        for (let i = 0; i < var_keys.length; i++) {
                            text_to_copy = text_to_copy.replaceAll(var_keys[i], variables[var_keys[i]])
                        }
                        navigator.clipboard.writeText(text_to_copy).then(function () {
                            console.log(text_to_copy);
                        }, function (err) {
                            console.error('Async: Could not copy text: ', err)
                        })
                    }, 'text');
                } else {
                    navigator.clipboard.writeText(text_to_copy).then(function () {
                        console.log(text_to_copy);
                    }, function (err) {
                        console.error('Async: Could not copy text: ', err)
                    })
                }

            })
        })
})
