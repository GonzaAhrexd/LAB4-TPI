import Swal from 'sweetalert2'
import InputRegister from '../../components/InputComponents/InputRegister'
import NavBar from '../../components/NavBar/NavBar'
import { useState } from 'react'
import { getEstudianteByCurso, createEstudiante, getEstudianteByName } from '../../api/Estudiantes/Estudiantes'
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'

import { useForm } from 'react-hook-form'
import DataTable from 'react-data-table-component'
import { customStyles } from "../../GlobalConst/customStyles";
import ColumnsMaterias from './ColumnsEstudiantes'
import expandedComponents from './expandedComponents'

import { MagnifyingGlassCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

function index() {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [modoBusqueda, setModoBusqueda] = useState(false)
    const [listaEstudiantes, setListaEstudiantes]: any = useState([])

    const [searchByName, setSearchByName] = useState(true)


    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }


    return (
        <div>
            <NavBar />
            <div className="m-4">
                <h1 className="text-4xl">Estudiantes</h1>
                <div className="flex justify-center items-center">
                    <button className={`bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10 ${!modoBusqueda ? 'bg-blue-800' : ''}`} onClick={() => setModoBusqueda(false)}><PlusCircleIcon className='h-6 w-6' />Agregar</button>
                    <button className={`bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10 ${!modoBusqueda ? '' : 'bg-blue-800'}`} onClick={() => setModoBusqueda(true)}><MagnifyingGlassCircleIcon className='h-6 w-6' />Buscar</button>
                </div>


            {!modoBusqueda &&
                    <>
                <h2 className="text-2xl">Agregar nuevo estudiante</h2>

                <form action=""
                    onSubmit={
                        handleSubmit(async (data) => {
                            Swal.fire({
                                title: '¿Estás seguro de agregar este estudiante?',
                                showCancelButton: true,
                                confirmButtonText: `Si`,
                                confirmButtonColor: '#172554',
                                icon: 'warning',
                                cancelButtonText: `Cancelar`,
                            }).then(async (result) => {
                                if (result.isConfirmed) {

                                    await createEstudiante(data)
                                    Swal.fire({
                                        title: 'Materia agregado',
                                        confirmButtonText: `Ok`,
                                        icon: 'success',
                                        confirmButtonColor: '#172554',
                                    }).then(async (result) => {
                                        if (result.isConfirmed) {
                                            window.location.reload()
                                        }
                                    })
                                }
                            })
                            // console.log(data)
                        })
                    }
                >
                    <div className="flex flex-col items-center justify-center my-3">
                        <InputRegister type="text" register={register} setValue={setValue} error={errors.name} nombre="name" notMidMD campo="Nombre" />
                        <InputRegister type="text" register={register} setValue={setValue} error={errors.email} nombre="email" notMidMD campo="Email" />
                        
                        <button className='bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10' type="submit">Cargar</button>
                    </div>
                </form>
                </>
                }
                { modoBusqueda && 
                <>
                <h2 className="text-2xl">Búsqueda de Estudiantes</h2>

                    <div className='flex items-center justify-center'>
                        <button className={`bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10 ${searchByName ? 'bg-blue-800' : ''}`} onClick={() => setSearchByName(true)}>Por nombre</button>
                        <button className={`bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10 ${searchByName ? '' : 'bg-blue-800'}`} onClick={() => setSearchByName(false)}>Por ID de Curso</button>
                    </div>
                <form action="" 
                
                onSubmit={ handleSubmit(async (data) => {

                    if(searchByName){
                    const estudiantes = await getEstudianteByName(data.name)
                    setListaEstudiantes(estudiantes)
                    }else{
                        const estudiantes = await getEstudianteByCurso(data.course_id)
                        setListaEstudiantes(estudiantes)
                    }

                })}>

                    <div className="flex flex-col items-center justify-center my-3">
                        {searchByName ? 
                        <InputRegister type="text" register={register} setValue={setValue} error={errors.name} nombre="name" notMidMD campo="Nombre" require={false} />
                        :       
                        <InputRegister type="text" register={register} setValue={setValue} error={errors.course_id} nombre="course_id" notMidMD campo="ID de Curso" require={false} />
                    }
                        <button className='bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10' type="submit">Buscar</button>
                    </div>
                </form>




                <DataTable
                    columns={ColumnsMaterias}
                    data={listaEstudiantes}
                    pagination
                    expandableRows
                    expandableRowsComponent={expandedComponents}
                    customStyles={customStyles}
                    responsive={true}
                    striped={true}
                    highlightOnHover={true}
                    noDataComponent="No hay estudiantes para mostrar"
                    defaultSortFieldId={"Fecha"}
                    expandableIcon={expandableIcon}
                />
            </>
            }
            </div>
        </div>
    )
}

export default index