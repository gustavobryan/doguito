export function valida(input) {
  const tipoDeInput = input.dataset.tipo;

  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalido");
    input.parentElement.querySelector(".input-mensagem-erro").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalido");
    input.parentElement.querySelector(".input-mensagem-erro").innerHTML = "";
  }
}

const mensagensDeErro = {
  nome: {
    valueMissing: "O campo nome não pode estar vazio",
  },
  email: {
    valueMissing: "O campo de email não pode estar vazio.",
    valueMissing: "O email digitado não é válido.",
  },
  senha: {
    valueMissing: "O campo de senha não pode estar vazio.",
    patternMismatch:
      "A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos.",
  },
  dataNascimento: {
    valueMissing: "O campo de nascimento não pode estar vazio.",
  },
};

const validadores = {
  dataNascimento: (input) => validaDataNascimento(input),
  customError: "Você deve ter mais de 18 anos, para se cadastrar!",
};

dataNascimento.addEventListener("blur", (evento) => {
  validaDataNascimento(evento.target);
});

function validaDataNascimento(input) {
  const dataRecebida = new Date(input.value);
  let mensagem = "";

  if (!maiorQue18(dataRecebida)) {
    mensagem = "Você deve ter mais de 18 anos, para se cadastrar!";
  }

  input.setCustomValidity(mensagem);
}

function maiorQue18(data) {
  const dataAtual = new Date();
  const dataMais18 = new Date(
    data.getUTCFullYear() + 18,
    data.getUTCMonth(),
    data.getUTCDate()
  );

  return dataMais18 <= dataAtual;
}
