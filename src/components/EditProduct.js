import React,{useState,useRef} from 'react';
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';



function EditProduct(props) {

    const {history,product,saveReloadProducts} = props

    const dishCostRef = useRef('');
    const dishNameRef = useRef('');

    const[error,saveError] = useState(false);
    const[category,saveCategory] = useState('');

    const editProduct = async (e) =>{
        e.preventDefault();
        
        //validation

        const newDishCost = dishCostRef.current.value,
            newDishName= dishNameRef.current.value;

        //revisar si cambio la categoria sino 
        let dishCategory = (category==='')? product.category: category;


        if(newDishName === '' || newDishCost === '' || dishCategory ===''){
            saveError(true);
            return;
        }

        saveError(false);

        
        const editDish = {
            dishName: dishNameRef.current.value,
            dishCost: dishCostRef.current.value,
            category: dishCategory
        }


        //enviar request
        const url =`http://localhost:4000/restorant/${product.id}`;

        try{
            const result = await axios.put(url,editDish);
            if(result.status===200){
                Swal.fire(
                    'Producto Actualizado',
                    'El producto se edito correctamente',
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

    const readValueRadio = e => {
        saveCategory(e.target.value);
    }

    return(
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Producto</h1>
            {(error)? <Error message='Todos los campos son obligatorios' />:null}
            <form
                className="mt-5"
                onSubmit={editProduct}
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Platillo"
                        ref={dishNameRef}
                        defaultValue={product.dishName}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Platillo"
                        ref={dishCostRef}
                        defaultValue={product.dishCost}
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
                        defaultChecked={(product.category==='postre')}
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
                        defaultChecked={(product.category==='bebida')}
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
                        defaultChecked={(product.category==='cortes')}
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
                        defaultChecked={(product.category==='ensalada')}
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto" />
            </form>
        </div>
    )
}
export default withRouter(EditProduct);