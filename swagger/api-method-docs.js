/**
 * @swagger
 * tags:
 *   - name: Learnly Test API 
 *     description: Welcome to Learnly Pharmacy application!
 *   - name: Auth
 *     description: login and signup
 *   - name: Role
 *     description: Roles used in the system
 */
 
/**
 * @swagger
 * paths:
 *  /:
 *    get:
 *      summary: Get greeting message from Learnly pharmacy api
 *      responses:
 *        "200":
 *          description: GET reponse from API
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *  /api/auth/signup:
 *    post:
 *      summary: create a user
 *      parameters:
 *        - in: body
 *          name: body
 *          schema: 
 *            $ref: "#/definitions/CreateUser"
 *      responses:
 *        "200":
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "500":
 *          description: Failed to create user
 *  /api/auth/signin:
 *    post:
 *      summary: authenticate a user
 *      parameters:
 *        - in: body
 *          name: body
 *          schema: 
 *            $ref: "#/definitions/LoginUser"
 *      responses:
 *        "200":
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "500":
 *          description: Failed to verify user credentials
 *  /api/roles:
 *    get:
 *      summary: Get all roles
 *      responses:
 *        "200":
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *    post:
 *      summary: create a role
 *      parameters:
 *        - in: body
 *          name: body
 *          schema: 
 *            $ref: "#/definitions/CreateRole"
 *      responses:
 *        "200":
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "500":
 *          description: Failed to create role
 */

/**
 * @swagger
 * definitions:
 *   CreateUser:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       roles:
 *         type: array
 *     required:
 *       - email
 *       - password
 *       - roles
 *   LoginUser:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *     required:
 *       - username
 *       - password 
 *   CreateRole:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *     required:
 *       - name
 *       - description  
 */