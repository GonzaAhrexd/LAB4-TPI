import NavBar from "../../components/NavBar/NavBar"
import { useForm } from "react-hook-form"
import InputRegister from "../../components/InputComponents/InputRegister"
import { createProfesor, getProfesoresByName } from "../../api/Profesores/Profesores";
import Swal from 'sweetalert2'
import { useState } from "react";
import ColumnsProfesores from "./ColumnsProfesores";
import DataTable from "react-data-table-component";
import { customStyles } from "../../GlobalConst/customStyles";
import { ArrowDownCircleIcon, MagnifyingGlassCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import expandedComponents from "./expandedComponents";
function index() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const [listaProfesores, setListaProfesores]: any = useState([])
    const [modoBusqueda, setModoBusqueda] = useState(false)


    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }


    return (
        <div>
            <NavBar />
            <div className="m-4">
                <h1 className="text-4xl">Profesores</h1>
                <div className="flex justify-center items-center">
                    <button className={`bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10 ${!modoBusqueda ? 'bg-blue-800' : ''}`} onClick={() => setModoBusqueda(false)}><PlusCircleIcon className='h-6 w-6' />Agregar</button>
                    <button className={`bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10 ${!modoBusqueda ? '' : 'bg-blue-800'}`} onClick={() => setModoBusqueda(true)}><MagnifyingGlassCircleIcon className='h-6 w-6' />Buscar</button>
                </div>



                {!modoBusqueda ?
                    <>
                        <h2 className="text-2xl">Agregar nuevo profesor</h2>
                        <form action=""
                            onSubmit={
                                handleSubmit(async (data) => {
                                    Swal.fire({
                                        title: '¿Estás seguro de agregar este profesor?',
                                        showCancelButton: true,
                                        confirmButtonText: `Si`,
                                        confirmButtonColor: '#172554',
                                        icon: 'warning',
                                        cancelButtonText: `Cancelar`,
                                    }).then(async (result) => {
                                        if (result.isConfirmed) {

                                            await createProfesor(data)
                                            Swal.fire({
                                                title: 'Profesor agregado',
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
                                <InputRegister type="text" register={register} setValue={setValue} error={errors.specialization} nombre="specialization" notMidMD campo="Especialidad" />
                                <button className='bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10' type="submit">Cargar</button>
                            </div>
                        </form>
                    </>
                    :
                    <>
                        <form
                            className="flex flex-col items-center justify-center my-3"
                            onSubmit={handleSubmit(async (data) => {
                                // console.log(data.name)
                                const profesores = await getProfesoresByName(data.name)


                                console.log(profesores)
                                // @ts-ignore
                                setListaProfesores(profesores)
                            })
                            }
                        >
                            <InputRegister type="text" register={register} setValue={setValue} error={errors.name} nombre="name" notMidMD campo="Nombre" />
                            <button className='bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10'>Buscar</button>
                        </form>
                        <h2 className="text-2xl">Lista de Profesores</h2>
                        <DataTable
                            columns={ColumnsProfesores}
                            data={listaProfesores}
                            pagination
                            expandableRows
                            expandableRowsComponent={expandedComponents}
                            customStyles={customStyles}
                            responsive={true}
                            striped={true}
                            highlightOnHover={true}
                            noDataComponent="No hay profesores para mostrar"
                            defaultSortFieldId={"Fecha"}
                            expandableIcon={expandableIcon}
                        />
                    </>}
            </div>
        </div>
    )
}

export default index