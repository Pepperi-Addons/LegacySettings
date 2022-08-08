
export interface Relation {
    RelationName: string;
    AddonUUID: string;
    Name: string;
    Description: string;
    Type: "AddonAPI" | "NgComponent" | "Navigate";
    [key:string]:string | boolean | number;
}


export function tabsData(tabsKeys: string[]):Relation[] {
    const tabs: Relation[] = tabsKeys.map((key, index) =>{
        return  {
            Name: key,
            AddonUUID: "354c5123-a7d0-4f52-8fce-3cf1ebc95314",
            RelationName: "",
            Type: "NgComponent",
            Description: key,
            SubType: "NG11",
            AddonRelativeURL: 'settings_iframe',
            ComponentName: 'SettingsIframeComponent',
            ModuleName: 'SettingsIframeModule'
        }});
    return tabs;
}


export const typeListTabsRelationNames = [
    "TransactionTypeListTabs",
    "ActivityTypeListTabs",
    "AccountTypeListTabs"
];

