const criptografar = (chave, texto) => {
    let txtCifrado = ''
    let c = ""
    for (let i = 0; i < texto.length; i++) {

        let code = texto.charCodeAt(i) + chave
        if (code == 13) {

            txtCifrado += `\n`;
        }
        c = code
        c = String.fromCharCode(c)

        txtCifrado += c;
    }
    return txtCifrado
}

export default criptografar