/* 
--------------------------------------------------------------------------------------------------------
    CAMPOS
    name: Nombre de la columna
    selector: Campo que se mostrará en la columna, debe ir en el formato (row:Row) => row.nombre_campo
    sortable: Si se puede ordenar la columna
    style: Estilos de la columna
----------------------------------------------------------------------------------------------------------
*/

// Datos que se mostrarán en la tabla de denuncias
type Row = {
    id: number;
    aula: string;
    horario: string;
    profesor: string;
    curso: string;
}

// Columnas de la tabla de denuncias
const ColumnsComisiones = [
    {
        // Nombre de usuario
        name: 'ID',
        selector: (row:Row) => row.id,
        sortable: true,
        style: {            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: 'Aula',
        selector: (row:Row) => row.aula,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: 'Horario',
        selector: (row:Row) => row.horario,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: 'Profesor',
        selector: (row:Row) => row.profesor,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: 'Curso',
        selector: (row:Row) => row.curso,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },

     
];

export default ColumnsComisiones