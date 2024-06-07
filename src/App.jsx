import { Guitar } from "./components/Guitar"
import { Header } from "./components/Header"
import { useState, useEffect } from "react"
import { db } from "./data/db"

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : [] //si locaStorageCart tiene algo entonces converitmos de string a array con .parse y sino hay nada el valor es un array vacio []
  }
  //useEfect en caso de querer consumir una api conviene mas
  //useEffect(() => {
  //  setGuitar(db) (siempre el modificador del hook)
  //}, [])
 //state
 // const [auth, setAuth] = useState([])
const MIN_ITEMS = 1
const MAX_ITEMS = 10

const [data] = useState(db)
 const [cart , setCart ] = useState(initialCart)


//local storage para el carrito con useefect
useEffect(() => {                       
localStorage.setItem('cart', JSON.stringify(cart))
}, [cart])            //cada vez que cart cambie quiero ejecutar lo siguiente(codigo de arriba)

 
//agregar al carrito
function addToCart(item) {
  const itemExist = cart.findIndex(guitar => guitar.id === item.id)
  if(itemExist >= 0 ){ //existe el item en el carrito
    if(cart[itemExist].quantity >= MAX_ITEMS) return
    const updatedCart = [...cart]
    updatedCart[itemExist].quantity++
    setCart(updatedCart)
  }else {
    item.quantity = 1
    setCart( [...cart, item])
  }
  
}
function removeFromCart (id){
  setCart(prevCart => prevCart.filter(guitar => guitar.id !== id)) //filtarme las guitarras cuyo id sea distinto al id que te estoy pasando
}

function addProduct(id){
  const updateCart = cart.map(item => {         //array metod para iterar
    if(item.id === id && item.quantity < MAX_ITEMS){   // condicional para que si el id es igual al id que le envio
                                          
      return {                                 //me retorne todas las propiedades del item 40/41
        ...item,
        quantity : item.quantity + 1      // y me modifique solamente la cantidad en 1

      }
    }
    return item     // retornamos el item para que en los elementos que no di click para aumentar la cantidad los mantenga   
  })
  setCart(updateCart)          //devolvemos en el setCart ese carrito modificado
}

  function reduceProduct(id) {
    const updateCart = cart.map(item => {
      if(item.id === id && item.quantity > MIN_ITEMS){
        return {
          ...item,
          quantity : item.quantity - 1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  //limpiar el carrito
  function emptyCart() {
    setCart([])
  } 

  //local storage con carrito
  

  return (
    <>
    <Header
      cart={cart}
      removeFromCart={removeFromCart}
      addProduct={addProduct}
      reduceProduct={reduceProduct}
      emptyCart={emptyCart}
    />
    

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar) => {
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
