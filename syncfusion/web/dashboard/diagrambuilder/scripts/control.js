
var pageBackgroundColor = null;
$(function () {

    //#region DiagramControl Initialization


    userHandles = createUserHandles();
    var nodes = [];
    var connectors = [];

    nodes = [
        { name: "manufacturing", width: 175, height: 60, offsetX: 400, offsetY: 60, fillColor: "#05ADA4", labels: [{ "text": "Manufacturing Tablet PC" }], type: "basic", shape: "path", pathData: "M 269.711,29.3333C 269.711,44.061 257.772,56 243.044,56L 158.058,56C 143.33,56 131.391,44.061 131.391,29.3333L 131.391,29.3333C 131.391,14.6057 143.33,2.66669 158.058,2.66669L 243.044,2.66669C 257.772,2.66669 269.711,14.6057 269.711,29.3333 Z" },
        { name: "simProjection", width: 100, height: 80, offsetX: 400, offsetY: 175, fillColor: "#83A93F", labels: [{ "text": "Dual Sim \n Projection?" }], type: "basic", shape: "path", pathData: "M 253.005,115.687L 200.567,146.071L 148.097,115.687L 200.534,85.304L 253.005,115.687 Z" },
        { name: "manufacturingProcess", width: 100, height: 80, offsetX: 400, offsetY: 300, fillColor: "#33AACA", labels: [{ "text": "Processor \n Installation " }] },
        { name: "dualSim", width: 120, height: 60, offsetX: 600, offsetY: 175, fillColor: "#F1605A", labels: [{ "text": "Single Sim \n Projection \n Added" }], type: "basic", shape: "rectangle" },
        { name: "touch", width: 130, height: 120, offsetX: 400, offsetY: 445, fillColor: "#83A93F", labels: [{ "text": "Capacitive\n Touch?" }], type: "basic", shape: "path", pathData: "M 253.473,337.392L 200.551,390.313L 147.629,337.392L 200.551,284.47L 253.473,337.392 Z" },
        { name: "capacitiveTouch", width: 120, height: 60, offsetX: 200, offsetY: 445, fillColor: "#33AACA", labels: [{ "text": "Capacitive Touch \n Functionalities" }], type: "basic", shape: "rectangle" },
        { name: "resistiveTouch", width: 120, height: 60, offsetX: 600, offsetY: 445, fillColor: "#F1605A", labels: [{ "text": "Resistive Touch \n Functionalities" }], type: "basic", shape: "rectangle" },
        { name: "standards", width: 100, height: 80, offsetX: 400, offsetY: 575, fillColor: "#33AACA", labels: [{ "text": "Maintaining \n Standards" }], type: "basic", shape: "rectangle" },
        { name: "price", width: 100, height: 80, offsetX: 400, offsetY: 720, fillColor: "#33AACA", labels: [{ "text": "Fixing Price" }], type: "basic", shape: "rectangle" },
        { name: "selling", width: 135, height: 60, offsetX: 400, offsetY: 820, fillColor: "#05ADA4", labels: [{ "text": "Selling Process" }], type: "basic", shape: "path", pathData: "M 269.711,29.3333C 269.711,44.061 257.772,56 243.044,56L 158.058,56C 143.33,56 131.391,44.061 131.391,29.3333L 131.391,29.3333C 131.391,14.6057 143.33,2.66669 158.058,2.66669L 243.044,2.66669C 257.772,2.66669 269.711,14.6057 269.711,29.3333 Z" },
    ];


    connectors = [
        {
            name: "connector1", sourceNode: "manufacturing", targetNode: "simProjection", sourcePort: "dport", targetPort: "bport"
        },
        { name: "connector2", sourceNode: "simProjection", targetNode: "manufacturingProcess", sourcePort: "dport", targetPort: "bport", labels: [{ "text": "Yes", "fontColor": "black", "fillColor": "white" }] },
        { name: "connector3", sourceNode: "simProjection", targetNode: "dualSim", sourcePort: "cport", targetPort: "aport", labels: [{ "text": "No", "fontColor": "black", "fillColor": "white" }] },
        { name: "connector4", sourceNode: "dualSim", targetNode: "manufacturingProcess", sourcePort: "dport", targetPort: "cport" },
        { name: "connector5", sourceNode: "manufacturingProcess", targetNode: "touch", sourcePort: "dport", targetPort: "bport" },
        { name: "connector6", sourceNode: "touch", targetNode: "capacitiveTouch", sourcePort: "aport", targetPort: "cport", labels: [{ "text": "Yes", "fontColor": "black", "fillColor": "white" }] },
        { name: "connector7", sourceNode: "touch", targetNode: "resistiveTouch", sourcePort: "cport", targetPort: "aport", labels: [{ "text": "No", "fontColor": "black", "fillColor": "white" }] },
        { name: "connector8", sourceNode: "capacitiveTouch", targetNode: "standards", sourcePort: "dport", targetPort: "aport" },
        { name: "connector9", sourceNode: "resistiveTouch", targetNode: "standards", sourcePort: "dport", targetPort: "cport" },
        { name: "connector10", sourceNode: "standards", targetNode: "price", sourcePort: "dport", targetPort: "bport" },
        { name: "connector11", sourceNode: "price", targetNode: "selling", sourcePort: "dport", targetPort: "bport" },
    ];

    var gridline = { "snapInterval": [10] };
    $("#DiagramContent").ejDiagram({
        connectors: connectors,
        nodes: nodes,
        defaultSettings: {
            connector: { segments: [{ "type": "orthogonal" }], labels: [{ "fontColor": "black" }], lineWidth: 2, targetDecorator: { shape: "arrow", width: "10", height: "10" } },
            node: { borderColor: "#000000", labels: [{ "fontColor": "white" }], ports: [{ offset: { x: 0, y: 0.5 }, name: "aport" }, { offset: { x: 0.5, y: 0 }, name: "bport" }, { offset: { x: 1, y: 0.5 }, name: "cport" }, { offset: { x: 0.5, y: 1 }, name: "dport" }] },
        },
        width: "100%",
        height: "100%",
        selectedItems: {
            userHandles: userHandles
        },
        drawingTools: {
            textTool: ej.datavisualization.Diagram.TextTool(),
        },
        contextMenu: {
            items: [
                {
                    name: "eventType", text: "Event Type",
                    subItems: [
                        { name: "interruptingStart", text: "Interrupting Start" },
                        { name: "nonInterruptingStart", text: "NonInterrupting Start" },
                        { name: "interruptingIntermediate", text: "Interrupting Intermediate" },
                        { name: "nonInterruptingIntermediate", text: "NonInterrupting Intermediate" },
                        { name: "endEvent", text: "End" },
                    ]
                },
                {
                    name: "triggerResult", text: "Trigger Result", subItems: [
                        { name: "noTrigger", text: "None" },
                        { name: "messageTrigger", text: "Message" },
                        { name: "timerTrigger", text: "Timer" },
                        { name: "escalationTrigger", text: "Escalation" },
                        { name: "linkTrigger", text: "Link" },
                        { name: "errorTrigger", text: "Error" },
                        { name: "compensationTrigger", text: "Compensation" },
                        { name: "signalTrigger", text: "Signal" },
                        { name: "multipleTrigger", text: "Multiple" },
                        { name: "parallelTrigger", text: "Parallel" },

                    ]
                },
                {
                    name: "gateway", text: "Gateway", subItems: [
                        { name: "noGateway", text: "None" },
                        { name: "exclusiveGateway", text: "Exclusive" },
                        { name: "parallelGateway", text: "Parallel" },
                        { name: "inclusiveGateway", text: "Inclusive" },
                        { name: "complexGateway", text: "Complex" },
                        { name: "eventBasedGateway", text: "Event Based" }
                    ]
                },
                {
                    name: "dataObject", text: "Data Object", subItems: [
                        { name: "noDataObject", text: "None" },
                        { name: "collection", text: "Collection" },
                    ]
                },
                {
                    name: "loop", text: "Loop", subItems: [
                        { name: "none", text: "None" },
                        { name: "standardLoop", text: "Standard" },
                        { name: "parallelMultiInstanceLoop", text: "Parallel Multi-Instance" },
                        { name: "sequenceMultiInstanceLoop", text: "Sequence Multi-Instance" }
                    ]
                },
                {
                    name: "taskType", text: "Task Type", subItems: [
                        { name: "none", text: "None" },
                        { name: "serviceTask", text: "Service" },
                        { name: "receiveTask", text: "Receive" },
                        { name: "sendTask", text: "Send" },
                        { name: "instantiatingReceiveTask", text: "Instantiating Receive" },
                        { name: "manualTask", text: "Manual" },
                        { name: "businessRuleTask", text: "Business Rule" },
                        { name: "userTask", text: "User" },
                        { name: "scriptTask", text: "Script" }
                    ]
                },
                {
                    name: "adhoc", text: "Ad-Hoc", subItems: [
                        { name: "none", text: "Nones" },
                        { name: "adhoc1", text: "Ad-Hoc" }
                    ]
                },
                {
                    name: "compensation", text: "Compensation", subItems: [
                        { name: "none", text: "None" },
                        { name: "compensation1", text: "Compensation" },
                    ]
                },
                {
                    name: "activityType", text: "Activity Type", subItems: [
                        { name: "task", text: "Task" },
                        { name: "collapsedSubProcess", text: "Collapsed Sub-Process" },
                    ]
                },
                {
                    name: "taskCall", text: "Call", subItems: [
                        { name: "none", text: "None" },
                        { name: "call", text: "Call" }
                    ]
                },
                {
                    name: "boundary", text: "Boundary", subItems: [
                        { name: "defaultBoundary", text: "Default" },
                        { name: "callBoundary", text: "Call" },
                        { name: "eventBoundary", text: "Event" }
                    ]
                }
            ]
        },
        pageSettings: { pageHeight: 1100, pageWidth: 1200, showPageBreak: false, multiplePage: true },
        snapSettings: {
            horizontalGridLines: gridline, verticalGridLines: gridline,
            snapConstraints: ej.datavisualization.Diagram.SnapConstraints.All & ~ej.datavisualization.Diagram.SnapConstraints.SnapToLines
        },
        contextMenuBeforeOpen: contextMenuBeforeOpening,
        contextMenuClick: contextMenuClicked,
        drop: nodeondrop,
        dragEnter: dragEnter,
        selectionChange: selectionchanged,
        nodeCollectionChange: nodecollectionchanged,
        textChange: textChanged,
        drag: nodeDragging,
        sizeChange: nodeSizeChanging,
        connectorCollectionChange: connectorCollectionChanged
    });

    //#endregion

    //#region Symbol Palette - Initialization

    if (window.SVGSVGElement) {
        $("#symbolpalette").ejSymbolPalette({ diagramId: "DiagramContent", palettes: window.diagramPaletteCollection, height: "100%", width: "100%", paletteItemWidth: 45, paletteItemHeight: 45, showPaletteItemText: false, previewWidth: 100, previewHeight: 100, });

        var collection1 = [{ name: "maxi_search" }];
        collection1.name = "maxi";
        $("#maxi_Search").ejSymbolPalette({ diagramId: "DiagramContent", palettes: collection1, height: "100%", width: "255px", paletteItemWidth: 45, paletteItemHeight: 45, showPaletteItemText: false, previewWidth: 100, previewHeight: 100, });
    }

    //#endregion

    //#region ToolBar - Initialization


    $("#toolbarEvents").ejToolbar({
        orientation: "horizontal",
        create: "toolbarLoad",
        click: "toolbarClick",
        itemHover: "toolbarChecked",
        itemLeave: "toolbarUnChecked"
    });



    $('#zoompercentage').ejDropDownList({
        targetID: "zoompercentageList",
        width: "75px",
        height: "25px",
        selectedItemIndex: 3,
        change: "evtpropscheckedevent",
        popupHeight: "203px",
    });



    $('#save_icon').ejButton({
        showRoundedCorner: true,
        size: ej.ButtonSize.Mini,
        text: "Save",
        click: saveIcon,
    });

    diagram = $("#DiagramContent").ejDiagram("instance");
    diagram._selectedObject = new SelectorVMClass();
    // set the default value for background dropdown control in Toolbar.
    document.getElementById("backgroundIcon").style.color = diagram.model.pageSettings.pageBackgroundColor;
    $("#artBoardWidth").ejNumericTextbox({ name: "artBoardWidth", value: diagram.model.pageSettings.pageWidth, width: "75px", focusOut: "setDiagramWidth" });
    $("#artBoardHeight").ejNumericTextbox({ name: "artBoardHeight", value: diagram.model.pageSettings.pageHeight, width: "75px", focusOut: "setDiagramHeight" });

    $('#pageBackgroundColor').ejDropDownList({
        targetID: "pageBackgroundColorDiv",
        width: "360px", 
    });

    //#endregion

    //#region MenuBar - Initialization

    $("#DiagramMenuControl").ejMenu({ width: 612, click: "MenubarClick", openOnClick: false });

    //#endregion

    //#region Overview - Initialization

    $("#Overview").ejOverview({ height: 158, width: 254 });
    $("#overviewSlider").ejSlider({
        value: 100,
        create: "OnCreate",
        change: "OnChange",
        slide: "OnChange",
        height: 8,
        width: 200,
        minValue: 100,
        maxValue: 3000,
    });

    // #endregion

    //#region Dialog Control - Initialization

    $("#FileOpenDialog").ejDialog({
        enableModal: true,
        resizable: false,
        width: 350,
        height: 400,
        close: "onDialogClose", showOnInit: false,
    });

    $("#insertLink").ejDialog({
        width: 550,
        close: "onDialogClose",
        enableModal: true,
        showOnInit: false
    });

    $("#confirmDialog").ejDialog({
        width: 451,
        close: "onDialogClose",
        showOnInit: false,
        enableModal: true,
    });

    $("#basicDialog").ejDialog({
        width: 451,
        close: "onDialogClose",
        showOnInit: false,
        enableModal: true,
    });
    $("#basicDialog1").ejDialog({
        width: 451,
        close: "onDialogClose",
        showOnInit: false,
        enableModal: true,
    });
    $("#basicDialogToLoad").ejDialog({
        width: 550,
        close: "onDialogClose",
        showOnInit: false,
        enableModal: true,
    });
    $("#exportDialog").ejDialog({
        width: 400,
        close: "onDialogClose",
        showOnInit: false,
        enableModal: true,
    });
    $('#exportformat').ejDropDownList({
        targetID: "formatDiv",
        width: "200px",
        height: "30px",
        popupHeight: "116px",
        selectedItemIndex: 0
    });
    $('#exportmode').ejDropDownList({
        targetID: "modeDiv",
        width: "200px",
        height: "30px",
        popupHeight: "59px",
        selectedItemIndex: 0
    });
    // #endregion
});

//#region Property Panel - Initialization

$(function () {

    $('#aspectratioCheckBox').ejCheckBox({
        size: "small",
        change: function (args) {
            PropertyChangesFromPanel(args, "aspectRatio")
        }
    });

    $('#ZoomPercentage').ejDropDownList({
        targetID: "zoompercentageList",
        width: "100px"
    });

    $('#fillColor').ejDropDownList({
        targetID: "fillColorDiv",
        width: "180px",
        popupHeight: "420px",
        popupShown: "popupShown",
        popupHide: "popupHide"
    });

    $("#widthnumeric").ejNumericTextbox({
        name: "widthnumeric",
        value: 35,
        change: "widthChange"
    });

    $("#heightnumeric").ejNumericTextbox({
        name: "heightnumeric",
        value: 35,
        change: "heightChange"
    });

    $("#offsetxnumeric").ejNumericTextbox({
        name: "offsetxnumeric",
        value: 35,
        change: "offsetXChange"
    });

    $("#offsetynumeric").ejNumericTextbox({
        name: "offsetynumeric",
        value: 35,
        change: "offsetYChange"
    });

    $("#opacity").ejSlider({
        sliderType: ej.SliderType.MinRange, minValue: 0,
        maxValue: 100, incrementStep: 1,
        slide: function (args) {
            PropertyChangesFromPanel(args, "Opacity");
        },
        change: function (args) {
            if (diagram && diagram._selectedObject.opacity != args.value) {
                PropertyChangesFromPanel(args, "Opacity");
            }
        }
    });

    $('#stroke').ejDropDownList({
        targetID: "strokeDiv",
        width: "180px",
        popupHeight: "420px",
        popupShown: "popupShown",
        popupHide: "popupHide"
    });

    $('#borderWidth').ejDropDownList({
        targetID: "borderWidthDiv",
        width: "120px",
        popupHeight: "300px",
        select: "setBorderWidth",
        popupShown: "popupShown",
        popupHide: "popupHide"
    });

    $(function () {
        $('#lineColor').ejDropDownList({
            targetID: "lineColorDiv",
            width: "180px",
            popupHeight: "420px",
            popupShown: "popupShown",
            popupHide: "popupHide"
        });
    });

    var fontStylepopUpOpened = false;
    $('#fontStylelist').ejDropDownList({
        targetID: "fontStylelistDiv",
        width: "150px",
        popupHeight: "300px",
        select: "fontFamilyChange",
        popupShown: "popupShown",
        popupHide: "popupHide"
    });

    var fontSizepopUpOpened = false;
    $('#fontsizelist').ejDropDownList({
        targetID: "fontsizelistDiv",
        width: "55px",
        popupHeight: "280px",
        select: "fontSizeChange",
        popupShown: "popupShown",
        popupHide: "popupHide"
    });

    $('#fontColor').ejDropDownList({
        targetID: "fontColorDiv",
        width: "180px",
        popupHeight: "420px",
        popupShown: "popupShown",
        popupHide: "popupHide"
    });

    $('#linecolor').ejDropDownList({
        targetID: "linecolorDiv",
        width: "175px"
    });

    $('#fontsize').ejDropDownList({
        targetID: "fontsizeDiv",
        width: "125px"
    });

    $('#line').ejDropDownList({
        targetID: "lineDiv",
        width: "125px",
        select: "connectorTypeChange",
        popupShown: "popupShown",
        popupHide: "popupHide"
    });

    $('#lineStyle').ejDropDownList({
        targetID: "lineStyleDiv",
        width: "125px",
        select: "lineStyleChange",
        popupShown: "popupShown",
        popupHide: "popupHide"
    });

    $('#labelBorderColor').ejDropDownList({
        targetID: "labelBorderColorDiv",
        width: "175px"
    });

    $('#labelFillColor').ejDropDownList({
        targetID: "labelFillColorDiv",
        width: "175px"
    });

    $('#lineWidth').ejDropDownList({
        targetID: "lineWidthDiv",
        width: "125px",
        popupHeight: "300px",
        select: "lineWidthChange",
        popupShown: "popupShown",
        popupHide: "popupHide"
    });

    var open = false;
    $('#headDecorator').ejDropDownList({
        targetID: "headDecoratorDiv",
        width: "60px",
        popupHeight: "350px",
        select: "headDecoratorChange",
        popupShown: "popupShown",
        popupHide: "popupHide"
    });

    $('#tailDecorator').ejDropDownList({
        targetID: "tailDecoratorDiv",
        width: "60px",
        popupHeight: "350px",
        select: "tailDecoratorChange",
        popupShown: "popupShown",
        popupHide: "popupHide"
    });

    $("#tabitems").ejTab({
        selectedItemByIndex: 1,
        itemActive: "tabItemChanged",
    });
});

$(window).load(function () {
    if (window.SVGSVGElement) {
        diagram = $("#DiagramContent").ejDiagram("instance");
        diagram._modified = false;
        this.updateSize();
        setToolTip(true);
        setPaletteCollections();
        setDiagramSize();
        $("userHandle-icon").css("pointer-events", "none");

        $("#menufile")[0].firstChild.style.color = "white";
        $("#menuedit")[0].firstChild.style.color = "white";
        $("#menuview")[0].firstChild.style.color = "white";
        $("#menuaction")[0].firstChild.style.color = "white";
    }
    else {
        alert("Diagram will not be supported in IE Version < 9");
    }
});

//#endregion

function ToolBarVisibility(args) {

    if (args == "ej.Diagram") {
        document.getElementById("toolblock4").style.display = "none";
        document.getElementById("toolblock5").style.display = "none";
        document.getElementById("toolblock6").style.display = "none";
        document.getElementById("Ul1").style.display = "none";
        document.getElementById("Ul2").style.display = "none";
        document.getElementById("artboard").style.display = "block";
    }
    if (args == "Single") {
        document.getElementById("toolblock4").style.display = "block";
        document.getElementById("toolblock5").style.display = "none";
        document.getElementById("toolblock6").style.display = "none";
        document.getElementById("Ul1").style.display = "block";
        document.getElementById("artboard").style.display = "none";
    }
    if (args == "Multi") {
        document.getElementById("toolblock4").style.display = "block";
        document.getElementById("toolblock5").style.display = "block";
        document.getElementById("toolblock6").style.display = "block";
        document.getElementById("Ul1").style.display = "none";
        document.getElementById("artboard").style.display = "none";
    }
    if (args == "Group") {
        document.getElementById("Ul1").style.display = "block";
        document.getElementById("Ul2").style.display = "block";
        document.getElementById("toolblock5").style.display = "none";
        document.getElementById("toolblock6").style.display = "none";
        document.getElementById("artboard").style.display = "none";
    }
}



