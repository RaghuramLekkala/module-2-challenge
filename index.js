const {
  Keypair,
  PublicKey,
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} = require('@solana/web3.js');

const myArgs = process.argv.slice(2);

const getWalltBalance = async (publickey) => {
  try {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const walletBalance = await connection.getBalance(new PublicKey(publickey));

    console.log('Wallet balance:', parseInt(walletBalance) / LAMPORTS_PER_SOL);
  } catch (err) {
    console.log('error', error);
  }
};

const airDropSol = async (publickey) => {
  try {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(publickey),
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log('err', err);
  }
};

//  Show the wallet balance before and after airdripping SOL
const mainFunction = async () => {
  await getWalltBalance(myArgs[0]);
  await airDropSol(myArgs[0]);
  await getWalltBalance(myArgs[0]);
};

mainFunction();
