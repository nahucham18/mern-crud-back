import {Router} from 'express';
import {getAllCourses,postCourse, getCourseById, deleteCourse, putCourse,desInscribir} from '../controllers/courses.controller.js';

const router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Course:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: ID del curso 
 *                  name:
 *                      type: string
 *                      description: Nombre de la categoria
 *                  description:
 *                      type: string
 *                      description: Descripcion del curso
 *                  category:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                              description: ID de categoria
 *                          name:
 *                              type: string
 *                              description: Nombre de la categoria
 *                          __v:
 *                              type: number
 *                              description: Numero de la version de categoria
 *                  createdAt: 
 *                      type: string
 *                      description: Fecha de creacion
 *                  updatedAt:
 *                      type: string
 *                      description: Fecha de actualizacion
 *                  __v:
 *                      type: number
 *                      description: Numero de version de curso
 *              required:
 *                  - name
 *                  - description
 *                  - categoryID
 *              example:
 *              -   _id: 64dfd3553e57293218f499be
 *                  name: "JSAdvanced"
 *                  description: "Descripción del curso"
 *                  category:
 *                      _id: "64dfd34f3e57293218f499b9"
 *                      name: "backend"
 *                      __v: 0
 *                  createdAt: "2023-08-19T19:19:59.172Z"
 *                  updatedAt: "2023-08-19T19:19:59.172Z"
 *                  __v: 0
 *              -   _id: 64dfd3553e57293218f49164
 *                  name: "JS basico"
 *                  description: "Descripción del curso"
 *                  category:
 *                      _id: "64dfd34f3e57293218f499b9"
 *                      name: "backend"
 *                      __v: 0
 *                  createdAt: "2023-08-19T19:19:59.172Z"
 *                  updatedAt: "2023-08-19T19:19:59.172Z"
 *                  __v: 0
 */

/**
 * @swagger
 * /api/course:
 *  get:
 *      summary: Muestra todo los cursos
 *      tags: [Course]
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
 */ 
router.get('/', getAllCourses);

/**
 * @swagger
 * /api/course:
 *  post:
 *      summary: Crea un nuevo curso
 *      tags: [Course]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Nombre del curso
 *                          description:
 *                              type: string
 *                              description: Descripcion del curso
 *                          categoryID:
 *                              type: string
 *                              description: ID de categoria
 *                      example:
 *                          name: Java
 *                          description: Curso de Java
 *                          categoryID: 64e130372ec8cf1aa33b745f
 *      responses:
 *          200:
 *              description: Nuevo curso creado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: Nuevo curso creado
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      name:
 *                                          type: string
 *                                          description: Nombre de curso
 *                                      description:
 *                                          type: string
 *                                          description: Descripcion del curso    
 *                                      category:
 *                                          type: object
 *                                          properties:
 *                                              _id:
 *                                                  type: string
 *                                                  description: ID de la categoria
 *                                              name:
 *                                                  type: string
 *                                                  description: Nombre de la categoria
 *                                              __v:
 *                                                  type: number
 *                                                  description: Numero de version de la categoria                  
 *                                      _id:
 *                                          type: string
 *                                          description: ID del curso
 *                                      createdAt: 
 *                                          type: string
 *                                          description: Fecha de creacion del curso
 *                                      updatedAt:
 *                                          type: string
 *                                          description: Fecha de actualizacion del curso
 *                                      __v:
 *                                          type: number
 *                                          description: Numero de version
 *                          example:
 *                              message: Nueva categoria creada
 *                              data:
 *                                  name: JavaScript
 *                                  description: Curso de JavaScript
 *                                  category:
 *                                      _id: 64e130372ec8cf1aa33b745f
 *                                      name: desarrollo
 *                                      __v: 0
 *                                  _id: 64e5236f0620805e94bb268d
 *                                  createdAt: 2023-08-22T21:06:55.795Z
 *                                  updateAt: 2023-08-22T21:06:55.795Z
 *                                  __v: 0  
 */
router.post('/', postCourse);

/**
 * @swagger
 *  /api/course/{id}:
 *  get:
 *      summary: Busca curso por ID
 *      tags: [Course]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: ID del usuario a buscar
 *      responses:
 *          200:
 *              description: Curso encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name: 
 *                                  type: string
 *                              description:
 *                                  type: string
 *                              category:
 *                                  type: object
 *                                  properties:
 *                                      _id:
 *                                          type: string
 *                                      name: 
 *                                          type: string
 *                                      __v: 
 *                                          type: number
 *                              _id:
 *                                  type: string
 *                              createdAt:
 *                                  type: string
 *                              updateAt: 
 *                                  type: string
 *                              __v: 
 *                                  type: number
 *                          example:
 *                              name: JavaScript 
 *                              description: Curso de JavaScript
 *                              category:
 *                                  _id: 64e130372ec8cf1aa33b745f
 *                                  name: desarrollo
 *                                  __v: 0
 *                              _id: 64e5236f0620805e94bb268d
 *                              createdAt: 2023-08-22T21:06:55.795Z
 *                              updateAt: 2023-08-22T21:06:55.795Z
 *                              __v: 0                                    
 */
router.get('/:id' ,getCourseById)

/**
 * @swagger
 *  /api/course/{id}:
 *  delete:
 *      summary: Eliminar curso por ID
 *      tags: [Course]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: ID del usuario a eleminar
 *      responses:
 *          200:
 *              description: Categoria eliminada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      _id:
 *                                          type: string
 *                                      name:
 *                                          type: string
 *                                      description:
 *                                          type: string
 *                                      category:
 *                                          type: object
 *                                          porperties:
 *                                              _id:
 *                                                  type: string
 *                                              name:
 *                                                  type: string
 *                                              __v:
 *                                                  type: number
 *                                      createdAt:
 *                                          type: string
 *                                      updatedAt:
 *                                          type: string
 *                                      __v: 
 *                                          type: number
 *                          example:
 *                              message: Curso eliminado
 *                              data:
 *                                  _id: 64e5236f0620805e94bb268d
 *                                  name: JavaScript
 *                                  description: Curso de Java
 *                                  category:
 *                                      _id: 64e130372ec8cf1aa33b745f
 *                                      name: Diseño
 *                                      __v: 0
 *                                  createdAt: 2023-08-22T21:06:55.795Z
 *                                  updatedAt: 2023-08-22T21:06:55.795Z
 *                                  __v: 0  
 *                                                  
 */
router.delete('/:id', deleteCourse)

/**
 * @swagger
 *  /api/course/{id}:
 *  put:
 *      summary: Actualiza una categoria
 *      tags: [Course]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: ID de la categoria a actualizar
 *      requestBody:
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Nuevo nombre de la curso
 *                          description:
 *                              type: string
 *                              description: Descripcion nueva del curso
 *                          categoryID:
 *                              type: string
 *                              description: ID categoria
 *                      example:
 *                          name: Desarrollo
 *                          description: Nueva descripcion
 *                          categoryID: 64e1626f15d17fc0b4b39538
 *      responses:
 *          200:
 *              description: El usuario fue actualizado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: mensaje de respuesta
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      _id:
 *                                          type: string
 *                                          description: ID de la categoria
 *                                      name:
 *                                          type: string
 *                                          description: Nombre de la categoria
 *                                      __v: 
 *                                          type: number
 *                                          description: Numero de version
 *                          example:
 *                              message: Categoria actualizada
 *                              data:
 *                                  _id: "64e1626f15d17fc0b4b39538"
 *                                  name: idioma
 *                                  __V: 0
 *          302: 
 *              description: No fue actualizado
 */
router.put('/:id', putCourse)

router.put('/desinscribir/:id', desInscribir)

export default router;