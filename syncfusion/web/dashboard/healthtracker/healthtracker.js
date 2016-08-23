(function ($, ej, undefined) {
    // Example plugin creation code
    // ejScr is the plugin name 
    // "ej.Scr" is "namespace.className" will hold functions and properties
    ej.widget("ejSmartScroller", "ej.SmartScroller", {
        // widget element will be automatically set in this
        element: null,
        // user defined model will be automatically set in this
        model: null,
        //Root Css Class
        _rootCSS: "",
        // default model
        defaults: {
            /// <summary>This Contains default property of button </summary>
            triggerOnce: true,
            reach: null
        },
        //Data Types
        dataTypes: {
            triggerOnce: "boolean"
        },

        // constructor function
        _init: function () {
            this._initialize();
            this._wireEvents();
        },

        // all events bound using this._on will be unbind automatically
        _destroy: function () {
            this._off($(window), "scroll", this._scrollHandler);
        },
        _setModel: function (options) {

        },

        _initialize: function () {
            this._oldScroll = this._newScroll = 0;
            this._triggered = false;
            if (this._oldScroll >= this._getOffset())
                this._triggerFn();
        },
        _scrollHandler: function (e) {
            if (!this._triggered || !this.model.triggerOnce) {
                this._triggerOnReach();
                this._oldScroll = this._newScroll;
            }
        },
        _getOffset: function () {
            return $(this.element).offset().top - (document.documentElement.clientHeight - $(this.element).outerHeight());
        },
        _triggerOnReach: function () {
            this._newScroll = $(document).scrollTop();
            var offset = this._getOffset();
            if (this._oldScroll < offset && offset <= this._newScroll) {
                this._triggerFn();
            } else if (this._newScroll < offset && offset <= this._oldScroll) {
                this._triggerFn();
            }
        },
        _triggerFn: function () {
            this._triggered = true;
            this._trigger("reach", { element: this.element, offsetTop: this._newScroll });
        },
        /*-----------------------Event Handlers -----------------------------------------*/
        _wireEvents: function () {
            this._on($(window), "scroll", this._scrollHandler);
        },
    });

})(jQuery, Syncfusion);

$(function () {
    window.stepChartInitialLoad = false;
    window.floorChartInitialLoad = false;
    $(".persondetails").hide();
    //grid is loaded with food information
    $("#Grid").ejGrid({
        dataSource: window.FoodInformation,
        showSummary: true,
        enableAltRow: false,
        allowKeyboardNavigation: true,
        editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, editMode: ej.Grid.EditMode.DialogTemplate, dialogEditorTemplateID: "#healthAddTemplate" },
        columns: [
                    { field: "Time", headerText: "TIME", width: 70, textAlign: ej.TextAlign.Center, validationRules: { required: true } },
                    { field: "FoodName", headerText: "FOOD", width: 110, textAlign: ej.TextAlign.Center, validationRules: { required: true } },
                    { field: "Fat", headerText: "FAT", textAlign: ej.TextAlign.Center, width: 60, format: "{0:N0}g", validationRules: { required: true } },
                    { field: "Carbohydrate", headerText: "CARB", textAlign: ej.TextAlign.Center, width: 60, format: "{0:N0}g", validationRules: { required: true } },
                    { field: "Protein", headerText: "PROTEIN", textAlign: ej.TextAlign.Center, width: 60, format: "{0:N0}g", validationRules: { required: true } },
                    { field: "Calorie", headerText: "CALORIES", width: 65, textAlign: ej.TextAlign.Center, format: "{0:N0}cal", validationRules: { required: true } },
                    { field: "FoodId", isPrimaryKey: true, visible: false }
        ],
        "actionBegin": "actionBegin",
        "actionComplete": "actionComplete",
        "create": "gridCreate",
        summaryRows: [{ title: "Sum", summaryColumns: [{ summaryType: ej.Grid.SummaryType.Sum, displayColumn: "Fat", dataMember: "Fat", format: "{0:N0}g" }, { summaryType: ej.Grid.SummaryType.Sum, displayColumn: "Carbohydrate", dataMember: "Carbohydrate", format: "{0:N0}g" }, { summaryType: ej.Grid.SummaryType.Sum, displayColumn: "Protein", dataMember: "Protein", format: "{0:N0}g" }, { summaryType: ej.Grid.SummaryType.Sum, displayColumn: "Calorie", dataMember: "Calorie", format: "{0:N0}cal" }] }
        ],

    });
    //get the summary values of the grid
    var sumColl = getSummaryDetails();

    //add new food dialog box is opened when "AddMeal" button is clicked
    $(".add, .addlabel").bind("click", function () {
        $("#Grid").ejGrid("addRecord");
    });

    //chart is rendered based on the summary collection value in the grid
    $("#Chart").ejChart({
	commonSeriesOptions:{
                                   tooltip:{
                                     visible: false
                                      }
								},
        series: [
        {
            points: [
                { x: 'Carb', y: sumColl[1], fill: "#B44A4A", text: sumColl[1] + "g" + " Carb" },
                { x: 'Protein', y: sumColl[2], fill: "#53B2C1", text: sumColl[2] + "g" + " Protein" },
                { x: 'Fat', y: sumColl[0], fill: "#F9AF3C", text: sumColl[0] + "g" + " Fat" },
            ],
            marker: {
                 dataLabel: { visible: true, font: { color: '#707070', size: '15px', fontWeight: 'lighter' } }
            },
            name: 'Newyork', type: 'doughnut', labelPosition: 'outside', doughnutSize: 0.9,
            opacity: 0.8, 
			border: {width: 1 }
        }
        ],
        canResize: true,
        margin: { left: 10, top: 0, right: 0, bottom: 0 },
        create: "chartCreate",
        
        size: { height: "276" },
        legend: { visible: false }
    });

    // render the gauge
    $("#GaugeRDI").ejCircularGauge({
        frame: { frameType: "halfcircle" },
        width: 230,
        height: 155,
        scales: [{
            startAngle: 182,
            sweepAngle: 176,
            showRanges: true,
            showLabels: false,
            radius: 140,
            minimum: 0,
            maximum: 2200,
            majorIntervalValue: 200,
            pointerCap: { backgroundColor: "#3AB54B", borderColor: "#3AB54B" },
            pointers: [{ border: { color: "#3AB54B" }, needleStyle: "rectangle", width: 1, value: 450, length: 90 }],
            ticks: [{
                color: "#FFFFFF",
                height: 16,
                width: 3
            }, {
                color: "#FFFFFF",
                height: 7,
                width: 1
            }],
            ranges: [{
                size: 10,
                startValue: 0,
                endValue: 449,
                backgroundColor: "#3AB54B",
                border: { color: "#3AB54B" }
            }, {
                size: 10,
                startValue: 449,
                endValue: 2200,
                backgroundColor: "#B0D2C8",
                border: { color: "#B0D2C8" }
            }]
        }]
    });

    // render the gauge
    $("#GaugeBurnt").ejCircularGauge({
        frame: { frameType: "halfcircle" },
        width: 230,
        height: 155,
        scales: [{
            startAngle: 182,
            sweepAngle: 176,
            showRanges: true,
            showLabels: false,
            radius: 140,
            minimum: 0,
            maximum: 1000,
            majorIntervalValue: 200,
            pointerCap: { backgroundColor: "#b24848", borderColor: "#b24848" },
            pointers: [{ border: { color: "#b24848" }, needleStyle: "rectangle", width: 1, value: 650, length: 90 }],
            ticks: [{
                color: "#FFFFFF",
                height: 16,
                width: 3
            }, {
                color: "#FFFFFF",
                height: 7,
                width: 1
            }],
            ranges: [{
                size: 10,
                startValue: 0,
                endValue: 649,
                backgroundColor: "#b24848",
                border: { color: "#c98c8b" }
            }, {
                size: 10,
                startValue: 649,
                endValue: 1000,
                backgroundColor: "#C9A5A6",
                border: { color: "#C9A5A6" }
            }]
        }]
    });

    //number of steps pending chart is rendered
    $("#ChartStep").ejChart(
    {
        series: [
        {
            points: [
                { x: 'Carbohydrate', y: 10, visible: true, fill: "#D3C1D4" },
                { x: 'Fat', y: 90, visible: true, fill: "#B26CAB" },
            ],
            name: 'Newyork', type: 'doughnut', labelPosition: 'inside', doughnutSize: 0.9, doughnutCoefficient: 0.7, enableAnimation: false,
            opacity: 0.8, border: {width: 1, color: "#D3C1D4" }
        }
        ],

        margin: { top: 0, bottom: 0, left: 10, right: 10 },
       
        size: { height: "170", width: "200" },
        legend: { visible: false, font: { color: 'Black', size: '12px'}, position: 'bottom' },
        annotations:[{visible:true, content:"stepAnnotation", region: "series"}]
    });


    //number of floors pending chart is rendered
    $("#ChartFloor").ejChart(
    {
        series: [
        {
            points: [
                { x: 'Carbohydrate', y: 6, visible: true, fill: "#7D70B3" },
                { x: 'Fat', y: 4, visible: true, fill: "#BFBED9" },
            ],
            name: 'Newyork', type: 'doughnut', labelPosition: 'inside', doughnutSize: 0.9, doughnutCoefficient: 0.7, enableAnimation: false,
            opacity: 0.8, border: {width: 1, color: "#BFBED9" }
        }
        ],

        
        margin: { top: 0, bottom: 0, left: 10, right: 10 },
        size: { height: "170", width: "200" },
        legend: { visible: false, font: {color: 'Black', size: '12px' }, position: 'bottom' },
        annotations:[{visible:true, content:"floorAnnotation", region: "series"}]
    });

    //monthly report chart for number of steps moved
    $("#ChartCal").ejChart(
     {
         chartArea: 
		 {  
		     border: { width: 1 } 
	     },
         primaryXAxis:
         {
             hidePartialLabels: true,
             rangePadding: 'none',
             title: { text: "Days", font: { fontStyle: 'Bold', opacity: 1, size: '14px', fontWeight: 'Bold' } },
             font: { fontStyle: 'bold', opacity: 1, size: '8px', fontWeight: 'regular' },
             range: { min: 0, max: 31, interval: 3 },
             majorGridLines: { visible: false },
             columnIndex: 0,
         },
         primaryYAxis:
         {
             rowIndex: "0",
             rangePadding: 'none',
             range: { min: 0, max: 1200, interval: 100 },
             font: { fontStyle: 'bold', opacity: 1, size: '8px', fontWeight: 'regular' },
             title: { text: "Calorie", font: { fontStyle: 'Bold', opacity: 1, size: '14px', fontWeight: 'Bold' } }
         },
         series: [
             {
                 name: 'Calories Burnt', type: 'spline',
                 enableAnimation: true,
                 border: {width: 1}, fill: "#24B7E5",
				 tooltip:{ template: 'CalTooltip'}
             }
         ],
         commonSeriesOptions: {
             type: 'line', enableAnimation: true,
			        tooltip:{
                     visible: true
                           },
         	  marker:
             {
                 shape: 'circle',
                 size:
                   {
                       height: 10, width: 10
                   },
                 visible: true,
             },
             border: {width: 2 }
         },
         canResize: true,
         initSeriesRender: false,
         load: 'onChartCalLoad',
         background: 'transparent',
         title : { text: 'CALORIES BURNT' },
         size: { height: "500" },
         legend: { visible: true, position: 'Bottom', itemStyle: { width: 10, height: 10 } }
     });

    //monthly report chart for calories burnt
    $("#ChartBurnt").ejChart(
        {
            chartArea:
			{
			    border: { width: 1 }
			},
            primaryXAxis:
            {
                hidePartialLabels: true,
                rangePadding: 'none',
                title: { text: "Days", font: { fontStyle: 'Bold', opacity: 1, size: '14px', fontWeight: 'Bold' } },
                range: { min: 0, max: 31, interval: 3 },
                majorGridLines: { visible: false },
                font: { fontStyle: 'bold', opacity: 1, size: '8px', fontWeight: 'regular' },
                columnIndex: 0
            },
            primaryYAxis:
            {
                rowIndex: "0",
                rangePadding: 'none',
                range: { min: 0, max: 1200, interval: 100 },
                title: { text: "Steps", font: { fontStyle: 'Bold', opacity: 1, size: '14px', fontWeight: 'Bold' } },
                font: { fontStyle: 'bold', opacity: 1, size: '8px', fontWeight: 'regular' }
            },
			commonSeriesOptions:{
                      tooltip:{ visible: true }
                       },

            series: [
                {
                    name: 'Steps Moved', type: 'column',
                    enableAnimation: true,
                    border: {width: 1}, fill: "#8CC640",
					       tooltip:{ template: 'BurntTooltip' }
                }
            ],
            canResize: true,
            initSeriesRender: false,
            load: 'onChartBurntload',
            background: 'transparent',
			title : {text: "TOTAL STEPS"},           
            size: { height: "500" },
            legend: { visible: true, position: 'Bottom', itemStyle: { width: 10, height: 10 } }
        });

    //monthly report chart for meal intake
    $("#MealDetails").ejChart(
      {
          chartArea:
		  {
		      Border: { width: 1 }
		  },
          primaryXAxis:
          {
              hidePartialLabels: true,
              rangePadding: 'none',
              title: { text: "Days", font: { fontStyle: 'Bold', opacity: 1, size: '14px', fontWeight: 'Bold' } },
              range: { min: 0, max: 31, interval: 3 },
              majorGridLines: { visible: false },
              columnIndex: 0
          },
          primaryYAxis:
          {
              rowIndex: "0",
              rangePadding: 'none',
              range: { min: 0, max: 1200, interval: 100 },
              title: { text: "Cal", font: { fontStyle: 'Bold', opacity: 1, size: '14px', fontWeight: 'Bold' } }
          },
		  commonSeriesOptions:{
                      tooltip:{ visible: true }
                       },
          series: [
              {
                  name: 'Carb', type: 'column',
                  enableAnimation: true,
                  border:{ width: 1}, fill: "#8CAA55", 
				  tooltip:{ template: 'HydrateTooltip' }
              },
              {
                  name: 'Protein', type: 'column',
                  enableAnimation: true,
                  border: {width: 1}, fill: "#B34949",
				  tooltip:{ template: 'ProteinTooltip' }
              },
              {
                  name: 'Fat', type: 'column',
                  enableAnimation: true,
                  border: {width: 1},  fill: "#58A7C6",
				  tooltip:{ template: 'FatTooltip' }
              }
          ],
          canResize: true,
          initSeriesRender: false,
          load: 'onChartLoad',
          background: 'transparent',
          title : { text: 'MEAL INTAKE' },
          size: { height: "500" },
          legend: { visible: true, position: 'Bottom', itemStyle: { width: 10, height: 10 } }
      });

    //load the monthly reported chart when we scroll down
    $('.loadondemand').ejSmartScroller({
        reach: "renderControl"
    });

    //   Responsive grid
    var oldWidth = $(window).width();
    var gridObj = $("#Grid").data("ejGrid");
    var offsetCol = [];
    var headerDiv = gridObj.getHeaderTable().find("div:visible.e-headercelldiv");
    for (j = 0; j < headerDiv.length; j++) {
        var temp = $(headerDiv[j]).offset();
        offsetCol.push(temp.left + gridObj.model.columns[headerDiv.length - 1].width + 50);
    }
    var closest = getClosestNum(oldWidth, offsetCol);
    var index = offsetCol.indexOf(closest);
    var temp = 6;
    if (index <= 3)
        index = 4;
    else if (index == 5) temp = 5;
    for (k = index; k != temp; k++) {
        gridObj.hideColumns(gridObj.model.columns[k].headerText);
        refreshSummaryData();
    }

    $(window).resize(function (args) {
        var newWidth = $(window).width();
        var headerDiv = gridObj.getHeaderTable().find("div:visible.e-headercelldiv");
        var direction = oldWidth > newWidth ? "left" : "right";
        var headerOffset = $(headerDiv[headerDiv.length - 1]).offset();
        if (headerDiv.length > 4 && direction == "left") {
            if (newWidth < headerOffset.left + gridObj.model.columns[headerDiv.length - 1].width + 50) {
                if (gridObj.getVisibleColumnNames().length > 1) {
                    gridObj.hideColumns(gridObj.getVisibleColumnNames()[gridObj.getVisibleColumnNames().length - 1]);
                    refreshSummaryData();
                }
                oldWidth = newWidth;
            }
        }
        else if (headerDiv.length >= 4 && headerDiv.length != 6 && direction == "right") {
            if (newWidth > headerOffset.left + $(headerDiv[headerDiv.length]).width() + gridObj.model.columns[headerDiv.length].width + 50) {
                gridObj.showColumns(gridObj.model.columns[headerDiv.length].headerText);
                refreshSummaryData();
                oldWidth = newWidth;
            }
        }
    });

});
$(document).on('respond',function(){
	$("#Chart").ejChart('redraw');
	$("#ChartStep").ejChart('redraw');
	$("#ChartFloor").ejChart('redraw');
	$("#ChartBurnt").ejChart('redraw');
	$("#ChartCal").ejChart('redraw');
	$("#MealDetails").ejChart('redraw');
});
function getClosestNum(num, ar) {
    var i = 0, closest, closestDiff, currentDiff;
    if (ar.length) {
        closest = ar[0];
        for (i; i < ar.length; i++) {
            closestDiff = Math.abs(num - closest);
            currentDiff = Math.abs(num - ar[i]);
            if (currentDiff < closestDiff) {
                closest = ar[i];
            }
            closestDiff = null;
            currentDiff = null;
        }
        //returns first element that is closest to number
        return closest;
    }
}

function refreshSummaryData() {
    $($("#MealSummary").find(".e-gridsummary")).css("borderCollapse", "collapse");
    setTimeout(function () {
        $($("#MealSummary").find(".e-gridsummary")).css("borderCollapse", "separate");
    });
}
//update calories burnt gauge
function updateGauge(caloriesValue) {
    gaugeRdi = $("#GaugeRDI").data("ejCircularGauge");
    updateCircularGauge(gaugeRdi, caloriesValue);
    $(".rdilabel").text("Calories Intake - " + caloriesValue + "/1000");
    $(".rdipenlabel").text(2200 - caloriesValue + " calories pending");
}

function updateCircularGauge(gaugeObj, calburntValue) {
    gaugeObj.setPointerValue(0, 0, calburntValue);
    gaugeObj.setRangeStartValue(0, 0, 0);
    gaugeObj.setRangeEndValue(0, 0, calburntValue);
    gaugeObj.setRangeStartValue(0, 1, calburntValue);
    gaugeObj.setRangeEndValue(0, 1, 2200);
}
function gridCreate(args) {
    $(".persondetails").show();
}
function actionBegin(args) {
    var fat, carbo, prot, calo;
    fat = $("#Fat").val();
    carbo = $("#Carbohydrate").val();
    prot = $("#Protein").val();
    calo = $("#Calorie").val();
    if (args.requestType == "save"){
        if ((fat == '') || (carbo == '') || (prot == '') || (calo == '')) 
            args.cancel=true;
    }
}

function actionComplete(args) {
   
        if (args.requestType == "beginedit" || args.requestType == "add") {
            if (args.requestType == "beginedit") {
                $('#Time').ejTimePicker({ time: this._currentData[0].Time });
                $("#Fat").ejNumericTextbox({ width: "120px", value: this._currentData[0].Fat, minValue: 1, maximum: 1000 });
                $("#Carbohydrate").ejNumericTextbox({ width: "120px", value: this._currentData[0].Carbohydrate, minValue: 1, maximum: 1000 });
                $("#Protein").ejNumericTextbox({ width: "120px", value: this._currentData[0].Protein, minValue: 1, maximum: 1000 });
                $("#Calorie").ejNumericTextbox({ width: "120px", value: this._currentData[0].Calorie, minValue: 1, maximum: 1000 });
                $("#MealSummary span.e-title").text("Edit");
            }
            else {
                $('#FoodName').css("width", "255px");
                $('#Time').ejTimePicker();
                $("#Fat").ejNumericTextbox({ width: "120px", minValue: 1, maximum: 1000 });
                $("#Carbohydrate").ejNumericTextbox({ width: "120px", minValue: 1, maximum: 1000 });
                $("#Protein").ejNumericTextbox({ width: "120px", minValue: 1, maximum: 1000 });
                $("#Calorie").ejNumericTextbox({ width: "120px", minValue: 1, maximum: 1000 });
                $("#MealSummary span.e-title").text("Add Food");
            }
            $("#Grid_dialogEdit").ejDialog({
                allowKeyboardNavigation: false, close: function () {
                    var gridObj = $("#Grid").data("ejGrid");
                    gridObj.cancelEdit();
                }
            });
            $("#MealSummary #EditDialog_Grid_Save").val("Done");
            $("#Fat, #Carbohydrate, #Protein, #Calorie,#Time, #FoodName").css("text-align", "left");
            var cancelObj = $("#MealSummary #EditDialog_Grid_Cancel").remove();
            gridCreate();
        }
        //refresh the chart if the new food item is added.
        if (args.requestType != "refresh" && args.requestType == "save") {
           
                args.data.FoodId = getRandomNum(6, 50);
                var gridObj = $("#Grid").data("ejGrid");
                gridObj.refreshContent();
                var sumColl = getSummaryDetails();
                $("#ChartCalValue").text(sumColl[3] + "cal");
                $("#Chart").ejChart("option", {
                    "model": {
                        series: [{
                            "type": "doughnut", "points": [
                                { x: 'Carb', y: sumColl[1], text: sumColl[1] + "g" + " Carb" },
                                { x: 'Protein', y: sumColl[2], text: sumColl[2] + "g" + " Protein" },
                                { x: 'Fat', y: sumColl[0], text: sumColl[0] + "g" + " Fat" }
                            ]
                        }]
                    }
                });
                var caloriesSum = sumColl[3];
                updateGauge(caloriesSum);
                gridCreate();
            }
}

//load the monthly reported charts when we scroll down
function renderControl(args) {
    if (args.element.hasClass("titlecss"))
        renderBurntCal();
    else
        renderMealIntake();
}

//get the summary details of the grid
function getSummaryDetails() {
    var griddata = $("#Grid").data("ejGrid");
    var sumValue = griddata.model.summaryRows[0].summaryColumns;
    var sumColl = [];
    $.each(sumValue, function (index, item) {
        sumColl.push(Math.round(griddata.getSummaryValues(item)));
    });
    return sumColl;
}

//generate the series for steps moved chart
function onChartBurntload(sender) {
    var data = getBurntData();
    sender.model.series[0].dataSource = data.Open;
	sender.model.series[0].xName= "XValue";
	sender.model.series[0].yName= "YValue";
}

//generate the series for meals intake chart
function onChartLoad(sender) {
    var data = getData();
    sender.model.series[0].dataSource = data.Open;
	sender.model.series[0].xName = "XValue";
	sender.model.series[0].yName = "YValue";
	sender.model.series[1].dataSource = data.Close;
	sender.model.series[1].xName = "XValue";
	sender.model.series[1].yName = "YValue";
	sender.model.series[2].dataSource = data.OpenClose;
	sender.model.series[2].xName = "XValue";
	sender.model.series[2].yName = "YValue";
   
}

//generate the series for calories burnt chart
function getBurntData() {
    var series1 = [];
    var series2 = [];
    var value = 100;
    for (var i = 1; i <= 30; i++) {
        var point1 = { XValue: i, YValue: getRandomNum(200, 1200) };
        series1.push(point1);
        var point2 = { XValue: i, YValue: getRandomNum(200, 1200) };
        series2.push(point2);
    }
    var data = { Open: series1, Close: series2 };
    return data;
}

//get the chart data
function getData() {
    var series1 = [];
    var series2 = [];
    var series3 = [];
    var value = 100;
    for (var i = 1; i <= 30; i++) {
        var point1 = { XValue: i, YValue: getRandomNum(200, 1200) };
        series1.push(point1);
        var point2 = { XValue: i, YValue: getRandomNum(200, 1200) };
        series2.push(point2);
        var point3 = { XValue: i, YValue: getRandomNum(200, 1200) };
        series3.push(point3);
    }
    var data = { Open: series1, Close: series2, OpenClose: series3 };
    return data;
}

//generate random numbers
function getRandomNum(ubound, lbound) {
    return (Math.floor(Math.random() * (ubound - lbound)) + lbound);
}
function onChartCalLoad(sender) {
    var data = getBurntData();
    sender.model.series[0].dataSource = data.Open;
	sender.model.series[0].xName= "XValue";
	sender.model.series[0].yName= "YValue";
}
function getCalData() {
    var series1 = [];
    var value = 100;
    for (var i = 1; i <= 30; i++) {
        var point1 = { XValue: i, YValue: getRandomNum(200, 1000) };
        series1.push(point1);
    }
    var data = { Open: series1 };
    return data;
}
function chartCreate(args) {
    var sumColl = getSummaryDetails();
    $("#ChartCalValue").text(sumColl[3] + "cal");
}

//render the series for the steps moved and calories burnt chart
function renderBurntCal() {
    var chartCalObj = $("#ChartCal").data("ejChart");
    var chartBurntObj = $("#ChartBurnt").data("ejChart");
    chartCalObj.seriesRender();
    chartBurntObj.seriesRender();
}

//render the series for the meal intake chart
function renderMealIntake() {
    var chartMealObj = $("#MealDetails").data("ejChart");
    chartMealObj.seriesRender();
}
