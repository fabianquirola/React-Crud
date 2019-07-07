import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import EditProduct from './components/EditProduct';
import Product from './components/Product';
import Header from './components/Header';
import { async } from 'q';


function App() {


  const[products,saveproducts] = useState([]);
  const[reloadProducts,saveReloadProducts] = useState(true);




  useEffect(()=>{

    if(reloadProducts){
      const consultApi = async () => {
        const result = await axios.get('http://localhost:4000/restorant');
  
        saveproducts(result.data);
      }
    consultApi();
    
    saveReloadProducts(false);
    }
    

  },[reloadProducts])


  return (
    <Router>
      <Header/>
      <main className="container mt-5">
      <Switch>
        <Route exact path="/products" render={()=>(
          <Products
            products={products}
            saveReloadProducts={saveReloadProducts}
          />
        )} />
        <Route exact path="/products/new" 
          render={()=>(
            <AddProduct 
              saveReloadProducts={saveReloadProducts}
            />
          )}
        />
        
        <Route exact path="/products/:id" component={Product} />
        <Route exact path="/products/edit/:id" 
          render={props=>{
            
            const idProduct = parseInt(props.match.params.id)

            const product = products.filter(product => product.id === idProduct);

            return (
              <EditProduct
              product={product[0]}
              saveReloadProducts={saveReloadProducts}
              />
            )
          }

          }
        />
        
      </Switch>
      </main>
      <a className="mt-4 p2 text-center"> Todos los derechos reservados</a>
    </Router>
  );
}

export default App;
