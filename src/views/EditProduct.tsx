import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { getProductById, updateProduct } from "../services/ProductService"
import { Product } from "../types"
import ProductForm from "../components/ProductForm"

// Loader de React Router DOM
export async function loader({params} : LoaderFunctionArgs) {

  if(params.id !== undefined) {
    const product = await getProductById(+params.id)
    if(!product) {
      //throw new Response('', { status: 404, statusText: 'No Encontrado' })
      return redirect('/')
    }
    return product
  }
}

// Action de React Router DOM
export async function action({request, params} : ActionFunctionArgs) {

  const data = Object.fromEntries(await request.formData())
  
  let error = ""
  if(Object.values(data).includes('')) {
    error = "Todos los campos son obligatorios"
  }

  if(error.length) {
    return error
  }

  // Si detecta un param.id en la url es porque esta editando
  if(params.id !== undefined) {

    await updateProduct(data, +params.id)
    return redirect('/')
  }
}

const availabilityOptions = [
  { name: 'Disponible', value: true},
  { name: 'No Disponible', value: false}
]

// COMPONENTE
export default function EditProduct() {

  const product = useLoaderData() as Product
  const error = useActionData() as string

  return (
    <>
          <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>

                <Link
                    to="/"
                    className="rounded-md bg-indigo-600 p-3 text-white text-sm font-bold uppercase hover:bg-indigo-500 transition-all cursor-pointer shadow-sm"
                >
                    Volver 
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form 
              className="mt-10"
              method="POST"
            >

             <ProductForm 
              product={product}
             
             />

              <div className="mb-4">
                  <label
                      className="text-gray-800"
                      htmlFor="availability"
                  >Disponibilidad:</label>
                  <select 
                      id="availability"
                      className="mt-2 block w-full p-3 bg-gray-50 rounded border"
                      name="availability"
                      defaultValue={product?.availability.toString()}
                  >
                      {availabilityOptions.map(option => (
                        <option key={option.name} value={option.value.toString()}>{option.name}</option>
                      ))}
                  </select>
              </div>

              <input 
                type="submit" 
                value="Guardar Cambios" 
                className="mt-5 bg-indigo-600 text-white uppercase p-3 w-full rounded font-bold hover:bg-indigo-500 cursor-pointer transition-all"
              />
            </Form>
    </>
  )
}
