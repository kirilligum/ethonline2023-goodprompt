const bip39 = require('bip39');
const { hdkey } = require('ethereumjs-wallet')

async function derivePrivateKey(mnemonic, index) {
	// Check if the mnemonic is valid
	if (!bip39.validateMnemonic(mnemonic)) {
		console.error('Invalid mnemonic');
		return;
	}

	// Generate the seed from the mnemonic
	const seed = await bip39.mnemonicToSeed(mnemonic);

	// Derive the HD Wallet from the seed
	const hdwallet = hdkey.fromMasterSeed(seed);

	// Define the derivation path (you might adjust the path according to your needs)
	const derivationPath = `m/44'/60'/0'/0/${index}`;

	// Derive the wallet based on the derivation path
	const wallet = hdwallet.derivePath(derivationPath).getWallet();

	// Get the private key as a hex string
	const privateKey = wallet.getPrivateKeyString();

	console.log(`Private key for address index ${index}:`, privateKey);
}

// Execute the function with your mnemonic and the address index you want to access
derivePrivateKey('minor erase medal sausage panel pet poet weather access long all abuse', 1);
