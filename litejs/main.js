
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

let myKeys = {};

async function GenerateKeyPair() {
    let keys = await openpgp.generateKey(obj);
    return keys;
}

async function Execute() {
    //Include encryption and decryption

    //Get keys
    const keys = await GenerateKeyPair();
    
    const passphrase = obj.passphrase;

    const publicKey = await openpgp.readKey({ armoredKey: keys.publicKey });

    const privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: keys.privateKey }),
        passphrase
    });

    //--- Encrypt
    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: 'Hello' }),
        encryptionKeys: publicKey,
        //signingKeys: privateKey // optional
    });

    console.log(encrypted);

    //--- Decrypt
    const message = await openpgp.readMessage({
        armoredMessage: encrypted
    });

    const { data: decrypted, signatures } = await openpgp.decrypt({
        message,
        //verificationKeys: publicKey, // optional
        decryptionKeys: privateKey
    });

    console.log(decrypted); 
}

async function Encrypt() {
    //Get keys
    myKeys = await GenerateKeyPair();
    const publicKey = await openpgp.readKey({ armoredKey: myKeys.publicKey });

    //--- Encrypt
    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: 'Hello world' }),
        encryptionKeys: publicKey,
    });

    console.log(encrypted);
    return encrypted;
}

async function Decrypt(encrypted) {
    const passphrase = obj.passphrase;

    const privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: myKeys.privateKey }),
        passphrase
    });

    //--- Decrypt
    const message = await openpgp.readMessage({
        armoredMessage: encrypted // parse armored message
    });

    const { data: decrypted, signatures } = await openpgp.decrypt({
        message,
        decryptionKeys: privateKey
    });

    console.log(decrypted); 
}


function UploadFile() {
    let file = $('#myFile').prop('files')[0];
    //console.log(obj);

    let fileReader = new FileReader();

    fileReader.readAsText(file);
    fileReader.onload = function(data) {
        let result = data.target.result;
       
        console.log(result);
    }
}