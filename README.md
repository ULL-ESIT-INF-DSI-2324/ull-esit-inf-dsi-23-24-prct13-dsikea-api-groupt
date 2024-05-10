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
9. [Mongodb y Mongoose]
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

