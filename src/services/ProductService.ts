import { safeParse,  pipe, string, transform, number, parse } from "valibot";
import axios from "axios";
import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types"
import { toBoolean } from "../utils";

type ProductData = { 
    [k: string]: FormDataEntryValue;
}

// Agregar Producto
export async function addProduct(data : ProductData) {
    try {
        // Safeparse para chequear que los datos que se envian son correctos
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        
        // Consultar la API
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Datos no validos')
        }
    } catch (error) {
        console.log(error)
    }
}

// Mostrar todos los productos
export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

// Mostrar todos los productos
export async function getProductById(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

// Actualizar un Producto
export async function updateProduct(data : ProductData, id: Product['id']) {
    try {
        const NumberSchema = pipe(string(), transform(Number), number());

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })

        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }
}

// Actualizar Disponibilidad
export async function updateAvailability(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}

// Eliminar Producto
export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
         await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}