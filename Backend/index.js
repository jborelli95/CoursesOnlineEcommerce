import express from 'express'
import cors from 'cors'
import path from 'path'
import mongoose, { mongo } from 'mongoose'
/**import router */
import router from './router'
import 'dotenv/config'

//conexion a base de datos
mongoose.Promise = global.Promise;
const dbUrl = "mongodb://localhost:27017/courses_online";
mongoose.connect(
    dbUrl
).then(mongoose => console.log("Conectado a la base de datos 27017"))
.catch (err => console.log(err))

/**Express */
const app = express();

/**Habiltiamso cors */
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/', router)

//seteamos la varaible port  con la variabel de entorno
app.set('port', process.env.EXPRESS_PORT)

//El listener de express, le damos el port
app.listen(app.get('port'), () => {
    console.log("El Servidor se esta ejecutando en el puerto: 3000");
})