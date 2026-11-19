# Demo escolar del portal académico

Login y pantalla principal inspirados en las referencias proporcionadas, adaptables a computadora y celular, con los archivos originales de `imagenes login` e `imagenes pantalla principal`.

## Abrir en Visual Studio Code

1. Abre la carpeta `D:\CAL UCE`.
2. Abre `index.html`.
3. Abre la paleta con `Ctrl + Shift + P`, busca `Live Preview: Show Preview (External Browser)` y ejecútalo.

## Acceso de prueba

Las credenciales se configuran en `datos.js` y no se muestran en la página.

El ingreso muestra el menú lateral, la bienvenida, la foto, los accesos rápidos, la ilustración SIIU y la tarjeta de carnet. La fecha usa la zona horaria de Ecuador. Al recargar vuelve al login.

El escudo regresa al inicio; el icono junto al usuario cierra sesión. En celular el menú se abre con el botón superior y se cierra con Escape o tocando el fondo. “Ver Carnet” muestra la imagen proporcionada `imagenes pantalla principal/carnet-digital.png`, completa y adaptada al tamaño de la pantalla. La ventana se cierra con la X, Escape o al tocar el fondo. “Página WEB” abre el sitio público de la universidad. Email y Soporte muestran un aviso de servicio no conectado. Los iconos de redes sociales son decorativos, salvo el enlace web.

En el menú lateral, “Datos estudiante” → “Datos personales” abre la ficha de información personal y de residencia en modo de consulta. El icono de inicio y “Cancelar” regresan al panel; “Guardar cambios” está deshabilitado. “Reportes grado” despliega únicamente “Historial académico”. La consulta de notas está pendiente.

## Archivos

En “Historial académico”, “Calificaciones” abre los siete períodos de la referencia. “Ver calificaciones” de QUINTO (2026-2026) muestra cuatro materias con notas y estados de las capturas. La tabla se desplaza horizontalmente, también en celular, hasta las columnas de recuperación, nota final y estado. “Regresar” vuelve a los períodos. Los otros seis períodos siguen pendientes. El icono de inicio vuelve al panel.

- `index.html`: formulario y pantalla inicial.
- `styles.css`: diseño y adaptación a pantallas pequeñas.
- `principal.css`: distribución, iconos y estilos de la pantalla principal.
- `datos.js`: credenciales y nombre ficticios.
- `app.js`: validación local, mostrar contraseña e ingreso/salida.
- `imagenes login/`: escudo y fotografía proporcionados.

No hay base de datos, dependencias ni instalación de paquetes. Las credenciales son visibles en el código: este login es una simulación, no una protección de datos. No se envía el formulario al sitio universitario ni se guardan contraseñas. Utiliza únicamente datos ficticios.

El proyecto aún no está publicado en internet. Los archivos estáticos pueden publicarse posteriormente en GitHub Pages.
