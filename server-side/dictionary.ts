// export const iframeSchema: object = {
// 	"Name": "backoffice_views",
//     "Type": "data",
//     "Fields": {"IframeKey": {"Type": "String"},  "Value": {"Type": "String"}}
// }

export const iframeDictionary: object = {

'company_branding': 'Views/Agents/Branding.aspx', // Branding
'company_profile': 'app/default.aspx?uri=distributordetails', // Company Profile
'company_webapp_homepage': 'app/default.aspx?uri=uicontrols/single/company_profile/WebAppMainBar', // WebApp Main Bar
'company_sync': 'Views/Agents/ScheduledSync.aspx', // Sync Settings
'company_smtp': 'Views/Agents/SMTPSettings.aspx', // Email Settings
'company_tools': 'Views/Agents/Tools.aspx', // Tools
'company_securitygroups': 'app/default.aspx?uri=grid/securitygroups', // Security Groups
'company_passwordpolicy': 'Views/Agents/PasswordPolicy.aspx', // Password Policy
'company_webapp_homebuttons': 'Views/Agents/AppHomePage.aspx?pageID=1', // App Home Screen
'company_webapp_mainbutton': 'Views/Agents/AppHomePage.aspx?pageID=2', // Home Screen Shortcut

'catalogs_manage': 'Views/Agents/AddCatalog.aspx', // Manage Catalog
'catalogs_forms': 'Views/Agents/CatalogCustomization.aspx?pageID=1', // Edit Form
'catalogs_views': 'app/default.aspx?uri=uicontrols/single/catalog/CatalogSelectionCard', // Catalog Views
'catalogs_fields': 'app/default.aspx?uri=grid/fields/catalogs', // Fields
'catalog_details': 'Views/Agents/CatalogsDetails.aspx', // catalog details

'items_views_thumbnail': 'app/default.aspx?uri=uicontrols/single/item/OrderCenterItemThumbnailView', // Order Center Thumbnail Views
'items_views_grid': 'Views/Agents/ItemCustomization.aspx?pageID=3', // Order Center Grid View
'items_views_matrix': 'Views/Agents/ItemCustomization.aspx?pageID=7', // Order Center Matix View
'items_views_flatmatrix': 'Views/Agents/ItemCustomization.aspx?pageID=6', // Order Center Flat Matix View
'items_views_itemdetails': 'Views/Agents/ItemCustomization.aspx?pageID=4',  // Order Center Item Details View
'items_views_catalog': 'Views/Agents/ItemCustomization.aspx?pageID=5',  // Catalog Item View
'items_smartsearch': 'Views/Agents/SmartSearchCustomization.aspx?type=3', // Smart Search
'items_filters': 'Views/Agents/ItemsFilters.aspx', // Filters
'items_imageuploadersetup': 'Views/Agents/ImageUploaderSetup.aspx', // Automated Image Uploader
'items_variantdimensions': 'app/default.aspx?uri=grid/dimensions/colors', // Variant Dimensions
'items_genericlist': 'app/default.aspx?uri=genericlist/item', // Item Lists
'items_fields': 'Views/Agents/ItemCustomization.aspx?pageID=2', // Fields
'items_manage': 'Views/Agents/FilterManager.aspx?fromItems=1', // manage items
'items_share_email': 'Views/Agents/ItemCustomization.aspx?pageID=8', // share email

'contacts_genericlist': 'app/default.aspx?uri=genericlist/contact_person?tab=lists', // Contacts List
'contacts_types': 'app/default.aspx?uri=TypesSettings/contact_person', // Contact Type
'contacts_forms': 'app/default.aspx?uri=uicontrols/single/contact_person/ContactPersonForm', // Contact Form
'contacts_fields': 'app/default.aspx?uri=grid/fields/contacts', // Fields
'accounts_forms': 'Views/Agents/AccountTypes.aspx', // Views and Forms
'accounts_lists': 'Views/Agents/AccountsList.aspx', // Account Lists
'accounts_genericlist': 'app/default.aspx?uri=genericlist/account', // Accounts Generic List
'accounts_views_map': 'Views/Agents/PropPinsColors.aspx',  // Map View
'accounts_card': 'app/default.aspx?uri=uicontrols/single/account/AccountCard', // Card Layout
'accounts_dashboardlayout': 'app/default.aspx?uri=uicontrols/list/account/AccountDashboardLayout', // Account Dashboard Layout
'accounts_search': 'Views/Agents/SmartSearchCustomization.aspx?type=20', // Search
'accounts_smartsearch': 'Views/Agents/SmartSearchCustomization.aspx?type=4', // Smart Search
'accounts_fields': 'app/default.aspx?uri=grid/fields/accounts', // Fields
//'accounts_display': 'Views/Agents/ActivityPlanning.aspx?pageID=1 ', // Accounts
'accounts_display': 'Views/Agents/ActivityPlanning.aspx?pageID=1&a_=aWRvMUBpZG8uY29t&b_=MTIzNDU2',
'pricing_policy': 'Views/Agents/PricingPolicy.aspx?pageID=1', // Pricing Policy
'pricing_pricelevel': 'app/default.aspx?uri=grid/pricelevels/pricelists', // Price Level
'pricing_maincatdiscount': 'Views/Agents/PricingPolicy.aspx?pageID=3', // Main Category Discount
'pricing_campaigns': 'app/default.aspx?uri=campaign', // Campaigns

'users_manage': 'Views/Agents/Users.aspx', // Manage Users
'users_roles': 'Views/Agents/RoleHierarchy.aspx', // Role Hierarchy
'users_profiles': 'Views/Agents/UserProfile.aspx', // Profiles
'users_genericlist': 'app/default.aspx?uri=genericlist/user', // User Lists
'users_managetargets': 'Views/Agents/RepsTargets.aspx?pageID=2',  // Manage Targets
'users_repdashboard': 'Views/Agents/SupeRepAgentDashboardMenu.aspx', // Rep Dashboard Add-ons
'sa_transactiontypes': 'Views/Agents/OrdersTypes.aspx', // Transaction Types
'sa_activitytypes': 'Views/Agents/ActivityTypes.aspx', // Activity Types
'sa_genericlist_activities': 'app/default.aspx?uri=genericlist/activity', // Activity Lists(New)
'sa_genericlist_transaction_line': 'app/default.aspx?uri=genericlist/transaction_line', // Transaction Lines Lists (New)
'sa_activitiesmenu': 'Views/Agents/SupeRepActivityMenuTemplate.aspx', // Activities and Menu Setup
'sa_salesdashboard': 'Views/Dashboards/DashboardCustomization.aspx', // Sales Dashboard Settings
'activities_dashboard': 'Views/Dashboards/Activities.aspx', // Sales Dashboard Settings
'activity_planning_main': 'Views/Agents/ActivityPlanning.aspx', // Activity Planning
'activity_planning_display': 'Views/Agents/PlanningActivitiesCustomization.aspx?pageID=2', // Activity Planning Display Options
'erp_pluginsettings': 'Views/Agents/PluginSettings.aspx', // Plugin Settings
'erp_setup': 'app/default.aspx?uri=erpdetails', // Configuration
'erp_files': 'Views/Agents/ErpFilesDetails.aspx', // File Upload and Logs
'config_configurationfiles': 'app/default.aspx?uri=grid/configurationfiles', // Configuration Files
'config_statuses': 'Views/Agents/Statuses.aspx', // Statuses
'config_translationfiles': 'Views/Agents/TranslationFiles.aspx', // Translation Files
'config_onlineactions': 'Views/Agents/OnlineActions.aspx', // Online Add-ons
'config_mapdata': 'app/default.aspx?uri=grid/mapdatametadata' // User Defined Tables
};

export const viewFlagDictionary: object = {
    'accounts_genericlist':'EnableNewAccountList'
}