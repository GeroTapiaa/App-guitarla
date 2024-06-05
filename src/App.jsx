import { Guitar } from "./components/Guitar"
import { Header } from "./components/Header"
import { useState, useEffect } from "react"
import { db } from "./data/db"

function App() {
  //useEfect en caso de querer consumir una api conviene mas
  //useEffect(() => {
  //  setGuitar(db) (siempre el modificador del hook)
  //}, [])

  //state
 // const [auth, setAuth] = useState([])
  

 const [guitar, setGuitar] = useState(db)

 const [cart , setCart ] = useState([])
//agregar al carrito
function addToCart(item) {
  const itemExist = cart.findIndex((guitar) => {guitar.id === item.id})
  if(itemExist >= 0 ){ //existe el item en el carrito
    const updatedCart = [...cart]
    updatedCart[itemExist].quantity++
    setCart(updatedCart)
  }else {
    item.quantity = 1
    setCart( [...cart, item])
  }
  
}



  return (
    <>
    <Header
      cart={cart}
    />
    

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {guitar.map((guitar) => {
              return (
                <Guitar
                  key={guitar.id}
                  guitar={guitar}
                  setCart={setCart}
                  addToCart={addToCart}
                  
                />
              )
            })}          
            
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
