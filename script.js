var connToken = "90932071|-31949220017879871|90962398";
var stuDBName = "SCHOOL-DB";
var stuRelationName = "STUDENT-TABLE";
var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}
function getstuIdASJsonObj() {
    var stuid = $("#stuId").val();
    var jsonStr = {
        stuId: stuid
    };
    return JSON.stringify(jsonStr);
}
function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    console.log(record);
    $("#stuName").val(record.stuName);
    $("#stuClass").val(record.stuClass);
    $("#stuDOB").val(record.stuDOB);
    $("#stuAddress").val(record.stuAddress);
}
function validateAndGetFormData() {
    var stuIdVar = $("#stuId").val();
    if (stuIdVar === "") {
        alert("Student Roll-No Required Value");
        $("#stuId").focus();
        return "";
    }
    var stuNameVar = $("#stuName").val();
    if (stuNameVar === "") {
        alert("Student Name is Required Value");
        $("#stuName").focus();
        return "";
    }
    var stuClassVar = $("#stuClass").val();
    if (stuClassVar === "") {
        alert("Student Class is Required Value");
        $("#stuClass").focus();
        return "";
    }

    var stuDOBVar = $("#stuDOB").val();
    if (stuDOBVar === "") {
        alert("Student Birth-Date is Required Value");
        $("#stuDOB").focus();
        return "";
    }

    var stuAddressVar = $("#stuAddress").val();
    if (stuAddressVar === "") {
        alert("Student Address is Required Value");
        $("#stuAddress").focus();
        return "";
    }



    var jsonStrObj = {
        stuId: stuIdVar,
        stuName: stuNameVar,
        stuClass: stuClassVar,
        stuDOB: stuDOBVar,
        stuAddress: stuAddressVar

    };
    return JSON.stringify(jsonStrObj);
}



function getStu() {
    var stuIdJsonObj = getstuIdASJsonObj();
    var getRequest = createGET_BY_KEYRequest(
            connToken,
            stuDBName,
            stuRelationName,
            stuIdJsonObj
            );
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(
            getRequest,
            jpdbBaseURL,
            jpdbIRL
            );
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stuName").focus();
    } else if (resJsonObj.status === 200) {
        $("#stuId").prop("disabled", true);
        fillData(resJsonObj);
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stuName").focus();
    }
}

function resetForm() {
    $("#stuId").val("");
    $("#stuName").val("");
    $("#stuClass").val("");
    $("#stuDOB").val("");
    $("#stuAddress").val("");
    $("#stuId").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#stuId").focus();
}

function changeData() {
    $("#change").prop("disabled", true);
    jsonChg = validateAndGetFormData();
    var updateRequest = createUPDATERecordRequest(
            connToken,
            jsonChg,
            stuDBName,
            stuRelationName,
            localStorage.getItem("recno")
            );
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(
            updateRequest,
            jpdbBaseURL,
            jpdbIML
            );
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#stuId").focus();
}

function saveData() {
    // validate form data
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return "";
    }
    var putReqStr = createPUTRequest(
            connToken,
            jsonStr,
            stuDBName,
            stuRelationName
            );
    alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(
            putReqStr,
            jpdbBaseURL,
            jpdbIML
            );
    jQuery.ajaxSetup({async: true});
    alert(JSON.stringify(resultObj));
    resetForm();
    $("#stuId").focus();
}
