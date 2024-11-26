// Hooks
import { useEffect, useState } from 'react';
// Iconos
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
// Props
interface InputHorarioProps {
    campo: string;
    nombre: string;
    register: any;
    error: any;
    require?: boolean;
    valor?: string;
    setValue?: any;
    notMid?: boolean;
    notMidMD?: boolean;
    busqueda?: boolean;
    disabled?: boolean;
}

function InputHorario({
    busqueda,
    disabled,
    notMidMD,
    notMid,
    campo,
    nombre,
    register,
    error,
    require,
    valor,
    setValue,
}: InputHorarioProps) {
    // Estados
    const [avisoRequerido, setAvisoRequerido] = useState(false);

    // Si se recibe un valor, se setea en el formulario directamente con setValue
    useEffect(() => {
        if (valor) {
            setValue?.(nombre, valor);
        }
    }, [setValue, nombre, valor]);

    // Generar opciones de horarios de 08:00 a 19:00
    const generarHorarios = () => {
        const horarios: string[] = [];
        for (let hora = 8; hora <= 19; hora++) {
            horarios.push(`${hora.toString().padStart(2, '0')}:00`);
            horarios.push(`${hora.toString().padStart(2, '0')}:30`);
        }
        return horarios;
    };

    // Obtener clases dinámicas según las props
    function getClassName(campo: string, nombre: string, notMid: any, notMidMD: any) {
        if (campo === 'Barrio' || nombre === 'numero_de_expediente') {
            return 'flex flex-col w-full xl:w-1/2';
        } else if (notMid) {
            return 'flex flex-col w-full md:w-full';
        } else if (notMidMD) {
            return 'flex flex-col w-full xl:w-1/2';
        } else if (busqueda) {
            return 'flex flex-col w-full xl:w-1/2';
        } else {
            return 'flex flex-col md:w-1/2';
        }
    }

    return (
        <div className={getClassName(campo, nombre, notMid, notMidMD)}>
            <span className="flex font-medium ml-4">
                {campo}{' '}
                {error && (
                    <ExclamationCircleIcon
                        className="w-6 text-red-600 cursor-pointer"
                        onMouseEnter={() => setAvisoRequerido(true)}
                        onMouseLeave={() => setAvisoRequerido(false)}
                    />
                )}{' '}
                {avisoRequerido && <span className="text-red-600">Requerido</span>}
            </span>
            <select
                disabled={!!disabled}
                className="border open-sans border-gray-300 rounded-md h-10 xl:h-8 my-2 xl:my-1 xl:m-2 m-4 pl-2"
                {...register(nombre, { required: require !== false })}
            >
                <option value="">Seleccione un horario</option>
                {generarHorarios().map((horario) => (
                    <option key={horario} value={horario}>
                        {horario}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default InputHorario;
