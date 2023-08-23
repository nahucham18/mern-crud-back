import { Router } from 'express';
import { getAllUsers, postUser, getUserById, getUserForCourse, deteleUser, putUser } from '../controllers/user.controller.js';

const router = Router()

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *              first_name:
 *                  type: string
 *                  description: Nombre de la persona
 *              last_name:
 *                  type: string
 *                  description: Apellido de la persona
 *              dni: 
 *                  type: number
 *                  description: Numero de DNI
 *              age:
 *                  type: number
 *                  description: Edad de la persona
 *              gender:
 *                  type: string
 *                  description: Genero de la persona
 *              courses:
 *                  type: object
 *                  item:  
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                          img_course:
 *                              type: string
 *                          name:
 *                              type: string
 *                          description:
 *                              type: string
 *                          category:
 *                              type: object
 *                              properties: 
 *                                  _id:
 *                                      type: string
 *                                  name:
 *                                      type: string
 *                          createdAt:
 *                              type: string
 *                          updatedAt:
 *                              type: string
 *              createdAt: 
 *                  type:string
 *              updatedAt:
 *                  type: string
 *              __v: 
 *                  type:number
 *          required:
 *              - first_name
 *              - last_name
 *              - dni
 *              - age
 *              - gender
 *          example:
 *          -   first_name: Nahuel
 *              last_name: Chamorro
 *              dni: 39288730
 *              age: 27
 *              gender: hombre
 *              courses: []
 *              createdAt: 2023-08-19T12:45:30.637Z
 *              updatedAt: 2023-08-23T03:11:41.570Z
 *              __v: 0
 *          -   first_name: Sofia
 *              last_name: Debia
 *              dni: 39288731
 *              age: 26
 *              gender: mujer
 *              courses:
 *                  img_course: https://firebasestorage.googleapis.com/v0/b/nahuelchamorro-e4019.appspot.com/o/cursoonline.png?alt=media&token=82c098f1-ba88-4743-b2e0-33b0f1f51d28
 *                  _id: 64dfd3553e57293218f499be
 *                  name: JSAdvanced
 *                  description: Descripcion del curso
 *                  category:
 *                      _id: 64dfd34f3e57293218f499b9
 *                      name: backend
 *                      __v: 0
 *                  createdAt: 2023-08-18T20:23:49.132Z
 *                  updatedAt: 2023-08-22T16:39:15.700Z
 *                  __v: 0
 *              createdAt: 2023-08-18T13:35:43.049Z
 *              updatedAt: 2023-08-23T03:12:40.794Z
 *              __v: 0
 */
router.get('/bycourse/', getUserForCourse)

/**
 * @swagger
 *  /api/user/bycourse/:
 *  get:
 *      summary: Muestra toda las personas
 *      tags: [User]
 *      responses:
 *          200:
 *              description: Muestra todo los usarios
 */
router.get('/', getAllUsers);

/**
 * @swagger
 *  /api/user:
 *  post:
 *      summary: Crea un usuario
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          first_name:
 *                              type: string
 *                          last_name:
 *                              type: string
 *                          dni:
 *                              type: number
 *                          age:
 *                              type: number
 *                          gender:
 *                              type: string    
 *                      example:
 *                          first_name: "Gustavo"
 *                          last_name: Londres
 *                          dni: 40879456
 *                          age: 24
 *                          gender: hombre
 *      responses:
 *          200:
 *              description: Nuevo usuario creado
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
 *                                      first_name:
 *                                          type: string
 *                                      last_name:
 *                                          type: string
 *                                      dni:
 *                                          type: number
 *                                      age:
 *                                          type: number
 *                                      gender:
 *                                          type: string
 *                                      courses:
 *                                          type: object
 *                                      _id:
 *                                          type: string
 *                                      createdAt:
 *                                          type: string
 *                                      updatedAt:
 *                                          type: string
 *                                      __v:
 *                                          type: number
 *                          example:
 *                              message: Nuevo usuario creado
 *                              data:
 *                                  first_name: "Gustavo"
 *                                  last_name: Londres
 *                                  dni: 40879456
 *                                  gender: hombre
 *                                  age: 24
 *                                  courses: []
 *                                  _id: 64e5fc55c518887c489c6665
 *                                  createdAt: 2023-08-23T12:32:21.176Z
 *                                  updatedAt: 2023-08-23T12:32:21.176Z
 *                                  __v: 0
 *                              
 */
router.post('/', postUser);

/**
 * @swagger
 *  /api/user/{id}:
 *  get:
 *      summary: Busca usuario por id
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: ID del usuario a actualizar
 *      responses:
 *          200:
 *              description: Usuario encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              first_name:
 *                                  type: string
 *                              last_name:
 *                                  type: string
 *                              dni:
 *                                  type: number
 *                              age:
 *                                  type: number
 *                              gender:
 *                                  type: string
 *                              courses:
 *                                  type: object
 *                              _id:
 *                                  type: string
 *                              createdAt:
 *                                  type: string
 *                              updatedAt:
 *                                  type: string
 *                              __v:
 *                                  type: number
 *                          example:
 *                              first_name: "Gustavo"
 *                              last_name: Londres
 *                              dni: 40879456
 *                              gender: hombre
 *                              age: 24
 *                              courses: []
 *                              _id: 64e5fc55c518887c489c6665
 *                              createdAt: 2023-08-23T12:32:21.176Z
 *                              updatedAt: 2023-08-23T12:32:21.176Z
 *                              __v: 0
 *      
 */
router.get('/:id', getUserById);

/**
 * @swagger
 *  /api/user/{id}:
 *  delete:
 *      summary: Elimina usuario por id
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: ID del usuario a eleminar
 *      responses:
 *          200:
 *              description: Usuario eliminado
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
 *                                      first_name:
 *                                          type: string
 *                                      last_name:
 *                                          type: string
 *                                      dni:
 *                                          type: number
 *                                      age:
 *                                          type: number
 *                                      gender:
 *                                          type: string
 *                                      courses:
 *                                          type: object
 *                                      _id:
 *                                          type: string
 *                                      createdAt:
 *                                          type: string
 *                                      updatedAt:
 *                                          type: string
 *                                      __v:
 *                                          type: number
 *                          example:
 *                              message: Usuario eliminado
 *                              data:
 *                                  first_name: "Gustavo"
 *                                  last_name: Londres
 *                                  dni: 40879456
 *                                  gender: hombre
 *                                  age: 24
 *                                  courses: []
 *                                  _id: 64e5fc55c518887c489c6665
 *                                  createdAt: 2023-08-23T12:32:21.176Z
 *                                  updatedAt: 2023-08-23T12:32:21.176Z
 *                                  __v: 0
 *   
 */
router.delete('/:id', deteleUser);

/**
 * @swagger
 *  /api/user/{id}:
 *  put:
 *      summary: Actualiza un usuario
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: ID del usuario a actualizar
 *      requestBody:
 *          required: 
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          first_name:
 *                              type: string
 *                          last_name:
 *                              type: string
 *                          dni:
 *                              type: number
 *                          age:
 *                              type: number
 *                          gender:
 *                              type: string    
 *                      example:
 *                          first_name: "Gustavo"
 *                          last_name: Londres
 *                          dni: ""
 *                          age: 24
 *                          gender: hombre
 *      responses:
 *          200:
 *              description: Usuario eliminado
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
 *                                      first_name:
 *                                          type: string
 *                                      last_name:
 *                                          type: string
 *                                      dni:
 *                                          type: number
 *                                      age:
 *                                          type: number
 *                                      gender:
 *                                          type: string
 *                                      courses:
 *                                          type: object
 *                                      _id:
 *                                          type: string
 *                                      createdAt:
 *                                          type: string
 *                                      updatedAt:
 *                                          type: string
 *                                      __v:
 *                                          type: number
 *                          example:
 *                              message: Se actualizaron los datos
 *                              data:
 *                                  first_name: "Gustavo"
 *                                  last_name: Londres
 *                                  dni: 40879456
 *                                  gender: hombre
 *                                  age: 24
 *                                  courses: []
 *                                  _id: 64e5fc55c518887c489c6665
 *                                  createdAt: 2023-08-23T12:32:21.176Z
 *                                  updatedAt: 2023-08-23T12:32:21.176Z
 *                                  __v: 0
 */
router.put('/:id', putUser);

export default router;