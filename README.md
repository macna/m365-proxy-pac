# Introduction
This repo contains an example proxy auto-configuration (PAC) file that can be used to optimise traffic to Microsoft 365 when an explicit proxy server is being used. A PAC file is a JavaScript function that determines whether web browser requests (HTTP, HTTPS, and FTP) go directly to the destination or are forwarded to a proxy server. 

It also offers some examples of how you can bypass an explicit proxy for different namespaces depending on network conditions, such as when a person is on a managed network or remote using a split-tunnel VPN.

# Hosting PAC Files
Hosting PAC files is pretty easy and in my experience not very resource intensive. Perfect for containerisation and programmatic deployment.

Note the contents of the included web.config file. Depending on the webserver you are using, you may need to add a MIME type for proxy auto-configuration files. It's not always there by default. Also notice the caching response headers. Some clients will ignore this, but others need it (and set correctly) or they won't process the file correctly.

# References
The following references were used in compiling this example PAC file:

- Mozilla's very useful docs that have a lot of PAC examples and the functions that can be used to direct traffic: <https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling/Proxy_Auto-Configuration_PAC_file>

- How browsers running on Windows that use WinInet settings leverage PAC files, and how they behave when the file isn't available: <https://www.chromium.org/developers/design-documents/network-stack/proxy-settings-fallback>

- Microsoft's own guidance for optimising Microsoft 365 traffic: <https://docs.microsoft.com/en-gb/microsoft-365/enterprise/managing-office-365-endpoints>

- The Get-PacFile PowerShell commandlet for generating tenant-specific bypass URLs: <https://www.powershellgallery.com/packages/Get-PacFile>

# Other Advice and Guidance
- Try to keep your PAC files as simple, short and tidy as possible. The available functions are very flexible and can allow for some complex decision making when routing traffic, but ongoing maintenance and supportability should be considered. Poorly composed files can quickly become unwieldy to work with.

- Include decent comments in your files explaining what functions do any why they're there. You'll thank yourself later, or the next person that edits the file will.

- Version control your files so that it's easy to determine when and why changes have been made.