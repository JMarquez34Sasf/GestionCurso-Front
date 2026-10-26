import { useEffect, useState } from "react"
import type { Curso } from "../types/curso"
import { getCursos } from "../services/curosService"
import InscripcionModal from "../components/InscripcionModal"

function Cursos() {

    const [cursos, setCursos] = useState<Curso[]>([])
    const [error, setError] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [seleccionado, setSeleccionado] = useState<Curso | null>(null)

    useEffect(() => {
        const cargar = async () => {
            try {
                const data = await getCursos()
                setCursos(data ?? [])
            } catch (e) {
                console.log("error", e)
                setError("No se pudieron cargar los cursos")
            }
        }
        cargar()
    }, [])

    return (
        <div className="container py-4">
            {mensaje && (
                <div className="alert alert-success alert-dismissible">
                    {mensaje}
                    <button type="button" className="btn-close" onClick={() => setMensaje("")}></button>
                </div>
            )}
            <h2 className="mb-4">Cursos</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row g-3">
                {cursos.map(c => (
                    <div key={c.idCurso} className="col-sm-6 col-lg-4">
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{c.titulo}</h5>
                                <p className="card-text">{c.descripcion}</p>
                                <p className="card-text text-muted mb-1">
                                    Duración: <strong>{c.duracionHoras} h</strong>
                                </p>
                                <p className="card-text text-muted mb-1">
                                    Del {c.fechaInicio.slice(0, 10)} al {c.fechaFin.slice(0, 10)}
                                </p>
                                <p className="card-text text-muted">
                                    Instructor: <strong>{c.usuario}</strong>
                                </p>
                                <button type="button" className="btn btn-primary mt-auto" onClick={() => setSeleccionado(c)}>Inscribirse</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {seleccionado && (
                <InscripcionModal
                    curso={seleccionado}
                    onClose={() => setSeleccionado(null)}
                    onCreada={msg => setMensaje(msg)}
                />
            )}
        </div>
    )
}

export default Cursos
