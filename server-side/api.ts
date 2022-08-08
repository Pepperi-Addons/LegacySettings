import MyService from './my.service'
import { Client, Request } from '@pepperi-addons/debug-server'




export async function additional_bank_fields(client:Client, request: Request): Promise<any> {    
    const service = new MyService(client); 
    let fields;
    try {              
        
        if (request.method === 'GET') {            
            const result = await service.getSlugsRelation(request.query);
            result.forEach(element => {
                 fields =  service.getSlugs(element, request.query);
            });            
            return fields.length !== 0 ? fields : [];
        } else {
            throw new Error(`Method ${request.method} is not supported.`);
        }        
    } catch(e) {
        return {success: false, errorMessage: e.message}    
    }

}


