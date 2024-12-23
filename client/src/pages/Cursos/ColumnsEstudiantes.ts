/* 
--------------------------------------------------------------------------------------------------------
    CAMPOS
    name: Nombre de la columna
    selector: Campo que se mostrará en la columna, debe ir en el formato (row:Row) => row.nombre_campo
    sortable: Si se puede ordenar la columna
    style: Estilos de la columna
----------------------------------------------------------------------------------------------------------
*/
type Row = {
    id: number;
    name: string;
    subject_id: number;
    subject_name: string;
}
// Luego usa `subject_name` en el selector
const ColumnsCursos = [
    {
        name: 'ID',
        selector: (row: Row) => row.id,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: 'Nombre',
        selector: (row: Row) => row.name,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: 'Materia',
        selector: (row: Row) => row.subject_name,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
];


export default ColumnsCursos;
