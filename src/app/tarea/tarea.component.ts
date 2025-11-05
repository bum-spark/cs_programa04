import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Tarea {
  id: number;
  titulo : string;
  descripcion: string;
  completada: boolean;
}

@Component({
  imports: [CommonModule, FormsModule],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.css'
})
export class TareaComponent {

  nombreTarea: string = '';
  descripcionTarea: string = '';
  tareas: Tarea[] = [];
  
  // Variables para el modal de edición
  tareaEditando: Tarea | null = null;
  tituloEditando: string = '';
  descripcionEditando: string = '';
  
  // Variables para el modal de confirmación de eliminación
  tareaAEliminar: number | null = null;
  agregarTarea() {
    if (this.nombreTarea.trim() && this.descripcionTarea.trim()) {
      const nuevaTarea: Tarea = {
        id: this.tareas.length > 0 ? Math.max(...this.tareas.map(t => t.id)) + 1 : 1,
        titulo: this.nombreTarea,
        descripcion: this.descripcionTarea,
        completada: false
      };
      this.tareas.push(nuevaTarea);
      this.nombreTarea = '';
      this.descripcionTarea = '';
    }
  }

  toggleCompletada(tarea: Tarea) {
    tarea.completada = !tarea.completada;
  }

  abrirModalEditar(tarea: Tarea) {
    this.tareaEditando = tarea;
    this.tituloEditando = tarea.titulo;
    this.descripcionEditando = tarea.descripcion;
    // Abrir el modal
    const modal = document.getElementById('modal_editar') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  guardarEdicion() {
    if (this.tareaEditando && this.tituloEditando.trim() && this.descripcionEditando.trim()) {
      this.tareaEditando.titulo = this.tituloEditando;
      this.tareaEditando.descripcion = this.descripcionEditando;
      this.cerrarModalEditar();
    }
  }

  cerrarModalEditar() {
    this.tareaEditando = null;
    this.tituloEditando = '';
    this.descripcionEditando = '';
    const modal = document.getElementById('modal_editar') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  }

  abrirModalEliminar(id: number) {
    this.tareaAEliminar = id;
    const modal = document.getElementById('modal_eliminar') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  confirmarEliminar() {
    if (this.tareaAEliminar !== null) {
      this.tareas = this.tareas.filter(t => t.id !== this.tareaAEliminar);
      this.cerrarModalEliminar();
    }
  }

  cerrarModalEliminar() {
    this.tareaAEliminar = null;
    const modal = document.getElementById('modal_eliminar') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  }

}
