HTMLContainer = document.getElementById('controlAddIn');

Initial();

function Initial()
{
    RenderHTML();
    //window.NWVSDK.EmbededPBI.Functions.GetEmbedInformation();
}

function RenderHTML()
{
    let html = '';
    html += '<html>';
    html += '   <style> .default-ff { font-family: "Segoe UI Light", "Segoe WP Light", device-segoe-light, "Segoe WP Semilight", "Segoe UI", "Segoe WP", Segoe, Tahoma, Helvetica, Arial, sans-serif !important; font-size: 13.5px; } </style>'
    html += '   <head></head>';
    html += '   <body>';
    html += '       <div style="padding: 10px;">';

    html += '           <div><input type="file" id="myFile" onchange="return UploadFile();" /> <input type="button" id="btnEncrypt" value="Encrypt" onclick="return Execute();" /></div>';
    html += '           <br />';

    html += '           <div class="default-ff"> Content </div>';
    html += '           <div><textarea id="txtaContent" style="width: 100%; height: 202px;" disabled> </textarea></div>';

    html += '           <br />';

    html += '           <div class="default-ff"> Encrypted file </div>';
    html += '           <div><textarea id="txtaEncryptedFile" style="width: 100%; height: 202px;" disabled> </textarea></div>';

    html += '       </div>';
    html += '   </body>';
    html += '</html>';
    html += '';
    html += '';

    html += '';
    html += '';

    HTMLContainer.insertAdjacentHTML('beforeend', html);
}