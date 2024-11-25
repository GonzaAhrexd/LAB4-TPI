import { useForm } from "react-hook-form";
import InputRegister from "../../components/InputComponents/InputRegister";
import Swal from "sweetalert2";
import { updateEstudiante, deleteEstudiante } from "../../api/Estudiantes/Estudiantes";

type expandedComponentsProps = {
    data: any;
}

function expandedComponents({ data }: expandedComponentsProps) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar esta Materia?',
            showCancelButton: true,
            confirmButtonText: `Si`,
            icon: 'warning',
            cancelButtonText: `Cancelar`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Materia eliminada',
                    confirmButtonText: `Ok`,
                    icon: 'success',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        window.location.reload()
                    }
                })
                await deleteEstudiante(id)
            }

        }
        )
    }
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

                                await updateEstudiante(values)
                                Swal.fire({
                                    title: 'Materia agregado',
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
                    <InputRegister valor={data.email} type="text" register={register} setValue={setValue} error={errors.name} nombre="email" notMidMD campo="Email" />
                    <button className='bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 my-2 rounded w-4/10' type="submit">Editar</button>
                    <div className='cursor-pointer flex flex-col items-center justify-center bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10' onClick={() => handleDelete(data.id)}>Eliminar</div>
                </div>
            </form>
        </div>
    )
}

export default expandedComponents