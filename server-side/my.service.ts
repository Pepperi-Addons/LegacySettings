import { PapiClient} from '@pepperi-addons/papi-sdk'
import { Client } from '@pepperi-addons/debug-server';
import fetch from 'node-fetch';
export const papi_fetch = typeof window !== 'undefined' ? window.fetch.bind(window) : fetch;
import { v4 as uuid_v4 } from 'uuid';


class MyService {

    papiClient: PapiClient

    constructor(private client: Client) {
        this.papiClient = new PapiClient({
            baseURL: client.BaseURL,
            token: client.OAuthAccessToken,
            addonUUID: client.AddonUUID,
            addonSecretKey: client.AddonSecretKey,
            actionUUID: client.ActionUUID
        });
    }

    addTableScheme(scheme ): Promise<any> {
        // var headers = {
        //     "X-Pepperi-ActionID": uuid_v4(),
        //     "X-Pepperi-OwnerID": this.client.AddonUUID.toLowerCase(),
        //     "X-Pepperi-SecretKey": this.client.AddonSecretKey
        // }
        console.log(scheme);
        return this.papiClient.addons.data.schemes.post(scheme);  
        // return this.papiClient.post('/addons/data/schemes',scheme, headers);  
    }

    addDataToTable(row, tableName, addonUUID, actionUUID ): Promise<any> {
        var headers = {
            "X-Pepperi-ActionID": actionUUID,
            "X-Pepperi-OwnerID": this.client.AddonUUID.toLowerCase(),
            "X-Pepperi-SecretKey": this.client.AddonSecretKey

        }
        console.log( "Nofar sequentially: X-Pepperi-ActionID:" + headers['X-Pepperi-ActionID'] + ' ' + JSON.stringify(row));
        return this.papiClient.post(`/addons/data/${addonUUID}/${tableName}`, row, headers);
        // return this.papiClient.addons.data.uuid(addonUUID).table(tableName).upsert(row);
    }

    purgeTable(tableName): Promise<any> {
        return this.papiClient.post(`addons/data/schemes/${tableName}/purge`);
    }

    getTable(tableName, addonUUID ): Promise<Array<any>> {
        return this.papiClient.addons.data.uuid(addonUUID).table(tableName).find();
    }

    getDistributorFlag(flagName: string): Promise<Array<any>> {
        return this.papiClient.metaData.flags.name(flagName).get();
    }

    updateDataView(dataView: any) {
        console.log(dataView);
        var headers = {
            "X-Pepperi-ActionID": uuid_v4(),
            "X-Pepperi-OwnerID": this.client.AddonUUID.toLowerCase(),
            "X-Pepperi-SecretKey": this.client.AddonSecretKey
        };
        console.log(headers);
        return this.papiClient.post(`/meta_data/data_views`, dataView, headers);

        // return this.papiClient.metaData.dataViews.upsert(dataView);
    }
    
    getDataView(dataViewName: string): Promise<any[]> {
        return this.papiClient.metaData.dataViews.find({ where: 'Context.Name='+dataViewName,});
    }

    installAddon(uuid: string, version: string | undefined = undefined): Promise<any> {
        return this.papiClient.addons.installedAddons.addonUUID(uuid).install(version);
    }

    getRelations(relationName: string): Promise<any> {
        return this.papiClient.get(`/addons/data/relations?where=RelationName=${relationName}`);
    }

    createRelation(relation): Promise<any> {
        return this.papiClient.post('/addons/data/relations', relation);
    }

    async deleteRelation(epayment:any) {
        let result = {  success:true, Message:''};

        try{
            let res = await this.papiClient.post('/addons/data/relations', epayment);
            if(res != ''){                
                result.success = false;
            }
            return result;
        }
        catch(e){
            return {success: false};
        }
    }

    async downgradeRelation(){


        

         //update legacy settings relation
         try{
            let condition = "RelationName='TransactionTypeListTabs' OR RelationName='ActivityTypeListTabs' OR RelationName='AccountTypeListTabs'"            
            let customerRelations = await  this.papiClient.get(`/addons/data/relations?where=${condition}`);
            
            //?where=AddonRelativeURL=legacy_settings
           
            customerRelations.forEach(async relation => {                
                if(relation?.ModuleName === 'SettingsIframeModule' || relation?.componentName === "SettingsIframeComponent") {
                    relation.AddonRelativeURL = 'settings_iframe';
                    await this.papiClient.post('/addons/data/relations', relation);
                }                                 
                
            });                                                            
            
        }
        catch(e){
            console.log(e);
        }
    }

    async getSlugsRelation(queryParams) : Promise<any>{                

        let relObj = await this.papiClient.get(`/addons/data/relations?where=RelationName=UIFieldBank`)

        return relObj;
        
    }

    async getSlugs(relationArr, queryParams){
        let bankFields : Array<any> = [], slugFields: Array<any> = [];         
            if(relationArr.AddtionalDataTableName.toLowerCase() === queryParams.AddtionalDataTableName.toLowerCase()){
                //make a reuest to slugs api function to get the slugs fields
                //unified all the bank fields and return to the caller
                //make a request to element.AddonRelativeURL
                switch(queryParams.AddtionalDataTableName.toLowerCase())
                {
                    //call to slug api
                    case "slug" :                        
                        slugFields = await this.papiClient.addons.api.uuid("4ba5d6f9-6642-4817-af67-c79b68c96977").file("api").func("slugs").get();                        
                        slugFields.forEach(element => {
                            bankFields.push({Name: element.Name, FieldID:"SLUG_" + element.Slug});  
                        });                                                                    
                        break;
                    default: 
                        break;
                    
                }
            }        

        return  bankFields;
    }

    async getAddonVersion(addonUUID: string): Promise<any> {
        return (await this.papiClient.addons.installedAddons.addonUUID(addonUUID).get()).Version;
    }


}

export default MyService;
