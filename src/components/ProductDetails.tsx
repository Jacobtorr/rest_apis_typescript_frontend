import { ActionFunctionArgs, Form, useNavigate, redirect, useFetcher } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
    product: Product
}

export async function action({params} : ActionFunctionArgs) {
    
    // Si detecta un param.id en la url es porque esta editando
    if(params.id !== undefined) {
        
        await deleteProduct(+params.id)
        return redirect('/')
      }
}

export default function ProductDetails({product} : ProductDetailsProps) {

    const fetcher = useFetcher()

    const navigate = useNavigate()

    const isAvailable = product.availability

  return (
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <fetcher.Form method="POST">
                <button
                    type="submit"
                    name="id"
                    value={product.id}
                    className={`${isAvailable ? 'bg-green-500' : 'bg-gray-400'} text-white rounded-full p-2 text-xs font-bold uppercase w-full max-w-28`}
                >
                    {isAvailable ? 'Disponible' : 'No Disponible'}
                </button>
            </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className="flex gap-2 items-center">
                <button 
                    onClick={() => navigate(`/productos/${product.id}/editar`)}
                    className="bg-indigo-600 text-white rounded-lg p-2 text-xs uppercase font-bold w-full text-center hover:bg-indigo-500 transition-all"
                >
                    Editar
                </button>
                <Form
                    className="w-full"
                    method="POST"
                    action={`productos/${product.id}/eliminar`}
                    onSubmit={(e) => {
                        if(!confirm('Eliminar?')) {
                            e.preventDefault()
                        }
                    }}
                >
                    <input 
                        type="submit" 
                        value="Eliminar" 
                        className="bg-red-600 text-white rounded-lg p-2 text-xs uppercase font-bold w-full text-center hover:bg-red-500 transition-all cursor-pointer"
                    />
                </Form>
            </div>
        </td>
    </tr> 
  )
}
