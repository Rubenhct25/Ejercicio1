import {useState, useEffect} from 'react'
import Mensaje from './Mensaje';
import cerrarBtn from '../img/cerrar.svg'


const Modal = ({setModal, animarModal, setAnimarModal, guardarGastos, gastoEditar, setGastoEditar}) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('');
    const [id, setId] = useState('');

    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0 ){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
          }
    }, []);

    const handleCerrarModal = ()=> {

        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500);

    }

    const handleSubmit = e => {
        e.preventDefault()

        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return;
        }
        
        guardarGastos({nombre, cantidad, categoria, id, fecha})

    }

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img 
            src={cerrarBtn}
            alt='cerrar modal'
            onClick={handleCerrarModal}
        />
      </div>

      <form 
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
        >
        <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className='campo'>
            <label htmlFor='nombre'>Nombre Gasto</label>
            <input 
                type='text'
                id='nombre'
                value={nombre}
                onChange={e=> setNombre(e.target.value)}
                placeholder='Añade el Nombre del Gasto'
            />
        </div>

        <div className='campo'>
            <label htmlFor='cantidad'>Cantidad</label>
            <input 
                type='number'
                id='cantidad'
                value={cantidad}
                onChange={e=> setCantidad(Number(e.target.value))}
                placeholder='Añade la Cantidad del Gasto: Ej. 1000'
            />
        </div>

        <div className='campo'>
            <label htmlFor='categoria'>Categoria</label>
            <select 
                id='categoria' 
                value={categoria}
                onChange={e=> setCategoria(e.target.value)}
            >
                <option value=''>--- Seleccione ---</option>
                <option value="ahorro">Ahorro</option>
                <option value="comida">Comida</option>
                <option value="gastos">Gastos</option>
                <option value="salud">Salud</option>
                <option value="casa">Casa</option>
                <option value="ocio">Ocio</option>
                <option value="suscripciones">Suscripciones</option>
            </select>
        </div>

        <input 
            type="submit"
            value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}
        />
       
      </form>
    </div>
  )
}

export default Modal
