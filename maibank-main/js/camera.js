//Const com a imagem que aparece na tela do formulario para ser clicada
const botaoIniciarCamera = document.querySelector("[data-video-botao]");

//Div da classe formulario__camera (possui o espaço em que aparecerá a imagem da câmera e o botão de tirar foto). a div está com display none no styles
const campoCamera = document.querySelector("[data-camera]");

//tag video
const video = document.querySelector("[data-video]");
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
//div mensagem
const mensagem = document.querySelector("[data-mensagem]");
const botaoEnviarFoto = document.querySelector("[data-enviar]");

let imagemURL = "";

//Função pra inicializar a câmera
//Função assíncrona pois é necessário esperar o usuário permitir o acesso á câmera
botaoIniciarCamera.addEventListener("click", async function (){
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false})

    botaoIniciarCamera.style.display = "none";
    campoCamera.style.display = "block";

    //adiciona um src á tag video
    video.srcObject = iniciarVideo;
})

//função para tirar foto
botaoTirarFoto.addEventListener('click', function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    //Tranforma a imagem tirada em URL
    imagemURL = canvas.toDataURL('image/jpeg');

    //tira o campo de camera
    campoCamera.style.display = "none";
    //aparece a mensagem que informa a captura da imagem
    mensagem.style.display = "block";
});

botaoEnviarFoto.addEventListener("click", () => {
    const receberDadosExistentes = localStorage.getItem("cadastro");
    const converteRetorno = JSON.parse(receberDadosExistentes);

    //Cria o atributo imagem nas informações do cadastro e adiciona a URL da imagem
    converteRetorno.imagem = imagemURL;

    localStorage.setItem("cadastro", JSON.stringify(converteRetorno));

    window.location.href = "../pages/abrir-conta-form-3.html";
})