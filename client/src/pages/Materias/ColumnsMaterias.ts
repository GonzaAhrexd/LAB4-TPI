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
    name: string;
    specialization: string;
}

// Columnas de la tabla de denuncias
const ColumnsProfesores = [
    {
        // Nombre de usuario
        name: 'ID',
        selector: (row:Row) => row.id,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Nombre
        name: 'Nombre',
        selector: (row:Row) => row.name,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
     
];

export default ColumnsProfesores