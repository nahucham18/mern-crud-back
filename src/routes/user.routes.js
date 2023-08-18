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
 *                              $ref: '#/components/schemas//User'
 */

router.get('/', getAllUsers);

/**
 * @swagger
 *  /api/user:
 *  post:
 *      summary: Crea un usuario
 *      tags: [User]
 *      responses:
 *          200:
 *              description: Muestra todo los usarios
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas//User'
 */
router.post('/', postUser);
router.get('/:id', getUserById);
router.delete('/:id', deteleUser);
router.put('/:id', putUser);

export default router;