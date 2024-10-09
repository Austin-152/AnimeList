import forge from 'node-forge';

type RequestBody = {
  data: { keyword: string };
  publicKey: string;
};

type ResponseData = {
  encryptedData?: string;
  error?: string;
};

function encryptDataUtil(input: RequestBody): ResponseData {
  const { data, publicKey } = input;

  try {
    const key = forge.pki.publicKeyFromPem(publicKey);
    const encryptedData = key.encrypt(
      forge.util.encodeUtf8(JSON.stringify(data)),
      'RSA-OAEP'
    );
    return { encryptedData: forge.util.encode64(encryptedData) };
  } catch (error) {
      console.log('Error encrypting data:', error);
    return { error: 'Encryption failed' };
  }
}

export { encryptDataUtil };
