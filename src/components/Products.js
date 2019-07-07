import React,{Fragment} from 'react';
import ProductList from './ProductList';

    function Products({products,saveReloadProducts}) {
    return(
        <Fragment>
            <h1 className="text-center">Productos</h1>
            <ul className="list-group mt-5">
                {products.map(product =>(
                    <ProductList
                        key ={product.id}
                        product={product}
                        saveReloadProducts={saveReloadProducts}
                    />
                ))}
            </ul>
        </Fragment>
    )
}
export default Products;