import { useForm } from "react-hook-form";
import InputRegister from "../../components/InputComponents/InputRegister";
import Swal from "sweetalert2";
import { updateCursos, deleteCursos } from "../../api/Cursos/Cursos";
import {getMaterias} from '../../api/Materias/Materias'
import SelectRegisterSingle from "../../components/Select/SelectRegisterSingle";
import { useEffect, useState } from "react";

type expandedComponentsProps = {
    data: any;
}

function expandedComponents({ data }: expandedComponentsProps) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar este curso?',
            showCancelButton: true,
            confirmButtonText: `Si`,
            icon: 'warning',
            cancelButtonText: `Cancelar`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Curso eliminado',
                    confirmButtonText: `Ok`,
                    icon: 'success',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        window.location.reload()
                    }
                })
                await deleteCursos(id)
            }

        }
        )
    }


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

        loadMaterias()
    })
    return (
        <div>
            <form action=""
                onSubmit={
                    handleSubmit(async (values) => {
                        Swal.fire({
                            title: '¿Estás seguro de editar esta Materia?',
                            showCancelButton: true,
                            confirmButtonText: `Si`,
                            icon: 'warning',
                            cancelButtonText: `Cancelar`,
                            confirmButtonColor: '#172554',
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                values.id = data.id
                                if(!values.subject_id) values.subject_id = data.subject_id
                                if(!values.name) values.name = data.name
                                
                                await updateCursos(values)
                                Swal.fire({
                                    title: 'Curso modificado',
                                    confirmButtonText: `Ok`,
                                    icon: 'success',
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
                    <InputRegister valor={data.name} type="text" register={register} setValue={setValue} error={errors.name} nombre="name" notMidMD campo="Nombre" />
                    <SelectRegisterSingle valor={data.materia_id} isRequired={false} setValue={setValue} error={errors.materia_id} nombre="materia_id"  campo="Materia" opciones={listaMateriaOpciones} />                 
                    <button className='bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 my-2 rounded w-4/10' type="submit">Editar</button>
                    <div className='cursor-pointer flex flex-col items-center justify-center bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10' onClick={() => handleDelete(data.id)}>Eliminar</div>
                </div>
            </form>
        </div>
    )
}

export default expandedComponents