# Práctica 13: API REST con Node/Express para gestionar una tienda de muebles

**Nombre:** Alba Pérez Rodríguez

**Nombre:** Tomás Javes Tommasone

**Nombre:** Guillermo Plaza Gayan

**Fecha:** 07/05/2024

**Estudios:** Ingeniería Informática

**Asignatura:** Desarrollo en Sistemas Informáticos

**Profesor:** Eduardo Manuel Segredo González

---

# Índice
1. [Introducción](#1-introducción)
2. [Objetivos](#2-objetivos)
3. [Antes de empezar](#3-antes-de-empezar)
4. [Configuración de Istambul y coveralls](#4-configuracion-de-istambul-y-coveralls)
5. [Principios SOLID](#5-principios-solid)
6. [GitHub Actions](#6-github-actions)
7. [Modulos](#7-módulos)
8. [SonarCloud](#8-sonarcloud)
9. [Mongodb y Mongoose](#9-mongodb-y-mongoose)
11. [Ejercicio](#11-ejercicio)
12. [Conclusiones](#9-conclusiones)

---

# 1. Introducción.

Este informe detalla el proceso de desarrollo de la última práctica de la asignatura. 

En esta práctica, la segunda grupal de la asignatura, se ha llevado a cabo la implementación de un API REST utilizando Node.js y Express. El objetivo principal ha sido permitir operaciones CRUD (Crear, Leer, Actualizar y Borrar) para la gestión de una tienda de muebles.

Todo el código desarrollado se ha alojado en el repositorio generado tras la aceptación de la asignación grupal de GitHub Classroom, siguiendo una estructura de proyecto similar a la vista en clase.

Además, se ha documentado la solución diseñada, haciendo especial énfasis en las decisiones de diseño implementadas, y se ha realizado un vídeo de 10 minutos de duración máxima en el que todos los miembros del grupo han intervenido. El objetivo del vídeo ha sido describir todas las fases del desarrollo: código fuente implementado, documentación, pruebas, integración continua, calidad del código y despliegue.

---

# 2. Objetivos.
Los objetivos de esta práctica han sido:

- Implementar un API REST con Node.js y Express.

- Permitir operaciones CRUD para la gestión de una tienda de muebles.

- Utilizar MongoDB/MongoDB Atlas como sistema de base de datos no relacional, junto con Mongoose para la gestión desde Node.js.

- Desplegar el API en cyclic.

- Documentar la solución diseñada, haciendo hincapié en las decisiones de diseño.

- Realizar un vídeo descriptivo de todas las fases del desarrollo.

---

# 3. Antes de empezar
Antes de comenzar con la resolución de ejercicios de la práctica deberemos poner a punto nuestro entorno de trabajo. Para ello, lo haremos siguiendo los siguientes pasos:

## Creación de directorios.
Crearemos los siguientes directorios para nuestro proyecto:

  - **src/:** Este directorio almacenará los archivos fuente de TypeScript. En este caso, el código fuente escrito en TypeScript se encuentra en el directorio src.

  - **dist/:** Este directorio se utilizará para almacenar los archivos JavaScript generados por el compilador de TypeScript. La compilación de TypeScript produce código JavaScript, y este código se guarda en el directorio dist.

## Configuración para llevar a cabo la práctica:
Necesitaremo inicializar el proyecto con ***npm***, para ello seguiremos los pasos siguientes:

**Paso 1:**

Utilizamos el comando ***npm init --yes** para generar un archivo **package.json**. Este archivo contiene la información del proyecto, incluidas las dependencias y scripts.

```bash 
{
  "name": "ull-esit-inf-dsi-23-24-prct04-arrays-tuples-enums-albaaperez",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "tsc-watch --onSuccess \"node dist/index.js\"",
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
}

``` 

**Paso 2:**

Instalación del Compilador de TypeScript. Se instala el compilador de TypeScript globalmente con el comando ***npm install --global typescript***.

**Paso 3:**

Configuración del Compilador con tsconfig.json. Se crea un archivo de configuración llamado **tsconfig.json** en la raíz del proyecto. Este archivo especifica opciones para el compilador de TypeScript, como el directorio de entrada **(rootDir)** y el directorio de salida **(outDir)**.

```bash
{
  "exclude": [
    "./tests",
    "./node_modules",
    "./dist"
  ],
  "compilerOptions": {
    "target": "es2022",
    "module": "commonjs",
    "declaration": true,
    "rootDir": "./src",
    "outDir": "./dist",
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true
  }
}
```
**Paso 4:**

Instalación de tsc-watch para Compilación Automática. Se instala tsc-watch como una dependencia de desarrollo con el comando **npm install --save-dev tsc-watch**.

**Paso 5:** 

Modificamos la sección de scripts en **package.json** para utilizar tsc-watch y ejecutar el código compilado solo si la compilación es exitosa.

```bash
"scripts": 
    "start": "tsc-watch --onSuccess \"node dist/index.js\""
```

**Paso 6:**
Ejecutamos el comando **npm start**, que utiliza **tsc-watch** para observar cambios en los archivos de origen y compilar automáticamente.


## Instalación de ESlint.
ESLint, un linter muy conocido para trabajar con JavaScript y TypeScript. Para instalarlo haremos lo siguiente:

1. **Instalación de ESLint**:
  - Instalamos el ESLint de manera global utilizando el comando ***npm i -g eslint***.
  - Verificamos la instalación con **eslint --version**.

2. **Configuración de ESLint**:
  - Iniciamos la configuración de ESLint con el comando ***eslint --init***.
  - Durante la configuración, se elige el tipo de proyecto, el sistema de módulos, el framework (en este caso, ninguno), si se utiliza TypeScript, el entorno de ejecución (Node.js), el formato del archivo de configuración (JSON), y se instalan las dependencias necesarias.

3. **Archivo de Configuración de ESLint**:
  - Configuraremos el archivo de configuración **.eslintrc.json**, que indica el entorno, las extensiones recomendadas (como eslint:recommended y plugin:@typescript-eslint/recommended), el parser de TypeScript, y la configuración de reglas. Se verá de la siguiente manera:
  ```bash
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "require-jsdoc": "off",
        "valid-jsdoc": "off"
    }
  ```

4. **Personalización de Reglas**
  - Editamos el archivo de configuración para activar, desactivar o personalizar reglas específicas según las necesidades del proyecto.

5. **Ignorar Archivos:**
  - Creamos un archivo **.eslintignore** para especificar qué archivos y directorios deben ser ignorados por ESLint.

6. **Ejecución de ESLint:**
  - Ejecutamos ESLint en el proyecto con el comando **eslint .**, y se muestra cómo se informan los problemas detectados.

7. **Formateo del Código con Prettier:**
  - Instalamos Prettier y eslint-config-prettier para desactivar reglas de formato en ESLint.
  - Configuramos el ESLint para integrarse con Prettier añadiendo "prettier" a la lista de extensiones en el archivo de configuración.
  - Se crea un archivo de configuración de Prettier (.prettierrc.json) y un archivo de ignorar (.prettierignore).

---

## Typedoc.
***TypeDoc*** es una herramienta de generación de documentación para proyectos TypeScript. Proporciona una forma eficiente de documentar el código fuente y generar automáticamente documentación en formato HTML. A continuación, se presenta una breve introducción a TypeDoc y cómo se puede utilizar en el contexto de esta práctica.

### Instalación de la herramienta.
Podemos instalar TypeDoc utilizando ***npm*** (Node Package Manager). Abrimos la terminal y ejecutamos el siguiente comando:

```bash
npm install --save-dev typedoc
```
Este comando instalará TypeDoc como una dependencia de desarrollo en el proyecto.

### Uso básico.
Para generar documentación con TypeDoc, simplemente ejecutamos el siguiente comando en la terminal desde el directorio de su proyecto:

```bash
npx typedoc
```
Otra forma de hacerlo, es en el compilador, cuyo fichero es ***package.json***. Aquí especificaremos la siguiente línea en el apartado de **scripts**:

```bash
"doc": "typedoc"
```

### Configuración.
**TypeDoc** puede configurarse utilizando un archivo ***typedoc.json*** en la raíz del proyecto. Aquí podemos especificar la configuración específica que deseamos para la documentación. 

**Paso 1: Crear el archivo typedoc.json:**

En la raíz de nuestro proyecto crearemos a mano un archivo denominado **typedoc.json**.
Este es un archivo de configuración para TypeDoc.

**Paso 2: Configuración específica:**

Una vez creado el fichero, dentro escribiremos lo siguiente:

```bash
{
  "entryPoints": [
    "./src/**/*.ts
  ],
  "out": "./docs",

}
```
Este archivo de configuración le dice a TypeDoc qué archivos deben considerarse para la **generación de documentación**, en este caso, todos los ficheros de los ejercicios realizados y, **dónde debe colocar esa documentación generada**, en nuestro directorio /docs. Cuando ejecutemos **npx typedoc** desde la terminal, TypeDoc utilizará esta configuración para procesar los archivos de entrada y generar la documentación en el directorio especificado.

Configurado TypeDoc podremos ejecutarlo desde la terminal con el comando:

```bash
npm run doc
```

---
## mocha y chai
***Mocha y Chai*** son herramientas populares para realizar pruebas unitarias en proyectos JavaScript y TypeScript. Mocha es un marco de ejecución de pruebas y Chai es una biblioteca de aserciones que se integra bien con Mocha. Aquí hay una breve introducción sobre cómo comenzar con Mocha y Chai.

### Instalación de las herramientas.
En primer lugar, instalaremos Mocha y Chai como dependencias de desarrollo en nuestro proyecto con el comando:

```bash
 npm install --save-dev mocha chai@4.4.1 @types/mocha @types/chai ts-node
```
  - mocha: El marco de ejecución de pruebas.
  - chai: Una biblioteca de aserciones. Le especificaremos la versión anterior para trabajar de forma correcta con chai.
  - @types/mocha y @types/chai: Tipos TypeScript para Mocha y Chai.
  - ts-node: Permite ejecutar archivos TypeScript directamente en Node.js.


Hecho esto, crearemos un fichero denominado ***.mocharc.json***. Este fichero se utiliza para especificar configuraciones personalizadas para la ejecución de pruebas con Mocha.
Este contendrá lo siguiente:

```bash
{
  "extension": ["ts"],
  "spec": "tests/**/*.spec.ts",
  "require": "ts-node/register"
}
```
  - **"extension"** --> Mocha reconocerá los archivos con la extensión .ts como archivos de prueba TypeScript.
  - **"spec"** --> Mocha buscará los archivos de prueba en la carpeta tests y sus subdirectorios (**/) que tengan la extensión .spec.ts.
  - **"require"** --> antes de ejecutar las pruebas, se debe registrar el módulo ts-node para permitir la ejecución de archivos TypeScript directamente en Mocha.

### Estructura de las pruebas.
En nuestro directorio raíz crearemos un nuevo directorio denominado **/tests** que contendrá nuestros archivos para las pruebas. Nuestros directorios deberán quedar de una forma similar a esta:

```bash
/proyecto
  /src
    /EJERCICIO1
      - interfaz.ts
      - clase.ts
      - index.ts
    /EJERCICIO2
      - clase1.ts
      - clase2.ts
      - index.ts
    ...
  /test
    /EJERCICIO1
      - interfaz.spec.ts
      - clase.spec.ts
      - index.spec.ts
    /EJERCICIO2
      - clase1.spec.ts
      - clase2.spec.ts
      - index.spec.ts
    ...

```

### Escribir las pruebas.
Por último, lo que deberemos hacer será escribir las pruebas en esos ficheros que vamos a crear terminados en **.spec.ts**. La importancion de mocha y chai en nuestro archivos de prueba serán:

```bash
import 'mocha';
import {expect} from 'chai';
import { mcd } from '../src/EJERCICIO1';
```
  - Utilizamos **describe** para agrupar las pruebas relacionadas
  - Cada prueba se crea con **it**.
  - Usamos las aserciones de Chai, por ejemplo, **expect(result).to.be.undefined.**

## Subir archivos 
Una vez hayamos terminado de realizar los ejercicios, procederemos a subirlos a nuestro repositorio de github mediante:

  - **git add .**
  - **git commit -m " "**
  - **git push**

Pero antes de hacer esto deberemos crear un fichero ***.gitignore** donde introduciremos lo siguiente:
```bash
node_modules
dist
package-lock.json
```
El archivo **.gitignore** se utiliza para especificar archivos y directorios que no deben ser incluidos en el control de versiones de Git. En este caso, estos archivos serán ignorados a la hora de subirlos a GitHub.

---

# 4. Configuracion de Istanbul y coveralls.

### ¿Que son?
En esta sección, detallaremos la configuración necesaria para utilizar **Istanbul y Coveralls** en nuestro proyecto. Estas herramientas son valiosas para evaluar la cobertura de nuestro código fuente y realizar un seguimiento de la misma.

### Instalación

Primero, realizaremos la instalación de los mismos con los siguientes comandos:
```bash
npm install --save-dev nyc coveralls
```
En nuestro fichero **package.json** detallaremos lo siguiente para terminar de configurar Istanbul y coveralls:

```bash 
"test": "nyc mocha",
"coverage": "nyc npm test && nyc report --reporter=text-lcov | coveralls && rm -rf .nyc_output",
```

### Inicio de sesión en Coveralls para el cubrimiento del código

Para realizar esto, nos deberemos meter en la página de [Coveralls](#https://coveralls.io/).
Dentro de esta iniciaremos sesión con nuestras credenciales de GitHub.
Si deseamos agregar un repositorio para el cubrimiento de nuestro código este deberá ser de visibilidad pública.  
Lo agregaremos dándole a **ADD REPOS** y una vez elegido el repositorio copiaremos el token.
Por último, en nuestro directorio raíz crearemos el **.coveralls.yml** que contendrá el token de nuestro repositorio:

```bash
repo_token: xbwn8u45rB3Q44dE2hFjQT0kbhDmRPDuu
```
---

# 5. Principios SOLID.

En el desarrollo de software, ***los Principios SOLID*** son un conjunto de principios de diseño orientados a la creación de sistemas más mantenibles, flexibles y escalables. Estos principios fueron introducidos por el ingeniero de software Robert C. Martin y representan un conjunto de directrices que buscan mejorar la calidad del código y facilitar su mantenimiento a lo largo del tiempo.

## ¿Cuáles son?

Los Principios SOLID son un acrónimo que representa los siguientes principios:

### S - Principio de Responsabilidad Única (Single Responsibility Principle - SRP)

El **SRP** establece que una clase debería tener una única razón para cambiar. En otras palabras, una clase debería tener una **única responsabilidad**, una única función.

### O - Principio de Abierto/Cerrado (Open/Closed Principle - OCP)

El **OCP** propone que una entidad de software, como una clase, debe estar **abierta para la extensión pero cerrada para la modificación**. Se busca lograr esto mediante la creación de código que pueda ser extendido sin modificar su funcionalidad existente.

### L - Principio de Sustitución de Liskov (Liskov Substitution Principle - LSP)

El **LSP** establece que los objetos de una clase base deben **poder ser sustituidos por objetos de sus clases derivadas** sin afectar la corrección del programa.

### I - Principio de Segregación de Interfaces (Interface Segregation Principle - ISP)

El **ISP** propone que una clase no debería verse obligada a implementar interfaces que no utiliza. En lugar de interfaces generales, se prefieren interfaces más específicas.

### D - Principio de Inversión de Dependencia (Dependency Inversion Principle - DIP)

El **DIP** propone que las dependencias de alto nivel no deben depender de módulos de bajo nivel, sino que ambos deben depender de abstracciones. Además, las abstracciones no deben depender de los detalles, sino que los detalles deben depender de las abstracciones.

## Importancia y Beneficios

La aplicación de los Principios SOLID en el desarrollo de software tiene varios beneficios, entre ellos:

- **Mantenibilidad:** Facilitan el mantenimiento del código a lo largo del tiempo.
- **Escalabilidad:** Permiten construir sistemas más flexibles y escalables.
- **Reusabilidad:** Favorecen la reutilización de código y componentes.
- **Legibilidad:** Mejoran la claridad y la comprensión del código.


En esta práctica, se presentarán ejemplos específicos de código que ilustrarán la aplicación práctica de los Principios SOLID en nuestro proyecto. Veremos cómo estos principios se traducen en un código más limpio, modular y fácil de entender.

A lo largo de la revisión de los ejercicios, se destacarán las áreas donde los Principios SOLID han sido implementados con éxito, subrayando la importancia de seguir estas directrices para lograr un diseño de software robusto y sostenible.

---

# 6. GitHub Actions

## ¿Qué es?
***GitHub Actions*** es una característica integrada en GitHub que te permite automatizar, personalizar y ejecutar flujos de trabajo directamente desde tu repositorio. Con GitHub Actions, podemos crear flujos de trabajo que respondan a eventos específicos en tu repositorio, como solicitudes de extracción, confirmaciones de código, creación de problemas y mucho más.

## Características
Encontramos algunas características de esta herramienta:

### Automatización de tareas
Con GitHub Actions, puedes automatizar tareas repetitivas, como pruebas de código, compilaciones, despliegues, notificaciones y más.

### Personalización
Los flujos de trabajo de GitHub Actions son altamente personalizables. Puedes crear flujos de trabajo específicos para tus necesidades utilizando una variedad de acciones predefinidas o creando tus propias acciones personalizadas.

### Eventos del repositorio
Los flujos de trabajo pueden activarse en respuesta a una amplia gama de eventos en tu repositorio, lo que te permite ejecutar acciones específicas en función de las acciones de los colaboradores, el estado del código y otros factores.

### Integración con el ecosistema de GitHub
GitHub Actions se integra perfectamente con el ecosistema de GitHub, lo que te permite acceder a tus repositorios, problemas, solicitudes de extracción y otros datos directamente desde tus flujos de trabajo.

## Configuración
Para la configuración de las Github Actions deberemos meternos en el apartado de nuestro repositorio de **Actions** y seleccionar **Node.js** como flujo de trabajo. 
Al hacer esto se nos creará un archivo denominado node.js.yml que contendrá lo siguiente:
```typescript
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: Tests

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x, 18.x, 19.x, 20.x, 21.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    - uses: actions/checkout@v4
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm install
    - run: npm test
  ```
Este fichero será para las pruebas o tests como se indica en el nombre.
Deberemos configurar más Actions para llevar a cabo toda la práctica. 
Tras hacer un commit con los cambios comenzaremos a utilizar las GitHub Actions.
Ahora, en visual podemos hacer la configuración de la Action de coveralls. Crearemos el fichero coveralls.yml que tendrá lo siguiente:
  ```typescript
  # This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: Coveralls

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - name: Cloning repo
      uses: actions/checkout@v4
    - name: Use Node.js 21.x
      uses: actions/setup-node@v4
      with:
        node-version: 21.x
    - name: Installing dependencies
      run: npm ci
    - name: Generating coverage information
      run: npm run coverage
    - name: Coveralls GitHub Action
      uses: coverallsapp/github-action@v2.2.3
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
  ```
Hecho esto, cada vez que hagamos un git commit y un git push nos saldrán las Acciones.

--- 

# 7. Módulos
En el desarrollo de aplicaciones en TypeScript, especialmente en entornos de pruebas con Mocha y herramientas de cobertura de código como nyc, es esencial configurar adecuadamente el manejo de módulos ESM (ECMAScript Modules). Esta configuración garantiza que nuestras pruebas sean efectivas y que los informes de cobertura reflejen con precisión el estado de nuestros módulos.

**Paso 1: Instalación de c8.**

Para comenzar, es necesario instalar la herramienta de cobertura **c8** como dependencia de desarrollo. Esto se logra ejecutando el siguiente comando:
```bash
npm i --save-dev c8
```

**Paso 2: Configuración del Script de Cobertura en package.json**

Posteriormente, en el archivo **package.json**, ajustamos el script de cobertura para utilizar c8 en lugar de nyc. Esto se logra modificando la sección "scripts" como se muestra a continuación:
```typescript
{
  "scripts": {
    "coverage": "c8 npm test && c8 report --reporter=lcov"
  }
}
```

**Paso 3: Ajuste de las Pruebas para Módulos ESM**

Es necesario modificar el archivo de configuración de Mocha, **.mocharc.json**, para utilizar el cargador ESM de ts-node al ejecutar las pruebas. Esto se logra configurando la propiedad "loader" como se muestra a continuación:
```typescript
{
  "extension": [
    "ts"
  ],
  "spec": "tests/**/*.spec.ts",
  "loader": "ts-node/esm"
}
```

**Paso 4: Importación de Módulos con Extensión .js**

En los archivos de prueba **(*.spec.ts)**, cuando importamos módulos, es fundamental añadir la extensión .js a los nombres de los módulos importados. Esto es necesario para que funcionen correctamente con el cargador ESM. Un ejemplo de importación sería el siguiente:
```typescript
import { expect } from 'chai'; // Importamos el módulo con extensión .js
import { myFunction } from '../src/myModule.js'; // Importamos nuestro módulo con extensión .js
```

Con esta configuración, aseguramos que nuestras pruebas sean efectivas, generamos informes precisos de cobertura y garantizamos que nuestros módulos ESM se manejen correctamente en el entorno de prueba.


---
# 8. SonarCloud

### ¿Qué es SonarCloud?
SonarCloud es una plataforma de análisis estático de código diseñada para mejorar la calidad del software. Utiliza técnicas de análisis estático para identificar y reportar problemas de calidad del código, como errores, vulnerabilidades de seguridad, malas prácticas y duplicación de código.

### Características de SonarCloud:

- **Análisis de código estático:** SonarCloud examina el código fuente de tu proyecto en busca de posibles problemas de calidad, proporcionando una visión detallada de la salud del código.

- **Integración continua:** Puedes integrar SonarCloud en tu proceso de integración continua para automatizar el análisis del código cada vez que se realice un cambio, lo que te permite detectar problemas de calidad de forma proactiva.

- **Métricas y seguimiento:** SonarCloud ofrece métricas detalladas sobre la calidad del código y su evolución a lo largo del tiempo, lo que te permite realizar un seguimiento del progreso y tomar medidas para mejorar la calidad del código.

- **Comentarios y recomendaciones:** SonarCloud proporciona comentarios detallados y recomendaciones para cada problema identificado, ayudándote a comprender la naturaleza del problema y cómo solucionarlo de manera efectiva.

- **Integración con GitHub:** SonarCloud se integra estrechamente con GitHub, lo que te permite ver los resultados del análisis directamente en tus solicitudes de extracción y gestionar la calidad del código desde el mismo entorno en el que trabajas.


## Configuración
Para la configuración de **SonarCloud** lo que deberemos hacer es lo siguiente:

**Paso 1**: Iniciamos sesión en la Página de SonarCloud.

**Paso 2**: Añadimos un nuevo proyecto. En nuestro caso seleccionamos la organizacion del curso de dsi y localizamos nuestro repositorio que anteriormente debe estar en **Public**.

**Paso 3**: Al comenzar un nuevo proyecto con el repositorio seleccionado deberemos meternos dentro de este y seleccionar **Analysis Method**. Dentro de esto, desactivaremos el botón de **Automatic Analysis** y nos meteremos a la opción de **GitHub Actions**.

**Paso 4**: Dentro de los Actions de esta página copiaremos el SONAR_TOKEN y el valor secreto bajo este. Seguidamente, nos dirigiremos a GitHub a nuestro repositorio y en el apartado de settings -> secretos deberemos introducir estos datos copiados anteriormente. 

**Paso 5**: Hecho esto, nos dirigimos a la página de antes de SonarCloud y eligiremos la opción de ts para typscript. Se nos desplegará los siguiente:

```typescript
name: Build
on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened]
jobs:
  sonarcloud:
    name: SonarCloud
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Shallow clones should be disabled for a better relevancy of analysis
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # Needed to get PR information, if any
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
  ``` 

Esto lo copiaremos y haremos lo mismo que hicimos anteriormente con las Actions de Tests y Coveralls. Crear un fichero sonarcloud.yml y poner:
```typescript
name: Sonar-Cloud 

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  sonarcloud:
    name: SonarCloud
    runs-on: ubuntu-latest
    steps:
      - name: Cloning repo
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Shallow clones should be disabled for a better relevancy of analysis
      - name: Using Node.js 21.x
        uses: actions/setup-node@v4
        with:
          node-version: 21.x
      - name: Installing dependencies
        run: npm ci
      - name: Generating coverage report
        run: npm run coverage
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # Needed to get PR information, if any
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

Para finliazar crearemos en la raíz del directorio un **sonar-project.properties** que tendra:
```typescript
sonar.projectKey=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-ALBAAPEREZ
sonar.organization=ull-esit-inf-dsi-2324

# This is the name and version displayed in the SonarCloud UI.
#sonar.projectName=ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-ALBAAPEREZ
#sonar.projectVersion=1.0


# Path is relative to the sonar-project.properties file. Replace "\" by "/" on Windows.
#sonar.sources=.

# Encoding of the source code. Default is default system encoding
#sonar.sourceEncoding=UTF-8
```

Hecho esto en nuestro repositorio, haremos git add, git commit y un push y si todo ha ido bien comenzará a funcionar todo sin problemas.


--- 

# 9. Mongodb y Mongoose.

## ¿Qué es Mongodb?
MongoDB es una base de datos NoSQL que utiliza un modelo de datos basado en documentos. En lugar de utilizar tablas y filas como en las bases de datos relacionales, MongoDB utiliza colecciones y documentos JSON.

## Operaciones CRUD en MongoDB
Las operaciones CRUD (Crear, Leer, Actualizar, Borrar) son comunes en cualquier sistema de gestión de bases de datos. En MongoDB, estas operaciones se realizan de la siguiente manera:

- **Crear:** Utilizando el método `insertOne` o `insertMany` para añadir documentos a una colección.
- **Leer:** Utilizando métodos como `findOne` o `find` para buscar documentos en una colección.
- **Actualizar:** Utilizando métodos como `updateOne` o `updateMany` para modificar documentos existentes.
- **Borrar:** Utilizando métodos como `deleteOne` o `deleteMany` para eliminar documentos de una colección.

## ¿Qué es Mongoose?
Mongoose es una biblioteca de modelado de objetos para MongoDB y Node.js. Proporciona una solución basada en esquemas para modelar datos de la aplicación.

### Características principales de Mongoose:
- Define modelos con un esquema claro y estructurado.
- Proporciona validación de datos.
- Permite definir relaciones entre datos.
- Ofrece una API sencilla para realizar operaciones CRUD en MongoDB desde Node.js.

## Instalación
El primer paso para utilizar este módulo es instalarlo:

```bash
$ npm i mongoose
```

# 10. Ejercicio.

 ## Enunciado del ejercicio.
 Se solicita la implementación de un API REST para gestionar una tienda de muebles utilizando Node.js y Express. El API permite operaciones CRUD (Create, Read, Update, Delete) para clientes, proveedores, muebles y transacciones, con funcionalidades como la creación de nuevas entidades, consulta por diferentes criterios y manejo de transacciones complejas. El enfoque incluye el uso de MongoDB/MongoDB Atlas como base de datos no relacional y Mongoose para interactuar con la base de datos. El desarrollo del API se complementa con documentación, pruebas y un vídeo explicativo sobre el proceso de desarrollo.

 ## Código propuesto.

 ### Database
 #### Database.ts
 ```typescript
 import mongoose from "mongoose";

/**
 * Lo que hace este script es conectarse a la base de datos de MongoDB.
 * Si la conexión es exitosa, imprime un mensaje en la consola.
 * Si la conexión falla, imprime el error en la consola.
 */
export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://guillermoplaza:dsi@dsi-groupt-dsikea.czuoep8.mongodb.net/');
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

/**
 * Lo que hace este script es cerrar la conexión a la base de datos de MongoDB.
 * Si la conexión se cierra exitosamente, imprime un mensaje en la consola.
 * Si la conexión falla, imprime el error en la consola.
 */
export const closeDB = async () => {
  try { 
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
};
```
 
 ### Models
 #### Customer.ts
 ``` typescript
 import { Document, Schema, model } from "mongoose";
import { Genre } from "../variables/types.js";

/**
 * Interfaz para la creación de un objeto Cliente que hereda de Document.
 * @property {string} surname - El apellido del cliente.
 * @property {string} name - El nombre del cliente.
 * @property {string} nif - El NIF del cliente. Debe tener 8 dígitos seguidos de 1 letra.
 * @property {string} genre - El género del cliente. Puede ser 'male' (masculino) o 'female' (femenino). Este campo es opcional.
 */
export interface CustomerInterface extends Document {
  surname: string,
  name: string,
  nif: string,
  genre?: Genre,
}

/**
 * CustomerSchema define la estructura del documento Cliente en MongoDB.
 * Incluye los siguientes campos:
 * - surname (apellido): Una cadena que se recorta y es obligatoria.
 * - name (nombre): Una cadena que se recorta y es obligatoria.
 * - nif: Una cadena única que se recorta y es obligatoria. Debe tener 8 dígitos seguidos de 1 letra.
 * - genre (género): Una cadena que se recorta, no es obligatoria, y puede ser 'male' (masculino) o 'female' (femenino). Se convierte a minúsculas.
 */
const CustomerSchema = new Schema<CustomerInterface>({
  surname: {
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  nif: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: (value: string) => {
      const expression = /\b\d{8}[A-Z]$/
      if(!expression.test(value)) { 
        throw new Error('NIF del cliente debe tener 8 dígitos seguidos de 1 letra');
      }
    },
  },
  genre: {
    lowercase: true,
    type: String,
    trim: true,
    enum: ['male', 'female'],
    required: false,
    default: undefined
  },
}, {
  timestamps: true
})

// exportamos el modelo Customer
export const Customer = model<CustomerInterface>('Customer', CustomerSchema)
```

 #### Furniture.ts
 ```typescript
 import { Schema, model, Document } from "mongoose";
import { Color, Material } from "../variables/types.js";

/**
 * Interfaz para la creación de un objeto Mueble que hereda de Document.
 * @property {string} name - El nombre del mueble.
 * @property {string} productCode - El código de producto del mueble.
 * @property {Material} material - El material del mueble.
 * @property {number} height - La altura del mueble.
 * @property {number} width - La anchura del mueble.
 * @property {number} depth - La profundidad del mueble. Esta es una propiedad opcional.
 * @property {number} warranty - El período de garantía del mueble en años.
 * @property {Color} color - El color del mueble. Esta es una propiedad opcional.
 * @property {number} prize - El precio del mueble.
 */
export interface FurnitureInterface extends Document {
  name: string,
  productCode: string,
  material: Material,
  height: number,
  width: number,
  depth?: number,
  warranty: number,
  color?: Color,
  prize: number
}

/**
 * FurnitureSchema define la estructura del documento Mueble en MongoDB.
 * Incluye los siguientes campos:
 * - name (nombre): Una cadena que se recorta y es obligatoria. No puede contener números ni algunos caracteres especiales.
 * - productCode (código de producto): Una cadena que es obligatoria.
 * - material: Un valor de tipo Material que es obligatorio.
 * - height (altura), width (anchura), depth (profundidad): Números que representan las dimensiones del mueble. Depth es opcional.
 * - warranty (garantía): Un número que representa el período de garantía del mueble en años.
 * - color: Un valor de tipo Color que es opcional.
 * - prize (precio): Un número que representa el precio del mueble.
 */
const FurnitureSchema = new Schema<FurnitureInterface>({
  name: {
    type: String,
    trim: true,
    required: true,
    validate: (value: string) => {
      const expression = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s.\-']+$/;
      if (!expression.test(value)) {
        throw new Error("El nombre del mueble no puede contener números ni algunos carácteres especiales");
      }
    }
  },
  productCode: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  material: {
    type: String,
    lowercase: true,
    trim: true,
    enum: ["wood", "metal", "unpholstery", "plastic", "glass", "stone", "other"],
    required: false,
    default: "other"
  },
  height: {
    type: Number,
    min: 0,
    max: 100000,
    required: true
  },
  width: {
    type: Number,
    min: 0,
    max: 100000,
    required: true
  },
  depth: {
    type: Number,
    min: 0,
    max: 100000,
    required: false,
    default: undefined
  },
  warranty: {
    type: Number,
    min: 0,
    max: 100000
  }, 
  color: {
    type: String,
    lowercase: true,
    trim: true,
    enum: ["white", "black", "blue", "red", "yellow", "green", "brown", "gray", "other"],
    required: false,
    default: "other"
  },
  prize: {
    type: Number,
    min: 0,
  }
}, {
  timestamps: true
})

export const Furniture = model<FurnitureInterface>('Furniture', FurnitureSchema);
```

 #### Provider.ts
```typescript
import { model, Schema, Document } from "mongoose";
import { CatergoryType } from "../variables/types.js";

/**
 * Interfaz para la creación de un objeto Proveedor que hereda de Document.
 * @property {string} cif - El Código de Identificación Fiscal del proveedor.
 * @property {string} name - El nombre del proveedor.
 * @property {string} address - La dirección del proveedor.
 * @property {number} phone - El número de teléfono del proveedor.
 * @property {CatergoryType} category - La categoría del proveedor. Puede ser 'wood', 'upholstered', 'office', 'outdoor', 'antique', 'kids', 'custom' u 'other'. Este campo es opcional.
 */
export interface ProviderInterface extends Document {
  cif: string,
  name: string,
  address: string,
  phone: number,
  category?: CatergoryType,
}

/**
 * ProviderSchema define la estructura del documento Proveedor en MongoDB.
 * Incluye los siguientes campos:
 * - cif: Una cadena que se recorta y es obligatoria. Debe tener 8 dígitos seguidos de 1 letra.
 * - name (nombre): Una cadena que se recorta y es obligatoria. No puede contener números ni algunos caracteres especiales.
 * - address (dirección): Una cadena que se recorta y es obligatoria.
 * - phone (teléfono): Un número que representa el número de teléfono del proveedor.
 * - category (categoría): Una cadena que se convierte a minúsculas, no es obligatoria, y puede ser 'wood', 'upholstered', 'office', 'outdoor', 'antique', 'kids', 'custom' u 'other'.
 * @constant {Schema<ProviderInterface>} ProviderSchema - El esquema de la colección de proveedores.
 * @constant {Model<ProviderInterface>} Provider - El modelo de la colección de proveedores.
 */
const ProviderSchema = new Schema<ProviderInterface>({
  cif: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: (value: string) => {
      const regexCIF = /^[A-HJNPQRSUVW]{1}[0-9]{7}[0-9A-J]$/i;
      if(!regexCIF.test(value)) {
        throw new Error("El Código de Identificación Fiscal no es válido")
      }
    }
  },
  name: {
    type: String,
    trim: true,
    required: true,
    validate: (value: string) => {
      const expression = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s.\-']+$/;
      if (!expression.test(value)) {
        throw new Error("El nombre del proveedor no puede contener números ni algunos carácteres especiales");
      }
    }
  },
  address: {
    type: String,
    trim: true,
    required: true
  },
  phone: {
    type: Number,
    required: true,
    validate: (value: number) => {
      if (value.toString().length !== 9) {
        throw new Error("Número de teléfono válido");
      }
    }
  },
  category: {
    type: String,
    lowercase: true,
    trim: true,
    enum: ["wood", "upholstered", "office", "outdoor", "antique", "kids", "custom", "other"],
    required: false,
    default: "other"
  }
}, {
  timestamps: true
})

/**
 * exportamos el modelo Provider
 */
export const Provider = model<ProviderInterface>('Provider', ProviderSchema)
```
 
 #### Transactions.ts
```typescript
import { model, Schema, Document } from "mongoose";
import { TransactionType } from "../variables/types.js";
import { ProviderInterface } from "./providers.js";
import { FurnitureInterface } from "./furnitures.js";
import { CustomerInterface } from "./customers.js";

/**
 * Interfaz para la creación de un objeto Transacción que hereda de Document.
 * @property {TransactionType} type - El tipo de transacción. Puede ser 'sell' (venta) o 'purchase' (compra). Este campo es opcional.
 * @property {number} moneyAmount - La cantidad de dinero de la transacción.
 * @property {FurnitureInterface} furnitureID - El ID del mueble
 * @property {ProviderInterface} providerID - El ID del proveedor. Este campo es opcional.
 * @property {CustomerInterface} customerID - El ID del cliente. Este campo es opcional.
 */
interface TransactionInterface extends Document {
  type: TransactionType,
  productCode: string,
  providerCIF?: string,
  customerNIF?: string,
  moneyAmount: number,
  furnitureID: FurnitureInterface,
  providerID?: ProviderInterface,
  customerID?: CustomerInterface
}

/**
 * TransactionSchema define la estructura del documento Transacción en MongoDB.
 * Incluye los siguientes campos:
 * - type (tipo): Una cadena que se recorta, no es obligatoria, y puede ser 'sell' (venta) o 'purchase' (compra).
 * - moneyAmount (cantidad de dinero): Un número que debe ser mayor o igual a 0.
 * - furnitureID (ID del mueble): Un ObjectId que es obligatorio y hace referencia a un documento Mueble.
 * - providerID (ID del proveedor): Un ObjectId que es opcional y hace referencia a un documento Proveedor.
 * - customerID (ID del cliente): Un ObjectId que es opcional y hace referencia a un documento Cliente.
 */
const TransactionSchema = new Schema<TransactionInterface>({
  type: {
    type: String,
    trim: true,
    required: true,
    enum: ["sell", "purchase"],
  },
  productCode: {
    type: String,
    trim: true,
    required: true
  },
  providerCIF: {
    type: String,
    trim: true,
    required: false,
    default: undefined
  },
  customerNIF: {
    type: String,
    trim: true,
    required: false,
    default: undefined
  },
  moneyAmount: {
    type: Number,
    min: 0
  },
  furnitureID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Furniture'
  },
  providerID: {
    type: Schema.Types.ObjectId,
    required: false,
    default: undefined,
    ref: 'Provider'
  },
  customerID: {
    type: Schema.Types.ObjectId,
    required: false,
    default: undefined,
    ref: 'Customer'
  }

}, {
  timestamps: true
});

/**
 * Exportamos el modelo Transaction.
 */
export const Transaction = model<TransactionInterface>('Transaction', TransactionSchema);
```

 ### Routers
 #### Customer.ts
```typescript
import express from 'express';
import { Customer } from '../models/customers.js';

export const customerRouter = express.Router()

// __________________________________________________________________POST__________________________________________________________________

/**
 * Ruta POST para '/customers'. Crea un nuevo cliente en la base de datos.
 * @param {Request} req - La solicitud HTTP. El cuerpo de la solicitud debe contener los datos del cliente a crear.
 * @param {Response} res - La respuesta HTTP. Devuelve el cliente creado con un estado 201 en caso de éxito, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
customerRouter.post('/customers', async (req, res) => {
  const customer = new Customer(req.body);
  try {
    await customer.save();
    return res.status(201).send(customer);
  } catch (error) {
    return res.status(500).send(error)
  }
});


// ___________________________________________________________________GET__________________________________________________________________

/**
 * Ruta GET para '/customers'. Obtiene uno o más clientes de la base de datos.
 * @param {Request} req - La solicitud HTTP. La consulta puede contener un NIF para filtrar los clientes.
 * @param {Response} res - La respuesta HTTP. Devuelve los clientes encontrados en caso de éxito, un error con un estado 404 si no se encontró ningún cliente con el NIF proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
customerRouter.get('/customers', async (req, res) => {
  const filter = req.query.nif? {nif: req.query.nif.toString()} : {};
  try {
    const customers = await Customer.find(filter);
    // si no se encontró ningún cliente con el NIF proporcionado
    if (customers.length !== 0) {
      return res.send(customers);
    }
    return res.status(404).send({ Error: "Customer NIF not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

/**
 * Ruta GET para '/customers/:id'. Obtiene un cliente específico de la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. Los parámetros deben contener el ID del cliente a obtener.
 * @param {Response} res - La respuesta HTTP. Devuelve el cliente encontrado en caso de éxito, un error con un estado 404 si no se encontró ningún cliente con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
customerRouter.get('/customers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById(id);
    if (customer) {
      return res.send(customer);
    }
    return res.status(404).send({ Error: "Customer ID not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

// __________________________________________________________________PATCH_________________________________________________________________

/**
 * Ruta PATCH para '/customers'. Actualiza un cliente específico en la base de datos utilizando su NIF.
 * @param {Request} req - La solicitud HTTP. La consulta debe contener el NIF del cliente a actualizar y el cuerpo de la solicitud debe contener los campos a actualizar.
 * @param {Response} res - La respuesta HTTP. Devuelve el cliente actualizado en caso de éxito, un error con un estado 400 si la actualización solicitada no es válida, un error con un estado 404 si no se encontró ningún cliente con el NIF proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
customerRouter.patch('/customers', async (req, res) => {
  // constantes para validar las actualizaciones permitidas
  const allowedUpdates = ["surname", "name", "genre"];
  const requestedUpdates = Object.keys(req.body);

  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));
  // si la actualización solicitada no es válida
  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  } 
  try {
    // Busca y actualiza el cliente según el NIF proporcionado en la consulta
    const customer = await Customer.findOneAndUpdate({
      nif: req.query.nif
    }, req.body )
    // Devuelve el cliente actualizado
    if (customer) {
      return res.send(customer);
    }
    // Si no se encuentra el cliente, devuelve un error
    return res.status(404).send({ Error: "Customer NIF not found" }); 
  // Si hay un error interno del servidor, devuelve el error
  } catch (error) {
    return res.status(500).send(error);
  } 
});

/**
 * Ruta PATCH para '/customers/:id'. Actualiza un cliente específico en la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. Los parámetros deben contener el ID del cliente a actualizar y el cuerpo de la solicitud debe contener los campos a actualizar.
 * @param {Response} res - La respuesta HTTP. Devuelve el cliente actualizado en caso de éxito, un error con un estado 400 si la actualización solicitada no es válida, un error con un estado 404 si no se encontró ningún cliente con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
customerRouter.patch('/customers/:id', async (req, res) => {
  // constantes para validar las actualizaciones permitidas
  const allowedUpdates = ["surname", "name", "genre"];
  const requestedUpdates = Object.keys(req.body);
  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));
  // si la actualización solicitada no es válida
  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body )
    // si se encuentra el cliente, devuelve el cliente actualizado
    if (customer) {
      return res.send(customer);
    }
    // si no se encuentra el cliente, devuelve un error
    return res.status(404).send({ Error: "Customer ID not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  }  
});


// __________________________________________________________________DELETE_________________________________________________________________

/**
 * Ruta DELETE para '/customers'. Elimina un cliente específico de la base de datos utilizando su NIF.
 * @param {Request} req - La solicitud HTTP. La consulta debe contener el NIF del cliente a eliminar.
 * @param {Response} res - La respuesta HTTP. Devuelve el cliente eliminado en caso de éxito, un error con un estado 404 si no se encontró ningún cliente con el NIF proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
customerRouter.delete('/customers', async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({
      nif: req.query.nif
    });
    // si se encuentra el cliente, devuelve el cliente eliminado
    if (customer) {
      return res.status(200).send(customer);
    }
    return res.status(404).send({ Error: "Customer NIF not found" });
  } catch (error) {
    return res.status(500).send(error)
  }

})

/**
 * Ruta DELETE para '/customers/:id'. Elimina un cliente específico de la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. Los parámetros deben contener el ID del cliente a eliminar.
 * @param {Response} res - La respuesta HTTP. Devuelve el cliente eliminado en caso de éxito, un error con un estado 404 si no se encontró ningún cliente con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
customerRouter.delete('/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (customer) {
      return res.status(200).send(customer);
    }
    return res.status(404).send({ Error: "Customer ID not found" });
  } catch (error) {
    return res.status(500).send(error)
  }
});
```


 #### Defaults.ts
```typescript
import express from 'express';

export const defaultRouter = express.Router();

/**
 * Ruta por defecto para cualquier petición HTTP no soportada.
 * @param {Request} _ - La solicitud HTTP.
 * Se encarga de devolver un estado 501 en caso de que la petición no sea soportada.
 */
defaultRouter.all('*', (_, res) => {
  res.status(501).send();
});

```

 #### Furniture.ts
```typescript
import express from 'express';
import { Furniture } from '../models/furnitures.js';

export const furnitureRouter = express.Router()


// __________________________________________________________________POST__________________________________________________________________

/**
 * Ruta POST para '/furnitures'. Crea un nuevo mueble en la base de datos.
 * @param {Request} req - La solicitud HTTP. El cuerpo de la solicitud debe contener los datos del mueble a crear.
 * @param {Response} res - La respuesta HTTP. Devuelve el mueble creado con un estado 201 en caso de éxito, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
furnitureRouter.post('/furnitures', async (req, res) => {
  const furniture = new Furniture(req.body);
  // lo que hace es crear un nuevo objeto de la clase Furniture con los datos que vienen en el cuerpo de la solicitud
  try {
    await furniture.save();
    return res.status(201).send(furniture);
  } catch (error) {
    return res.status(500).send(error)
  }
});


// ___________________________________________________________________GET__________________________________________________________________

/**
 * Ruta GET para '/furnitures'. Obtiene uno o más muebles de la base de datos.
 * @param {Request} req - La solicitud HTTP. La consulta puede contener un nombre, material, altura, anchura, profundidad, garantía, color o precio para filtrar los muebles.
 * @param {Response} res - La respuesta HTTP. Devuelve los muebles encontrados en caso de éxito, un error con un estado 404 si no se encontró ningún mueble con los filtros proporcionados, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
furnitureRouter.get('/furnitures', async (req, res) => {
  // constante que almacena los valores de la consulta
  const { name, material, height, width, depth, warranty, color, prize } = req.query
  // si no se proporciona ningún filtro, se devuelven todos los muebles
  let filter = {}

  if (name) filter = {...filter, ...{ name: name }};
  if (material) filter = {...filter, ...{ material: material }};
  if (height) filter = {...filter, ...{ height: height }};
  if (width) filter = {...filter, ...{ width: width }};
  if (depth) filter = {...filter, ...{ depth: depth }};
  if (warranty) filter = {...filter, ...{ warranty: warranty }};
  if (color) filter = {...filter, ...{ color: color }};
  if (prize) filter = {...filter, ...{ prize: prize }};

  try {
    const furnitures = await Furniture.find(filter);
    // si no se encontró ningún mueble con los filtros proporcionados
    if (furnitures.length !== 0) {
      return res.send(furnitures);
    }
    return res.status(404).send({ Error: "Furniture not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

/**
 * Ruta GET para '/furnitures/:id'. Obtiene un mueble específico de la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. Los parámetros deben contener el ID del mueble a obtener.
 * @param {Response} res - La respuesta HTTP. Devuelve el mueble encontrado en caso de éxito, un error con un estado 404 si no se encontró ningún mueble con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
furnitureRouter.get('/furnitures/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const furniture = await Furniture.findById(id);
    // si no se encontró ningún mueble con el ID proporcionado retorna un error
    if (furniture) {
      return res.send(furniture);
    }
    return res.status(404).send({ Error: "Furniture ID not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

// __________________________________________________________________PATCH_________________________________________________________________

/**
 * Ruta PATCH para '/furnitures'. Actualiza un mueble específico en la base de datos utilizando su código de producto.
 * @param {Request} req - La solicitud HTTP. El cuerpo de la solicitud debe contener los datos del mueble a actualizar.
 * @param {Response} res - La respuesta HTTP. Devuelve el mueble actualizado en caso de éxito, un error con un estado 404 si no se encontró ningún mueble con el código de producto proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
furnitureRouter.patch('/furnitures', async (req, res) => {

  // constante que almacena los valores de la consulta
  const { name, material, height, width, depth, warranty, color, prize } = req.query
  // si no se proporciona ningún filtro, se devuelven todos los muebles
  let filter = {}

  if (name) filter = {...filter, ...{ name: name }};
  if (material) filter = {...filter, ...{ material: material }};
  if (height) filter = {...filter, ...{ height: height }};
  if (width) filter = {...filter, ...{ width: width }};
  if (depth) filter = {...filter, ...{ depth: depth }};
  if (warranty) filter = {...filter, ...{ warranty: warranty }};
  if (color) filter = {...filter, ...{ color: color }};
  if (prize) filter = {...filter, ...{ prize: prize }};

  // Constantes para validar los campos que se pueden actualizar
  const allowedUpdates = ["name", "material", "width", "height", "depth", "color", "prize", "warranty"];
  const requestedUpdates = Object.keys(req.body);
  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));
  // si la solicitud no es válida, se devuelve un error
  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  try {
    const furniture = await Furniture.updateMany(filter, req.body )
    // si se encontró el mueble y se actualizó correctamente, se devuelve el mueble actualizado
    if (furniture) {
      return res.send(furniture);
    }
    return res.status(404).send({ Error: "Furniture not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  } 
});

/**
 * Ruta PATCH para '/furnitures/:id'. Actualiza un mueble específico en la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. El cuerpo de la solicitud debe contener los campos a actualizar.
 * @param {Response} res - La respuesta HTTP. Devuelve el mueble actualizado en caso de éxito, un error con un estado 400 si la actualización solicitada no es válida, un error con un estado 404 si no se encontró ningún mueble con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
furnitureRouter.patch('/furnitures/:id', async (req, res) => {
  // cosntantes para validar los campos que se pueden actualizar
  const allowedUpdates = ["name", "material", "width", "height", "depth", "color", "prize", "warranty"];
  const requestedUpdates = Object.keys(req.body);
  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));
  // si la solicitud no es válida, se devuelve un error
  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  try {
    const furniture = await Furniture.findByIdAndUpdate(req.params.id, req.body )
    // si se encontró el mueble y se actualizó correctamente, se devuelve el mueble actualizado
    if (furniture) {
      return res.send(furniture);
    }
    return res.status(404).send({ Error: "Furniture ID not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  }  
});


// __________________________________________________________________DELETE_________________________________________________________________

/**
 * Ruta DELETE para '/furnitures'. Elimina un mueble específico de la base de datos utilizando su código de producto.
 * @param {Request} req - La solicitud HTTP. La consulta debe contener el código de producto del mueble a eliminar.
 * @param {Response} res - La respuesta HTTP. Devuelve el mueble eliminado en caso de éxito, un error con un estado 404 si no se encontró ningún mueble con el código de producto proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
furnitureRouter.delete('/furnitures', async (req, res) => {

  // constante que almacena los valores de la consulta
  const { name, material, height, width, depth, warranty, color, prize } = req.query
  // si no se proporciona ningún filtro, se devuelven todos los muebles
  let filter = {}

  if (name) filter = {...filter, ...{ name: name }};
  if (material) filter = {...filter, ...{ material: material }};
  if (height) filter = {...filter, ...{ height: height }};
  if (width) filter = {...filter, ...{ width: width }};
  if (depth) filter = {...filter, ...{ depth: depth }};
  if (warranty) filter = {...filter, ...{ warranty: warranty }};
  if (color) filter = {...filter, ...{ color: color }};
  if (prize) filter = {...filter, ...{ prize: prize }};

  try {
    const furniture = await Furniture.deleteMany(filter);
    // si se encontró el mueble y se eliminó correctamente, se devuelve el mueble eliminado
    if (furniture) {
      return res.status(200).send(furniture);
    }
    return res.status(404).send({ Error: "Furniture not found" });
  } catch (error) {
    return res.status(500).send(error)
  }

})

/**
 * Ruta DELETE para '/furnitures/:id'. Elimina un mueble específico de la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. Los parámetros deben contener el ID del mueble a eliminar.
 * @param {Response} res - La respuesta HTTP. Devuelve el mueble eliminado en caso de éxito, un error con un estado 404 si no se encontró ningún mueble con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
furnitureRouter.delete('/furnitures/:id', async (req, res) => {
  try {
    const furniture = await Furniture.findByIdAndDelete(req.params.id);
    // si se encontró el mueble y se eliminó correctamente, se devuelve el mueble eliminado
    if (furniture) {
      return res.status(200).send(furniture);
    }
    return res.status(404).send({ Error: "Furniture ID not found" });
  } catch (error) {
    return res.status(500).send(error)
  }
});
```

 #### Provider.ts
```typescript
import express from 'express';
import { Provider } from '../models/providers.js';

export const providerRouter = express.Router()


// __________________________________________________________________POST__________________________________________________________________

/**
 * Ruta POST para '/providers'. Crea un nuevo proveedor en la base de datos.
 * @param {Request} req - La solicitud HTTP. El cuerpo de la solicitud debe contener los datos del proveedor a crear.
 * @param {Response} res - La respuesta HTTP. Devuelve el proveedor creado con un estado 201 en caso de éxito, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
providerRouter.post('/providers', async (req, res) => {
  const provider = new Provider(req.body);
  // Lo que hace es crear un nuevo objeto de la clase Provider con los datos que vienen en el cuerpo de la solicitud
  try {
    await provider.save();
    return res.status(201).send(provider);
  } catch (error) {
    return res.status(500).send(error)
  }
});


// ___________________________________________________________________GET__________________________________________________________________

/**
 * Ruta GET para '/providers'. Obtiene uno o más proveedores de la base de datos.
 * @param {Request} req - La solicitud HTTP. La consulta puede contener un CIF para filtrar los proveedores.
 * @param {Response} res - La respuesta HTTP. Devuelve los proveedores encontrados en caso de éxito, un error con un estado 404 si no se encontró ningún proveedor con el CIF proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
providerRouter.get('/providers', async (req, res) => {
  const filter = req.query.cif? {cif: req.query.cif.toString()} : {};
  try {
    const providers = await Provider.find(filter);
    // si no se encontró ningún proveedor con el CIF proporcionado
    if (providers.length !== 0) {
      return res.send(providers);
    }
    return res.status(404).send({ Error: "Provider cif not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

/**
 * Ruta GET para '/providers/:id'. Obtiene un proveedor específico de la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. El parámetro de la ruta debe contener el ID del proveedor a buscar.
 * @param {Response} res - La respuesta HTTP. Devuelve el proveedor encontrado en caso de éxito, un error con un estado 404 si no se encontró ningún proveedor con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
providerRouter.get('/providers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const provider = await Provider.findById(id);
    // si no se encontró ningún proveedor con el ID proporcionado
    if (provider) {
      return res.send(provider);
    }
    return res.status(404).send({ Error: "Provider ID not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

// __________________________________________________________________PATCH_________________________________________________________________


/**
 * Ruta PATCH para '/providers'. Actualiza uno o más proveedores de la base de datos.
 * @param {Request} req - La solicitud HTTP. El cuerpo de la solicitud debe contener los datos a actualizar.
 * @param {Response} res - La respuesta HTTP. Devuelve el proveedor actualizado en caso de éxito, un error con un estado 404 si no se encontró ningún proveedor con el CIF proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
providerRouter.patch('/providers', async (req, res) => {
  // constantes  que almacenan los valores permitidos para actualizar
  const allowedUpdates = ["cif", "name", "address", "phone", "category"];
  const requestedUpdates = Object.keys(req.body);

  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));
  // si la solicitud no es válida, se devuelve un error
  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  try {
    // se busca un proveedor por su CIF y se actualizan los datos
    const provider = await Provider.findOneAndUpdate({
      cif: req.query.cif
    }, req.body )
    // si se encontró un proveedor con el CIF proporcionado
    if (provider) {
      return res.send(provider);
    }
    return res.status(404).send({ Error: "Provider cif not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  } 
});

/**
 * Ruta PATCH para '/providers/:id'. Actualiza un proveedor específico en la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. El parámetro de la ruta debe contener el ID del proveedor a actualizar. El cuerpo de la solicitud debe contener los datos a actualizar.
 * @param {Response} res - La respuesta HTTP. Devuelve el proveedor actualizado en caso de éxito, un error con un estado 404 si no se encontró ningún proveedor con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
providerRouter.patch('/providers/:id', async (req, res) => {
  // constantes para validar los campos que se pueden actualizar
  const allowedUpdates = ["cif", "name", "address", "phone", "category"];
  const requestedUpdates = Object.keys(req.body);

  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));
  // si la solicitud no es válida, se devuelve un error
  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  try {
    const provider = await Provider.findByIdAndUpdate(req.params.id, req.body )
    // si se encontró un proveedor con el ID proporcionado
    if (provider) {
      return res.send(provider);
    }
    return res.status(404).send({ Error: "Provider ID not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  }  
});


// __________________________________________________________________DELETE_________________________________________________________________

/**
 * Ruta DELETE para '/providers'. Elimina un proveedor de la base de datos utilizando su CIF.
 * @param {Request} req - La solicitud HTTP. La consulta debe contener el CIF del proveedor a eliminar.
 * @param {Response} res - La respuesta HTTP. Devuelve el proveedor eliminado en caso de éxito, un error con un estado 404 si no se encontró ningún proveedor con el CIF proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
providerRouter.delete('/providers', async (req, res) => {
  try {
    const provider = await Provider.findOneAndDelete({
      cif: req.query.cif
    });
    // si se encontró un proveedor con el CIF proporcionado
    if (provider) {
      return res.status(200).send(provider);
    }
    return res.status(404).send({ Error: "Provider cif not found" });
  } catch (error) {
    return res.status(500).send(error)
  }

})

/**
 * Ruta DELETE para '/providers/:id'. Elimina un proveedor específico de la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. El parámetro de la ruta debe contener el ID del proveedor a eliminar.
 * @param {Response} res - La respuesta HTTP. Devuelve el proveedor eliminado en caso de éxito, un error con un estado 404 si no se encontró ningún proveedor con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
providerRouter.delete('/providers/:id', async (req, res) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);
    // si el proveedor con el ID proporcionado no se encontró
    if (provider) {
      return res.status(200).send(provider);
    }
    return res.status(404).send({ Error: "Provider ID not found" });
  } catch (error) {
    return res.status(500).send(error)
  }
});
``` 
 #### Transactions.ts
 ```typescript
 import express from 'express'
import { Transaction } from "../models/transactions.js";
import { Furniture } from '../models/furnitures.js';
import { Provider } from '../models/providers.js';
import { Customer } from '../models/customers.js';

export const transactionRouter = express.Router()

// __________________________________________________________________POST__________________________________________________________________

/**
 * Ruta POST para '/transactions
 *'. Crea una nueva transacción en la base de datos.
 * @param {Request} req - La solicitud HTTP. El cuerpo de la solicitud debe contener los datos del transacción a crear.
 * @param {Response} res - La respuesta HTTP. Devuelve el transacción creado con un estado 201 en caso de éxito, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
transactionRouter.post('/transactions', async (req, res) => {
  try {
    const { 
      providerCIF, 
      customerNIF, 
      type,
      // También si no está creado deberemos introducir los datos para crear el mueble
      name,
      productCode, 
      material,
      height,
      width,
      depth,
      warranty,
      color,
     } = req.body;

    let furniture = await Furniture.findOne({ productCode: productCode });
    if (!furniture) {
      // si no ha encontrado ningún mueble con el productCode, crea uno nuevo con los datos introducidos
      furniture = new Furniture({
        name: name,
        productCode: productCode,
        material: material,
        height: height,
        width: width,
        depth: depth,
        warranty: warranty,
        color: color,
        prize: req.query.moneyAmount
      })
      await furniture.save()
    }

    let entityID;

    if (providerCIF) {
      const provider = await Provider.findOne({ cif: providerCIF });
      if (!provider) {
        return res.status(400).send({ Error: "Provider not found" });
      }
      entityID = provider._id;
    } else if (customerNIF) {
      const customer = await Customer.findOne({ nif: customerNIF });
      if (!customer) {
        return res.status(400).send({ Error: "Customer not found" });
      }
      entityID = customer._id;
    } else {
      return res.status(400).send({ Error: "Must insert a customer nif or a provider cif" });
    }

    const transaction = new Transaction({
      ...req.body,
      furnitureID: furniture._id,
      providerID: type.toString() === 'purchase' ? entityID : undefined,
      customerID: type.toString() === 'sell' ? entityID : undefined
    });

    await transaction.save();

    await transaction.populate({
      path: 'furnitureID',
      select: ['name', 'material', 'height', 'width', 'depth', 'warranty', 'color']
    });

    if (type === 'purchase') {
      await transaction.populate({
        path: 'providerID',
        select: ['cif', 'name', 'address', 'phone', 'category']
      });
    } else {
      await transaction.populate({
        path: 'customerID',
        select: ['surname', 'name', 'nif', 'genre']
      });
    }

    return res.status(201).send(transaction);
  } catch (error) {
    return res.status(500).send(error);
  }

});


// ___________________________________________________________________GET__________________________________________________________________

/**
 * Ruta GET para '/transactions
 *'. Obtiene una o más transacciones de la base de datos.
 * @param {Request} req - La solicitud HTTP. La consulta puede contener un CIF para filtrar los transacciones.
 * @param {Response} res - La respuesta HTTP. Devuelve los transacciones encontrados en caso de éxito, un error con un estado 404 si no se encontró ningún transacción con el CIF proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
transactionRouter.get('/transactions', async (req, res) => {
  const { type, productCode, customerNIF, providerCIF, moneyAmount } = req.query
  let filter = {}

  if (type) filter = {...filter, ...{ type: type }};
  if (productCode) filter = {...filter, ...{ productCode: productCode }};
  if (customerNIF) filter = {...filter, ...{ customerNIF: customerNIF }};
  if (providerCIF) filter = {...filter, ...{ providerCIF: providerCIF }};
  if (moneyAmount) filter = {...filter, ...{ moneyAmount: moneyAmount }};

  try {
    const transactions = await Transaction.find(filter);
    // si no se encontró ningún transacción con el CIF proporcionado
    if (transactions.length !== 0) {
      return res.send(transactions);
    }
    return res.status(404).send({ Error: "Transaction cif not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

/**
 * Ruta GET para '/transactions
 *:id'. Obtiene un transacción específico de la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. El parámetro de la ruta debe contener el ID del transacción a buscar.
 * @param {Response} res - La respuesta HTTP. Devuelve el transacción encontrado en caso de éxito, un error con un estado 404 si no se encontró ningún transacción con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
transactionRouter.get('/transactions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById(id);
    // si no se encontró ninguna transacción con el ID proporcionado
    if (transaction) {
      return res.send(transaction);
    }
    return res.status(404).send({ Error: "Transaction ID not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

// __________________________________________________________________PATCH_________________________________________________________________


/**
 * Ruta PATCH para '/transactions
 *'. Actualiza una o más transacciones de la base de datos.
 * @param {Request} req - La solicitud HTTP. El cuerpo de la solicitud debe contener los datos a actualizar.
 * @param {Response} res - La respuesta HTTP. Devuelve el transacción actualizada en caso de éxito, un error con un estado 404 si no se encontró ninguna transacción con el CIF proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
transactionRouter.patch('/transactions', async (req, res) => {
  const { type, productCode, customerNIF, providerCIF, moneyAmount } = req.query
  let filter = {}

  if (type) filter = {...filter, ...{ type: type }};
  if (productCode) filter = {...filter, ...{ productCode: productCode }};
  if (customerNIF) filter = {...filter, ...{ customerNIF: customerNIF }};
  if (providerCIF) filter = {...filter, ...{ providerCIF: providerCIF }};
  if (moneyAmount) filter = {...filter, ...{ moneyAmount: moneyAmount }};

  const allowedUpdates = ["type", "productCode", "providerCIF", "customerNIF", "moneyAmount"];
  const requestedUpdates = Object.keys(req.body);

  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));
  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  try {
    const transaction = await Transaction.updateMany(filter, req.body )
    if (transaction) {
      return res.send(transaction);
    }
    return res.status(404).send({ Error: "Transaction not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  } 
});

/**
 * Ruta PATCH para '/transactions
 *:id'. Actualiza un transacción específico en la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. El parámetro de la ruta debe contener el ID del transacción a actualizar. El cuerpo de la solicitud debe contener los datos a actualizar.
 * @param {Response} res - La respuesta HTTP. Devuelve el transacción actualizada en caso de éxito, un error con un estado 404 si no se encontró ningún transacción con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
transactionRouter.patch('/transactions/:id', async (req, res) => {
  const allowedUpdates = ["type", "productCode", "providerCIF", "customerNIF", "moneyAmount"];
  const requestedUpdates = Object.keys(req.body);

  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));
  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body )
    if (transaction) {
      return res.send(transaction);
    }
    return res.status(404).send({ Error: "Transaction ID not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  }  
});


// __________________________________________________________________DELETE_________________________________________________________________

/**
 * Ruta DELETE para '/transactions
 *'. Elimina un transacción de la base de datos utilizando su CIF.
 * @param {Request} req - La solicitud HTTP. La consulta debe contener el CIF del transacción a eliminar.
 * @param {Response} res - La respuesta HTTP. Devuelve el transacción eliminado en caso de éxito, un error con un estado 404 si no se encontró ningún transacción con el CIF proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
transactionRouter.delete('/transactions', async (req, res) => {

  const { type, productCode, customerNIF, providerCIF, moneyAmount } = req.query
  let filter = {}

  if (type) filter = {...filter, ...{ type: type }};
  if (productCode) filter = {...filter, ...{ productCode: productCode }};
  if (customerNIF) filter = {...filter, ...{ customerNIF: customerNIF }};
  if (providerCIF) filter = {...filter, ...{ providerCIF: providerCIF }};
  if (moneyAmount) filter = {...filter, ...{ moneyAmount: moneyAmount }};

  try {
    const transaction = await Transaction.deleteMany(filter);
    if (transaction) {
      return res.status(200).send(transaction);
    }
    return res.status(404).send({ Error: "Transaction cif not found" });
  } catch (error) {
    return res.status(500).send(error)
  }

})

/**
 * Ruta DELETE para '/transactions
 *:id'. Elimina un transacción específica de la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. El parámetro de la ruta debe contener el ID del transacción a eliminar.
 * @param {Response} res - La respuesta HTTP. Devuelve el transacción eliminado en caso de éxito, un error con un estado 404 si no se encontró ningún transacción con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
transactionRouter.delete('/transactions/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (transaction) {
      return res.status(200).send(transaction);
    }
    return res.status(404).send({ Error: "Transaction ID not found" });
  } catch (error) {
    return res.status(500).send(error)
  }
});
```

 ### Variables
 #### Types.ts
 ```typescript
 /**
 * Tipo de dato para el género de una persona
 * Puede ser femenino, masculino o undefined
 * @typedef {string} Genre
 */
export type Genre = "male" | "female" | undefined;

/**
 * Tipo de dato para el color de un mueble.
 * Puede ser "white", "black", "blue", "red", "yellow", "green", "brown", "gray" u "other".
 * @typedef {string} Color
 */
export type Color = "white" | "black" | "blue" | "red" | "yellow" | "green" | "brown" | "gray" | "other";

/**
 * Tipo de dato para el material de un mueble.
 * Puede ser "wood", "metal", "unpholstery", "plastic", "glass", "stone" u "other".
 * @typedef {string} Material
 */
export type Material = "wood" | "metal" | "unpholstery" | "plastic" | "glass" | "stone" | "other";

/**
 * Tipo de dato para el tipo de transacción.
 * Puede ser "sell", "purchase".
 * @typedef {string} TransactionType
 */
export type TransactionType = "sell" | "purchase";

/**
 * Tipo de dato para el tipo de categoría de muebles.
 * Puede ser "wood", "upholstered", "office", "outdoor", "antique", "kids", "custom" u "other".
 * @typedef {string} CatergoryType
 */
export type CatergoryType = "wood" | "upholstered" | "office" | "outdoor" | "antique" | "kids" | "custom" | "other";

```

 ### Index.ts
 ```typescript
 import express from 'express';
import cors from 'cors';

import { customerRouter } from './routers/customers.js';
import { furnitureRouter } from './routers/furniture.js'
import { defaultRouter } from './routers/defaults.js';
import { providerRouter } from './routers/providers.js';
import { transactionRouter } from './routers/transactions.js';

import './db/database.js'

const port = process.env.PORT || 3000;

export const app = express();

// Son necesarios para que el servidor pueda recibir peticiones POST
app.use(cors());
app.use(express.json());
app.use(customerRouter);
app.use(furnitureRouter);
app.use(providerRouter);
app.use(transactionRouter)
app.use(defaultRouter);

/**
 * Esta función se ejecuta cuando se hace una petición GET a la raíz de la API.
 */
app.listen(port, () => {
  console.log('Server is up on https://ull-esit-inf-dsi-23-24-prct13-dsikea-api-3m1d.onrender.com')
})
```

 ## Explicacion de lo realizado

 ### Database
 #### Database.ts
 
 #### Descripción General
El script proporciona dos funciones principales:

1. **`connectDB`**: Conecta a la base de datos de MongoDB.
2. **`closeDB`**: Cierra la conexión a la base de datos de MongoDB.

 #### Detalles del Código

 #### Importación de Mongoose

El script comienza importando Mongoose, una biblioteca de modelado de datos para MongoDB y Node.js que proporciona una solución basada en esquemas para modelar los datos de la aplicación.

 #### Función `connectDB`

Esta función intenta establecer una conexión a la base de datos MongoDB utilizando una URL de conexión específica.

- **Conexión Exitosa**: Si la conexión es exitosa, se imprime un mensaje en la consola indicando que la base de datos se ha conectado.
- **Conexión Fallida**: Si la conexión falla, se captura el error, se imprime un mensaje en la consola detallando el error y se lanza una excepción para que pueda ser manejada por el código que llama a esta función.

 #### Función `closeDB`

Esta función intenta cerrar la conexión a la base de datos MongoDB.

- **Cierre Exitoso**: Si la conexión se cierra exitosamente, se imprime un mensaje en la consola indicando que la conexión se ha cerrado.
- **Cierre Fallido**: Si el cierre falla, se captura el error, se imprime un mensaje en la consola detallando el error y se lanza una excepción para que pueda ser manejada por el código que llama a esta función.

 #### Resumen

- **Conexión a la Base de Datos**: La función `connectDB` establece una conexión con la base de datos MongoDB y maneja errores potenciales durante el proceso.
- **Cierre de la Conexión**: La función `closeDB` cierra la conexión con la base de datos y maneja errores que puedan ocurrir durante el cierre.

Este script es esencial para gestionar la conexión y desconexión de la base de datos en aplicaciones Node.js, asegurando que los recursos se manejen adecuadamente y los errores se capturen y manejen de manera eficiente.

 ### Models
 #### Customer.ts

#### Descripción General

El script proporciona la definición de un esquema y un modelo para los documentos de Cliente. Esto incluye la creación de una interfaz que describe los campos de un Cliente y un esquema de Mongoose que implementa esta interfaz.

#### Detalles del Código

##### Importación de Mongoose

El script comienza importando Mongoose, una biblioteca de modelado de datos para MongoDB y Node.js que proporciona una solución basada en esquemas para modelar los datos de la aplicación. También se importa el tipo `Genre` desde un archivo de tipos externo.

##### Interfaz `CustomerInterface`

Se define una interfaz `CustomerInterface` que extiende de `Document`. Esta interfaz describe los campos que un documento de Cliente debe tener:

- **surname**: El apellido del cliente. Es una cadena obligatoria.
- **name**: El nombre del cliente. Es una cadena obligatoria.
- **nif**: El NIF del cliente. Es una cadena única y obligatoria que debe tener 8 dígitos seguidos de 1 letra.
- **genre**: El género del cliente. Es una cadena opcional que puede ser 'male' (masculino) o 'female' (femenino).

##### Esquema `CustomerSchema`

Se define el esquema `CustomerSchema` utilizando la interfaz `CustomerInterface`. Este esquema incluye los siguientes campos y validaciones:

- **surname**: Una cadena que se recorta y es obligatoria.
- **name**: Una cadena que se recorta y es obligatoria.
- **nif**: Una cadena única que se recorta y es obligatoria. Debe tener 8 dígitos seguidos de 1 letra. Se valida usando una expresión regular.
- **genre**: Una cadena que se recorta, no es obligatoria, y puede ser 'male' o 'female'. Se convierte a minúsculas automáticamente.

El esquema también incluye marcas de tiempo (`timestamps`) para rastrear la fecha de creación y la última actualización de los documentos.

##### Exportación del Modelo

Finalmente, se exporta el modelo `Customer` basado en el esquema `CustomerSchema`, permitiendo que este modelo sea utilizado en otras partes de la aplicación para interactuar con la colección de Clientes en la base de datos MongoDB.

#### Resumen

- **Interfaz del Cliente**: Define la estructura de un documento de Cliente con campos obligatorios y opcionales.
- **Esquema del Cliente**: Implementa la interfaz del Cliente y define las validaciones y transformaciones necesarias para cada campo.
- **Modelo del Cliente**: Exporta el modelo de Mongoose basado en el esquema, permitiendo su uso para operaciones CRUD en la base de datos.

Este script es esencial para gestionar la estructura y las validaciones de los documentos de Cliente en una aplicación Node.js, asegurando que los datos se almacenen correctamente y cumplan con los requisitos establecidos.

 #### Furniture.ts
 En el fichero de furnitures se ralizo lo siguiente:
 ### Interfaz del Mueble (FurnitureInterface)

La interfaz `FurnitureInterface` define la estructura de un objeto de tipo mueble. Contiene propiedades como `name`, `productCode`, `material`, `height`, `width`, `depth`, `warranty`, `color`, y `prize`, cada una con su tipo de dato correspondiente.

##### Esquema del Mueble (FurnitureSchema)

El esquema `FurnitureSchema` define la estructura del documento de Mueble en MongoDB. Incluye los siguientes campos:

- `name`: Nombre del mueble, una cadena recortada y obligatoria.
- `productCode`: Código de producto del mueble, una cadena obligatoria y única.
- `material`: Material del mueble, un valor de tipo Material con un valor predeterminado "other".
- `height`, `width`, `depth`: Dimensiones del mueble, números con validaciones de mínimo y máximo.
- `warranty`: Período de garantía del mueble en años, un número.
- `color`: Color del mueble, un valor de tipo Color con un valor predeterminado "other".
- `prize`: Precio del mueble, un número no negativo.

##### Validaciones y Opciones

- Se aplican validaciones para asegurar que el nombre del mueble no contenga números ni ciertos caracteres especiales.
- El material y el color se validan a través de enumeraciones para garantizar valores válidos.
- Se definen valores predeterminados para los campos `material` y `color`.
- Se utiliza el mecanismo de timestamps para registrar automáticamente las fechas de creación y actualización de los documentos.

##### Otros Aspectos

- Se importan los tipos `Color` y `Material` desde un archivo de variables.
- Se utiliza la librería Mongoose para definir el esquema y el modelo del Mueble.
- El modelo se exporta como `Furniture` para su uso en otras partes del código.

#### Provider.ts
 
 Se realizó lo siguiente: 
 ##### Interfaz del Proveedor (ProviderInterface)

La interfaz `ProviderInterface` define la estructura de un objeto de tipo proveedor. Contiene propiedades como `cif`, `name`, `address`, `phone`, y `category`, cada una con su tipo de dato correspondiente.

##### Esquema del Proveedor (ProviderSchema)

El esquema `ProviderSchema` define la estructura del documento de Proveedor en MongoDB. Incluye los siguientes campos:

- `cif`: Código de Identificación Fiscal del proveedor, una cadena recortada, obligatoria y única, con una validación que verifica su formato.
- `name`: Nombre del proveedor, una cadena recortada y obligatoria, con una validación para asegurar que no contiene números ni ciertos caracteres especiales.
- `address`: Dirección del proveedor, una cadena recortada y obligatoria.
- `phone`: Número de teléfono del proveedor, un número obligatorio con una validación para verificar su longitud.
- `category`: Categoría del proveedor, una cadena que se convierte a minúsculas, no obligatoria, con un conjunto predefinido de valores y un valor predeterminado "other".

##### Validaciones y Opciones

- Se aplican validaciones para asegurar que el CIF tenga el formato correcto y que el nombre del proveedor no contenga números ni ciertos caracteres especiales.
- Se define un conjunto predefinido de valores para la categoría del proveedor, con un valor predeterminado "other".
- Se utiliza el mecanismo de timestamps para registrar automáticamente las fechas de creación y actualización de los documentos.

##### Modelo del Proveedor (Provider)

Se exporta el modelo `Provider` para su uso en otras partes del código.
 
#### Transactions.ts

 ###### Descripción General

El script proporciona la definición de un esquema y un modelo para los documentos de Transacción. Esto incluye la creación de una interfaz que describe los campos de una Transacción y un esquema de Mongoose que implementa esta interfaz.

##### Detalles del Código

##### Importación de Mongoose y Tipos

El script comienza importando Mongoose, una biblioteca de modelado de datos para MongoDB y Node.js que proporciona una solución basada en esquemas para modelar los datos de la aplicación. También se importan los tipos `TransactionType`, `ProviderInterface`, `FurnitureInterface` y `CustomerInterface` desde archivos externos.

##### Interfaz `TransactionInterface`

Se define una interfaz `TransactionInterface` que extiende de `Document`. Esta interfaz describe los campos que un documento de Transacción debe tener:

- **type**: El tipo de transacción, que puede ser 'sell' (venta) o 'purchase' (compra).
- **productCode**: El código del producto involucrado en la transacción. Es una cadena obligatoria.
- **providerCIF**: El CIF del proveedor. Es una cadena opcional.
- **customerNIF**: El NIF del cliente. Es una cadena opcional.
- **moneyAmount**: La cantidad de dinero involucrada en la transacción. Es un número obligatorio.
- **furnitureID**: El ID del mueble involucrado en la transacción. Es una referencia obligatoria a un documento Mueble.
- **providerID**: El ID del proveedor involucrado en la transacción. Es una referencia opcional a un documento Proveedor.
- **customerID**: El ID del cliente involucrado en la transacción. Es una referencia opcional a un documento Cliente.

##### Esquema `TransactionSchema`

Se define el esquema `TransactionSchema` utilizando la interfaz `TransactionInterface`. Este esquema incluye los siguientes campos y validaciones:

- **type**: Una cadena recortada y obligatoria que puede ser 'sell' o 'purchase'.
- **productCode**: Una cadena recortada y obligatoria.
- **providerCIF**: Una cadena recortada y opcional.
- **customerNIF**: Una cadena recortada y opcional.
- **moneyAmount**: Un número que debe ser mayor o igual a 0.
- **furnitureID**: Un ObjectId obligatorio que referencia a un documento Mueble.
- **providerID**: Un ObjectId opcional que referencia a un documento Proveedor.
- **customerID**: Un ObjectId opcional que referencia a un documento Cliente.

El esquema también incluye marcas de tiempo (`timestamps`) para rastrear la fecha de creación y la última actualización de los documentos.

##### Exportación del Modelo

Finalmente, se exporta el modelo `Transaction` basado en el esquema `TransactionSchema`, permitiendo que este modelo sea utilizado en otras partes de la aplicación para interactuar con la colección de Transacciones en la base de datos MongoDB.

#### Resumen

- **Interfaz de la Transacción**: Define la estructura de un documento de Transacción con campos obligatorios y opcionales.
- **Esquema de la Transacción**: Implementa la interfaz de Transacción y define las validaciones y transformaciones necesarias para cada campo.
- **Modelo de la Transacción**: Exporta el modelo de Mongoose basado en el esquema, permitiendo su uso para operaciones CRUD en la base de datos.

Este script es esencial para gestionar la estructura y las validaciones de los documentos de Transacción en una aplicación Node.js, asegurando que los datos se almacenen correctamente y cumplan con los requisitos establecidos.

 ### Routers
 #### Customer.ts

 #### Descripción General

El script proporciona la definición de varias rutas HTTP para crear, obtener, actualizar y eliminar documentos de Cliente. Estas rutas permiten interactuar con la base de datos de manera estructurada y eficiente.

#### Detalles del Código

##### Importación de Dependencias

El script comienza importando Express y el modelo `Customer` desde el archivo correspondiente. Luego se crea un `Router` de Express para manejar las rutas de los clientes.

##### Ruta POST para '/customers'

Esta ruta permite crear un nuevo cliente en la base de datos.

- **Solicitud**: La solicitud HTTP debe contener los datos del cliente a crear en el cuerpo.
- **Respuesta Exitosa**: Devuelve el cliente creado con un estado 201.
- **Error**: Devuelve un error con un estado 500 si la operación falla.

##### Ruta GET para '/customers'

Esta ruta permite obtener uno o más clientes de la base de datos.

- **Solicitud**: La consulta puede contener un NIF para filtrar los clientes.
- **Respuesta Exitosa**: Devuelve los clientes encontrados.
- **Error**: Devuelve un error con un estado 404 si no se encuentra ningún cliente con el NIF proporcionado, o un error con un estado 500 si la operación falla.

##### Ruta GET para '/customers/:id'

Esta ruta permite obtener un cliente específico de la base de datos utilizando su ID.

- **Solicitud**: Los parámetros deben contener el ID del cliente a obtener.
- **Respuesta Exitosa**: Devuelve el cliente encontrado.
- **Error**: Devuelve un error con un estado 404 si no se encuentra ningún cliente con el ID proporcionado, o un error con un estado 500 si la operación falla.

##### Ruta PATCH para '/customers'

Esta ruta permite actualizar un cliente específico en la base de datos utilizando su NIF.

- **Solicitud**: La consulta debe contener el NIF del cliente a actualizar y el cuerpo de la solicitud debe contener los campos a actualizar.
- **Respuesta Exitosa**: Devuelve el cliente actualizado.
- **Error**: Devuelve un error con un estado 400 si la actualización solicitada no es válida, un error con un estado 404 si no se encuentra ningún cliente con el NIF proporcionado, o un error con un estado 500 si la operación falla.

##### Ruta PATCH para '/customers/:id'

Esta ruta permite actualizar un cliente específico en la base de datos utilizando su ID.

- **Solicitud**: Los parámetros deben contener el ID del cliente a actualizar y el cuerpo de la solicitud debe contener los campos a actualizar.
- **Respuesta Exitosa**: Devuelve el cliente actualizado.
- **Error**: Devuelve un error con un estado 400 si la actualización solicitada no es válida, un error con un estado 404 si no se encuentra ningún cliente con el ID proporcionado, o un error con un estado 500 si la operación falla.

##### Ruta DELETE para '/customers'

Esta ruta permite eliminar un cliente específico de la base de datos utilizando su NIF.

- **Solicitud**: La consulta debe contener el NIF del cliente a eliminar.
- **Respuesta Exitosa**: Devuelve el cliente eliminado.
- **Error**: Devuelve un error con un estado 404 si no se encuentra ningún cliente con el NIF proporcionado, o un error con un estado 500 si la operación falla.

##### Ruta DELETE para '/customers/:id'

Esta ruta permite eliminar un cliente específico de la base de datos utilizando su ID.

- **Solicitud**: Los parámetros deben contener el ID del cliente a eliminar.
- **Respuesta Exitosa**: Devuelve el cliente eliminado.
- **Error**: Devuelve un error con un estado 404 si no se encuentra ningún cliente con el ID proporcionado, o un error con un estado 500 si la operación falla.

#### Resumen

- **Creación de Clientes**: Permite crear nuevos clientes en la base de datos.
- **Obtención de Clientes**: Permite obtener uno o más clientes, ya sea por NIF o por ID.
- **Actualización de Clientes**: Permite actualizar clientes existentes, ya sea por NIF o por ID.
- **Eliminación de Clientes**: Permite eliminar clientes existentes, ya sea por NIF o por ID.

Este script es esencial para gestionar las operaciones CRUD de los documentos de Cliente en una aplicación Node.js, asegurando que las solicitudes HTTP se manejen de manera estructurada y eficiente.

 #### Defaults.ts

#### Descripción General

El script proporciona la definición de una ruta que captura todas las solicitudes no soportadas y devuelve un estado HTTP 501 (Not Implemented). Esto ayuda a manejar casos en los que una solicitud se realiza a una ruta no definida en la aplicación.

#### Detalles del Código

##### Importación de Express

El script comienza importando Express, una biblioteca web para Node.js que se utiliza para crear aplicaciones web y API.

##### Definición del `Router`

Se crea un `Router` de Express denominado `defaultRouter` para manejar las rutas por defecto.

##### Ruta por Defecto

Se define una ruta que captura todas las solicitudes HTTP (usando `'*'`) que no coinciden con ninguna otra ruta definida en la aplicación.

- **Solicitud**: Captura cualquier solicitud HTTP que no sea soportada.
- **Respuesta**: Devuelve un estado HTTP 501 (Not Implemented) indicando que la solicitud no es soportada por el servidor.

#### Resumen

- **Manejo de Solicitudes No Soportadas**: La ruta por defecto captura todas las solicitudes HTTP que no coinciden con ninguna otra ruta definida y devuelve un estado 501.
- **Respuesta Consistente**: Asegura que las solicitudes no soportadas se manejen de manera consistente y apropiada, proporcionando una respuesta clara de que la funcionalidad solicitada no está implementada.

Este script es esencial para gestionar solicitudes no soportadas en una aplicación Node.js, asegurando que los usuarios reciban respuestas apropiadas y evitando que las solicitudes no definidas causen problemas en el servidor.

 #### Furniture.ts

#### Descripción General

El script proporciona la definición de varias rutas HTTP para crear, obtener, actualizar y eliminar documentos de Muebles. Estas rutas permiten interactuar con la base de datos de manera estructurada y eficiente.

#### Detalles del Código

##### Importación de Dependencias

El script comienza importando Express y el modelo `Furniture` desde el archivo correspondiente. Luego se crea un `Router` de Express para manejar las rutas de los muebles.

##### Ruta POST para '/furnitures'

Esta ruta permite crear un nuevo mueble en la base de datos.

- **Solicitud**: La solicitud HTTP debe contener los datos del mueble a crear en el cuerpo.
- **Respuesta Exitosa**: Devuelve el mueble creado con un estado 201.
- **Error**: Devuelve un error con un estado 500 si la operación falla.

##### Ruta GET para '/furnitures'

Esta ruta permite obtener uno o más muebles de la base de datos.

- **Solicitud**: La consulta puede contener filtros como nombre, material, altura, anchura, profundidad, garantía, color o precio para filtrar los muebles.
- **Respuesta Exitosa**: Devuelve los muebles encontrados.
- **Error**: Devuelve un error con un estado 404 si no se encuentra ningún mueble con los filtros proporcionados, o un error con un estado 500 si la operación falla.

##### Ruta GET para '/furnitures/:id'

Esta ruta permite obtener un mueble específico de la base de datos utilizando su ID.

- **Solicitud**: Los parámetros deben contener el ID del mueble a obtener.
- **Respuesta Exitosa**: Devuelve el mueble encontrado.
- **Error**: Devuelve un error con un estado 404 si no se encuentra ningún mueble con el ID proporcionado, o un error con un estado 500 si la operación falla.

##### Ruta PATCH para '/furnitures'

Esta ruta permite actualizar uno o más muebles específicos en la base de datos utilizando sus filtros.

- **Solicitud**: La consulta puede contener filtros como nombre, material, altura, anchura, profundidad, garantía, color o precio para identificar los muebles a actualizar. El cuerpo de la solicitud debe contener los campos a actualizar.
- **Respuesta Exitosa**: Devuelve los muebles actualizados.
- **Error**: Devuelve un error con un estado 400 si la actualización solicitada no es válida, un error con un estado 404 si no se encuentra ningún mueble con los filtros proporcionados, o un error con un estado 500 si la operación falla.

##### Ruta PATCH para '/furnitures/:id'

Esta ruta permite actualizar un mueble específico en la base de datos utilizando su ID.

- **Solicitud**: Los parámetros deben contener el ID del mueble a actualizar y el cuerpo de la solicitud debe contener los campos a actualizar.
- **Respuesta Exitosa**: Devuelve el mueble actualizado.
- **Error**: Devuelve un error con un estado 400 si la actualización solicitada no es válida, un error con un estado 404 si no se encuentra ningún mueble con el ID proporcionado, o un error con un estado 500 si la operación falla.

##### Ruta DELETE para '/furnitures'

Esta ruta permite eliminar uno o más muebles específicos de la base de datos utilizando sus filtros.

- **Solicitud**: La consulta puede contener filtros como nombre, material, altura, anchura, profundidad, garantía, color o precio para identificar los muebles a eliminar.
- **Respuesta Exitosa**: Devuelve los muebles eliminados.
- **Error**: Devuelve un error con un estado 404 si no se encuentra ningún mueble con los filtros proporcionados, o un error con un estado 500 si la operación falla.

##### Ruta DELETE para '/furnitures/:id'

Esta ruta permite eliminar un mueble específico de la base de datos utilizando su ID.

- **Solicitud**: Los parámetros deben contener el ID del mueble a eliminar.
- **Respuesta Exitosa**: Devuelve el mueble eliminado.
- **Error**: Devuelve un error con un estado 404 si no se encuentra ningún mueble con el ID proporcionado, o un error con un estado 500 si la operación falla.

#### Resumen

- **Creación de Muebles**: Permite crear nuevos muebles en la base de datos.
- **Obtención de Muebles**: Permite obtener uno o más muebles, ya sea por filtros o por ID.
- **Actualización de Muebles**: Permite actualizar muebles existentes, ya sea por filtros o por ID.
- **Eliminación de Muebles**: Permite eliminar muebles existentes, ya sea por filtros o por ID.

Este script es esencial para gestionar las operaciones CRUD de los documentos de Muebles en una aplicación Node.js, asegurando que las solicitudes HTTP se manejen de manera estructurada y eficiente.

 #### Provider.ts

 En el providers de la carpeta de routers se realizo lo siguiente:
 ##### Enrutador del Proveedor (providerRouter)

El enrutador `providerRouter` maneja las solicitudes HTTP relacionadas con los proveedores.

##### Ruta POST '/providers'

- Crea un nuevo proveedor en la base de datos utilizando los datos proporcionados en el cuerpo de la solicitud.
- Devuelve el proveedor creado con un estado 201 en caso de éxito, o un error con un estado 500 en caso de fallo.

##### Ruta GET '/providers'

- Obtiene uno o más proveedores de la base de datos, con la opción de filtrar por CIF.
- Devuelve los proveedores encontrados en caso de éxito, un error con un estado 404 si no se encontró ningún proveedor con el CIF proporcionado, o un error con un estado 500 en caso de fallo.

##### Ruta GET '/providers/:id'

- Obtiene un proveedor específico de la base de datos utilizando su ID.
- Devuelve el proveedor encontrado en caso de éxito, un error con un estado 404 si no se encontró ningún proveedor con el ID proporcionado, o un error con un estado 500 en caso de fallo.

##### Ruta PATCH '/providers'

- Actualiza uno o más proveedores de la base de datos.
- Devuelve el proveedor actualizado en caso de éxito, un error con un estado 404 si no se encontró ningún proveedor con el CIF proporcionado, o un error con un estado 500 en caso de fallo.

##### Ruta PATCH '/providers/:id'

- Actualiza un proveedor específico en la base de datos utilizando su ID.
- Devuelve el proveedor actualizado en caso de éxito, un error con un estado 404 si no se encontró ningún proveedor con el ID proporcionado, o un error con un estado 500 en caso de fallo.

##### Ruta DELETE '/providers'

- Elimina un proveedor de la base de datos utilizando su CIF.
- Devuelve el proveedor eliminado en caso de éxito, un error con un estado 404 si no se encontró ningún proveedor con el CIF proporcionado, o un error con un estado 500 en caso de fallo.

##### Ruta DELETE '/providers/:id'

- Elimina un proveedor específico de la base de datos utilizando su ID.
- Devuelve el proveedor eliminado en caso de éxito, un error con un estado 404 si no se encontró ningún proveedor con el ID proporcionado, o un error con un estado 500 en caso de fallo.

 #### Transactions.ts

En el dichero de transactions se realizo lo siguiente:

##### Enrutador de Transacciones (transactionRouter)

El enrutador `transactionRouter` maneja las solicitudes HTTP relacionadas con las transacciones.

##### Ruta POST '/transactions'

- Crea una nueva transacción en la base de datos utilizando los datos proporcionados en el cuerpo de la solicitud.
- Verifica si existe un mueble con el mismo código de producto. Si no existe, crea uno nuevo.
- Verifica si el proveedor o cliente especificado existe y asigna su ID correspondiente a la transacción.
- Devuelve la transacción creada con un estado 201 en caso de éxito, o un error con un estado 500 en caso de fallo.

##### Ruta GET '/transactions'

- Obtiene una o más transacciones de la base de datos, con opciones de filtrado.
- Devuelve las transacciones encontradas en caso de éxito, un error con un estado 404 si no se encontró ninguna transacción con los filtros proporcionados, o un error con un estado 500 en caso de fallo.

##### Ruta GET '/transactions/:id'

- Obtiene una transacción específica de la base de datos utilizando su ID.
- Devuelve la transacción encontrada en caso de éxito, un error con un estado 404 si no se encontró ninguna transacción con el ID proporcionado, o un error con un estado 500 en caso de fallo.

##### Ruta PATCH '/transactions'

- Actualiza una o más transacciones de la base de datos utilizando filtros y los datos proporcionados en el cuerpo de la solicitud.
- Devuelve las transacciones actualizadas en caso de éxito, un error con un estado 404 si no se encontró ninguna transacción con los filtros proporcionados, o un error con un estado 500 en caso de fallo.

##### Ruta PATCH '/transactions/:id'

- Actualiza una transacción específica en la base de datos utilizando su ID y los datos proporcionados en el cuerpo de la solicitud.
- Devuelve la transacción actualizada en caso de éxito, un error con un estado 404 si no se encontró ninguna transacción con el ID proporcionado, o un error con un estado 500 en caso de fallo.

##### Ruta DELETE '/transactions'

- Elimina una o más transacciones de la base de datos utilizando filtros.
- Devuelve las transacciones eliminadas en caso de éxito, un error con un estado 404 si no se encontró ninguna transacción con los filtros proporcionados, o un error con un estado 500 en caso de fallo.

##### Ruta DELETE '/transactions/:id'

- Elimina una transacción específica de la base de datos utilizando su ID.
- Devuelve la transacción eliminada en caso de éxito, un error con un estado 404 si no se encontró ninguna transacción con el ID proporcionado, o un error con un estado 500 en caso de fallo.


 ### Variables
 #### Types.ts

#### Descripción General

El script proporciona la definición de varios tipos de datos que se utilizan en la aplicación. Estos tipos definen los valores permitidos para diferentes campos, como el género de una persona, el color de un mueble, el material de un mueble, el tipo de transacción y la categoría de muebles.

#### Detalles del Código

##### Tipo de Género (`Genre`)

Este tipo define los valores permitidos para el género de una persona. Puede ser:

- `male`: Masculino
- `female`: Femenino
- `undefined`: Indefinido

##### Tipo de Color (`Color`)

Este tipo define los valores permitidos para el color de un mueble. Puede ser:

- `white`: Blanco
- `black`: Negro
- `blue`: Azul
- `red`: Rojo
- `yellow`: Amarillo
- `green`: Verde
- `brown`: Marrón
- `gray`: Gris
- `other`: Otro

##### Tipo de Material (`Material`)

Este tipo define los valores permitidos para el material de un mueble. Puede ser:

- `wood`: Madera
- `metal`: Metal
- `unpholstery`: Tapicería
- `plastic`: Plástico
- `glass`: Vidrio
- `stone`: Piedra
- `other`: Otro

##### Tipo de Transacción (`TransactionType`)

Este tipo define los valores permitidos para el tipo de transacción. Puede ser:

- `sell`: Venta
- `purchase`: Compra

##### Tipo de Categoría de Muebles (`CatergoryType`)

Este tipo define los valores permitidos para la categoría de un mueble. Puede ser:

- `wood`: Madera
- `upholstered`: Tapizado
- `office`: Oficina
- `outdoor`: Exterior
- `antique`: Antiguo
- `kids`: Infantil
- `custom`: Personalizado
- `other`: Otro

#### Resumen

- **Género**: Define los valores permitidos para el género de una persona.
- **Color**: Define los valores permitidos para el color de un mueble.
- **Material**: Define los valores permitidos para el material de un mueble.
- **Tipo de Transacción**: Define los valores permitidos para el tipo de transacción.
- **Categoría de Muebles**: Define los valores permitidos para la categoría de un mueble.

Este script es esencial para garantizar la consistencia y la validación de los datos en una aplicación Node.js utilizando TypeScript, asegurando que los valores de los campos se limiten a las opciones permitidas.

 ### Index.ts

 #### Descripción General

El script configura el servidor principal de la aplicación, define los middlewares necesarios y monta las rutas para manejar las solicitudes HTTP. Finalmente, inicia el servidor en un puerto especificado.

#### Detalles del Código

##### Importación de Dependencias

El script comienza importando las dependencias necesarias, incluyendo Express para crear el servidor, CORS para manejar solicitudes de recursos cruzados, y los routers para los diferentes recursos (clientes, muebles, proveedores, transacciones y una ruta por defecto).

##### Configuración del Puerto

Se define el puerto en el que el servidor escuchará las solicitudes. El puerto se toma de las variables de entorno si está definido, o se usa el puerto 3000 por defecto.

##### Creación de la Aplicación Express

Se crea una instancia de la aplicación Express denominada `app`.

##### Middlewares

Se configuran los middlewares necesarios:

- **CORS**: Permite que el servidor maneje solicitudes de recursos cruzados.
- **Express JSON**: Permite que el servidor maneje solicitudes con cuerpos JSON.

##### Montaje de Routers

Se montan los routers importados para manejar las rutas específicas:

- **customerRouter**: Maneja las rutas para los clientes.
- **furnitureRouter**: Maneja las rutas para los muebles.
- **providerRouter**: Maneja las rutas para los proveedores.
- **transactionRouter**: Maneja las rutas para las transacciones.
- **defaultRouter**: Maneja las rutas no definidas (por defecto).

##### Inicio del Servidor

Finalmente, se inicia el servidor para que escuche las solicitudes en el puerto definido. Se imprime un mensaje en la consola indicando que el servidor está activo y proporcionando la URL del servidor.

#### Resumen

- **Configuración del Puerto**: Define el puerto en el que el servidor escucha las solicitudes.
- **Creación de la Aplicación Express**: Crea una instancia de la aplicación Express.
- **Middlewares**: Configura los middlewares necesarios para manejar CORS y JSON.
- **Montaje de Routers**: Monta los routers para manejar las rutas específicas.
- **Inicio del Servidor**: Inicia el servidor y escucha las solicitudes en el puerto definido.

Este script es esencial para configurar y ejecutar el servidor principal de una aplicación Node.js utilizando Express, asegurando que las solicitudes HTTP se manejen de manera estructurada y eficiente.
  
 ## Pruebas hechas.
 Para comporbar el código realizado se hicieron multitud de pruebas.

 ### Customer.spec.ts
 ```typescript
import "mocha";
import { expect } from "chai";
import request from "supertest";
import { app } from "../src/index.js";
import { Customer } from '../src/models/customers.js';
import { connectDB, closeDB } from '../src/db/database.js';

// Declaramos los clientes de prueba
const firstCustomer = {
  name: "John",
  surname: "Doe",
  nif: "11111111A",
  genre: 'male'
};

const secondCustomer = {
  name: "Jane",
  surname: "Doe",
  nif: "11111111B",
  genre: 'female'
};

const thirdCustomer = {
  name: "Jim",
  surname: "Beam",
  nif: "11111111C",
  genre: 'male'
};

// Declaramos los hooks, son funciones que se ejecutan antes y después de los tests
// Este hook es utilizado para conectarse a la base de datos antes de los tests
before(async function (done) {
  await connectDB();
  done();
});

// Este hook es utilizado para cerrar la conexión a la base de datos después de los tests
after(async function (done) {
  await closeDB();
  done();
});

// Declaramos los hooks, son funciones que se ejecutan antes y después de los tests
beforeEach(async (done) => {
  await Customer.deleteMany();
  done();
  await new Customer(firstCustomer).save();
  done();
  await new Customer(secondCustomer).save();
  done();
  await new Customer(thirdCustomer).save();
  done();
});

// Este hook es utilizado para borrar todos los clientes de la base de datos antes de cada test
afterEach(async (done) => {
  await Customer.deleteMany();
  done();
});

// Tests
// Pruebas para la API de clientes.
// funcion get que obtiene todos los clientes
describe('GET /customers', () => {
  // Prueba para obtener todos los clientes, debería devolver un array con 3 clientes
  it('Should return all customers', async () => {
    const res = await request(app).get('/customers');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.lengthOf(3);
  });

  // Prueba para obtener un cliente con un NIF específico, debería devolver un cliente con el NIF 11111111A
  it('Should return a customer with a specific nif', async () => {
    const res = await request(app).get(`/customers/${firstCustomer.nif}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('nif', firstCustomer.nif);
  });

  // Prueba para obtener un cliente con un NIF que no existe, debería devolver un error 404
  it('Should return a 404 error if the customer does not exist', async () => {
    const res = await request(app).get('/customers/12345678A');
    expect(res.status).to.equal(404);
  });
});

// Pruebas para la API de clientes.
// funcion post que guarda un cliente en la base de datos
describe('POST /customers', () => {
  // Prueba para guardar un cliente en la base de datos, debería devolver un cliente con el NIF 11111111D
  it('Should save a customer in the database', async () => {
    const customer = {
      name: "Mary",
      surname: "Poppins",
      nif: "11111111D",
      genre: 'female'
    };
    // se envía una petición POST a la ruta /customers con el cliente a guardar
    const res = await request(app).post('/customers').send(customer);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('nif', customer.nif);
  });

  // prueba para guardar un cliente que ya existe en la base de datos, debería devolver un error 500
  it('Should return a 500 error if the customer already exists', async () => {
    // se envía una petición POST a la ruta /customers con el cliente que ya existe
    const res = await request(app).post('/customers').send(firstCustomer);
    expect(res.status).to.equal(500);
  });
});

// Pruebas para la API de clientes.
// funcion patch que actualiza un cliente en la base de datos
describe('PATCH /customers', () => {
  // Prueba para actualizar un cliente en la base de datos, debería devolver un cliente
  it('Should update a customer in the database', async () => {
    const res = await request(app).patch(`/customers/${firstCustomer.nif}`).send({ genre: 'female' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('genre', 'female');
  });

  // Prueba para actualizar un cliente que no existe en la base de datos, debería devolver un error 404
  it('Should return a 404 error if the customer does not exist', async () => {
    const res = await request(app).patch('/customers/12345678A').send({ genre: 'female' });
    expect(res.status).to.equal(404);
  });

  // prueba para actualizar parcialmente un cliente en la base de datos
  // se actualiza el apellido de un cliente, debería devolver un cliente con el apellido actualizado
  it('Should partially update a customer in the database', async () => {
    const res = await request(app)
      // se envía una petición PATCH a la ruta /customers con el apellido a actualizar
      .patch(`/customers/${firstCustomer.nif}`)
      .send({ surname: 'Updated' });
  
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('surname', 'Updated');
    expect(res.body).to.have.property('name', firstCustomer.name);
  });
});

// Pruebas para la API de clientes.
// funcion delete que borra un cliente de la base de datos
describe('DELETE /customers', () => {
  // Prueba para borrar un cliente de la base de datos, debería devolver un 200
  it('Should delete a customer from the database', async () => {
    // se envía una petición DELETE a la ruta /customers con el NIF del cliente a borrar
    const res = await request(app).delete(`/customers/${firstCustomer.nif}`);
    expect(res.status).to.equal(200);
    const deletedCustomer = await Customer.findOne({ nif: firstCustomer.nif });
    expect(deletedCustomer).to.be.null;
  });

  // Prueba para borrar un cliente que no existe en la base de datos, debería devolver un error 404
  it('Should return a 404 error if the customer does not exist', async () => {
    const res = await request(app).delete('/customers/12345678A');
    expect(res.status).to.equal(404);
  });
});

// Pruebas para el esquema de clientes.
// se utiliza para validar los datos de los clientes
describe('Customer Schema', () => {
  // prueba para validar que el nombre de un cliente no esté vacío
  it('Should return an error if the NIF of a customer is empty', async () => {
    try {
      await Customer.create({ name: "Test", surname: "Test", nif: '' });
    } catch (err) {
      expect(err.name).to.equal('ValidationError');
    }
  });

  // prueba para validar que el NIF de un cliente tenga 9 caracteres
  it('Should return an error if the NIF of a customer does not have 9 characters', async () => {
    try {
      await Customer.create({ name: "Test", surname: "Test", nif: '12345678' });
    } catch (err) {
      expect(err.name).to.equal('ValidationError');
    }
  });

  // prueba para validar que el NIF de un cliente tenga un formato válido
  it('Should return an error if the NIF of a customer does not have a valid format', async () => {
    try {
      await Customer.create({ name: "Test", surname: "Test", nif: '12345678a' }); 
    } catch (err) {
      expect(err.name).to.equal('ValidationError');
    }
  });
  
  // prueba para validar que el género de un cliente sea válido
  // debera ser masculino o femenino
  it('Should return an error if the genre of a customer is not valid', async () => {
    try {
      await Customer.create({ name: "Test", surname: "Test", nif: '123456789', genre: 'invalid' });
    } catch (err) {
      expect(err.name).to.equal('ValidationError');
    }
  });
});
 ```

#### Descripción General

El script proporciona pruebas automatizadas para las siguientes funcionalidades:
1. **Conexión a la base de datos**: Establece y cierra la conexión a la base de datos antes y después de las pruebas.
2. **Operaciones CRUD**: Pruebas para las operaciones de creación, obtención, actualización y eliminación de clientes.
3. **Validación del esquema**: Pruebas para asegurar que los datos del cliente cumplen con las restricciones del esquema.

#### Detalles del Código

##### Importación de Dependencias

El script comienza importando Mocha, Chai, Supertest, la aplicación Express, el modelo de Cliente, y las funciones de conexión y cierre de la base de datos.

##### Declaración de Clientes de Prueba

Se definen tres clientes de prueba que se utilizarán en las diferentes pruebas.

##### Hooks para Configuración y Limpieza

Se definen hooks que se ejecutan antes y después de todas las pruebas:

- **before**: Conecta a la base de datos antes de ejecutar cualquier prueba.
- **after**: Cierra la conexión a la base de datos después de ejecutar todas las pruebas.

Hooks que se ejecutan antes y después de cada prueba individual:

- **beforeEach**: Borra todos los clientes de la base de datos y añade los clientes de prueba antes de cada prueba.
- **afterEach**: Borra todos los clientes de la base de datos después de cada prueba.

##### Pruebas GET

- **Obtener todos los clientes**: Verifica que se pueden obtener todos los clientes y que el número de clientes es 3.
- **Obtener un cliente por NIF**: Verifica que se puede obtener un cliente específico por su NIF.
- **Cliente no encontrado**: Verifica que se devuelve un error 404 si no se encuentra un cliente con el NIF proporcionado.

##### Pruebas POST

- **Guardar un cliente**: Verifica que se puede guardar un nuevo cliente en la base de datos.
- **Cliente ya existente**: Verifica que se devuelve un error 500 si se intenta guardar un cliente que ya existe en la base de datos.

##### Pruebas PATCH

- **Actualizar un cliente**: Verifica que se puede actualizar un cliente existente en la base de datos.
- **Cliente no encontrado para actualizar**: Verifica que se devuelve un error 404 si se intenta actualizar un cliente que no existe.
- **Actualización parcial de un cliente**: Verifica que se puede actualizar parcialmente un cliente en la base de datos.

##### Pruebas DELETE

- **Borrar un cliente**: Verifica que se puede borrar un cliente de la base de datos.
- **Cliente no encontrado para borrar**: Verifica que se devuelve un error 404 si se intenta borrar un cliente que no existe.

##### Pruebas del Esquema de Cliente

- **Validar NIF vacío**: Verifica que se devuelve un error si el NIF de un cliente está vacío.
- **Validar longitud del NIF**: Verifica que se devuelve un error si el NIF de un cliente no tiene 9 caracteres.
- **Validar formato del NIF**: Verifica que se devuelve un error si el NIF de un cliente no tiene un formato válido.
- **Validar género del cliente**: Verifica que se devuelve un error si el género de un cliente no es válido.

#### Resumen

- **Conexión y Limpieza**: Establece y cierra la conexión a la base de datos, y limpia los datos antes y después de las pruebas.
- **Pruebas CRUD**: Valida las operaciones de creación, obtención, actualización y eliminación de clientes.
- **Validación del Esquema**: Asegura que los datos del cliente cumplen con las restricciones del esquema.

Este conjunto de pruebas es esencial para garantizar que la API de clientes funcione correctamente y que los datos almacenados cumplan con los requisitos establecidos.

 ### Furniture.spec.ts
 ```typescript
 import "mocha";
import { expect } from "chai";
import request from "supertest";
import { app } from "../src/index.js";
import { Furniture } from "../src/models/furnitures.js";
import { connectDB, closeDB } from '../src/db/database.js';

// declaramos muebles de prueba con sus respectivos datos
const firstFurniture = {
  name: "Mesa",
  price: 100,
  stock: 10,
  category: 'wood'
};

const secondFurniture = {
  name: "Silla",
  price: 50,
  stock: 20,
  category: 'office'
};

const thirdFurniture = {
  name: "Armario",
  price: 200,
  stock: 5,
  category: 'wood'
};

// declaramos los hooks, son funciones que se ejecutan antes y después de los tests
// este es utilizado para conectarse a la base de datos antes de los tests
before(async function (done) {
  await connectDB();
  done();
});

// este es utilizado para cerrar la conexión a la base de datos después de los tests
after(async function (done) {
  await closeDB();
  done();
});

// este se utiliza para insertar los muebles de prueba en la base de datos antes de cada test
beforeEach(async () => {
  await Furniture.deleteMany();
  await new Furniture(firstFurniture).save();
  await new Furniture(secondFurniture).save();
  await new Furniture(thirdFurniture).save();
});

// este es utilizado para borrar todos los muebles de la base de datos después de cada test
afterEach(async () => {
  await Furniture.deleteMany();
});

// Tests de integración para la API de muebles
describe('Furniture API', () => {
  // prueba que crea un nuevo mueble en la base de datos
  it('should create a new furniture', async () => {
    const newFurniture = {
      name: 'Mesa de centro',
      price: 150,
      stock: 5,
      category: 'wood'
    };
    // enviamos la petición POST para crear un nuevo mueble
    const response = await request(app)
      .post('/furnitures')
      .send(newFurniture)
      .expect(201);
    // comprobamos que el nombre del mueble creado sea el mismo que el enviado
    expect(response.body.name).to.equal(newFurniture.name);
  });

  // prueba que falla al crear un mueble sin nombre
  it('should fail to create a furniture without a name', async () => {
    const newFurniture = {
      price: 150,
      stock: 5,
      category: 'wood'
    };
    const response = await request(app)
      .post('/furnitures')
      .send(newFurniture)
      .expect(400);
    expect(response.body.error).to.equal('Name is required');
  });

  // prueba que falla al crear un mueble con una categoría inválida
  it('should fail to create a furniture with invalid category', async () => {
    const newFurniture = {
      name: 'Mesa de centro',
      price: 150,
      stock: 5,
      category: 'invalid_category' // categoría inválida
    };
    const response = await request(app)
      .post('/furnitures')
      .send(newFurniture)
      .expect(400);
    expect(response.body.error).to.equal('Invalid category');
  });

  // prueba que falla al crear un mueble con stock negativo
  it('should fail to create a furniture with negative stock', async () => {
    const newFurniture = {
      name: 'Mesa de centro',
      price: 150,
      stock: -5, // stock negativo
      category: 'wood'
    };
    const response = await request(app)
      .post('/furnitures')
      .send(newFurniture)
      .expect(400);
    expect(response.body.error).to.equal('Stock cannot be negative');
  });

  // prueba que actualiza un mueble en la base de datos por su id
  it('should update a furniture by id', async () => {
    const furniture = new Furniture({
      name: 'Mesa de centro',
      price: 150,
      stock: 5,
      category: 'wood'
    });
    await furniture.save();
    const updatedFurniture = {
      name: 'Mesa de centro grande',
      price: 200,
      stock: 10,
      category: 'wood'
    };
    const response = await request(app)
      .put(`/furnitures/${furniture._id}`)
      .send(updatedFurniture)
      .expect(200);
    // comporbamos que los datos del mueble actualizado sean los mismos que los enviados
    expect(response.body.name).to.equal(updatedFurniture.name);
    expect(response.body.price).to.equal(updatedFurniture.price);
    expect(response.body.stock).to.equal(updatedFurniture.stock);
  });

  // prueba que falla al actualizar un mueble con un id inexistente
  it('should fail to update a furniture with non-existent id', async () => {
    const updatedFurniture = {
      name: 'Mesa de centro grande',
      price: 200,
      stock: 10,
      category: 'wood'
    };
    const response = await request(app)
      .put(`/furnitures/1234567890abcdef12345678`) // id inexistente
      .send(updatedFurniture)
      .expect(404);
    expect(response.body.error).to.equal('Furniture not found');
  });

  // prueba que obtiene todos los muebles de la base de datos
  it('should get all furnitures', async () => {
    const response = await request(app)
      .get('/furnitures')
      .expect(200);
    // comprobamos que la respuesta tenga 3 muebles
    expect(response.body).to.have.lengthOf(3);
  });

  // prueba que falla al obtener un mueble con un id inexistente
  it('should fail to get a furniture with non-existent id', async () => {
    const response = await request(app)
      .get(`/furnitures/1234567890abcdef12345678`) // id inexistente
      .expect(404);
    expect(response.body.error).to.equal('Furniture not found');
  });

  // prueba para asegurarnos que no devuelve algo inexistente
  it('should get a furniture by id', async () => {
    const furniture = new Furniture({
      name: 'Mesa de centro',
      price: 150,
      stock: 5,
      category: 'wood'
    });
    await furniture.save();
    const response = await request(app)
      .get(`/furnitures/${furniture._id}`)
      .expect(200);
    // comprobamos que el nombre del mueble obtenido sea el mismo que el creado
    expect(response.body.name).to.equal(furniture.name);
  });

  // prueba que elimina un mueble de la base de datos por su id
  it('should delete a furniture by id', async () => {
    const furniture = new Furniture({
      name: 'Mesa de centro',
      price: 150,
      stock: 5,
      category: 'wood'
    });
    await furniture.save();
    const response = await request(app)
      .delete(`/furnitures/${furniture._id}`)
      .expect(200); 
    // comprobamos que el nombre del mueble eliminado sea el mismo que el creado
    expect(response.body.name).to.equal(furniture.name);
  });

  // prueba que falla al eliminar un mueble con un id inexistente
  it('should fail to delete a furniture with non-existent id', async () => {
    const response = await request(app)
      .delete(`/furnitures/1234567890abcdef12345678`) // id inexistente
      .expect(404);
    expect(response.body.error).to.equal('Furniture not found');
  });
});
```

#### Creación de Muebles
- `should create a new furniture`: Prueba que crea un nuevo mueble en la base de datos.
- `should fail to create a furniture without a name`: Prueba que falla al crear un mueble sin nombre.
- `should fail to create a furniture with invalid category`: Prueba que falla al crear un mueble con una categoría inválida.
- `should fail to create a furniture with negative stock`: Prueba que falla al crear un mueble con stock negativo.

#### Actualización de Muebles
- `should update a furniture by id`: Prueba que actualiza un mueble en la base de datos por su id.
- `should fail to update a furniture with non-existent id`: Prueba que falla al actualizar un mueble con un id inexistente.

#### Obtención de Muebles
- `should get all furnitures`: Prueba que obtiene todos los muebles de la base de datos.
- `should fail to get a furniture with non-existent id`: Prueba que falla al obtener un mueble con un id inexistente.
- `should get a furniture by id`: Prueba que obtiene un mueble de la base de datos por su id.

#### Eliminación de Muebles
- `should delete a furniture by id`: Prueba que elimina un mueble de la base de datos por su id.
- `should fail to delete a furniture with non-existent id`: Prueba que falla al eliminar un mueble con un id inexistente.

 ### Provider.spec.ts
 ```typescript
 import "mocha";
import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/index.js';
import { Provider } from '../src/models/providers.js';

/**
 * Pruebas de integración para la API de proveedores
 */
describe('Provider API', () => {
  // Antes de todas las pruebas, nos conectamos a la base de datos
  before(async () => {
    const url = 'mongodb://127.0.0.1/provider_test';
    await mongoose.connect(url);
  });

  // Después de todas las pruebas, eliminamos la base de datos y cerramos la conexión
  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  // Antes de cada prueba, eliminamos todos los proveedores
  afterEach(async () => {
    await Provider.deleteMany();
  });

  // Pruebas
  it('should create a new provider', async () => {
    // Creamos un proveedor de ejemplo
    const newProvider = {
      cif: 'A1234567B',
      name: 'Proveedor Ejemplo',
      address: 'Calle Falsa 123',
      phone: 912345678,
      category: 'wood'
    };
    
    // Enviamos la petición POST para crear un nuevo proveedor
    const response = await request(app)
      .post('/providers')
      .send(newProvider)
      .expect(201);

    // Comprobamos que el proveedor se ha creado correctamente
    expect(response.body).to.have.property('_id');
    // Comprobamos que los datos del proveedor son correctos
    expect(response.body.name).to.equal(newProvider.name);
    expect(response.body.address).to.equal(newProvider.address);
    expect(response.body.phone).to.equal(newProvider.phone);
    expect(response.body.category).to.equal(newProvider.category);
  });

  // Prueba para comprobar que se obtienen todos los proveedores
  it('should get a list of providers', async () => {
    // Creamos dos proveedores de ejemplo
    const providers = [
      { cif: 'A1234567B', name: 'Proveedor 1', address: 'Calle 1', phone: 912345678, category: 'wood' },
      { cif: 'A1234567C', name: 'Proveedor 2', address: 'Calle 2', phone: 912345679, category: 'office' }
    ];

    // Insertamos los proveedores en la base de datos
    await Provider.insertMany(providers);

    // Enviamos la petición GET para obtener todos los proveedores
    const response = await request(app)
      .get('/providers')
      .expect(200);

    // Comprobamos que se han obtenido los dos proveedores
    expect(response.body.length).to.equal(2);
    // Comprobamos que los datos de los proveedores son correctos
    expect(response.body[0].name).to.equal(providers[0].name);
    expect(response.body[1].name).to.equal(providers[1].name);
    expect(response.body[0].address).to.equal(providers[0].address);
    expect(response.body[1].address).to.equal(providers[1].address);
    expect(response.body[0].phone).to.equal(providers[0].phone);
    expect(response.body[1].phone).to.equal(providers[1].phone);
    expect(response.body[0].category).to.equal(providers[0].category);
    expect(response.body[1].category).to.equal(providers[1].category);
  });

  // Prueba para comprobar que se obtiene un proveedor por su id
  it('should get a provider by id', async () => {
    // Creamos un proveedor de ejemplo
    const provider = new Provider({
      cif: 'A1234567B',
      name: 'Proveedor Ejemplo',
      address: 'Calle Falsa 123',
      phone: 912345678,
      category: 'wood'
    });

    // Guardamos el proveedor en la base de datos
    await provider.save();

    // Enviamos la petición GET para obtener el proveedor por su id
    const response = await request(app)
      .get(`/providers/${provider._id}`)
      .expect(200);

    // Comprobamos que los datos del proveedor son correctos
    expect(response.body.name).to.equal(provider.name);
    expect(response.body.address).to.equal(provider.address);
    expect(response.body.phone).to.equal(provider.phone);
    expect(response.body.category).to.equal(provider.category);
  });

  // Prueba para comprobar que se actualiza un proveedor
  it('should update a provider', async () => {
    // Creamos un proveedor de ejemplo
    const provider = new Provider({
      cif: 'A1234567B',
      name: 'Proveedor Ejemplo',
      address: 'Calle Falsa 123',
      phone: 912345678,
      category: 'wood'
    });

    // Guardamos el proveedor en la base de datos
    await provider.save();

    // Datos a actualizar
    const updates = { name: 'Proveedor Actualizado', category: 'office' };

    // Enviamos la petición PUT para actualizar el proveedor
    const response = await request(app)
      .put(`/providers/${provider._id}`)
      .send(updates)
      .expect(200);

    // Comprobamos que los datos del proveedor se han actualizado correctamente
    expect(response.body.name).to.equal(updates.name);
    expect(response.body.category).to.equal(updates.category);
    expect(response.body.address).to.equal(provider.address);
    expect(response.body.phone).to.equal(provider.phone);
  });

  // Prueba para comprobar que se elimina un proveedor
  it('should delete a provider', async () => {
    // Creamos un proveedor de ejemplo
    const provider = new Provider({
      cif: 'A1234567B',
      name: 'Proveedor Ejemplo',
      address: 'Calle Falsa 123',
      phone: 912345678,
      category: 'wood'
    });

    // Guardamos el proveedor en la base de datos
    await provider.save();

    // Enviamos la petición DELETE para eliminar el proveedor
    await request(app)
      .delete(`/providers/${provider._id}`)
      .expect(204);

    // Comprobamos que el proveedor se ha eliminado correctamente
    const foundProvider = await Provider.findById(provider._id);
    expect(foundProvider).to.be.null;
  });

  // Pruebas para errores
  it('should return 400 if required fields are missing', async () => {
    // Creamos un proveedor con datos incompletos
    const newProvider = {
      address: 'Calle Falsa 123',
      phone: 912345678
    };

    // Enviamos la petición POST para crear un nuevo proveedor
    const response = await request(app)
      .post('/providers')
      .send(newProvider)
      .expect(400);

    // Comprobamos que se ha devuelto un error
    expect(response.body.message).to.not.be.null;
  });

  // Prueba para comprobar que se devuelve un error si el CIF ya existe
  it('should return 400 for invalid CIF format', async () => {
    // Creamos un proveedor con un CIF inválido
    const newProvider = {
      cif: 'INVALIDCIF',
      name: 'Proveedor Ejemplo',
      address: 'Calle Falsa 123',
      phone: 912345678,
      category: 'wood'
    };

    // Enviamos la petición POST para crear un nuevo proveedor
    const response = await request(app)
      .post('/providers')
      .send(newProvider)
      .expect(400);

    // Comprobamos que se ha devuelto un error
    expect(response.body.message).to.equal('El Código de Identificación Fiscal no es válido');
  });

  // Prueba para comprobar que se devuelve un error si el CIF ya existe
  it('should return 400 for invalid phone number', async () => {
    // Creamos un proveedor con un número de teléfono inválido
    const newProvider = {
      cif: 'A1234567B',
      name: 'Proveedor Ejemplo',
      address: 'Calle Falsa 123',
      phone: 123,
      category: 'wood'
    };

    // Enviamos la petición POST para crear un nuevo proveedor
    const response = await request(app)
      .post('/providers')
      .send(newProvider)
      .expect(400);

    // Comprobamos que se ha devuelto un error
    expect(response.body.message).to.equal('Número de teléfono válido');
  });

  // Prueba para comprobar que se devuelve un error si no se proporciona una categoría
  it('should set default category to "other" if not provided', async () => {
    // Creamos un proveedor sin categoría
    const newProvider = {
      cif: 'A1234567B',
      name: 'Proveedor Ejemplo',
      address: 'Calle Falsa 123',
      phone: 912345678
    };

    // Enviamos la petición POST para crear un nuevo proveedor
    const response = await request(app)
      .post('/providers')
      .send(newProvider)
      .expect(201);

    // Comprobamos que la categoría por defecto es "other"
    expect(response.body.category).to.equal('other');
  });

  // Prueba para comprobar que se devuelve un error si la categoría no es válida
  it('should return 400 for invalid category value', async () => {
    // Creamos un proveedor con una categoría inválida
    const newProvider = {
      cif: 'A1234567B',
      name: 'Proveedor Ejemplo',
      address: 'Calle Falsa 123',
      phone: 912345678,
      category: 'invalidcategory'
    };

    // Enviamos la petición POST para crear un nuevo proveedor
    const response = await request(app)
      .post('/providers')
      .send(newProvider)
      .expect(400);

    // Comprobamos que se ha devuelto un error
    expect(response.body.message).to.equal('`invalidcategory` is not a valid enum value for path `category`.');
  });
});
```
#### Creación de Proveedores
- `should create a new provider`: Prueba que crea un nuevo proveedor en la base de datos.
- `should return 400 if required fields are missing`: Prueba que devuelve un error si faltan campos obligatorios al crear un proveedor.
- `should return 400 for invalid CIF format`: Prueba que devuelve un error si el formato del CIF es inválido.
- `should return 400 for invalid phone number`: Prueba que devuelve un error si el número de teléfono es inválido.
- `should set default category to "other" if not provided`: Prueba que establece la categoría predeterminada como "otra" si no se proporciona ninguna.
- `should return 400 for invalid category value`: Prueba que devuelve un error si el valor de la categoría es inválido.

#### Obtención de Proveedores
- `should get a list of providers`: Prueba que obtiene una lista de todos los proveedores de la base de datos.
- `should get a provider by id`: Prueba que obtiene un proveedor de la base de datos por su id.

#### Actualización de Proveedores
- `should update a provider`: Prueba que actualiza un proveedor en la base de datos.

#### Eliminación de Proveedores
- `should delete a provider`: Prueba que elimina un proveedor de la base de datos.
 

 ### Transaction.spec.ts
```typescript
import { expect } from 'chai';
import "mocha";
import request from 'supertest';
import { app } from '../src/index.js';
import mongoose from 'mongoose';
import { Transaction } from '../src/models/transactions.js';
import { Furniture } from '../src/models/furnitures.js';
import { Provider } from '../src/models/providers.js';
import { Customer } from '../src/models/customers.js';

/**
 * Pruebas para el API de transacciones.
 */
describe('Transactions API', () => {
  // Antes de todas las pruebas, nos conectamos a la base de datos.
  before(async () => {
    const url = 'mongodb://127.0.0.1/transactions_test';
    await mongoose.connect(url);
  });

  // Después de todas las pruebas, eliminamos la base de datos y cerramos la conexión.
  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  // Antes de cada prueba, eliminamos todos los documentos de las colecciones.
  afterEach(async () => {
    await Transaction.deleteMany();
    await Furniture.deleteMany();
    await Provider.deleteMany();
    await Customer.deleteMany();
  });

  // Prueba para crear una nueva transacción.
  it('should create a new transaction', async () => {
    // Creamos un mueble, un proveedor y un
    // cliente para poder crear una transacción.
    const furniture = await new Furniture({
      name: 'Chair',
      productCode: 'C123',
      material: 'wood',
      height: 100,
      width: 50,
      warranty: 2,
      prize: 150
    }).save();

    const provider = await new Provider({
      cif: 'A1234567B',
      name: 'Provider One',
      address: 'Some Street 123',
      phone: 912345678
    }).save();

    const customer = await new Customer({
      surname: 'Smith',
      name: 'John',
      nif: '12345678A'
    }).save();

    // Creamos una nueva transacción de venta.
    const newTransaction = {
      type: 'sell',
      productCode: 'C123',
      providerCIF: provider.cif,
      customerNIF: customer.nif,
      moneyAmount: 200,
      furnitureID: furniture._id
    };

    // Enviamos la petición al servidor.
    const response = await request(app)
      .post('/transactions')
      .send(newTransaction)
      .expect(201);

    // Verificamos que la transacción se haya creado correctamente.
    expect(response.body).to.have.property('_id');
    expect(response.body.type).to.equal(newTransaction.type);
  });

  it('should get all transactions', async () => {
    // Creamos una transacción de compra.
    const transaction = await new Transaction({
      type: 'purchase',
      moneyAmount: 500,
      furnitureID: new mongoose.Types.ObjectId() // Asume que esto es válido
    }).save();

    // Enviamos la petición al servidor.
    const response = await request(app)
      .get('/transactions')
      .expect(200);

    // Verificamos que la transacción se haya creado correctamente.
    expect(response.body.length).to.equal(1);
    // Verificamos que los datos de la transacción sean correctos.
    expect(response.body[0].moneyAmount).to.equal(transaction.moneyAmount);
    expect(response.body[0].type).to.equal(transaction.type);
    expect(response.body[0].furnitureID).to.equal(transaction.furnitureID.toString());
  });

  // Prueba para obtener una transacción por su id.
  it('should get a transaction by id', async () => {
    // Creamos una transacción de venta.
    const transaction = await new Transaction({
      type: 'sell',
      moneyAmount: 300,
      furnitureID: new mongoose.Types.ObjectId() // Asume que esto es válido
    }).save();

    // Enviamos la petición al servidor.
    const response = await request(app)
      .get(`/transactions/${transaction._id}`)
      .expect(200);

    // Verificamos que la transacción se haya creado correctamente y que los datos sean correctos.
    expect(response.body.moneyAmount).to.equal(transaction.moneyAmount);
    expect(response.body.type).to.equal(transaction.type);
    expect(response.body.furnitureID).to.equal(transaction.furnitureID.toString());
  });

  // Prueba para eliminar una transacción.
  it('should delete a transaction', async () => {
    // Creamos una transacción de compra.
    const transaction = await new Transaction({
      type: 'purchase',
      moneyAmount: 500,
      furnitureID: new mongoose.Types.ObjectId() // Asume que esto es válido
    }).save();

    // Enviamos la petición al servidor.
    await request(app)
      .delete(`/transactions/${transaction._id}`)
      .expect(204);

    // Verificamos que la transacción se haya eliminado correctamente.
    const deletedTransaction = await Transaction.findById(transaction._id);
    expect(deletedTransaction).to.be.null;
  });

  // Prueba para actualizar una transacción.
  it('should update a transaction', async () => {
    // Creamos una transacción de venta.
    const transaction = await new Transaction({
      type: 'sell',
      moneyAmount: 150,
      furnitureID: new mongoose.Types.ObjectId() // Asume que esto es válido
    }).save();

    // Actualizamos la cantidad de dinero de la transacción.
    const update = { moneyAmount: 250 };

    // Enviamos la petición al servidor.
    const response = await request(app)
      .put(`/transactions/${transaction._id}`)
      .send(update)
      .expect(200);

    // Verificamos que la transacción se haya actualizado correctamente.
    expect(response.body.moneyAmount).to.equal(update.moneyAmount);
  });

  // Pruebas para comprobar los errores.

  // Prueba para comprobar que se devuelve un error 404 si no se encuentra la transacción.
  it('should return 400 if referenced furnitureID does not exist', async () => {
    // Creamos una transacción de venta.
    const newTransaction = {
      type: 'sell',
      productCode: 'C123',
      moneyAmount: 100,
      furnitureID: new mongoose.Types.ObjectId() // Esto no existe
    };

    // Enviamos la petición al servidor.
    const response = await request(app)
      .post('/transactions')
      .send(newTransaction)
      .expect(400);

    // Verificamos que se haya devuelto un error 404.
    expect(response.body.message).to.include('validation failed');
  });

  // Prueba para comprobar que se devuelve un error 400 si no se encuentra el proveedor.
  it('should return 400 if referenced providerID does not exist', async () => {
    // Creamos un mueble para poder crear una transacción.
    const furniture = await new Furniture({
      name: 'Chair',
      productCode: 'C123',
      material: 'wood',
      height: 100,
      width: 50,
      warranty: 2,
      prize: 150
    }).save();

    // Creamos una nueva transacción de venta.
    const newTransaction = {
      type: 'sell',
      productCode: 'C123',
      moneyAmount: 100,
      furnitureID: furniture._id,
      providerID: new mongoose.Types.ObjectId() // Asume que esto no existe
    };

    // Enviamos la petición al servidor.
    const response = await request(app)
      .post('/transactions')
      .send(newTransaction)
      .expect(400);

    // Verificamos que se haya devuelto un error 400.
    expect(response.body.message).to.include('validation failed');
  });

  // Prueba para comprobar que se devuelve un error 400 si no se encuentra el cliente.
  it('should return 400 if referenced customerID does not exist', async () => {
    // Creamos un mueble para poder crear una transacción.
    const furniture = await new Furniture({
      name: 'Chair',
      productCode: 'C123',
      material: 'wood',
      height: 100,
      width: 50,
      warranty: 2,
      prize: 150
    }).save();

    // Creamos una nueva transacción de venta.
    const newTransaction = {
      type: 'sell',
      productCode: 'C123',
      moneyAmount: 100,
      furnitureID: furniture._id,
      customerID: new mongoose.Types.ObjectId() // Asume que esto no existe
    };

    // Enviamos la petición al servidor.
    const response = await request(app)
      .post('/transactions')
      .send(newTransaction)
      .expect(400);

    // Verificamos que se haya devuelto un error 400.
    expect(response.body.message).to.include('validation failed');
  });
});
```

#### Detalles del Código

##### Importación de Dependencias

El script comienza importando Mocha, Chai, Supertest, la aplicación Express, Mongoose, y los modelos de Transacción, Mueble, Proveedor y Cliente.

##### Hooks para Configuración y Limpieza

Se definen hooks que se ejecutan antes y después de todas las pruebas:

- **before**: Conecta a la base de datos antes de ejecutar cualquier prueba.
- **after**: Elimina la base de datos y cierra la conexión después de ejecutar todas las pruebas.

Hook que se ejecuta después de cada prueba individual:

- **afterEach**: Borra todos los documentos de las colecciones después de cada prueba.

##### Pruebas POST

- **Crear una nueva transacción**: Verifica que se puede crear una nueva transacción en la base de datos, asociando un mueble, un proveedor y un cliente.

##### Pruebas GET

- **Obtener todas las transacciones**: Verifica que se pueden obtener todas las transacciones almacenadas en la base de datos.
- **Obtener una transacción por ID**: Verifica que se puede obtener una transacción específica utilizando su ID.

##### Pruebas DELETE

- **Eliminar una transacción**: Verifica que se puede eliminar una transacción de la base de datos.

##### Pruebas PUT

- **Actualizar una transacción**: Verifica que se puede actualizar una transacción en la base de datos.

##### Pruebas de Validación de Referencias

- **Referencia inválida de mueble**: Verifica que se devuelve un error 400 si el `furnitureID` referenciado no existe.
- **Referencia inválida de proveedor**: Verifica que se devuelve un error 400 si el `providerID` referenciado no existe.
- **Referencia inválida de cliente**: Verifica que se devuelve un error 400 si el `customerID` referenciado no existe.

#### Resumen

- **Conexión y Limpieza**: Establece y cierra la conexión a la base de datos, y limpia los datos después de las pruebas.
- **Pruebas CRUD**: Valida las operaciones de creación, obtención, actualización y eliminación de transacciones.
- **Validación de Referencias**: Asegura que las referencias a otros documentos son válidas y existentes.

Este conjunto de pruebas es esencial para garantizar que la API de transacciones funcione correctamente y que las relaciones entre documentos se manejen de manera adecuada en una aplicación Node.js.

# 11. Conclusion.

Este proyecto se centró en el desarrollo de una API RESTful utilizando Node.js, Express y Mongoose para gestionar diversas entidades, tales como Clientes, Muebles, Proveedores y Transacciones en una base de datos MongoDB. El objetivo principal fue proporcionar una infraestructura robusta para realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre estas entidades, asegurando la integridad y la validación de los datos. Se definieron esquemas detallados para cada entidad, incluyendo validaciones específicas para cada campo y referencias entre entidades cuando fue necesario. Se implementaron rutas y controladores para manejar las operaciones CRUD, asegurando que las solicitudes HTTP se manejaran de manera estructurada y eficiente. Además, se realizaron pruebas exhaustivas utilizando Mocha, Chai y Supertest para verificar el correcto funcionamiento de las operaciones y la validación de los datos. A través de estas pruebas, se identificaron y solucionaron varios problemas, mejorando la confiabilidad y estabilidad del sistema.

El proyecto logró una implementación sólida de la API RESTful, cumpliendo con los requisitos de gestión de datos y operaciones CRUD. Se garantizó la integridad de los datos mediante esquemas detallados y validaciones robustas. Los retos significativos incluyeron la gestión de referencias entre entidades y la realización de pruebas de integración. Sin embargo, a través de estos desafíos, se adquirieron importantes aprendizajes y se mejoró la confiabilidad del sistema. Las futuras mejoras sugeridas incluyen la optimización del rendimiento, la implementación de mecanismos de autenticación y autorización para mejorar la seguridad de la API, y la ampliación de la documentación para facilitar el uso y mantenimiento por parte de otros desarrolladores.

Concluimos diciendo que este proyecto proporciona una base sólida para la gestión de datos en una aplicación Node.js, demostrando la efectividad de usar Mongoose para modelar datos en MongoDB y Express para manejar rutas y controladores. Las pruebas exhaustivas aseguran la funcionalidad y confiabilidad de la API, estableciendo un buen punto de partida para futuras mejoras y expansiones.