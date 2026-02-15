---
name: generador_documentacion
description: Genera documentación completa del proyecto en español (Guías de uso, admin, dev).
---

# Skill: Generador de Documentación en Español

Esta skill tiene como objetivo crear una documentación exhaustiva y estructurada para el proyecto actual, redactada completamente en español.

## Instrucciones de Ejecución

1.  **Análisis Previo**:
    - Revisa `package.json` para entender scripts y dependencias.
    - Explora `src/` o `app/` para entender la arquitectura y las funcionalidades principales.
    - Identifica los roles de usuario (ej: Administrador, Usuario Registrado, Visitante).

2.  **Estructura de Documentación**:
    - Crea un directorio `docs/` en la raíz del proyecto (si no existe).
    - Genera los siguientes archivos `.md` dentro de `docs/`:

    ### `A_INICIO_RAPIDO.md`
    - **Propósito**: Guía para levantar el proyecto desde cero.
    - **Contenido**:
      - Requisitos del sistema (Node.js, Docker, etc.).
      - Instalación de dependencias.
      - Configuración de variables de entorno (`.env`).
      - Comandos para iniciar en desarrollo y producción.

    ### `B_GUIA_ADMINISTRADOR.md`
    - **Propósito**: Manual para el rol de Administrador.
    - **Contenido**:
      - Cómo iniciar sesión como admin.
      - Panel de control y funcionalidades privilegiadas.
      - Gestión de usuarios, configuración global, etc.

    ### `C_MANUAL_USUARIO.md`
    - **Propósito**: Manual para el usuario final.
    - **Contenido**:
      - Registro e inicio de sesión.
      - Flujos principales del aplicativo (ej: Crear recursos, navegar, etc.).
      - Preguntas frecuentes.

    ### `D_ARQUITECTURA.md`
    - **Propósito**: Documentación técnica para desarrolladores.
    - **Contenido**:
      - Estructura de carpetas.
      - Tecnologías principales (Frameworks, DB, ORM).
      - Decisiones de diseño clave.

3.  **Requisitos de Estilo**:
    - **Idioma**: Español neutro/técnico.
    - **Formato**: Markdown (.md).
    - **Tono**: Profesional y didáctico.
    - Usa bloques de código para comandos y ejemplos.
    - Usa negritas para resaltar elementos de interfaz o conceptos clave.

## Notas Adicionales

- Si el proyecto tiene características específicas (como Multi-tenancy), asegúrate de documentar cómo funcionan (ej: creación de tenants, subdominios).
- No sobrescribas el `README.md` principal a menos que se solicite; enfócate en la carpeta `docs/`.
