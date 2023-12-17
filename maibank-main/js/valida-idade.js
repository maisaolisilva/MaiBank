export default function ehMaiorDeIdade(campo) {
    const dataNascimento = new Date(campo.value);
    if ( !validaIdade(dataNascimento)) {
        campo.setCustomValidity('O usuário não é maior de idade')
    }
}

function validaIdade(data) {
    //Pega a data do momento do cadastro
    const dataAtual = new Date();
    //soma 18 no ano de nascimento da pessoa e pega o mês e o dia (assim dá para saber quando a pessoa fez ou irá fazer 18 anos)
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    //retorna true caso a data em que a pessoa completou 18 seja anterior ou igual a data do momento de preenchimento do formulário
    return dataAtual >= dataMais18;
}