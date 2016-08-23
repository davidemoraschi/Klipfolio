$(function () {
    if (document.body.className == "darktheme") {
        $(".oimg1").addClass("odimg1").removeClass("oimg1");
        $(".oimg2").addClass("odimg2").removeClass("oimg2");
        $(".oimg3").addClass("odimg3").removeClass("oimg3");
        $(".oimg4").addClass("odimg4").removeClass("oimg4");
    }
    $(".imgstyle, .samplebutton").click(function (eve) {
        var sbURL = window.location.href.split("/");
        var sbTheme = sbURL[sbURL.length - 1];
        var host = window.location.hostname;
        var themes = ["azure", "azuredark", "gradientazure", "gradientazuredark", "lime", "limedark", "gradientlime", "gradientlimedark", "saffron", "saffrondark", "gradientsaffron", "gradientsaffrondark"];
        var className = eve.target.className || $($(eve.target.parentElement).parent().siblings()[0]).children()[0].className;
        if (jQuery.inArray(sbTheme, themes) != -1)
            window.location.href = buildUrl(sbTheme, host, className);
        else {
            if (document.body.className == "darktheme")
                window.location.href = buildUrl("azuredark", host, className);
            else
                window.location.href = buildUrl("azure", host, className);
        }
    });
});
$(window).on('hashchange', function (e) {
    if (document.body.className == "darktheme") {
        $(".oimg1").addClass("odimg1").removeClass("oimg1");
        $(".oimg2").addClass("odimg2").removeClass("oimg2");
        $(".oimg3").addClass("odimg3").removeClass("oimg3");
        $(".oimg4").addClass("odimg4").removeClass("oimg4");
    }
    else {
        $(".odimg1").addClass("oimg1").removeClass("odimg1");
        $(".odimg2").addClass("oimg2").removeClass("odimg2");
        $(".odimg3").addClass("oimg3").removeClass("odimg3");
        $(".odimg4").addClass("oimg4").removeClass("odimg4");
    }
});

function buildUrl(theme, host, control) {
    if (control.indexOf("oimg1") > -1 || control.indexOf("odimg1") > -1)
        control = "pivotgrid";
    else if (control.indexOf("oimg2") > -1 || control.indexOf("odimg2") > -1)
        control = "olapchart";
    else if (control.indexOf("oimg3") > -1 || control.indexOf("odimg3") > -1)
        control = "olapclient";
    else if (control.indexOf("oimg4") > -1 || control.indexOf("odimg4") > -1)
        control = "olapgauge";
    return "/default.htm#!/" + theme + "/" + control + "/" + "DefaultFunctionalities";
}