## Adobe I/O Extra Info Extension
Out of the box, the Adobe I/O Developer Console does not show the creator of each Project.  This Chrome extension updates each Project card and adds this information with a link to the creator's profile information.
### Installation
* Clone this project somewhere on your machine.
* Open a Chrome browser window.
* Navigate to Window -> Extensions or type `chrome:extensions` in the URL field.
* Make sure `Developer mode` is switched On in the upper right.
* Click `Load unpacked` in the top left.
* Browse to and select the `adobe-io-console-extra-info` folder where you cloned this project.
* Navigate in Chrome to `https://developer.adobe.com/console/projects`.  (you might need to log in)
* Make sure you are on the desired Org in the top right dropdown.
* You should see the Project cards rendered as usual but each now has a "Created By:" label with a link to an Adobe ID.
* Click on the link to get more information about the creator.
### Notes
This feature does not work for Projects that were crated via API or third party tools.  They will show `Created By: System`.  It also will not be able to pull information for Adobe accounts that have been removed from the organization.
