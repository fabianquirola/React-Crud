import React,{useState} from 'react';
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

function AddProduct({history,saveReloadProducts}) {


const[dishName,saveDishName] = useState('');
const[dishCost,savedishCost] = useState('');
const[category,saveCategory] = useState('');
const[error,saveError] = useState(false);

const readValueRadio = e => {
    saveCategory(e.target.value);
}

const addProduct = async (e) =>{
    e.preventDefault();
    if(dishName ==='' || dishCost==='' || category===''){
        saveError(true);
        return;
    }

    saveError(false);

    //Crear nuevo producto
try{
    const result = await axios.post('http://localhost:4000/restorant',{
        dishName,
        dishCost,
        category
    });
    if(result.status===201){
        Swal.fire(
            'Producto Creado',
            'El producto se creo correctamente',
            'success'
        )
    }
}catch(error){
    Swal.fire({
        type:'error',
        title: 'Error',
        text: 'Hubo un error  vuelve a intentarlo!'
    })
}

saveReloadProducts(true);
history.push('/products');


}


    return(
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Agregar Nuevo Producto</h1>
            {(error)? <Error message='Todos los campos son obligatorios' />:null}
            <form
                className="mt-5"
                onSubmit={addProduct}
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Platillo"
                        onChange={e=> saveDishName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Platillo"
                        onChange={e=> savedishCost(e.target.value)}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="postre"
                        onChange={readValueRadio}
                    />
                    <label className="form-check-label">
                        Postre
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="bebida"
                        onChange={readValueRadio}
                    />
                    <label className="form-check-label">
                        Bebida
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="cortes"
                        onChange={readValueRadio}
                    />
                    <label className="form-check-label">
                        Cortes
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="ensalada"
                        onChange={readValueRadio}
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
            </form>
        </div>
        
    )
}
export default withRouter(AddProduct) ;