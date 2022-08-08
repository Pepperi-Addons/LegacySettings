import { AdditionalAddons, MigrationObject  } from './migration-data';
import { Client, Request } from '@pepperi-addons/debug-server';
import MyService from './my.service';
import { Relation, tabsData, typeListTabsRelationNames } from './metadata';
import jwt_decode from "jwt-decode";

export async function install(client: Client, req: Request){
    const resObject = await initLegacySettings(client, req);
    return resObject;
}

export async function uninstall(client: Client, request: Request){
    return {success:true};
}

export async function upgrade(client: Client, req: Request){
    let resObject = {success: true};
    const service = new MyService(client);     
    const addonsFields: Relation[] = await service.getRelations('TransactionTypeListTabs');

    if(addonsFields == null ||  addonsFields.length == 0){
        resObject = await initLegacySettings(client, req);          
    }

    if(resObject.success){               
        let epaymentObj = {Type: 'NgComponent', 
                            SubType:'NG11', 
                            ModuleName:'SettingsIframeModule',                            
                            AddonRelativeURL:'settings_iframe',
                            ComponentName:'SettingsIframeComponent',Name:'epayment', RelationName:'TransactionTypeListTabs',
                            AddonUUID: client.AddonUUID ,Hidden: true};
        


        if(epaymentObj){                 
            const res =  await service.deleteRelation(epaymentObj);            
        }
    }   
    
    return resObject;
}

export async function downgrade(client: Client, request: Request){
    return {success:true}
}

export async function purge_table(client: Client, req: Request){
    const service = new MyService(client);
    const res = await service.purgeTable(req.body.TableName);
    return res;
}

async function initLegacySettings(client: Client, req: Request){

  
    // const filtered_entries = await filterEntriesByFlags(client, iframeDictionary)
    // const iframe_keys = await initIframeDictiontary(client, iframeDictionary  );
    //const transactionKeys = ['general', 'views', 'actions', 'workflows', 'programs', 'accounts','epayment', 'settings', 'fields'];
    const transactionKeys = ['general', 'views', 'actions', 'workflows', 'programs', 'accounts', 'settings', 'fields'];
    const activityKeys = ['general', 'forms', 'accounts', 'workflows', 'programs', 'fields'];
    const accountKeys = ['general', 'forms',  'workflows'];
    try {
        await installAdditionalAddons(client, AdditionalAddons);
        await addRelations(client, tabsData(transactionKeys), "TransactionTypeListTabs");
        await addRelations(client, tabsData(activityKeys), "ActivityTypeListTabs");
        await addRelations(client, tabsData(accountKeys), "AccountTypeListTabs");
        return { success: true };
    } catch(e){
        return { success: false };
    }
   
  
}

async function installAdditionalAddons(client: Client, additionalAddons: MigrationObject) {
    const jwt: any = jwt_decode(client.OAuthAccessToken);
    const distributorID = jwt['pepperi.distributorid'].toString();
    const service = new MyService(client);
    const keysToInstall = Object.keys(additionalAddons)
        .filter( key => additionalAddons[key].distributors.findIndex(distributor => distributor === distributorID) > -1);
    const installPromises:Promise<any>[] = [];
    keysToInstall.forEach(key => installPromises.push(service.installAddon(additionalAddons[key]?.uuid)));
    const AdditionalAddons = await Promise.all(installPromises);
    return AdditionalAddons;
}

async function addRelations(client: Client, relations: Relation[], relationName){
    const service = new MyService(client);
    // const existingRelations: Relation[] = await service.getRelations(relationName);
    const promises: Promise<any>[] = [];
    relations.forEach(relation =>{ 
        relation.RelationName = relationName;
       // const key = `${relation.Name}_${relation.AddonUUID}_${relation.RelationName}`;
       // relation.Key = key;
        promises.push(service.createRelation(relation));
    });
    const result = await Promise.all(promises);
    return result;
}




