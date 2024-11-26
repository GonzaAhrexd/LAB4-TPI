import Swal from 'sweetalert2'
import InputRegister from '../../components/InputComponents/InputRegister'
import NavBar from '../../components/NavBar/NavBar'
import { useState, useEffect } from 'react'
import { getCursos, getCurso } from '../../api/Cursos/Cursos'
import { createComision, getComisionesPorCurso, getComisionesPorHorario } from '../../api/Comisiones/Comisiones'
import {getProfesores, getProfesor } from '../../api/Profesores/Profesores'
// import { getMaterias } from '../../api/Materias/Materias'
import { ArrowDownCircleIcon, MagnifyingGlassCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'

import { useForm } from 'react-hook-form'
import DataTable from 'react-data-table-component'
import { customStyles } from "../../GlobalConst/customStyles";
import ColumnsMaterias from './ColumnsComisiones'
import expandedComponents from './expandedComponents'
import SelectRegisterSingle from '../../components/Select/SelectRegisterSingle'
import InputHorario from '../../components/InputComponents/InputHour'
function index() {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const [listaCursos, setListaCursos]: any = useState([])
    const [ listaComisiones, setListaComisiones ]: any = useState([])
    const [listaProfesores, setListaProfesores]: any = useState([])
    const [modoBusqueda, setModoBusqueda] = useState(false)
    const [searchByCurso, setSearchByCurso] = useState(true)

    // Haz que listaMateria tenga el formato nombre para name y valor para id
   

    useEffect(() => {
        // const loadComisiones = async () => {
        //     const materias = await getComisiones()
        //     // Agrega a materias el nombre del curso desde course_id utilizando getCurso
        //     const materiasConCurso = await Promise.all(materias.map(async (materia: any) => {
        //         const curso = await getCurso(materia.course_id)
        //         return {
        //             ...materia,
        //             curso: curso.name
        //         }
        //     }
        //     ))
        //     // Agrega a materiasConCurso el nombre del profesor desde professor_id utilizando getProfesor
        //     const materiasConCursoYProfesor = await Promise.all(materiasConCurso.map(async (materia: any) => {
        //         const profesor = await getProfesor(materia.professor_id)
        //         return {
        //             ...materia,
        //             profesor: profesor.name
        //         }
        //     }
        //     ))

        //     setListaComisiones(materiasConCursoYProfesor)
        // }
        const loadCursos = async () => {
            const cursos = await getCursos()   
            setListaCursos(cursos)
        }
        const loadProfesores = async () => {
            const profesores = await getProfesores()
            setListaProfesores(profesores)
        }

        loadProfesores()
        // loadComisiones()
        loadCursos()
    }, [])

    const listaCursosOpciones = listaCursos.map((curso: any) => {
      return {
          nombre: curso.name,
          value: curso.id
      }
  })

  const listaProfesoresOpciones = listaProfesores.map((profesor: any) => {
    return {
        nombre: profesor.name,
        value: profesor.id
    }
})

   

    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }


    return (
        <div>
            <NavBar />
            <div className="m-4">
                <h1 className="text-4xl">Comisiones</h1>
                <div className="flex justify-center items-center">
                    <button className={`bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10 ${!modoBusqueda ? 'bg-blue-800' : ''}`} onClick={() => setModoBusqueda(false)}><PlusCircleIcon className='h-6 w-6' />Agregar</button>
                    <button className={`bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10 ${!modoBusqueda ? '' : 'bg-blue-800'}`} onClick={() => setModoBusqueda(true)}><MagnifyingGlassCircleIcon className='h-6 w-6' />Buscar</button>
                </div>
                    {!modoBusqueda ?
                    <> 
                <h2 className="text-2xl">Agregar nueva comisión</h2>

                <form action=""
                    onSubmit={
                        handleSubmit(async (data) => {
                            Swal.fire({
                                title: '¿Estás seguro de agregar esta comisión?',
                                showCancelButton: true,
                                confirmButtonText: `Si`,
                                confirmButtonColor: '#172554',
                                icon: 'warning',
                                cancelButtonText: `Cancelar`,
                            }).then(async (result) => {
                                if (result.isConfirmed) {

                                    await createComision(data)
                                    Swal.fire({
                                        title: 'Comisión agregada',
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
                    <InputRegister type="text" register={register} setValue={setValue} error={errors.name} nombre="aula" notMidMD campo="Aula" />
                    <InputHorario register={register} setValue={setValue} error={errors.time} nombre="horario" campo="Hora" />
                    <SelectRegisterSingle error={errors.course_id} opciones={listaCursosOpciones} isRequired={register} setValue={setValue} nombre="course_id" campo="Cursos"/>
                    <SelectRegisterSingle error={errors.course_id} opciones={listaProfesoresOpciones} isRequired={register} setValue={setValue} nombre="professor_id" campo="Profesor"/>
                    
                        <button className='bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10' type="submit">Cargar</button>
                    </div>
                </form>
                        </>
                : 
                <>
                <h2 className="text-2xl">Búsqueda de Comisiones</h2>
                <div className='flex items-center justify-center'>
                        <button className={`bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10 ${searchByCurso ? 'bg-blue-800' : ''}`} onClick={() => setSearchByCurso(true)}>Por Curso</button>
                        <button className={`bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10 ${searchByCurso ? '' : 'bg-blue-800'}`} onClick={() => setSearchByCurso(false)}>Por horario</button>
                    </div>
                <form action=""
                    onSubmit={handleSubmit(async (data) => {
                        if(searchByCurso){
                            const comisiones = await getComisionesPorCurso(data.course_id)
                            const comisionesConCurso = await Promise.all(comisiones.map(async (comision: any) => {
                                const curso = await getCurso(comision.course_id)
                                return {
                                    ...comision,
                                    curso: curso.name
                                }
                            }
                            ))
                            const comisionesConCursoYProfesor = await Promise.all(comisionesConCurso.map(async (comision: any) => {
                                const profesor = await getProfesor(comision.professor_id)
                                return {
                                    ...comision,
                                    profesor: profesor.name
                                }
                            }
                            ))
                            setListaComisiones(comisionesConCursoYProfesor)
                        } else {
                            const comisiones = await getComisionesPorHorario(data.schedule)
                            const comisionesConCurso = await Promise.all(comisiones.map(async (comision: any) => {
                                const curso = await getCurso(comision.course_id)
                                return {
                                    ...comision,
                                    curso: curso.name
                                }
                            }
                            ))
                            const comisionesConCursoYProfesor = await Promise.all(comisionesConCurso.map(async (comision: any) => {
                                const profesor = await getProfesor(comision.professor_id)
                                return {
                                    ...comision,
                                    profesor: profesor.name
                                }
                            }
                            ))
                            setListaComisiones(comisionesConCursoYProfesor)
                        }})
                    }
                >
                    <div className="flex flex-col items-center justify-center my-3">
                    {searchByCurso ? 
                    <SelectRegisterSingle error={errors.course_id} opciones={listaCursosOpciones} isRequired={register} setValue={setValue} nombre="course_id" campo="Curso"/>
                    : 
                    <InputHorario register={register} setValue={setValue} error={errors.course_id} nombre="schedule" campo="Horario" />
                    }
                    <button className='bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10' type="submit">Buscar</button>
                    </div>
                </form>
                <DataTable
                    columns={ColumnsMaterias}
                    data={listaComisiones}
                    pagination
                    expandableRows
                    expandableRowsComponent={expandedComponents}
                    customStyles={customStyles}
                    responsive={true}
                    striped={true}
                    highlightOnHover={true}
                    noDataComponent="No hay comisiones para mostrar"
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