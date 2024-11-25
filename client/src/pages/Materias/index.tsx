import Swal from 'sweetalert2'
import InputRegister from '../../components/InputComponents/InputRegister'
import NavBar from '../../components/NavBar/NavBar'
import { useState, useEffect } from 'react'
import { getMaterias, createMateria } from '../../api/Materias/Materias'
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'

import { useForm } from 'react-hook-form'
import DataTable from 'react-data-table-component'
import { customStyles } from "../../GlobalConst/customStyles";
import ColumnsMaterias from './ColumnsMaterias'
import expandedComponents from './expandedComponents'
function index() {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const [listaMaterias, setListaMaterias]: any = useState([])

    useEffect(() => {
        const loadMaterias = async () => {
            const materias = await getMaterias()
            
            // @ts-ignore
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
                <h1 className="text-4xl">Materias</h1>
                <h2 className="text-2xl">Agregar nueva materia</h2>

                <form action=""
                    onSubmit={
                        handleSubmit(async (data) => {
                            Swal.fire({
                                title: '¿Estás seguro de agregar esta materia?',
                                showCancelButton: true,
                                confirmButtonText: `Si`,
                                confirmButtonColor: '#172554',
                                icon: 'warning',
                                cancelButtonText: `Cancelar`,
                            }).then(async (result) => {
                                if (result.isConfirmed) {

                                    await createMateria(data)
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
                        <button className='bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10' type="submit">Cargar</button>
                    </div>
                </form>
                <h2 className="text-2xl">Lista de Materias</h2>
                <DataTable
                    columns={ColumnsMaterias}
                    data={listaMaterias}
                    pagination
                    expandableRows
                    expandableRowsComponent={expandedComponents}
                    customStyles={customStyles}
                    responsive={true}
                    striped={true}
                    highlightOnHover={true}
                    noDataComponent="No hay materias para mostrar"
                    defaultSortFieldId={"Fecha"}
                    expandableIcon={expandableIcon}
                />

            </div>
        </div>
    )
}

export default index