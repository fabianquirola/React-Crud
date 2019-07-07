import React from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';
import Axios from 'axios';

function ProductList({product,saveReloadProducts}){

const deleteProduct = id => {
    console.log('eliminando',id);

    Swal.fire({
        title: 'Esta seguro?',
        text: "You won't beUn Platillo eliminado no se puede recuperar able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonTet:'Cancelar'
      }).then(async (result) => {
        if (result.value) {

            

            try {
                const url =`http://localhost:4000/restorant/${id}`;

                const result = await Axios.delete(url);
    
                if(result.status=== 200){
                    Swal.fire(
                        'Eliminado!',
                        'El platillo ha sido eliminado.',
                        'success'
                      )
                      saveReloadProducts(true);
                } 

                

            } catch (error) {
                Swal.fire({
                    type:'error',
                    title: 'Error',
                    text: 'Hubo un error  vuelve a intentarlo!'
                })
            }

          
        }
      })
}

    return(
        <li data-categoria={product.category} className="list-group-item d-flex justify-content-between align-items-center">
            <p>
                {product.dishName}{' '}
                <span className="font-weight-bold">$
                {product.dishCost}</span>
            </p>
            <div>
                <Link 
                 to={`/products/edit/${product.id}`}
                 className="btn btn-success mr-2">
                     Editar
                 </Link>

                 <button
                    type="button"
                    className="btn btn-danger"
                    onClick={()=> deleteProduct(product.id)}
                 >Eliminar &times;</button>

            </div>
        </li>
    )
}

export default ProductList;