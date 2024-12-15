import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct } from "../services/ProductService"
import ProductForm from "../components/ProductForm"

export async function action({request} : ActionFunctionArgs) {

  const data = Object.fromEntries(await request.formData())
  

  let error = ""
  if(Object.values(data).includes('')) {
    error = "Todos los campos son obligatorios"
  }

  if(error.length) {
    return error
  }

  await addProduct(data)

  return redirect('/')
}

export default function NewProduct() {

  const error = useActionData() as string

  return (
    <>
          <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Nuevo Producto</h2>

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

              <ProductForm />

              <input 
                type="submit" 
                value="Registrar Producto" 
                className="mt-5 bg-indigo-600 text-white uppercase p-3 w-full rounded font-bold hover:bg-indigo-500 cursor-pointer transition-all"
              />
            </Form>
    </>
  )
}
