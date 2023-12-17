import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
//lista com todos os campos com o atributo obrigatório
const camposFormulario = document.querySelectorAll('[required]'); 
const formulario = document.querySelector('[data-formulario]');

formulario.addEventListener("submit", event => {
    event.preventDefault();

    const listaRepostas = {
        "nome": event.target.elements["nome"].value,
        "email": event.target.elements["email"].value,
        "rg": event.target.elements["rg"].value,
        "cpf": event.target.elements["cpf"].value,
        "aniversario": event.target.elements["aniversario"].value,
    }
    //target pega o alvo do evento

    localStorage.setItem("cadastro", JSON.stringify(listaRepostas));

    //redireciona para a página do segundo formulario (o que tira foto)
    window.location.href = './abrir-conta-form-2.html';
})

camposFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    //Bloqueia o comportamento padrão de colocar uma mensagem quando o campo estiver como inválido (item valid=false no validityState)
    campo.addEventListener("invalid", event => event.preventDefault())
})

//lista com os erros mais comuns do ValidityState
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

// Objeto com o nome dos campos, cada nome de campo recebe um objeto com os erros e suas mensagens
const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um email válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

//Função que verifica os campos utilizando as funções importadas dos outros arquivos
function verificaCampo(campo) {
    
    let mensagem = "";

    // Tira a mensagem de erro customizada (ela não sai sozinha)
    campo.setCustomValidity(''); 

    //Se possuir aogul erro no campo, o customError se torna true
    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo);
    }
    if (campo.name == "aniversario" && campo.value != "" ) {
        ehMaiorDeIdade(campo);
    }

     //console.log(campo.validity);
     
    tiposDeErro.forEach(erro => {
        //verifica se o erro da lista está true no valitidy do campo, se sim, pega amensagem daquele erro na lista de mensagens
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })
    //Pega a tag <span> parente do campo que está sendo validado
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');

    //checa se o campo possui algum erro
    const validadorDeInput = campo.checkValidity(); 

     if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
     } else {
        mensagemErro.textContent = "";
     }
}