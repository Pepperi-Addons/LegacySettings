# Legacy Settings

The addon was written to allow Legacy pages from the old backoffice system to work under the settings menu in the webapp.

## High Level
- When the addon is installed to the client, some menu entries are added to the setting menu. 
- The addon append an iframe on the page and displays the page content from our Wsim (Backoffice old site) inside it.
- The addon add the query pharam "webAppIframe=true" to the url, the old backoffice know to read this query and to show only the relevant parts of the page (for example: without the page menu)
- The addon also add the query "lang=${this.browserLang}" to the url, and the Activities dashboard will be display on the same languge as the webapp. 
---

## Releases
| Version | Description | Migration |
|-------- |------------ |---------- |
| 9.5.343  | Display Legacy pages from the Wsim backoffice in iframe|  |

---

## Deployment
After a Pull Request is merged into a release branch, avilable version will be published.

---

## Debugging
#### Client side: 
To debug your addon with developer toolbar (chrome or any other browser dev tool).
- Open terminal --> change to client-side --> Start your addon with npm start.
- Go to Settings --> Company Profile --> Company Profile (or any other legacy page entry ).
- You can also open your browser at: https://app.pepperi.com/settings_block/354c5123-a7d0-4f52-8fce-3cf1ebc95314/company_profile?view=company_profile&uri=distributordetails.

- Open the browser inspector to make sure that the editor file is served locally

- If you want to debug the page content , you can look for the js files in your developer tool and add break point in it. 

#### Server side: 
There is no Server side (the page comes from the old backoffice).

#### CPI side:
There is no CPI side.

---

## Testing

This addon does not require any tests (so far).

---

## Dependencies

| Addon | Usage |
|-------- |------------ |
| [webapp](https://bitbucket.org/pepperiatlasian/webapp/src/master/) | need the webapp to run the settings |
---

## APIs
    there is no APIs. 

    for more data read [Architecture](./architecture.md)

---

## Limitations
There is no limits.

---

## Architecture
see: [Architecture](./architecture.md)

---

## Known issues

- [provide any information regarding known issues (bugs, qwerks etc.) in the addon] 

---

## Future Ideas & Plans

- [provide any knowledge regarding meaningful future plans for the addons (features, refactors etc.)]

## Usage
- Install the addon & all his dependencies.
- Navigate to Settings --> Desired pages


## UI
- This addon is only an Iframe who get URL. 
- The Iframe displayed a page from the old Wsim backoffice system. the UI and the beavior taken from the page. 
