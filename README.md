# Between Credits

Entre os créditos, é um app que estou desenvolvendo em React Native, para me ajudar na manipulação das compras.
A ideia é o app não conter nenhum dado sensível, apenas valores de limite de cartão e preço da fatura, verídicos, para fazer o controle que eu quero.

Quando fazemos compra no cartão de crédito, pelo menos para mim, fica meio difícil de lembrar o que foi que comprei, já que o nome que vai no estrato é o nome que está na maquininha do vendedor, e pode ser um nome que não vai remeter diretamente ao que eu comprei.

<br />

## Como vai funcionar?
A cada compra, vou preencher um simples formulário, dentro do app mesmo, que ele vai criar uma nova tag no contexto do cartão de crédito que eu usei. Assim, serei mais descritivo no que realmente comprei.  

os dados que eu preenchi, vai ser transferido para a tag, e na tela do cartão eu vou tomar a ação de dizer se aquela parcela foi paga ou não.

## Distribuição dos contextos dos cartões

- No topo da tela, vai ficar o cartão, com o nome, os valores disponíveis e limite.

- Logo abaixo, terão 12 meses em sequência esperando serem preenchidos por tags das compras.

- Se a compra tiver dividida em 3 parcelas e comprei em janeiro, vai ficar a mesma tag no mês de fevereiro, março e abril, sempre iniciando de quando foi feito a compra (a data sera enviada pelo formulário para o calculo).
