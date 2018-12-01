/**
 * Pydio Cells Rest API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */


import ApiClient from '../ApiClient';
import RestProcess from './RestProcess';





/**
* The RestListProcessesResponse model module.
* @module model/RestListProcessesResponse
* @version 1.0
*/
export default class RestListProcessesResponse {
    /**
    * Constructs a new <code>RestListProcessesResponse</code>.
    * @alias module:model/RestListProcessesResponse
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>RestListProcessesResponse</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/RestListProcessesResponse} obj Optional instance to populate.
    * @return {module:model/RestListProcessesResponse} The populated <code>RestListProcessesResponse</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RestListProcessesResponse();

            
            
            

            if (data.hasOwnProperty('Processes')) {
                obj['Processes'] = ApiClient.convertToType(data['Processes'], [RestProcess]);
            }
        }
        return obj;
    }

    /**
    * @member {Array.<module:model/RestProcess>} Processes
    */
    Processes = undefined;








}

