// Inclusão  dos pacotes
const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;

// Instancia o express
const app = express()

// Definição de porta
const port = 3000

// Serviço de Hello World
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Serviço de busca de categorias
app.get('/news-api/v1/categorias', (req, res) => {

  // Busca categorias
  MongoClient.connect(
    'mongodb+srv://sistema_noticias:sistema_noticias@cluster0.dq7v5.mongodb.net/sistema_noticias?retryWrites=true&w=majority', 
    
    function(err, client) {
      if (err) throw err; 

      const db = client.db('sistema_noticias')

      db.collection('categoria').find().toArray(function(err, result) {
        if (err) throw err;
        
        res.send(result);
      });
    });  
})

// Serviço de busca de noticias
app.get('/news-api/v1/categorias/:categoriaId/noticias', (req, res) => {

  // Busca noticias de uma categoria
  MongoClient.connect(
    'mongodb+srv://sistema_noticias:sistema_noticias@cluster0.dq7v5.mongodb.net/sistema_noticias?retryWrites=true&w=majority', 
    
    function(err, client) {
      if (err) throw err; 

      const db = client.db('sistema_noticias')

      db.collection('noticia').find( 
        { 
          id_categoria : req.params.categoriaId 
        } 
      ).toArray(function(err, result) {
        if (err) throw err;
        
        res.send(result);
      });
    }
  );  
})

// Serviço de busca uma noticias
app.get('/news-api/v1/categorias/:categoriaId/noticias/:noticiaId', (req, res) => {

  // Busca noticia
  MongoClient.connect(
    'mongodb+srv://sistema_noticias:sistema_noticias@cluster0.dq7v5.mongodb.net/sistema_noticias?retryWrites=true&w=majority', 
    
    function(err, client) {
      if (err) throw err; 

      const db = client.db('sistema_noticias')

      db.collection('noticia').find( 
        {
          id_categoria: req.params.categoriaId,
          "_id": ObjectId(req.params.noticiaId),
        }  
      ).toArray(function(err, result) {

        if (err) throw err;
        
        res.status(201).send(result[0]);
      });
    }
  );  
})

// Subindo servidor Node
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})