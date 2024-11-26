import Swal from 'sweetalert2'
import InputRegister from '../../components/InputComponents/InputRegister'
import NavBar from '../../components/NavBar/NavBar'
import { useState, useEffect } from 'react'
import { createCursos, getCursosByMateria, getCursosByComision } from '../../api/Cursos/Cursos'
import { getMaterias, getMateria } from '../../api/Materias/Materias'
import { ArrowDownCircleIcon, MagnifyingGlassCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'

import { useForm } from 'react-hook-form'
import DataTable from 'react-data-table-component'
import { customStyles } from "../../GlobalConst/customStyles";
import ColumnsMaterias from './ColumnsEstudiantes'
import expandedComponents from './expandedComponents'
import SelectRegisterSingle from '../../components/Select/SelectRegisterSingle'
function index() {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const [listaCursos, setListaCursos]: any = useState([])
    const [listaMaterias, setListaMaterias]: any = useState([])
    const [modoBusqueda, setModoBusqueda] = useState(false)
    const [ searchByMateria, setSearchByMateria ] = useState(true)

    // Haz que listaMateria tenga el formato nombre para name y valor para id
    const listaMateriaOpciones = listaMaterias.map((materia: any) => {
        return {
            nombre: materia.name,
            value: materia.id
        }
    })

    useEffect(() => {
        const loadMaterias = async () => {
            const materias = await getMaterias()
            setListaMaterias(materias)
        }
        loadMaterias()
    }, [])

    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }


    return (
        <div>
            <NavBar />
            <div className="m-4">
                <h1 className="text-4xl">Cursos</h1>
                <div className="flex justify-center items-center">
                    <button className={`bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10 ${!modoBusqueda ? 'bg-blue-800' : ''}`} onClick={() => setModoBusqueda(false)}><PlusCircleIcon className='h-6 w-6' />Agregar</button>
                    <button className={`bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10 ${!modoBusqueda ? '' : 'bg-blue-800'}`} onClick={() => setModoBusqueda(true)}><MagnifyingGlassCircleIcon className='h-6 w-6' />Buscar</button>
                </div>

                {!modoBusqueda ?
                    <>
                        <h2 className="text-2xl">Agregar nuevo curso</h2>

                        <form action=""
                            onSubmit={
                                handleSubmit(async (data) => {
                                    Swal.fire({
                                        title: '¿Estás seguro de agregar este curso?',
                                        showCancelButton: true,
                                        confirmButtonText: `Si`,
                                        confirmButtonColor: '#172554',
                                        icon: 'warning',
                                        cancelButtonText: `Cancelar`,
                                    }).then(async (result) => {
                                        if (result.isConfirmed) {

                                            await createCursos(data)
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
                                })
                            }
                        >
                            <div className="flex flex-col items-center justify-center my-3">
                                <InputRegister type="text" register={register} setValue={setValue} error={errors.name} nombre="name" notMidMD campo="Nombre" />
                                <SelectRegisterSingle error={errors.subject_id} opciones={listaMateriaOpciones} isRequired={register} setValue={setValue} nombre="subject_id" campo="Materia" />
                                <button className='bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10' type="submit">Cargar</button>
                            </div>
                        </form>
                    </>
                    :
                    <>
                     <h2 className="text-2xl">Búsqueda de Cursos</h2>
                        <div className="flex justify-center items-center">
                            <button className={`bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10 ${searchByMateria ? 'bg-blue-800' : ''}`} onClick={() => setSearchByMateria(true)}>Por Materia</button>
                            <button className={`bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10 ${searchByMateria ? '' : 'bg-blue-800'}`} onClick={() => setSearchByMateria(false)}>Por Comisión</button>
                        </div>

                        <form
                            className='flex flex-col items-center justify-center my-3'
                            action=""
                            onSubmit={handleSubmit(async (data) => {
                                if(searchByMateria){
                                const cursos = await getCursosByMateria(data.subject_id)
                                const cursosProcesados = await Promise.all(cursos.map(async (curso: any) => {
                                    const materia = await getMateria(curso.subject_id)
                                    return { ...curso, subject_name: materia.name }
                                }))

                                setListaCursos(cursosProcesados)
                            }else{
                                    const curso = await getCursosByComision(data.commission_id)


                                const cursoConNombreDeMateria = await Promise.all(curso.map(async (curso: any) => {
                                    const materia = await getMateria(curso.subject_id)
                                    return { ...curso, subject_name: materia.name }
                                }
                                ))
                                    setListaCursos(cursoConNombreDeMateria)
                                }
                            })}

                        >
                            {searchByMateria ? 
                            <SelectRegisterSingle error={errors.subject_id} opciones={listaMateriaOpciones} isRequired={register} setValue={setValue} nombre="subject_id" campo="Materia" />
                            :
                            <InputRegister type="text" register={register} setValue={setValue} error={errors.commission_id} nombre="commission_id" campo="ID de Comisión" /> 
                            }
                            <button className='bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10' type="submit">Buscar</button>
                        </form>
                        <h2 className="text-2xl">Lista de Cursos</h2>
                        <DataTable
                            columns={ColumnsMaterias}
                            data={listaCursos}
                            pagination
                            expandableRows
                            expandableRowsComponent={expandedComponents}
                            customStyles={customStyles}
                            responsive={true}
                            striped={true}
                            highlightOnHover={true}
                            noDataComponent="No hay cursos para mostrar"
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