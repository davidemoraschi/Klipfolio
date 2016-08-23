#region Copyright Syncfusion Inc. 2001-2015.
// Copyright Syncfusion Inc. 2001-2015. All rights reserved.
// Use of this code is subject to the terms of our license.
// A copy of the current license can be obtained at any time by e-mailing
// licensing@syncfusion.com. Any infringement will be prosecuted under
// applicable laws. 
#endregion
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.ServiceModel.Activation;
using Syncfusion.Olap.DataProvider;
using Syncfusion.Olap.Manager;
using Syncfusion.Olap.Common;
using Syncfusion.Olap.Reports;
using System.IO;
using System.Data.SqlServerCe;
using System.Xml.Serialization;
using System.Data;
using System.Web;
using OLAPUTILS = Syncfusion.JavaScript.Olap;
using System.Web.Script.Serialization;
using Syncfusion.JavaScript;
using Syncfusion.JavaScript.Olap;
using System.Configuration;

namespace sample
{
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class OlapClientService : IOlapClientService
    {
        OlapClient olapClientHelper = new OlapClient();
        OlapChart htmlHelper = new OlapChart();
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        static int cultureIDInfoval = 1033;
        static string connectionString = ConfigurationManager.ConnectionStrings["Adventure Works"].ConnectionString + "locale identifier=" + cultureIDInfoval + ";";
        string conStringforDB = "DataSource=" + HttpContext.Current.Server.MapPath(".").Split(new string[] { "\\wcf" }, StringSplitOptions.None)[0] + "\\database\\ReportsTable.sdf; Persist Security Info=False", reportTableName = "ReportsTable";       
        public Dictionary<string, object> InitializeClient(string action, string customObject, string clientParams)
        {
            OlapDataManager DataManager = null;
            dynamic customData = serializer.Deserialize<dynamic>(customObject.ToString());
            if (customData is Dictionary<string, object> && customData.ContainsKey("Language"))
            {
                var cultureIDInfo = new System.Globalization.CultureInfo((customData["Language"])).LCID;
                connectionString = connectionString.Replace("" + cultureIDInfoval + "", "" + cultureIDInfo + "");
                cultureIDInfoval = cultureIDInfo;
                DataManager = new OlapDataManager(connectionString);
                DataManager.Culture = new System.Globalization.CultureInfo((customData["Language"]));
            }
            else
                DataManager = new OlapDataManager(connectionString);
            DataManager.SetCurrentReport(CreateOlapReport());
            return olapClientHelper.GetJsonData(action, DataManager, clientParams);
        }

        public Dictionary<string, object> InitializeGrid(string action, string currentReport, string gridLayout, string customObject)
        {
            OlapDataManager DataManager = new OlapDataManager(connectionString);
            if (DataManager.ConnectionString.ToLower().Replace(" ", String.Empty).Split(';', '=').Contains("localeidentifier"))
            {
                DataManager.Culture = new System.Globalization.CultureInfo(cultureIDInfoval);
                DataManager.OverrideDefaultFormatStrings = true;
            }
            DataManager.SetCurrentReport(OLAPUTILS.Utils.DeserializeOlapReport(currentReport));
            return olapClientHelper.GetJsonData(action, DataManager, gridLayout);
        }
        public Dictionary<string, object> InitializeChart(string action, string currentReport, string customObject)
        {
            OlapDataManager DataManager = new OlapDataManager(connectionString);
            DataManager.SetCurrentReport(OLAPUTILS.Utils.DeserializeOlapReport(currentReport));
            return htmlHelper.GetJsonData(action, DataManager);
        }

        public Dictionary<string, object> DrillChart(string action, string drilledSeries, string olapReport, string clientReports)
        {
            OlapDataManager DataManager = new OlapDataManager(connectionString);
            DataManager.SetCurrentReport(OLAPUTILS.Utils.DeserializeOlapReport(olapReport));
            DataManager.Reports = olapClientHelper.DeserializedReports(clientReports);
            return htmlHelper.GetJsonData(action, DataManager, drilledSeries);
        }
        public Dictionary<string, object> FilterElement(string action, string clientParams, string olapReport, string clientReports)
        {
            OlapDataManager DataManager = new OlapDataManager(connectionString);
            DataManager.SetCurrentReport(OLAPUTILS.Utils.DeserializeOlapReport(olapReport));
            DataManager.Reports = olapClientHelper.DeserializedReports(clientReports);
            return olapClientHelper.GetJsonData(action, DataManager, clientParams);
        }

        public Dictionary<string, object> RemoveSplitButton(string action, string clientParams, string olapReport, string clientReports)
        {
            OlapDataManager DataManager = new OlapDataManager(connectionString);
            DataManager.SetCurrentReport(OLAPUTILS.Utils.DeserializeOlapReport(olapReport));
            DataManager.Reports = olapClientHelper.DeserializedReports(clientReports);
            return olapClientHelper.GetJsonData(action, DataManager, clientParams);
        }
        public Dictionary<string, object> FetchMemberTreeNodes(string action, string dimensionName, string olapReport)
        {
            OlapDataManager DataManager = new OlapDataManager(connectionString);
            DataManager.SetCurrentReport(OLAPUTILS.Utils.DeserializeOlapReport(olapReport));
            return olapClientHelper.GetJsonData(action, DataManager, dimensionName);
        }

        public Dictionary<string, object> DrillGrid(string action, string cellPosition, string currentReport,string clientReports, string headerInfo, string layout)
        {
            OlapDataManager DataManager = new OlapDataManager(connectionString);
            if (DataManager.ConnectionString.ToLower().Replace(" ", String.Empty).Split(';', '=').Contains("localeidentifier"))
            {
                DataManager.Culture = new System.Globalization.CultureInfo(cultureIDInfoval);
                DataManager.OverrideDefaultFormatStrings = true;
            }               
            DataManager.SetCurrentReport(OLAPUTILS.Utils.DeserializeOlapReport(currentReport));
            DataManager.Reports = olapClientHelper.DeserializedReports(clientReports);
            return olapClientHelper.GetJsonData(action, DataManager, cellPosition, headerInfo, layout);
        }
        public Dictionary<string, object> NodeDropped(string action, string dropType, string nodeInfo, string olapReport, string clientReports)
        {
            OlapDataManager DataManager = new OlapDataManager(connectionString);
            DataManager.SetCurrentReport(OLAPUTILS.Utils.DeserializeOlapReport(olapReport));
            DataManager.Reports = olapClientHelper.DeserializedReports(clientReports);
            return olapClientHelper.GetJsonData(action, DataManager, dropType, nodeInfo);
        }

        public Dictionary<string, object> CubeChanged(string action, string cubeName, string clientParams)
        {
            OlapDataManager DataManager = new OlapDataManager(connectionString);
            return olapClientHelper.GetJsonData(action, DataManager, cubeName, clientParams);
        }

        public Dictionary<string, object> MeasureGroupChanged(string action, string measureGroupName)
        {
            OlapDataManager DataManager = new OlapDataManager(connectionString);
            return olapClientHelper.GetJsonData(action, DataManager, measureGroupName);
        }

        public Dictionary<string, object> ToolbarOperations(string action, string toolbarOperation, string clientInfo, string olapReport, string clientReports)
        {
            OlapDataManager DataManager = new OlapDataManager(connectionString);
            if (!string.IsNullOrEmpty(olapReport))
                DataManager.SetCurrentReport(OLAPUTILS.Utils.DeserializeOlapReport(olapReport));
            if (!string.IsNullOrEmpty(clientReports))
                DataManager.Reports = olapClientHelper.DeserializedReports(clientReports);
            return olapClientHelper.GetJsonData(action, DataManager, toolbarOperation, clientInfo);
        }
        public Dictionary<string, object> MemberExpanded(string action, bool checkedStatus, string parentNode, string tag, string dimensionName, string cubeName, string olapReport, string clientReports)
        {
            OlapDataManager DataManager = new OlapDataManager(connectionString);
            if (!string.IsNullOrEmpty(olapReport))
                DataManager.SetCurrentReport(OLAPUTILS.Utils.DeserializeOlapReport(olapReport));
            if (!string.IsNullOrEmpty(clientReports))
                DataManager.Reports = olapClientHelper.DeserializedReports(clientReports);
            return olapClientHelper.GetJsonData(action, DataManager, checkedStatus, parentNode, tag, dimensionName, cubeName);
        }

        public Dictionary<string, object> UpdateReport(string action, string clientParams, string olapReport, string clientReports)
        {
            return olapClientHelper.GetJsonData(action, clientParams, olapReport, clientReports);
        }

        public Dictionary<string, object> SaveReportToDB(string reportName, string olapReport, string clientReports)
        {
            SqlCeConnection con = new SqlCeConnection() { ConnectionString = conStringforDB };
            con.Open();
            SqlCeCommand cmd1 = new SqlCeCommand("insert into ReportsTable Values(@ReportName,@Reports)", con);
            cmd1.Parameters.Add("@ReportName", reportName);
            cmd1.Parameters.Add("@Reports", OLAPUTILS.Utils.GetReportStream(clientReports).ToArray());
            cmd1.ExecuteNonQuery();
            con.Close();
            return null;
        }
        public Dictionary<string, object> FetchReportListFromDB()
        {
            string reportNames = string.Empty;
            foreach (System.Data.DataRow row in GetDataTable().Rows)
                reportNames = reportNames == "" ? (row.ItemArray[0] as string) : reportNames + "__" + (row.ItemArray[0] as string);
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            dictionary.Add("ReportNameList", reportNames);
            return dictionary;
        }
        public Dictionary<string, object> LoadReportFromDB(string reportName, string olapReport, string clientReports)
        {
            OlapDataManager DataManager = new OlapDataManager(connectionString);
            var reportString = "";
            foreach (DataRow row in GetDataTable().Rows)
            {
                if ((row.ItemArray[0] as string).Equals(reportName))
                {
                    reportString = OLAPUTILS.Utils.CompressData(row.ItemArray[1] as byte[]);
                    break;
                }
            }
            DataManager.Reports = olapClientHelper.DeserializedReports(reportString);
            DataManager.SetCurrentReport(DataManager.Reports[0]);
            return olapClientHelper.GetJsonData("toolbarOperation", DataManager, "Load Report", reportName);
        }

        private DataTable GetDataTable()
        {
            SqlCeConnection con = new SqlCeConnection() { ConnectionString = conStringforDB };
            con.Open();
            DataSet dSet = new DataSet();
            new SqlCeDataAdapter("Select * from ReportsTable", con).Fill(dSet);
            con.Close();
            return dSet.Tables[0];
        }

        public void Export(Stream stream)
        {
            System.IO.StreamReader sReader = new System.IO.StreamReader(stream);
            string args = System.Web.HttpContext.Current.Server.UrlDecode(sReader.ReadToEnd());
            OlapDataManager DataManager = new OlapDataManager(connectionString);
            string fileName = "Sample";
            olapClientHelper.ExportOlapClient(DataManager, args, fileName, System.Web.HttpContext.Current.Response);
        }

        private OlapReport CreateOlapReport()
        {
            OlapReport olapReport = new OlapReport() { Name = "Default Report" };
            olapReport.CurrentCubeName = "Adventure Works";

            MeasureElements measureElement = new MeasureElements();
            measureElement.Elements.Add(new MeasureElement { UniqueName = "[Measures].[Customer Count]" });

            DimensionElement dimensionElementRow = new DimensionElement();
            dimensionElementRow.Name = "Date";
            dimensionElementRow.AddLevel("Fiscal", "Fiscal Year");

            olapReport.SeriesElements.Add(dimensionElementRow);
            olapReport.CategoricalElements.Add(measureElement);

            return olapReport;
        }
    }
}
