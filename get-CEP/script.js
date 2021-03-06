const cep = document.getElementById('cep')
const botao = document.querySelector('button')
const div = document.querySelector('.infos')

async function exibeDadosPostais(){
  if(cep.value.length !=9){
    alert('Insira um CEP válido')
    cep.value = ''
  }
  else{
    if (div.innerText.length){
      div.removeChild(div.firstElementChild)
    }
      const pegaCep = await fetch(`https://viacep.com.br/ws/${cep.value.replace(/\D/g, '')}/json/`)
      const cepJson = await pegaCep.json()
      if (cepJson.erro){
        alert('Insira um CEP válido')
      cep.value = ''
      }
      else{
        const novoP = document.createElement('p')
        novoP.innerText = `Rua ${cepJson.logradouro} \n  Bairro: ${cepJson.bairro} \n Cidade: ${cepJson.localidade} \n UF: ${cepJson.uf}`
        div.appendChild(novoP)
      }
      
  }
}

function limpaCep(){
  cep.value = cep.value.replace(/\D/g, '').replace(/(\d{5})(\d{3})/g, '$1-$2')
  if (cep.value.length !=9){
    cep.value = ''
    alert('Insira um CEP válido.')
  }
}


cep.addEventListener('change', limpaCep)
botao.addEventListener('click', exibeDadosPostais)