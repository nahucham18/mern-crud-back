import { Router } from 'express';
import { getAllCategory, postCategory, getByIdCategory, deleteCategory, putCategory } from '../controllers/category.controller.js';


const router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Category:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: ID de la categoría
 *                  name:
 *                      type: string
 *                      description: Nombre de la categoría
 *                  __v:
 *                      type: integer
 *                      description: Versión del documento
 *              required:
 *                  - name
 *              example:
 *              -   _id: "64e1626f15d17fc0b4b39538"
 *                  name: "idioma"
 *                  __v: 0
 *              -   _id: "64e1626f15d17fc0b4b12345"
 *                  name: "backend"
 *                  __v: 0
 */

/**
/**
 * @swagger
 * /api/category:
 *  get:
 *      summary: Muestra todas las categorías
 *      tags: [Category]
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
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
 *                      properties:
 *                          name:
 *                              type: string    
 *                              description: "Nombre de la categoria"  
 *                      example:
 *                          name: Diseño    
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
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              _id: 
 *                                  type: string
 *                                  description: ID de la categoria
 *                              name:
 *                                  type: string
 *                                  description: Nombre de la categoria
 *                              __v:
 *                                  type: number
 *                                  description: Numero de version
 *                          example:
 *                              _id: 64dfd34f3e57293218f499b9
 *                              name: backend
 *                              __v: 0
 * 
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
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: Mensaje de respuesta
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      _id:
 *                                          type: string
 *                                          description: ID de categoria
 *                                      name:
 *                                          type: string
 *                                          description: Nombre de la categoria
 *                                      __v: 
 *                                          type: number
 *                                          description: Numero de la version
 *                          example:
 *                              message: La categoria fue eliminada
 *                              data:
 *                                  _id: 64dfd34f3e57293218f499b9
 *                                  name: backend
 *                                  __v: 0                 
 *                                              
 */
router.put('/delete/:id', deleteCategory);


/**
 * @swagger
 *  /api/category/{id}:
 *  put:
 *      summary: Actualiza una categoria
 *      tags: [Category]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: ID de la categoria a actualizar
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Nuevo nombre de la categoria
 *                      example:
 *                          name: Desarrollo
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
router.put('/:id', putCategory);

export default router;