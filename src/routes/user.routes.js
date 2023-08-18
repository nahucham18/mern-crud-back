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
 *          required:
 *              - first_name
 *              - last_name
 *              - dni
 *              - age
 *              - gender
 *          example:
 *              first_name: Nahuel
 *              last_name: Chamorro
 *              dni: 39288730
 *              age: 27
 *              gender: hombre
 */
router.get('/bycourse/', getUserForCourse)

/**
 * @swagger
 *  /api/user:
 *  get:
 *      summary: Muestra toda las personas
 *      tags: [User]
 *      responses:
 *          200:
 *              description: Muestra todo los usarios
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/User'
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
 *              applicacion/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Nuevo usuario creado
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
 *              description: usuario encontrado
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
 *              description: Usuario borrado
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
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                              description: id del usuario
 *      responses:
 *          200:
 *              description: El usuario fue actualizado
 *          302: 
 *              description: No fue actualizado
 */
router.put('/:id', putUser);

export default router;