const express = require ("express")
const productosManager = requiere ("../manages/express.js")

const productosService = new productosManager ();

const app = express ()
const port = 8080;

const server = app.listen(port,() => {
    console.log ("Listening on port ${port}")
}
)

app.get ( "/productos" , (req, res) => {
    const enviroment = async () => {
        res.send (
            await productosService.getAll ()
        )
    }
    enviroment()
        
})

app.get ( "/productosRandom" , (req, res) => {
    const enviroment = async () => {
        let productos = await productosService.getAll()
        let random = Math.round (Math.random() * productos.lenght)
        res.send (
            productos (random)
        )
    }
    enviroment()
        
})



