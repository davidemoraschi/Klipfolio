<%@ WebHandler Language="C#" Class="StartDevServer" %>

using System;
using System.Web;
using System.IO;
using System.Data;
using System.Configuration;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Diagnostics;
using Microsoft.Win32;
using System.Globalization;
using System.Collections;
using System.Threading;

public class StartDevServer : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        DirectoryInfo webFolder;
        try
        {

            webFolder = new DirectoryInfo(context.Request.PhysicalApplicationPath).Parent;
        }
        catch (Exception ex)
        {
            throw new Exception(string.Format("Exception while tracking 'Web' folder -{0}", ex.Message));
        }

        if (context.Request.QueryString["product"] == null && context.Request.QueryString["product"] == null)
            throw new Exception("Requirred Query string [product] to handle the request.");

        string path = string.Format("{0}\\{1}\\desktop", webFolder.FullName, context.Request.QueryString["product"]);
        string productname = context.Request.QueryString["product"].ToString().ToLower();
        if (!Directory.Exists(path))
        {
            context.Response.Write(string.Format("http://js.syncfusion.com/demos/", productname));
        }
        else
        {
            DirectoryInfo productFolder = new DirectoryInfo(path);

            string port = null;
            string physicalPath = string.Format("{0}", productFolder.FullName);
            string prefixURL = string.Empty;//.Format("mvcsamplebrowser/{0}", productFolder.Name);

            try
            {
                CassiniWebServer.StartVersionWebServer(physicalPath, prefixURL, out port);

                context.Response.Write(string.Format("http://localhost:{0}", port));
            }
            catch (Exception ex)
            {
                throw new Exception(string.Format("Error: Unable to start Webserver.web.exe, Message:{0}", ex.Message));
            }
        }
    }
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}
public class CassiniWebServer
{
    const string iisExpressExename = "iisexpress.exe";
    const string webServer40ExeName = "WebDev.WebServer40.EXE";
    const string webServerExeName = "WebDev.WebServer.EXE";
    const string Netfx20PathRegKeyName = "Software\\Microsoft\\.NETFramework";
    const string Netfx20PathRegValueName = "InstallRoot";
    const string SharedFolderPathRegKeyName = "Software\\Microsoft\\Shared Tools";
    const string SharedFolderPathRegValueName = "SharedFilesDir";

    #region Public Methods
    public static void StartVersionWebServer(string path, string vDirName, out string port)
    {
        string iisExpressPath = string.Format("{0}\\{1}", GetIISExpressPath(), iisExpressExename);
        if (File.Exists(iisExpressPath))
        {
            StartWebServer(iisExpressPath, path, vDirName, out port, true);
        }
        else
        {
            string WebserverPath = string.Format("{0}\\{1}", GetWebServerDir(), webServer40ExeName);
            if (File.Exists(WebserverPath))
            {
                StartWebServer(WebserverPath, path, vDirName, out port, false);
            }
            else
            {
                throw new NullReferenceException("Unable to locate WebDev.WebServer.EXE");
            }
        }
    }
    private static string GetIISExpressPath()
    {
        string programFilesFolder = Environment.GetEnvironmentVariable("PROGRAMFILES");
        return programFilesFolder + @"\IIS Express";
    }
    private static string GetWebServerDir()
    {
        string webServerDir = string.Empty;
        string programFiles = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles);
        webServerDir = programFiles + @"\Common Files\Microsoft Shared\DevServer\11.0";
        
        if (!Directory.Exists(webServerDir))
        {
            webServerDir = programFiles + @"\Microsoft Shared\DevServer\11.0";

            if (!Directory.Exists(webServerDir))
            {
                webServerDir = programFiles + @"\Common Files\Microsoft Shared\DevServer\10.0";

                if (!Directory.Exists(webServerDir))
                {
                    webServerDir = programFiles + @"\Microsoft Shared\DevServer\10.0";

                    if (!Directory.Exists(webServerDir)) webServerDir = string.Empty;
                }
            }
        }

        return webServerDir;
    }
    #endregion

    #region Private methods
    private static void StartWebServer(string WebserverPath, string samplepath, string vDirName, out string port, bool isIISExpress)
    {
        string commandArgs = string.Empty;

        Random r = new Random();
        port = r.Next(10000, 65534).ToString();

        //grab the original path 
        commandArgs += " /path:\"" + samplepath + "\"";
        commandArgs += " /port:";
        commandArgs += port;
        if (!isIISExpress) commandArgs += " /vpath:/" + vDirName;

        Process mDOSProcess = new Process();
        mDOSProcess.StartInfo.FileName = WebserverPath;
        mDOSProcess.StartInfo.Arguments = commandArgs;

        //if you dont want to see the dos black screen
        mDOSProcess.StartInfo.CreateNoWindow = true;
        mDOSProcess.StartInfo.UseShellExecute = false;

        //now start the process
        mDOSProcess.Start();
    }
    #endregion
}