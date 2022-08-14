import { Relation } from "@pepperi-addons/papi-sdk";

export const bundleFileName = 'legacy_settings';
export function tabsData(tabsKeys: string[], addonUUID: string):Relation[] {
    const tabs: Relation[] = tabsKeys.map((key, index) =>{
        return  {
            Name: key,
            AddonUUID: addonUUID,
            RelationName: "",
            Type: "NgComponent",
            Description: key,
            SubType: "NG14",
            AddonRelativeURL: bundleFileName,
            ComponentName: 'SettingsIframeComponent',
            ModuleName: 'SettingsIframeModule',
            ElementsModule: 'WebComponents',
            ElementName: `settings-iframe-element-${addonUUID}`,
        }});
    return tabs;
}


export const typeListTabsRelationNames = [
    "TransactionTypeListTabs",
    "ActivityTypeListTabs",
    "AccountTypeListTabs"
];

