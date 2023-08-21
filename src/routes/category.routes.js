import { Router } from 'express';
import {getAllCategory, postCategory, getByIdCategory, deleteCategory} from '../controllers/category.controller.js';


const router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Category:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: Nombre de la categoria
 *              required:
 *                  - name
 *              example:
 *                  name: Frontend
 */

/**
 * @swagger
 * /api/category:
 *  get:
 *      summary: Muestra toda las categorias
 *      tags: [Category]
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Category'
 */
router.get('/', getAllCategory);

/**
 * @swagger
 * /api/category:
 *  post:
 *      summary: Crea una nueva categoria
 *      tags: [Category]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Category'          
 *      responses:
 *          200:
 *              description: Nueva categoria creada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: Nueva categoria creada
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      _id:
 *                                          type: tipo1
 *                                          description: Description 1
 *                                      name:
 *                                          type: tipo2
 *                                          description: Description2 2                          
 *                          example:
 *                              message: Nueva categoria creada
 *                              data:
 *                                  _id: 64dfd34f3e57293218f499b9
 *                                  name: backend
 */
router.post('/', postCategory);

/**
 * @swagger
 *  /api/category/{id}:
 *  get:
 *      summary: Busca categoria por ID
 *      tags: [Category]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: ID del usuario a buscar
 *      responses:
 *          200:
 *              description: Categoria encontrada
 */
router.get('/:id', getByIdCategory);

/**
 * @swagger
 *  /api/category/{id}:
 *  delete:
 *      summary: Eliminar categoria por ID
 *      tags: [Category]
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
 */
router.delete('/:id', deleteCategory);
// router.put('/:id', putCategory);

export default router;