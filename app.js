const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Grupo-03:grupo03@cursadanodejs.ls9ii.mongodb.net/Node-js', {
   // useNewUrlParser: true,
    //useUnifiedTopology: true
})
.then(() => console.log("Conexión exitosa"))
.catch(err => console.error("Error al conectar:", err));

//crear un esquma y un modelo para superheroes

const superheroSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    nombreSuperheroe:{ type: String, required: true},
    nombreReal:{ type: String, required: true},
    nombreSociedad: { type: String },
    edad: {type: Number, min:0},
    planetaOrigen: {type: String, default:'Desconocido'},
    debilidad: String,
    poder: [String],
    habilidadEspecial: { type: String }, 
    aliado:[String],
    enemigo:[String],
    createdAt: {type: Date, default:Date.now},
    createdBy: { type: String, required: true }
}, { collection: 'Grupo-03' });

// Crear el modelo
const SuperHero = mongoose.model('SuperHero', superheroSchema);

//funcion para agregar un nuevo superhero
async function insertSuperHero() {
    const hero = new SuperHero({
    id: 12, // Asignar el nuevo ID
    nombreSuperheroe: 'Green Lantern',
    nombreReal: 'Hal Jordan',
    edad: 35,
    planetaOrigen: 'Tierra',
    debilidad: 'Sin su anillo',
    poder: ['Vuelo', 'Viaje intergaláctico'],
    habilidadEspecial: 'Proyectar energía',
    aliado: ['Flash'],
    enemigo: ['Siniestro'],
    createdBy: 'Agustina Zerda'
    });

    try {
        await hero.save();
        console.log('Superhéroe insertado:', hero);
    } catch (error) {
        console.error('Error al insertar el superhéroe:', error);
    }
    
}

//funcion para actualizar un superheroe utilizando su nombre como parametro
async function updateSuperHero(nombreSuperheroe) {
const result= await SuperHero.updateOne(
    {nombreSuperheroe: nombreSuperheroe},
    {$set:{edad:26}}
);
console.log('Resultado de la actualización:', result);
    
}

//funcion para eliminar un superheroe utilizando su nombre como parametro
async function deleteSuperHero(nombreSuperheroe) {
    const result= await SuperHero.deleteOne(
        {nombreSuperheroe: nombreSuperheroe}
    );
    console.log('Superhéroe eliminado:', result);
}

// Función para encontrar todos los superhéroes
async function findSuperHero() {
    try {
        const heroes = await SuperHero.find();
        console.log('Superhéroes encontrados:', heroes);
    } catch (error) {
        console.error('Error al encontrar superhéroes:', error);
    }
}

//funcion buscar superheroes que su planeta de origen sea la tierra
async function findSuperHeroes() {
    const heroes= await SuperHero.find(
        {planetaOrigen: 'Tierra'});
    console.log('SuperHéroes cuyo Planeta de origen es la tierra:', heroes);
}

//// Funciones
insertSuperHero(); //se guarda el nuevo superheroe
findSuperHero(); //muestra todos los superheroes
updateSuperHero('Spiderman') //actualiza los datos de spiderman
deleteSuperHero('Spiderman'); // elimina el superheroe cuyo nombre es 'Spiderman'
findSuperHero(); //muestra todos los superheroes una lista actualizada donde ya no se encuntra spiderman ya que lo eliminamos
findSuperHeroes();  //Encuentra los superheroes cuyo su planeta de origen sea la tierra


