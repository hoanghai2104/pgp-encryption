if (openpgp) { 
    console.log('openpgp is working...');
}

const obj = {
    curve: 'ed25519', //encryption SSH
    userIDs: [
        {
            name: 'Hai Nguyen', 
            email: 'hainh@naviworld.com.vn',
            comment: 'Con mua ngang qua mang em di xa'
        }
    ],
    passphrase: 'Con mua ngang qua khien tim nhat nhoa',
};

function UploadFile() {
    let file = $('#myFile').prop('files')[0];
    //console.log(obj);

    let fileReader = new FileReader();

    fileReader.readAsText(file);
    fileReader.onload = function(data) {
        $('#txtaContent').val(data.target.result);
    }
}

async function GenerateKeyPair() {
    let keys = await openpgp.generateKey(obj);
    return keys;
}

async function Execute() {

    //Get keys
    const keys = await GenerateKeyPair();

    const publicKeyArmored = keys.publicKey;
    const privateKeyArmored = keys.privateKey;
    const passphrase = obj.passphrase;

    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

    const privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
        passphrase
    });

    //--- Encrypt
    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: $('#txtaContent').val() }),
        encryptionKeys: publicKey,
        signingKeys: privateKey // optional
    });

    console.log(encrypted);
    $('#txtaEncryptedFile').val(encrypted);

    //--- Decrypt
    const message = await openpgp.readMessage({
        armoredMessage: encrypted // parse armored message
    });

    const { data: decrypted, signatures } = await openpgp.decrypt({
        message,
        verificationKeys: publicKey, // optional
        decryptionKeys: privateKey
    });

    console.log(decrypted); 
}