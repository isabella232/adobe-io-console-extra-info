window.AdobeIoConsoleExtraInfo = {};
AdobeIoConsoleExtraInfo.orgsList = [];

(function () {
    // Intercept all fetch calls
    const {fetch: origFetch} = window;
    window.fetch = async (...args) => {
        const response = await origFetch(...args);

        // Create a clone of the response promise to return for default functionality on the page.
        const responseClone = response.clone();

        // Process response promise
        response.json().then(json => {
            if (json && json.data) {
                if (json.data.getOrgProjects) {
                    // Process Adobe IO Projects
                    const orgProjects = json.data.getOrgProjects;

                    if (args.length > 1 && args[1].body) {
                        // Get and unescape the body of the getOrgProjects response
                        const body = JSON.parse(args[1].body.replace(/\\n/g, '').replace(/"/g, '"'));
                        if (body && body.variables) {
                            const orgId = body.variables.orgId;

                            // Need to find org for this project in the global list of orgs pulled from the other
                            // request so that we can get the org code.  For example:
                            // orgId == 1234 but we need to match that to code abcd@AdobeID
                            const projectOrg = AdobeIoConsoleExtraInfo.orgsList.find(org => org.id === orgId);
                            renderCreatorLinksOnProjects(projectOrg.code, orgProjects);
                        }
                    }
                } else if (json.data.getOrganizations) {
                    // Save all organizations for current user to pull org code from later
                    AdobeIoConsoleExtraInfo.orgsList = json.data.getOrganizations;
                }
            }
        })

        return responseClone;
    }
})();

function renderCreatorLinksOnProjects(projectOrgCode, allOrgProjects) {
    const parentDiv = document.querySelector('.projects-list').lastChild;
    const childNodes = parentDiv.childNodes;

    const observer = new MutationObserver(() => {
        if (parentDiv.childElementCount >= allOrgProjects.length) {
            observer.disconnect();

            for (let i = 0; i < childNodes.length; i++) {
                const createdByAdobeCode = allOrgProjects[i].who_created;
                let anchorElementHtml = `<a href="https://adminconsole.adobe.com/${projectOrgCode}/users/${createdByAdobeCode}" target="_blank" onclick="(arguments[0] || window.event).stopPropagation();">${createdByAdobeCode}</a>`;
                if (createdByAdobeCode === 'System') {
                    anchorElementHtml = "System";
                }
                const createdByDivElementHtml = `<div>Created By: ${anchorElementHtml}</div>`;

                childNodes[i].firstChild.insertAdjacentHTML('beforeend', createdByDivElementHtml);
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

