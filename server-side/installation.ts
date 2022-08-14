import { AdditionalAddons, MigrationObject  } from './migration-data';
import { Client, Request } from '@pepperi-addons/debug-server';
import MyService from './my.service';
import { bundleFileName, tabsData } from './metadata';
import jwt_decode from "jwt-decode";
import { Relation } from '@pepperi-addons/papi-sdk';

export async function install(client: Client, req: Request){
    const resObject = await initLegacySettings(client, req);
    await upsertSettingsRelation(client);
    return resObject;
}

export async function uninstall(client: Client, request: Request){
    return {success:true};
}

export async function upgrade(client: Client, req: Request){
    let resObject = {success: true};
    await upsertSettingsRelation(client);

    const service = new MyService(client);     
    // const addonsFields: Relation[] = await service.getRelations('TransactionTypeListTabs');

    // if(addonsFields == null ||  addonsFields.length == 0){
        resObject = await initLegacySettings(client, req);          
    // }

    if(resObject.success){               
        let epaymentObj = {Type: 'NgComponent', 
                            SubType:'NG11', 
                            ModuleName:'SettingsIframeModule',                            
                            AddonRelativeURL: bundleFileName,
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
        await addRelations(client, tabsData(transactionKeys, client.AddonUUID), "TransactionTypeListTabs");
        await addRelations(client, tabsData(activityKeys, client.AddonUUID), "ActivityTypeListTabs");
        await addRelations(client, tabsData(accountKeys, client.AddonUUID), "AccountTypeListTabs");
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

async function addRelations(client: Client, relations: Relation[], relationName = ''){
    const service = new MyService(client);
    const promises: Promise<any>[] = [];
    relations.forEach(relation => {
        if (relationName.length > 0) {
            relation.RelationName = relationName;
        }
        promises.push(service.createRelation(relation));
    });
    const result = await Promise.all(promises);
    return result;
}

function getSettingsRelation(client: Client, groupName: string, slugName: string, name: string, desc: string): Relation {
    return {
        RelationName: "SettingsBlock",
        GroupName: groupName,
        SlugName: slugName,
        Name: name,
        Description: desc,
        Type: "NgComponent",
        SubType: "NG14",
        AddonUUID: client.AddonUUID,
        AddonRelativeURL: bundleFileName,
        ComponentName: `AddonComponent`,
        ModuleName: `AddonModule`,
        ElementsModule: 'WebComponents',
        ElementName: `settings-element-${client.AddonUUID}`,
    }
}

async function upsertSettingsRelation(client: Client) {
    let settingsRelations: Relation[] = [];
    
    // Company Profile
    settingsRelations.push(getSettingsRelation(client, 'Company Profile', 'editor?view=company_profile&uri=distributordetails','CompanyProfile','Company Profile'));
    settingsRelations.push(getSettingsRelation(client, 'Company Profile', 'editor?view=company_sync', 'SyncSettings', 'Sync Settings')); 
    settingsRelations.push(getSettingsRelation(client, 'Company Profile', 'editor?view=company_smtp', 'EmailSettings', 'Email Settings')); 
    settingsRelations.push(getSettingsRelation(client, 'Company Profile', 'editor?view=company_securitygroups&uri=grid/securitygroups', 'SecurityGroups', 'Security Groups')); 
    settingsRelations.push(getSettingsRelation(client, 'Company Profile', 'editor?view=company_webapp_homebuttons', 'AppHomeScreen', 'App Home Screen')); 
    settingsRelations.push(getSettingsRelation(client, 'Company Profile', 'editor?view=company_webapp_mainbutton', 'HomeScreenShortcut', 'Home Screen Shortcut'));

    // Items
    settingsRelations.push(getSettingsRelation(client, 'Items', 'editor?view=items_filters', 'ItemsFilters', 'Filters')); 
    settingsRelations.push(getSettingsRelation(client, 'Items', 'editor?view=items_imageuploadersetup', 'AutomatedImageUploader', 'Automated Image Uploader')); 
    settingsRelations.push(getSettingsRelation(client, 'Items', 'editor?view=items_variantdimensions&uri=grid/dimensions/colors', 'VariantDimensions', 'Variant Dimensions')); 
    settingsRelations.push(getSettingsRelation(client, 'Items', 'editor?view=items_genericlist&uri=genericlist/item', 'ItemLists', 'Item Lists')); 
    settingsRelations.push(getSettingsRelation(client, 'Items', 'editor?view=items_fields', 'ItemsFields', 'Fields')); 
    settingsRelations.push(getSettingsRelation(client, 'Items', 'editor?view=items_share_email', 'ShareEmailInfo', 'Share Email Info')); 

    // Data
    settingsRelations.push(getSettingsRelation(client, 'Data', 'editor?view=items_manage', 'ManageItems', 'Manage Items')); 
    settingsRelations.push(getSettingsRelation(client, 'Data', 'editor?view=catalog_details', 'ManageCatalogs', 'Manage Catalogs')); 
    settingsRelations.push(getSettingsRelation(client, 'Data', 'editor?view=accounts_display', 'ManageAccounts', 'Manage Accounts')); 

    // Catalogs
    settingsRelations.push(getSettingsRelation(client, 'Catalogs', 'editor?view=catalogs_manage', 'ManageCatalog', 'Manage Catalog')); 
    settingsRelations.push(getSettingsRelation(client, 'Catalogs', 'editor?view=catalogs_forms', 'CatalogsEditForm', 'Edit Form')); 
    settingsRelations.push(getSettingsRelation(client, 'Catalogs', 'editor?view=catalogs_views&uri=uicontrols/single/catalog/CatalogSelectionCard', 'CatalogViews', 'Catalog Views')); 
    settingsRelations.push(getSettingsRelation(client, 'Catalogs', 'editor?view=catalogs_fields&uri=grid/fields/catalogs', 'CatalogsFields', 'Fields')); 

    // Accounts
    settingsRelations.push(getSettingsRelation(client, 'Accounts', 'editor?view=accounts_lists', 'AccountLists', 'Account Lists'));
    settingsRelations.push(getSettingsRelation(client, 'Accounts', 'editor?view=accounts_genericlist', 'AccountListsNew', 'Account Lists (new)'));
    settingsRelations.push(getSettingsRelation(client, 'Accounts', 'editor?view=accounts_views_map', 'AccountsMapView', 'Map View'));
    settingsRelations.push(getSettingsRelation(client, 'Accounts', 'editor?view=accounts_card&uri=uicontrols/single/account/AccountCard', 'AccountsCardLayout', 'Card Layout'));
    settingsRelations.push(getSettingsRelation(client, 'Accounts', 'editor?view=accounts_dashboardlayout&uri=uicontrols/list/account/AccountDashboardLayout', 'AccountDashboardLayout', 'Account Dashboard Layout'));
    settingsRelations.push(getSettingsRelation(client, 'Accounts', 'editor?view=accounts_search', 'AccountsSearch', 'Search'));
    settingsRelations.push(getSettingsRelation(client, 'Accounts', 'editor?view=accounts_smartsearch', 'AccountsSmartSearch', 'Smart Search'));
    settingsRelations.push(getSettingsRelation(client, 'Accounts', 'editor?view=accounts_fields&uri=grid/fields/accounts', 'AccountsFields', 'Fields'));
    
    // Branded App
    settingsRelations.push(getSettingsRelation(client, 'Branded App', 'editor?view=company_branding', 'Branding', 'Branding'));
    settingsRelations.push(getSettingsRelation(client, 'Branded App', 'editor?view=company_webapp_homepage&uri=uicontrols/single/company_profile/WebAppMainBar', 'WebAppMainBar', 'WebApp Main Bar'));

    // Contacts
    settingsRelations.push(getSettingsRelation(client, 'Contacts', 'editor?view=contacts_genericlist&uri=genericlist/contact_person', 'ContactLists', 'Contact Lists'));
    settingsRelations.push(getSettingsRelation(client, 'Contacts', 'editor?view=contacts_types&uri=TypesSettings/contact_person', 'ContactSettings', 'Contact Settings'));
    settingsRelations.push(getSettingsRelation(client, 'Contacts', 'editor?view=contacts_fields&uri=grid/fields/contacts', 'ContactsFields', 'Fields'));

    // Users
    settingsRelations.push(getSettingsRelation(client, 'Users', 'editor?view=users_manage', 'ManageUsers', 'Manage Users'));
    settingsRelations.push(getSettingsRelation(client, 'Users', 'editor?view=users_roles', 'UsersRoleHierarchy', 'Role Hierarchy'));
    settingsRelations.push(getSettingsRelation(client, 'Users', 'editor?view=users_profiles', 'UsersProfiles', 'Profiles'));
    settingsRelations.push(getSettingsRelation(client, 'Users', 'editor?view=users_genericlist&uri=genericlist/user', 'UserLists', 'User Lists'));

    // Sales Activities
    settingsRelations.push(getSettingsRelation(client, 'Sales Activities', 'editor?view=sa_genericlist_activities&uri=genericlist/activity', 'ActivityLists', 'Activity Lists'));
    settingsRelations.push(getSettingsRelation(client, 'Sales Activities', 'editor?view=sa_genericlist_transaction_line&uri=genericlist/transaction_line', 'TransactionLineReport', 'Transaction line report'));
    settingsRelations.push(getSettingsRelation(client, 'Sales Activities', 'editor?view=sa_salesdashboard', 'SalesDashboardSettings', 'Sales Dashboard Settings'));
    settingsRelations.push(getSettingsRelation(client, 'Sales Activities', 'editor?view=activity_planning_display', 'ActivityPlanningDisplayOptions', 'Activity Planning Display Options'));

    // Pricing Policy
    settingsRelations.push(getSettingsRelation(client, 'Pricing Policy', 'editor?view=pricing_policy', 'PricingPolicy', 'Pricing Policy'));
    settingsRelations.push(getSettingsRelation(client, 'Pricing Policy', 'editor?view=pricing_pricelevel&uri=grid/pricelevels/pricelists', 'PriceLevel', 'Price Level'));

    // ERP Integrarion
    settingsRelations.push(getSettingsRelation(client, 'ERP Integrarion', 'editor?view=erp_pluginsettings', 'PluginSettings', 'Plugin Settings'));
    settingsRelations.push(getSettingsRelation(client, 'ERP Integrarion', 'editor?view=erp_setup&uri=erpdetails', 'ERPConfiguration', 'Configuration'));
    settingsRelations.push(getSettingsRelation(client, 'ERP Integrarion', 'editor?view=erp_files', 'ERPFileLogs', 'File Upload and Logs'));

    // Configuration
    settingsRelations.push(getSettingsRelation(client, 'Configuration', 'editor?view=config_configurationfiles&uri=grid/configurationfiles', 'ConfigurationFiles', 'Configuration Files'));
    settingsRelations.push(getSettingsRelation(client, 'Configuration', 'editor?view=config_statuses', 'ConfigurationStatuses', 'Statuses'));
    settingsRelations.push(getSettingsRelation(client, 'Configuration', 'editor?view=config_translationfiles', 'ConfigurationTranslationFiles', 'TranslationFiles'));
    settingsRelations.push(getSettingsRelation(client, 'Configuration', 'editor?view=config_onlineactions', 'OnlineAddons', 'Online Add-ons'));
    settingsRelations.push(getSettingsRelation(client, 'Configuration', 'editor?view=config_mapdata&uri=grid/mapdatametadata', 'UserDefinedTables', 'User Defined Tables'));

    await addRelations(client, settingsRelations);
}



