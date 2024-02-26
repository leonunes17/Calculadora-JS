
// criando as variaveis e selecionando os elementos do htlm necessários 
const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

// Array com as teclas que serão utilizadas 
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

// Selecionando os botões do html para que funcionem no input
document.querySelectorAll('.charKey').forEach(function (charKeyBtn){
    charKeyBtn.addEventListener('click', function(){
        const value = charKeyBtn.dataset.value
        input.value += value
    })
})

// Adicionando evento ao botão clear 
document.getElementById('clear').addEventListener('click', function(){
    input.value = ''
    input.focus() //foco no input após limpar 
})

// Adicionando evento ao input e condições para as teclas do teclado
input.addEventListener('keydown', function(ev){
    ev.preventDefault()
    
    if(allowedKeys.includes(ev.key)){
        input.value += ev.key   // verificando se a tecla pressionada está contida no array
        return
    }
    if(ev.key === 'Backspace'){
        input.value = input.value.slice(0, -1)  
    }
    if(ev.key === 'Enter'){
        calculate()     // enter chama a função para calcular
    }
})

document.getElementById('equal').addEventListener('click', calculate) // Igual '=' também chama a fução para calcular


// Função de calcular usando método eval
function calculate(){
    resultInput.value = "ERROR"
    resultInput.classList.add("error")
    
    const result = eval(input.value)
    resultInput.value = result

    resultInput.classList.remove('error')
}

// Adicionando evento no botão de copiar o resultado
document.getElementById('copyToClipboard').addEventListener('click', function(ev){
    const button = ev.currentTarget
    if(button.innerText === 'Copy'){
        button.innerText = 'Copied!'
        button.classList.add('success')
        navigator.clipboard.writeText(resultInput.value)
    }else{
        button.innerText = 'Copy'
        button.classList.remove('success')
    }
})

// Adicionando evento ao botáo de troca de tema
document.getElementById("themeSwitcher").addEventListener("click", function () {
    if (main.dataset.theme === "dark") {
      root.style.setProperty("--bg-color", "#f1f5f9")
      root.style.setProperty("--border-color", "#aaa")
      root.style.setProperty("--font-color", "#212529")
      root.style.setProperty("--primary-color", "#c2af04")
      main.dataset.theme = "light"
    } else {
      root.style.setProperty("--bg-color", "#212529")
      root.style.setProperty("--border-color", "#666")
      root.style.setProperty("--font-color", "#f1f5f9")
      root.style.setProperty("--primary-color", "#f5de0c")
      main.dataset.theme = "dark"
    }
  })