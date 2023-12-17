export default function ehUmCPF(campo) {
    //o replace está removendo os caracteres especias, se forem digitados, e substituindo por nada ( segundo parâmetro "")
    const cpf = campo.value.replace(/\.|-/g, ""); 

    //Verifica se alguma função retorna true, o que indica cpf inválido 
    if(validaNumerosRepetidos(cpf) || validaPrimeiroDigitoVerificador(cpf) || validaSegundoDigitoVerificador(cpf)) {

        //Torna o customError true, assim a mensagem da lista de mensagens aparecerá (dentro dos parnteses poderia ser qualquer frase pois é só para não ser false)
        campo.setCustomValidity('Esse CPF não é válido'); 
    }
}

function validaNumerosRepetidos(cpf) {
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]
    //retorna True caso o cpf informado seja uma das combinações da lista
    return numerosRepetidos.includes(cpf) 
}

function validaPrimeiroDigitoVerificador(cpf) {
    let soma = 0;
    let multiplicador = 10;
    //Multiplica e soma os 9 primeiros digitos do cpf (multiplicador diminui à cada iteração)
    for(let i = 0; i < 9; i++) {
        soma += cpf[i] * multiplicador;
        multiplicador--
    }
    //multiplica o resultatdo da soma do laço por dez e pega o módulo da divisão desse número por 11
    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    //retorna true caso a soma resulte em um valor diferente do digito verificador informado pelo usuário
    return soma != cpf[9];
}

function validaSegundoDigitoVerificador(cpf) {
    let soma = 0;
    let multiplicador = 11;

    //Multiplica e soma os 10 primeiros digitos do cpf (multiplicador diminui à cada iteração)
    for(let i = 0; i < 10; i++) {
        soma += cpf[i] * multiplicador;
        multiplicador--;
    }
    //multiplica o resultatdo da soma do laço por dez e pega o módulo da divisão desse número por 11
    soma = (soma * 10) % 11;
    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    //retorna true caso a soma resulte em um valor diferente do digito verificador informado pelo usuário
    return soma != cpf[10];
}