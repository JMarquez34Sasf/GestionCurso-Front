import { useState } from "react"
import axios from "axios"
import type { Curso } from "../types/curso"
import { inscribir } from "../services/inscripcionService"

interface Props {
    curso: Curso
    onClose: () => void
    onCreada: (mensaje: string) => void
}

function InscripcionModal({ curso, onClose, onCreada }: Props) {

    const [idEstudiante, setIdEstudiante] = useState("")
    const [error, setError] = useState("")
    const [enviando, setEnviando] = useState(false)

    const enviar = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")

        const id = Number(idEstudiante)
        if (!Number.isInteger(id) || id <= 0) {
            setError("Ingresa un ID de estudiante válido")
            return
        }

        setEnviando(true)
        try {
            const res = await inscribir({ idCurso: curso.idCurso, idEstudiante: id })
            onCreada(`${res.message}: ${res.response.estudiante} en ${res.response.curso}`)
            onClose()
        } catch (e) {
            console.log("error", e)
            
            const msg = axios.isAxiosError(e) && typeof e.response?.data?.message === "string"
                ? e.response.data.message
                : "No se pudo registrar la inscripción"
            setError(msg)
        } finally {
            setEnviando(false)
        }
    }

    return (
        <>
            <div className="modal d-block" tabIndex={-1}>
                <div className="modal-dialog">
                    <form className="modal-content" onSubmit={enviar}>
                        <div className="modal-header">
                            <h5 className="modal-title">Inscribirse en {curso.titulo}</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <p className="text-muted mb-3">
                                Del {curso.fechaInicio.slice(0, 10)} al {curso.fechaFin.slice(0, 10)} · {curso.duracionHoras} h
                            </p>
                            <label htmlFor="idEstudiante" className="form-label">ID del estudiante</label>
                            <input
                                id="idEstudiante"
                                type="number"
                                min={1}
                                className="form-control"
                                value={idEstudiante}
                                onChange={e => setIdEstudiante(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={enviando}>Cancelar</button>
                            <button type="submit" className="btn btn-primary" disabled={enviando}>
                                {enviando ? "Inscribiendo..." : "Inscribirse"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal-backdrop show"></div>
        </>
    )
}

export default InscripcionModal
