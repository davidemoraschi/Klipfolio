window.GroupingList = ["BI","INTEGRATION"];

var SamplesList = [
            {
                "name": "PivotGrid", "id": "pivotgrid", "Group": "BI", "childcount": "1", "querystring": "Default Functionalities", "type": "update","samples": [
                       { "id": "1", "name": "Default Functionalities", "querystring": "default", "childcount": "0" },
                       { "id": "2", "name": "KPI Report", "querystring": "kpi", "childcount": "0" },
                       { "id": "3", "name": "Drill Types", "querystring": "drillposition", "childcount": "0" },
                       { "id": "4", "name": "Cell Context", "querystring": "cellcontext", "childcount": "0", "type": " " },
                       { "id": "5", "name": "Hyperlink", "querystring": "hyperlink", "childcount": "0", "type": " " },
                       { "id": "6", "name": "Grid Layouts", "querystring": "layout", "childcount": "0", "type": " " },
                       { "id": "7", "name": "Localization", "querystring": "localization", "childcount": "0", "type": "" },
                       { "id": "8", "name": "RTL", "querystring": "rtl", "childcount": "0", "type": "" },
                       { "id": "9", "name": "Paging", "querystring": "paging", "childcount": "0", "type": "" },
                       { "id": "10", "name": "Cell Selection", "querystring": "cellselection", "childcount": "0", "type": "new" },
                       { "id": "11", "name": "Conditional Formatting", "querystring": "conditionalformatting", "childcount": "0", "type": "new" },
                       { "id": "12", "name": "Exporting", "querystring": "exporting", "childcount": "0", "type": "new" },
                       {
                         "id": "13", "name": "Data Binding", "querystring": "pivotgrid", "childcount": "1", samples: [
                                  { "id": "1", "name": "OLAP Binding", "querystring": "olap", "childcount": "0"},
                                  { "id": "2", "name": "Relational Binding", "querystring": "pivot", "childcount": "0" }
                            ]
                       },
					   { "id": "14", "name": "Grouping Bar", "querystring": "groupingbar", "childcount": "0", "type": "new" }

                       
                ]
           },
           {
               "name": "OlapChart", "id": "olapchart", "Group": "BI", "childcount": "1", "querystring": "Default Functionalities", "type": "update","samples": [
                           { "id": "1", "name": "Default Functionalities", "querystring": "default", "childcount": "0", "type": "" },
                           { "id": "2", "name": "Chart Types", "querystring": "types", "childcount": "0", "type": "" },
					       { "id": "3", "name": "Localization", "querystring": "localization", "childcount": "0", "type": "" },
                           { "id": "4", "name": "Exporting", "querystring": "exporting", "childcount": "0", "type": "new" },
               ]
           },
           {
               "name": "OlapClient", "id": "olapclient", "Group": "BI", "childcount": "1", "querystring": "Default Functionalities", "type": "update", "samples": [
                          { "id": "1", "name": "Default Functionalities", "querystring": "default", "childcount": "0", "type": "" },
                          { "id": "2", "name": "Display Options", "querystring": "customization", "childcount": "0", "type": "update" },
						  { "id": "3", "name": "Localization", "querystring": "localization", "childcount": "0", "type": "" },
                          { "id": "4", "name": "Exporting", "querystring": "exportingmodes", "childcount": "0", "type": "new" },
               ]
           },               
		   {
		       "name": "OlapGauge", "id": "olapgauge", "Group": "BI", "childcount": "1", "querystring": "Default Functionalities", "type": "", "samples": [
                       { "id": "1", "name": "Default Functionalities", "querystring": "default", "childcount": "0", "type": "" },
                       { "id": "2", "name": "Scale Options", "querystring": "scale", "childcount": "0", "type": "" },
                       { "id": "3", "name": "Range Options", "querystring": "range", "childcount": "0", "type": "" },
                       { "id": "4", "name": "Pointer Options", "querystring": "pointer", "childcount": "0", "type": "" },
                       { "id": "5", "name": "Layout Options", "querystring": "layout", "childcount": "0", "type": "" },
                       { "id": "6", "name": "Events", "querystring": "events", "childcount": "0", "type": "" },
					   { "id": "7", "name": "Localization", "querystring": "localization", "childcount": "0", "type": "" },
					   
               ]
          },
          {
              "name": "AngularSupport", "id": "angularsupport", "Group": "INTEGRATION", "childcount": "1", "querystring": "pivotgrid", "samples": [
                       { "id": "1", "name": "PivotGrid", "querystring": "pivotgrid", "childcount": "0" },
                       { "id": "2", "name": "OlapChart", "querystring": "olapchart", "childcount": "0" },
                       { "id": "3", "name": "OlapClient", "querystring": "olapclient", "childcount": "0" },
                       { "id": "4", "name": "OlapGauge", "querystring": "olapgauge", "childcount": "0" }
              ]
          },
          {
              "name": "KOSupport", "id": "knockout", "Group": "INTEGRATION", "childcount": "1", "querystring": "pivotgrid", "samples": [
                       { "id": "1", "name": "PivotGrid", "querystring": "pivotgrid", "childcount": "0", "type": "" },
                       { "id": "2", "name": "OlapChart", "querystring": "olapchart", "childcount": "0", "type": "" },
                       { "id": "3", "name": "OlapClient", "querystring": "olapclient", "childcount": "0", "type": "" },
                       { "id": "4", "name": "OlapGauge", "querystring": "olapgauge", "childcount": "0", "type": "" },
             ]
          }
];
