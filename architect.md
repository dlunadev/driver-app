# Hop SDK – Arquitectura Hexagonal

## Objetivo

Diseñar e implementar un **SDK centralizado** dentro del proyecto **Hop**, ubicado en:

/desktop/novexis/hop


Este SDK será responsable de **toda la lógica de negocio** de la aplicación, comenzando por el **módulo de autenticación (auth)**.

El SDK debe ser:
- Reutilizable
- Desacoplado del framework
- Modular
- Basado en **Arquitectura Hexagonal (Ports & Adapters)**

---

## Principios Arquitectónicos

- Arquitectura Hexagonal
- Separación estricta de responsabilidades
- Dominio independiente de infraestructura
- Modularización por contexto (Auth, User, Order, etc.)
- SDK consumible desde Electron, Web o Mobile

---

## Estructura General del SDK

sdk/
├─ domain/
├─ application/
├─ infrastructure/
└─ index.ts


---

## Convención de Nombres de Archivos

Los archivos deben declararse **por tipo y responsabilidad**:

| Tipo | Sufijo |
|----|----|
| Entidad de dominio | `.entity.ts` |
| Repositorio (puerto) | `.repository.ts` |
| Caso de uso / servicio | `.use-case.ts` o `.service.ts` |
| Infraestructura (adapter) | `.infrastructure.ts` |
| Value Objects | `.value-object.ts` (opcional) |

Ejemplos:
- `auth.entity.ts`
- `auth.repository.ts`
- `login.use-case.ts`
- `auth.infrastructure.ts`

---

## Módulo Auth – Ejemplo Completo

### 1. Domain (Núcleo del negocio)

domain/
└─ auth/
├─ auth.entity.ts
├─ auth.repository.ts
└─ auth.value-object.ts (opcional)


**Responsabilidades:**
- Modelar el dominio de autenticación
- Definir reglas de negocio puras
- Declarar contratos (interfaces)
- No depender de frameworks, HTTP o bases de datos

---

### 2. Application (Casos de uso)

application/
└─ auth/
├─ login.use-case.ts
├─ register.use-case.ts
├─ refresh-token.use-case.ts
└─ logout.use-case.ts


**Responsabilidades:**
- Orquestar entidades y repositorios
- Ejecutar flujos de negocio
- Aplicar validaciones de aplicación
- Depender solo de `domain`

---

### 3. Infrastructure (Adapters)

infrastructure/
└─ http/
└─ auth/
└─ auth.infrastructure.ts


**Responsabilidades:**
- Implementar repositorios definidos en `domain`
- Manejar HTTP, API, DB, storage, etc.
- Transformar DTOs ↔ Entidades de dominio
- Contener dependencias externas (fetch, axios, prisma, etc.)

---

## Regla de Dependencias (Crítica)

Infrastructure → Application → Domain


❌ Prohibido:
- Domain dependiendo de Application
- Application dependiendo de Infrastructure

✔ Permitido:
- Infrastructure implementa interfaces del Domain
- Application consume contratos del Domain

---

## Ejemplo de Responsabilidades Claras

### auth.repository.ts
- Define **qué necesita** el dominio
- Solo interfaces
- Sin lógica concreta

### auth.infrastructure.ts
- Define **cómo se resuelve**
- Implementa HTTP, DB o API
- Conoce detalles técnicos

---

## Modularización Escalable

Cada nuevo módulo debe replicar exactamente esta estructura:

domain/{module}
application/{module}
infrastructure/{adapter}/{module}


Ejemplos futuros:
- `domain/user`
- `domain/order`
- `domain/payment`
- `domain/shift`

---

## Resultado Esperado

- SDK desacoplado
- Fácil de testear
- Reutilizable
- Extensible sin romper contratos
- Apto para múltiples plataformas

---

## Notas Finales

- Toda la lógica vive aquí
- La UI solo orquesta y consume casos de uso

---