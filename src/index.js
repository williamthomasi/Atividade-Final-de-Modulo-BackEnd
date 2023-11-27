import express, { request, response } from 'express';
const app = express();
app.use(express.json());

app.get('/', (request, response) => {
    return response.json('Servidor iniciado!');

});

// USUÁRIOS

let users = []
let contador = 1
let contadorRecados = 1

app.get('/users', (request, response) => {
    return response.json(users);

});

// CRIAR CONTA

app.post('/users', (request, response) => {
    let infoRequest = request.body;

    let newUser = {
        id: contador++,
        name: infoRequest.name,
        email: infoRequest.email,
        password: infoRequest.password,
        recados: []
    }

    users.push(newUser)

    return response.status(201).json(newUser);

});

// CRUD DE RECADOS - CRIAR

app.post('/users/recados/:id', (request, response) => {
    let infoRequest = request.body;
    const parametroId = request.params.id

    let novoRecado = {
        id: contadorRecados++,
        titulo: infoRequest.titulo,
        descricao: infoRequest.descricao
    }

    const buscarIndice = users.findIndex((usuario) => usuario.id == parametroId)

    // Se o email não for encontrado, retorna uma resposta de erro

    if (buscarIndice == -1) {
        return response.json("Usuário não encontrado")
    }

    // Se o email for encontrado, retorna seu recado

    const usuario = users[buscarIndice]

    usuario.recados.push(novoRecado)

    return response.status(201).json(novoRecado)
})


// CRUD DE RECADOS - LER

app.get('/users/recados/:id', (request, response) => {
    const parametroId = request.params.id

    const buscarIndice = users.findIndex((usuario) => usuario.id == parametroId)

    // Se o ID não for encontrado, retorna uma resposta de erro

    if (buscarIndice === -1) {
        return response.status(404).json("Usuário não encontrado");
    }

    // Se o ID for encontrado, retorna sua lista de recados

    const usuarioRecados = users[buscarIndice].recados;
    return response.status(200).json(usuarioRecados);
})


// CRUD DE RECADOS - ATUALIZAR 

app.put('/users/recados/:id/:idRecado', (request, response) => {
    const parametroId = request.params.id

    const userToAlterIndex = users.findIndex((usuario) => {
        return usuario.id == parametroId

    });

    const usuario = users[userToAlterIndex]
    const recados = usuario.recados
    const idRecado = request.params.idRecado

    const indiceRecado = recados.findIndex((item) => {
        return item.id == idRecado
    })

    const body = request.body

    let editarRecado = {
        id: idRecado,
        titulo: body.titulo,
        descricao: body.descricao
    }

    recados[indiceRecado] = editarRecado

    return response.json(recados[indiceRecado]);

});

// CRUD DE RECADOS - EXCLUIR

app.delete('/users/recados/:id/:idRecado', (request, response) => {
    const parametroId = request.params.id
    console.log(parametroId);

    const indiceUsuario = users.findIndex((user) => {
        return user.id == parametroId
    });

    console.log(indiceUsuario);

    if (indiceUsuario === -1) {
        return response.status(400).json("Erro!");
    }

    const recadosUsuario = users[indiceUsuario].recados

    const idRecado = request.params.idRecado

    const indiceRecado = recadosUsuario.findIndex((recado) => {
        return recado.id == idRecado
    })

    recadosUsuario.splice(indiceRecado, 1)
    return response.json("Recado apagado com sucesso.");
})




app.listen(8080, () => console.log("Servidor iniciado"));