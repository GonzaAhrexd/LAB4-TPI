import Swal from 'sweetalert2'
import InputRegister from '../../components/InputComponents/InputRegister'
import NavBar from '../../components/NavBar/NavBar'
import { useState, useEffect } from 'react'
import { getMaterias, createMateria } from '../../api/Materias/Materias'
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import { getCursos } from '../../api/Cursos/Cursos'
import { useForm } from 'react-hook-form'
import DataTable from 'react-data-table-component'
import { customStyles } from "../../GlobalConst/customStyles";
import ColumnsMaterias from './ColumnsMaterias'
import expandedComponents from './expandedComponents'
import InputNumber from '../../components/InputComponents/InputNumber'
import { createInscripcion } from '../../api/Inscripciones/Inscripciones'
function index() {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    // const [listaMaterias, setListaMaterias]: any = useState([])

    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }


    return (
        <div>
            <NavBar />
            <div className="m-4">
                <h1 className="text-4xl">Inscripciones</h1>
                <h2 className="text-2xl">Inscribir a un alumno</h2>

                <form action=""
                    onSubmit={
                        handleSubmit(async (data) => {
                            Swal.fire({
                                title: '¿Estás seguro de inscribir a este alumno?',
                                showCancelButton: true,
                                confirmButtonText: `Si`,
                                confirmButtonColor: '#172554',
                                icon: 'warning',
                                cancelButtonText: `Cancelar`,
                            }).then(async (result) => {
                                if (result.isConfirmed) {

                                    await createInscripcion(data)
                                    Swal.fire({
                                        title: 'Alumno agregado',
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
                        <InputNumber type="number" register={register} setValue={setValue} error={errors.carga_horaria} nombre="student_id"  campo="ID de estudiante" maxLenght={10} />
                        <InputNumber type="number" register={register} setValue={setValue} error={errors.carga_horaria} nombre="course_id"  campo="ID del curso"  maxLenght={10}/>
                        <InputNumber type="number" register={register} setValue={setValue} error={errors.carga_horaria} nombre="commission_id"  campo="ID de la comisión" maxLenght={10}/>
                        <button className='bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10' type="submit">Cargar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default index