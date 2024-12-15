import { Product } from "../types"

type ProductFormProps = {
    product?: Product
}

export default function ProductForm({product} : ProductFormProps) {
  return (
    <>
         <div className="mb-4">
                <label htmlFor="name" className="text-gray-800">Nombre Producto: </label>

                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  className="mt-2 block w-full p-3 bg-gray-50 rounded border"
                  placeholder="Nombre del Producto"
                  defaultValue={product?.name}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="text-gray-800">Precio: </label>

                <input 
                  type="number" 
                  name="price" 
                  id="price" 
                  className="mt-2 block w-full p-3 bg-gray-50 rounded border"
                  placeholder="Precio Producto. ej. 200, 300"
                  defaultValue={product?.price}
                />
              </div>
    
    </>
  )
}
