// Use NLS or other internal DNS resolution to determine network location
// Place outside of main function to reduce unnecessary DNS resolutions
var hostIP = dnsResolve("nls.contoso.com");

function FindProxyForURL(url, host) {
    // Define proxy setting variables
    var proxy_yes = "PROXY proxy.contoso.com:8080";
    var proxy_no = "DIRECT";

    // Normalise URLs for pattern matching as JavaScript is case sensitive
    url = url.toLowerCase();
    host = host.toLowerCase();

    // URLs that should be explicitly proxied but would be trapped by subsequent bypass functions
    // Useful when accessing webapps via a VPN but on a name or IP address space you don't manage
    if (shExpMatch(host, "*.internalwebapp.com") ||
        shExpMatch(host, "somehostedapp.co.uk")) { 
        return proxy_yes;
    }

    // IP addresses and subnets that should bypass the proxy, including localhost and legacy shortnames
    // Put your internal IP subnets here
    if (isInNet(host, "10.0.0.0", "255.0.0.0") ||
        isInNet(host, "172.16.0.0", "255.240.0.0") ||
        isInNet(host, "192.168.0.0", "255.255.0.0") ||
        isInNet(host, "127.0.0.1", "255.255.255.255") ||
        isPlainHostName(host)) {
        return proxy_no;
    }

    // Standard internal namespaces that you are authoritative for
    if (shExpMatch(host, "*.contoso.com") ||
        shExpMatch(host, "*.contoso.local")) {
        return proxy_no;
    }

    // Partner namespaces. Organisations you might have private connectivity or AD trusts with
    if (shExpMatch(host, "*.fabrikam.com") ||
        shExpMatch(host, "*.fabrikam.local") ||
        shExpMatch(host, "*.tailspintoys.com") ||
        shExpMatch(host, "*.tailspintoys.local")) {
        return proxy_no;
    }

    // Business applications that use a wildcard proxy bypass
    // 8x8 softphone in this example, but also useful if you have split-brain DNS
    if (shExpMatch(host, "*.8x8.com") ||
        shExpMatch(host, "*.jitsi.net") ||
        shExpMatch(host, "*.packet8.net") ||
        shExpMatch(host, "*.p8t.us") ||
        shExpMatch(host, "*.cloud8.net") ||
        shExpMatch(host, "*.dxi.eu") ||
        shExpMatch(host, "*.easycallnow.net") ||
        shExpMatch(host, "*.easycontactnow.com")) {
        return proxy_no;
    }

    // Business applications that use a host-based proxy bypass
    // Again useful for split-brain DNS
    if (dnsDomainIs(host, "crl.usertrust.com") ||
        dnsDomainIs(host, "o2.dongle")) {
        return proxy_no;
    }

    // Business applications that use an IP-based proxy bypass when on-premise
    // Dell Online First Article in this example
    if ((isInNet(myIpAddress(), "172.31.0.0", "255.255.255.0") ||
        isInNet(myIpAddress(), "172.32.32.0", "255.255.255.0"))
        && (isInNet(host, "163.244.62.74", "255.255.255.255"))) {
        return proxy_no;
    }

    // M365 URLs. DO NOT manually edit below this comment!
    // URL lists should be updated periodically using Get-PacFile.

    if (shExpMatch(host, "quicktips.skypeforbusiness.com") ||
        shExpMatch(host, "statics.teams.microsoft.com")) {
        return proxy_yes
    }

    if (shExpMatch(host, "*.broadcast.skype.com") ||
        shExpMatch(host, "*.lync.com") ||
        shExpMatch(host, "*.mail.protection.outlook.com") ||
        shExpMatch(host, "*.manage.office.com") ||
        shExpMatch(host, "*.msappproxy.net") ||
        shExpMatch(host, "*.msftidentity.com") ||
        shExpMatch(host, "*.msidentity.com") ||
        shExpMatch(host, "*.online.office.com") ||
        shExpMatch(host, "*.outlook.office.com") ||
        shExpMatch(host, "*.portal.cloudappsecurity.com") ||
        shExpMatch(host, "*.protection.office.com") ||
        shExpMatch(host, "*.protection.outlook.com") ||
        shExpMatch(host, "*.skypeforbusiness.com") ||
        shExpMatch(host, "*.teams.microsoft.com") ||
        shExpMatch(host, "*broadcast.officeapps.live.com") ||
        shExpMatch(host, "*excel.officeapps.live.com") ||
        shExpMatch(host, "*onenote.officeapps.live.com") ||
        shExpMatch(host, "*powerpoint.officeapps.live.com") ||
        shExpMatch(host, "*rtc.officeapps.live.com") ||
        shExpMatch(host, "*shared.officeapps.live.com") ||
        shExpMatch(host, "*view.officeapps.live.com") ||
        shExpMatch(host, "*visio.officeapps.live.com") ||
        shExpMatch(host, "*word-edit.officeapps.live.com") ||
        shExpMatch(host, "*word-view.officeapps.live.com") ||
        shExpMatch(host, "account.activedirectory.windowsazure.com") ||
        shExpMatch(host, "account.office.net") ||
        shExpMatch(host, "accounts.accesscontrol.windows.net") ||
        shExpMatch(host, "admin.microsoft.com") ||
        shExpMatch(host, "adminwebservice.microsoftonline.com") ||
        shExpMatch(host, "api.passwordreset.microsoftonline.com") ||
        shExpMatch(host, "autologon.microsoftazuread-sso.com") ||
        shExpMatch(host, "becws.microsoftonline.com") ||
        shExpMatch(host, "broadcast.skype.com") ||
        shExpMatch(host, "clientconfig.microsoftonline-p.net") ||
        shExpMatch(host, "companymanager.microsoftonline.com") ||
        shExpMatch(host, "device.login.microsoftonline.com") ||
        shExpMatch(host, "graph.microsoft.com") ||
        shExpMatch(host, "graph.windows.net") ||
        shExpMatch(host, "home.office.com") ||
        shExpMatch(host, "login.microsoft.com") ||
        shExpMatch(host, "login.microsoftonline.com") ||
        shExpMatch(host, "login.microsoftonline-p.com") ||
        shExpMatch(host, "login.windows.net") ||
        shExpMatch(host, "logincert.microsoftonline.com") ||
        shExpMatch(host, "loginex.microsoftonline.com") ||
        shExpMatch(host, "login-us.microsoftonline.com") ||
        shExpMatch(host, "manage.office.com") ||
        shExpMatch(host, "nexus.microsoftonline-p.com") ||
        shExpMatch(host, "nexus.officeapps.live.com") ||
        shExpMatch(host, "nexusrules.officeapps.live.com") ||
        shExpMatch(host, "office.live.com") ||
        shExpMatch(host, "outlook.office.com") ||
        shExpMatch(host, "outlook.office365.com") ||
        shExpMatch(host, "passwordreset.microsoftonline.com") ||
        shExpMatch(host, "portal.microsoftonline.com") ||
        shExpMatch(host, "portal.office.com") ||
        shExpMatch(host, "protection.office.com") ||
        shExpMatch(host, "provisioningapi.microsoftonline.com") ||
        shExpMatch(host, "smtp.office365.com") ||
        shExpMatch(host, "contoso.sharepoint.com") ||
        shExpMatch(host, "contoso-my.sharepoint.com") ||
        shExpMatch(host, "teams.microsoft.com") ||
        shExpMatch(host, "www.office.com")) {
        return proxy_no
    } else {
        return proxy_yes
    }
}