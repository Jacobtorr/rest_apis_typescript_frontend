import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProducts, updateAvailability } from "../services/ProductService"
import ProductDetails from "../components/ProductDetails"
import { Product } from "../types"

// Loader para obtener productos
export async function loader() {
    const products = await getProducts()

  return products
}

// Action para cambiar disponibilidad
export async function action({request} : ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())

  await updateAvailability(+data.id)
}

export default function Products() {

  const products = useLoaderData() as Product[]

  return (
    <>
        <div className="flex justify-between">
            <h2 className="text-4xl font-black text-slate-500">Productos</h2>

            <Link
                to="productos/nuevo"
                className="rounded-md bg-indigo-600 p-3 text-white text-sm font-bold uppercase hover:bg-indigo-500 transition-all cursor-pointer shadow-sm"
            >
                Agregar Producto
            </Link>
        </div>

        <div className="p-2">
          <table className="w-full mt-5 table-auto">
            <thead className="bg-slate-800 text-white">
                <tr>
                    <th className="p-2">Producto</th>
                    <th className="p-2">Precio</th>
                    <th className="p-2">Disponibilidad</th>
                    <th className="p-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <ProductDetails 
                  key={product.id}
                  product={product}
                />
              ))}
            </tbody>
          </table>
        </div>
    
    
    </>
  )
}
