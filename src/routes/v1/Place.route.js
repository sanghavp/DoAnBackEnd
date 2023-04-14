const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const placeValidation = require('../../validations/place.validation');
const placeController = require('../../controllers/place.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('managePlaces'), validate(placeValidation.createPlace), placeController.createPlace)
  .get(auth('getPlaces'), validate(placeValidation.getPlaces), placeController.getPlaces);

router
  .route('/:placeId')
  .get(auth('getPlaces'), validate(placeValidation.getPlace), placeController.getPlace)
  .patch(auth('managePlaces'), validate(placeValidation.updatePlace), placeController.updatePlace)
  .delete(auth('managePlaces'), validate(placeValidation.deletePlace), placeController.deletePlace);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Places
 *   description: Place management and retrieval
 */

/**
 * @swagger
 * /places:
 *   post:
 *     summary: Create a place
 *     description: Can create places.
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - type
 *               - manufacturer
 *               - model
 *             properties:
 *               user:
 *                 type: string
 *               type:
 *                 type: string
 *                 description: place type (car, var, bike, etc...)
 *               manufacturer:
 *                 type: string
 *               model:
 *                 type: string
 *                 description: place model (308, Demio, Aqua, etc...)
 *               numberplate:
 *                  type: string
 *               makeyear:
 *                  type: string
 *               registeryear:
 *                  type: string
 *               capacity:
 *                  type: string
 *               fuel:
 *                  type: string
 *               color:
 *                  type: string
 *             example:
 *               user: (User ID)
 *               type: car
 *               manufacturer: Mazda
 *               model: Demio
 *               numberplate: KM-1898
 *               makeyear: 2007
 *               registeryear: 2011
 *               capacity: 5
 *               fuel: Petrol
 *               color: Red
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Place'
 *       "400":
 *         $ref: '#/components/responses/Duplicate'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all places
 *     description: Retrieve all places.
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: User id
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of places
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Place'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /places/{id}:
 *   get:
 *     summary: Get a place
 *     description: fetch Places by id
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Place id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Place'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a place
 *     description: Update places.
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Place id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               type:
 *                 type: string
 *                 description: place type (car, var, bike, etc...)
 *               manufacturer:
 *                 type: string
 *               model:
 *                 type: string
 *                 description: place model (308, Demio, Aqua, etc...)
 *               numberplate:
 *                  type: string
 *               makeyear:
 *                  type: string
 *               registeryear:
 *                  type: string
 *               capacity:
 *                  type: string
 *               fuel:
 *                  type: string
 *               color:
 *                  type: string
 *             example:
 *               user: (User ID)
 *               type: car
 *               manufacturer: Mazda
 *               model: Demio
 *               numberplate: KM-1898
 *               makeyear: 2007
 *               registeryear: 2011
 *               capacity: 5
 *               fuel: Petrol
 *               color: Red
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Place'
 *       "400":
 *         $ref: '#/components/responses/Duplicate'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a place
 *     description: Delete places.
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Place id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
