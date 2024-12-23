<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api_StudentController;
use App\Http\Controllers\ProfessorController;
use App\Models\Student;
use App\Models\Course;
use App\Models\Commission;
use App\Models\Subject; 
use App\Models\Professor;
use App\Models\Course_Student;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CourseController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Haz una ruta ping pong para ver si funciona
Route::get('/ping', function () {
    return response()->json(['status' => 'OK']);
});



Route::apiResource('students_api', Api_StudentController::class);
Route::apiResource('professors', ProfessorController::class);

Route::get('/Q_Materias', [App\Http\Controllers\consultasController::class, 'listarMaterias']);



// Materias
/*
    Materias (Subject):
o Crear, editar, eliminar y listar materias.
o Campos necesarios: id, nombre.

*/
// Crear una materia
Route::post('/create-subject', function(Request $request) {
    $subject = new Subject();
    $subject->name = $request->name;        
    $subject->save();
    return response()->json(['message' => 'Materia creada exitosamente']);
});

// Mostrar todas las materias
Route::get('/subject', function() {
    $subjects = Subject::all();
    // Devuelvelo en json
    return response()->json($subjects);
});

// Actualizar materias
Route::put('/update-subject/{id}', function(Request $request, $id) {
    $subject = Subject::find($id);
    if ($subject) {
        $subject->name = $request->name;
        $subject->save();
        return response()->json(['message' => 'Materia actualizada exitosamente']);
    } else {
        return response()->json(['message' => 'Materia no encontrada']);
    }
});

// Eliminar materias
Route::delete('/delete-subject/{id}', function($id) {
    $subject = Subject::find($id);
    if ($subject) {
        $subject->delete();
        return response()->json(['message' => 'Materia eliminada exitosamente']);
    } else {
        return response()->json(['message' => 'Materia no encontrada']);
    }
});

Route::get('/subject/{id}', function($id) {
    $subject = Subject::find($id);
    if ($subject) {
        return response()->json($subject);
    } else {
        return response()->json(['message' => 'Materia no encontrada']);
    }
});

// Cursos
/*
    Cursos (Course):
o Crear, editar, eliminar y listar cursos.
o Campos necesarios: id, nombre, subject_id (relacionado con Subject).
o Filtrar cursos por materia y comisiones asociadas.
*/

Route::post('/create-course', function(Request $request) {
    $course = new Course();
    $course->name = $request->name;
    $course->subject_id = $request->subject_id;
    $course->save();
    return response()->json(['message' => 'Curso creado exitosamente']);
});

Route::get('/course', function() {
    $courses = Course::all();
    return response()->json($courses);
});

Route::put('/update-course/{id}', function(Request $request, $id) {
    $course = Course::find($id);
    if ($course) {
        $course->name = $request->name;
        $course->subject_id = $request->subject_id;
        $course->save();
        return response()->json(['message' => 'Curso actualizado exitosamente']);
    } else {
        return response()->json(['message' => 'Curso no encontrado']);
    }
});

Route::delete('/delete-course/{id}', function($id) {
    $course = Course::find($id);
    if ($course) {
        $course->delete();
        return response()->json(['message' => 'Curso eliminado exitosamente']);
    } else {
        return response()->json(['message' => 'Curso no encontrado']);
    }
});

// Filtrar cursos por materia
Route::get('/course-by-subject/{subject_id}', function($subject_id) {
    $courses = Course::where('subject_id', $subject_id)->get();
    return response()->json($courses);
});

// Filtrar curso por comisiones asociadas
Route::get('/course-by-commission/{commission_id}', function($commission_id) {
        $comission = Commission::find($commission_id);
        $course = Course::find($comission->course_id);
        return response()->json($course);
});

Route::get('/course/{id}', function($id) {
    $course = Course::find($id);
    if ($course) {
        return response()->json($course);
    } else {
        return response()->json(['message' => 'Curso no encontrado']);
    }
});


/*
    Comisiones (Commission):
o Crear, editar, eliminar y listar comisiones.
o Campos necesarios: id, aula, horario, course_id (relacionado con Course).
o Filtrar comisiones por curso y horario.
*/

Route::post('/create-commission', function(Request $request) {
    $commission = new Commission();

    // Devuelve un json con los errores
    // return response()->json($request->course_id);
    
    $commission->aula = $request->aula;
    $commission->horario = $request->horario;
    $commission->course_id = $request->course_id;
    $commission->professor_id = $request->professor_id;
    $commission->save();
    return response()->json(['message' => 'Comisión creada exitosamente']);
});

Route::get('/commission', function() {
    $commissions = Commission::all();
    return response()->json($commissions);
});

Route::put('/update-commission/{id}', function(Request $request, $id) {
    $commission = Commission::find($id);
    if ($commission) {
        $commission->aula = $request->aula;
        $commission->horario = $request->horario;
        $commission->course_id = $request->course_id;
        $commission->professor_id = $request->professor_id;
        $commission->save();
        return response()->json(['message' => 'Comisión actualizada exitosamente']);
    } else {
        return response()->json(['message' => 'Comisión no encontrada']);
    }
});

Route::delete('/delete-commission/{id}', function($id) {
    $commission = Commission::find($id);
    if ($commission) {
        $commission->delete();
        return response()->json(['message' => 'Comisión eliminada exitosamente']);
    } else {
        return response()->json(['message' => 'Comisión no encontrada']);
    }
});

// Filtrar comisiones por curso
Route::get('/commission-by-course/{course_id}', function($course_id) {
    $commissions = Commission::where('course_id', $course_id)->get();
    return response()->json($commissions);
});

// Filtrar comisiones por horario
Route::get('/commission-by-schedule/{schedule}', function($schedule) {
    $commissions = Commission::where('horario', $schedule)->get();
    return response()->json($commissions);
});

/* 
Profesores (Professor):
o Crear, editar, eliminar y listar profesores.
o Campos necesarios: id, nombre.
o Asignar un profesor a una o varias comisiones.

*/

// Crear
Route::post('/create-professor', function(Request $request) {

    $professor = new Professor();
    $professor->name = $request->name;
    $professor->specialization = $request->specialization;
    $professor->save();
    return response()->json(['message' => 'Profesor creado exitosamente']);

});

// Listar
Route::get('/professor', function() {
    $professors = Professor::all();
    return response()->json($professors);
});


// Editar
Route::put('/update-professor/{id}', function(Request $request, $id) {
    $professor = Professor::find($id);
    if ($professor) {
        $professor->name = $request->name;
        $professor->specialization = $request->specialization;
        $professor->save();
        return response()->json(['message' => 'Profesor actualizado exitosamente']);
    } else {
        return response()->json(['message' => 'Profesor no encontrado']);
    }
});

Route::delete('/delete-professor/{id}', function($id) {
    $professor = Professor::find($id);
    if ($professor) {
        $professor->delete();
        return response()->json(['message' => 'Profesor eliminado exitosamente']);
    } else {
        return response()->json(['message' => 'Profesor no encontrado']);
    }
});

// Asignar un profesor a una comisión
Route::post('/assign-professor-to-commission', function(Request $request) {
    $professor = Professor::find($request->professor_id);
    $commission = Commission::find($request->commission_id);
    if ($professor && $commission) {
        $professor->commissions()->attach($commission);
        return response()->json(['message' => 'Profesor asignado a comisión exitosamente']);
    } else {
        return response()->json(['message' => 'Profesor o comisión no encontrados']);
    }
});

// Filtrar profesores por id
Route::get('/professor/{id}', function($id) {
    $professor = Professor::find($id);
    if ($professor) {
        return response()->json($professor);
    } else {
        return response()->json(['message' => 'Profesor no encontrado']);
    }
});

// Filtrar profesores por nombre
Route::get('/professor-by-name/{name}', function($name) {
    $professors = Professor::where('name', $name)->get();
    return response()->json($professors);
});

Route::get('/professor-comissions', function(){
    // Lista las comisiones con el nombre del profesor en lugar de su id y luego ordenalos haciendo que los mismos profesores salgan juntos, por ejemplo, si Gaona tiene 2 comisiones que salga uno debajo del otro
    $comissions = Commission::all();

    $comissions = $comissions->map(function($comission) {
        $professor = Professor::find($comission->professor_id);
        $course = Course::find($comission->course_id);
        return [
            'aula' => $comission->aula,
            'horario' => $comission->horario,
            'curso' => $course->name,
            'profesor' => $professor->name
        ];
    });

    $comissions = $comissions->sortBy('profesor')->values();

    return response()->json($comissions);
    
});


// Estudiantes
/*
    Estudiantes (Student):
o Crear, editar, eliminar y listar estudiantes.
o Campos necesarios: id, nombre, email.
o Filtrar estudiantes por nombre y curso al que están inscritos.
*/

Route::post('/create-student', function(Request $request) {
    $student = new Student();
    $student->name = $request->name;
    $student->email = $request->email;
    $student->save();
    return response()->json(['message' => 'Estudiante creado exitosamente']);
});

Route::get('/student', function() {
    $students = Student::all();
    return response()->json($students);
});

Route::put('/update-student/{id}', function(Request $request, $id) {
    $student = Student::find($id);
    if ($student) {
        $student->name = $request->name;
        $student->email = $request->email;
        $student->save();
        return response()->json(['message' => 'Estudiante actualizado exitosamente']);
    } else {
        return response()->json(['message' => 'Estudiante no encontrado']);
    }
});


Route::delete('/delete-student/{id}', function($id) {
    $student = Student::find($id);
    if ($student) {
        $student->delete();
        return response()->json(['message' => 'Estudiante eliminado exitosamente']);
    } else {
        return response()->json(['message' => 'Estudiante no encontrado']);
    }
});

// Filtrar estudiantes por nombre
Route::get('/student-by-name/{name}', function($name) {
    $students = Student::where('name', $name)->get();
    return response()->json($students);
});

// Filtrar estudiantes por curso
Route::get('/student-by-course/{course_id}', function($course_id) {
    // Tiene que buscar todos los estudiantes de la tabla course-student que tengan el id = course_id , pero devolvelos en formato json de la tabla Student buscando el student_id de cada student_course

    $students = Course_Student::where('course_id', $course_id)->get();

    // Ahora,los estudiantes de que se encontaron en Course_student mapealos con la tabla Student
    $studentsFinally = $students->map(function($student) {
        return Student::find($student->student_id);
    });

    return response()->json($studentsFinally);
});



Route::get('/students-with-inscriptions', function() {

    // Obtener todos los estudiantes
    $students = Student::all();

    // Procesar la información de cada estudiante
    $studentsWithInscriptions = $students->map(function($student) {
        // Obtener las inscripciones del estudiante
        $inscriptions = Course_Student::where('student_id', $student->id)->get();
        
        // Mapear las inscripciones para crear un string con los nombres de los cursos y las comisiones
        $courseNames = $inscriptions->map(function($inscription) {
            $course = Course::find($inscription->course_id);
            return $course->name;
        })->implode(', '); // Convertir el array a un string separado por comas

        $commissionNames = $inscriptions->map(function($inscription) {
            $commission = Commission::find($inscription->commission_id);
            return $commission->aula;
        })->implode(', '); // Convertir el array a un string separado por comas

        // Devolver el formato esperado
        return [
            'nombre' => $student->name, 
            'cursos' => $courseNames, 
            'comisiones' => $commissionNames
        ];
    });

    // Retornar la respuesta en formato JSON
    return response()->json($studentsWithInscriptions);

});



/*
Inscripciones de Estudiantes (Course_Student):
o Crear, editar, eliminar y listar inscripciones de estudiantes a cursos y comisiones.
o Campos necesarios: id, student_id, course_id, commission_id.
o Asegurarse de que un estudiante solo pueda estar en una comisión específica dentro de un curso.

*/

Route::post('/create-course-student', function(Request $request) {
    $course_student = new Course_Student();
    $course_student->student_id = $request->student_id;
    $course_student->course_id = $request->course_id;
    $course_student->commission_id = $request->commission_id;
    $course_student->save();
    return response()->json(['message' => 'Inscripción de estudiante creada exitosamente']);
});

Route::get('/course-student', function() {
    $course_students = Course_Student::all();
    return response()->json($course_students);
});

Route::put('/update-course-student/{id}', function(Request $request, $id) {
    $course_student = Course_Student::find($id);
    if ($course_student) {
        $course_student->student_id = $request->student_id;
        $course_student->course_id = $request->course_id;
        $course_student->commission_id = $request->commission_id;
        $course_student->save();
        return response()->json(['message' => 'Inscripción de estudiante actualizada exitosamente']);
    } else {
        return response()->json(['message' => 'Inscripción de estudiante no encontrada']);
    }
});

Route::delete('/delete-course-student/{id}', function($id) {
    $course_student = Course_Student::find($id);
    if ($course_student) {
        $course_student->delete();
        return response()->json(['message' => 'Inscripción de estudiante eliminada exitosamente']);
    } else {
        return response()->json(['message' => 'Inscripción de estudiante no encontrada']);
    }
});

// Asegurarse de que un estudiante solo pueda estar en una comisión específica dentro de un curso
Route::post('/assign-student-to-commission', function(Request $request) {
    $student = Student::find($request->student_id);
    $commission = Commission::find($request->commission_id);
    if ($student && $commission) {
        $student->commissions()->attach($commission);
        return response()->json(['message' => 'Estudiante asignado a comisión exitosamente']);
    } else {
        return response()->json(['message' => 'Estudiante o comisión no encontrados']);
    }
});


Route::get('/course-order-subject/', function() {
    // Obtener todos los cursos y mapearlos con el nombre de la materia
    $courses = Course::all()->map(function($course) {
        $subject = Subject::find($course->subject_id);
        return [
            'nombre' => $course->name,
            'materia' => $subject->name
        ];
    });

    // Ordenar los cursos por el nombre de la materia
    $courses = $courses->sortBy('materia')->values();

    return response()->json($courses);
});

Route::get('/comissions-show-excel', function() {
    // Muestra todas las comisiones, pero muestra con los nombres de los cursos y profesores buscando por sus id    
    $comissions = Commission::all();

    $comissions = $comissions->map(function($comission) {
        $course = Course::find($comission->course_id);
        $professor = Professor::find($comission->professor_id);
        return [
            'aula' => $comission->aula,
            'horario' => $comission->horario,
            'curso' => $course->name,
            'profesor' => $professor->name
        ];
    });



return response()->json($comissions);



});


/*
        Route::resource('students',StudentController::class);
        Route::resource('courses', CourseController::class);
*/