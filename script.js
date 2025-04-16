function adicionarKit() {
  const nome = document.getElementById('kitName').value;
  const imagem = document.getElementById('kitImage').value;
  if (!nome || !imagem) return;

  const kit = { nome, imagem };

  let kits = JSON.parse(localStorage.getItem("kitsProntos")) || [];
  kits.push(kit);
  localStorage.setItem("kitsProntos", JSON.stringify(kits));

  document.getElementById('kitName').value = '';
  document.getElementById('kitImage').value = '';
  location.reload();
}

// Função para carregar os kits prontos da lista
function carregarKits() {
  const kitsContainer = document.getElementById("kits");
  if (!kitsContainer) return;

  const kits = JSON.parse(localStorage.getItem("kitsProntos")) || [];

  kits.forEach((kit, index) => {
    const card = document.createElement("div");
    card.className = "kit-card";
    card.innerHTML = `
      <img src="${kit.imagem}" alt="${kit.nome}">
      <h3>${kit.nome}</h3>
      <button onclick="enviarParaPedidos(${index})">Fazer Pedido</button>
      <button onclick="removerKit(${index})" style="background-color:red">Excluir Kit</button>
    `;
    kitsContainer.appendChild(card);
  });
}

// Função para enviar o kit para a lista de pedidos
function enviarParaPedidos(index) {
  const kits = JSON.parse(localStorage.getItem("kitsProntos")) || [];
  const kit = kits[index];

  const novoPedido = {
    nome: kit.nome,
    imagem: kit.imagem,
    status: "Pendente",
    cliente: "",
    quantidade: 1
  };

  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.push(novoPedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

}

// Função para remover um kit da lista de kits prontos
function removerKit(index) {
  let kits = JSON.parse(localStorage.getItem("kitsProntos")) || [];
  kits.splice(index, 1);
  localStorage.setItem("kitsProntos", JSON.stringify(kits));
  location.reload();
}

// Função para carregar os pedidos
function carregarPedidos() {
  const pedidosContainer = document.getElementById("pedidos");
  if (!pedidosContainer) return;

  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  pedidos.forEach((pedido, index) => {
    const card = document.createElement("div");
    card.className = "pedido-card";
    card.innerHTML = `
      <img src="${pedido.imagem}" alt="${pedido.nome}">
      <h3>${pedido.nome}</h3>
      <div class="pedido-info">
        <label>Cliente:</label>
        <input type="text" value="${pedido.cliente}" onchange="editarCliente(${index}, this.value)">
      </div>
      <div class="pedido-info">
        <label>Qtd:</label>
        <input type="number" value="${pedido.quantidade}" min="1" onchange="editarQuantidade(${index}, this.value)">
      </div>
      <div class="pedido-info">
        <label>Status:</label>
        <select onchange="editarStatus(${index}, this.value)">
          <option ${pedido.status === "Pendente" ? "selected" : ""}>Pendente</option>
          <option ${pedido.status === "Pago" ? "selected" : ""}>Pago</option>
          <option ${pedido.status === "Enviado" ? "selected" : ""}>Enviado</option>
          <option ${pedido.status === "Entregue" ? "selected" : ""}>Entregue</option>
        </select>
      </div>
      <button onclick="excluirPedido(${index})" style="background-color:red; color:white; margin-top:10px;">Excluir</button>
    `;
    pedidosContainer.appendChild(card);
  });
}

// Função para editar o cliente no pedido
function editarCliente(index, novoCliente) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos[index].cliente = novoCliente;
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

// Função para editar a quantidade no pedido
function editarQuantidade(index, novaQuantidade) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos[index].quantidade = parseInt(novaQuantidade);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

// Função para editar o status do pedido
function editarStatus(index, novoStatus) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos[index].status = novoStatus;
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

// Função para excluir um pedido
function excluirPedido(index) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.splice(index, 1);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  location.reload();
}

// Carregar os kits e pedidos ao iniciar as páginas
if (window.location.pathname.includes("kits.html")) {
  carregarKits();
} else if (window.location.pathname.includes("pedidos.html")) {
  carregarPedidos();
}