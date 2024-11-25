import Swal from 'sweetalert2'
import InputRegister from '../../components/InputComponents/InputRegister'
import NavBar from '../../components/NavBar/NavBar'
import { useState, useEffect } from 'react'
import { getCursos, createCursos } from '../../api/Cursos/Cursos'
import { getMaterias } from '../../api/Materias/Materias'
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'
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
        const loadCursos = async () => {
            const cursos = await getCursos()   
            // @ts-ignore
            setListaCursos(cursos)
        }

        loadMaterias()
        loadCursos()
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
                            // console.log(data)
                        })
                    }
                >
                    <div className="flex flex-col items-center justify-center my-3">
                        <InputRegister type="text" register={register} setValue={setValue} error={errors.name} nombre="name" notMidMD campo="Nombre" />
                        <SelectRegisterSingle error={errors.subject_id} opciones={listaMateriaOpciones} isRequired={register} setValue={setValue} nombre="subject_id" campo="Materia"/>
                        <button className='bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10' type="submit">Cargar</button>
                    </div>
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
                    noDataComponent="No hay estudiantes para mostrar"
                    defaultSortFieldId={"Fecha"}
                    expandableIcon={expandableIcon}
                />

            </div>
        </div>
    )
}

export default index