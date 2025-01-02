// import React, { useState, useEffect } from 'react';
// import * as solanaWeb3 from '@solana/web3.js';
// import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
// import { Token } from './type/Token';
// import { toast } from 'react-toastify';
// import { getProvider } from './utils/utils';
// import { WalletConnectProps } from './interface/interface';

// const METADATA_PROGRAM_ID = new solanaWeb3.PublicKey(
//   'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s' 
// );

// const WalletConnect: React.FC<WalletConnectProps> = ({ setTokens, onError }) => {
//   const [isConnected, setIsConnected] = useState(false);
//   const [publicKey, setPublicKey] = useState<solanaWeb3.PublicKey | null>(null);

//   const rpcUrl =
//     'https://evocative-quiet-field.solana-mainnet.quiknode.pro/42dea1d5cb4751b78f1d7e7dac9e5d628c892fbd/';

//   useEffect(() => {
//     const checkWalletConnection = async () => {
//       try {
//         const provider = getProvider();
//         if (provider && provider.isPhantom) {
//           const { publicKey } = await provider.connect();
//           if (publicKey) {
//             setPublicKey(publicKey);
//             setIsConnected(true);
//           }
//         }
//       } catch (error) {
//         console.error('Ошибка проверки подключения кошелька:', error);
//       }
//     };
//     checkWalletConnection();
//   }, []);

//   const connectWallet = async () => {
//     try {
//       const provider = getProvider();
//       if (!provider) {
//         throw new Error('Phantom Wallet не найден.');
//       }

//       const { publicKey } = await provider.connect();
//       setPublicKey(publicKey);
//       setIsConnected(true);
//     } catch (error) {
//       onError(error as Error);
//     }
//   };

//   const getMetadataPDA = async (mint: solanaWeb3.PublicKey) => {
//     const [pda] = await solanaWeb3.PublicKey.findProgramAddress(
//       [
//         Buffer.from('metadata'),
//         METADATA_PROGRAM_ID.toBuffer(),
//         mint.toBuffer(),
//       ],
//       METADATA_PROGRAM_ID
//     );
//     return pda;
//   };

//   const fetchTokenMetadata = async (
//     connection: solanaWeb3.Connection,
//     mint: solanaWeb3.PublicKey
//   ) => {
//     try {
//       const metadataPDA = await getMetadataPDA(mint);
//       const accountInfo = await connection.getAccountInfo(metadataPDA);

//       if (accountInfo) {
//         const metadata = JSON.parse(accountInfo.data.toString());
//         return {
//           name: metadata.data.name,
//           symbol: metadata.data.symbol,
//         };
//       }
//     } catch (error) {
//       console.warn(`Не удалось получить метаданные для ${mint.toBase58()}:`, error);
//     }

//     return { name: 'Неизвестный токен', symbol: 'N/A' };
//   };

//   const fetchDelegatedTokens = async () => {
//     if (!publicKey) {
//       toast.error('Кошелек не подключен.', {
//         position: 'top-right',
//         autoClose: 3000,
//         theme: 'dark',
//       });
//       return;
//     }

//     try {
//       const connection = new solanaWeb3.Connection(rpcUrl, 'processed');

//       const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
//         programId: TOKEN_PROGRAM_ID,
//       });

//       const tokens: Token[] = await Promise.all(
//         tokenAccounts.value.map(async ({ pubkey, account }) => {
//           const parsedInfo = account.data.parsed.info;
//           const mint = new solanaWeb3.PublicKey(parsedInfo.mint);
//           let name = 'Неизвестный токен';
//           let symbol = 'N/A';

//           try {
//             const metadata = await fetchTokenMetadata(connection, mint);
//             name = metadata.name;
//             symbol = metadata.symbol;
//           } catch (e) {
//             console.warn(`Метаданные не найдены для ${mint.toBase58()}`);
//           }

//           return {
//             address: pubkey.toBase58(),
//             mint: parsedInfo.mint,
//             owner: parsedInfo.owner,
//             amount: parsedInfo.tokenAmount.uiAmount || 0,
//             decimals: parsedInfo.tokenAmount.decimals,
//             name,
//             symbol,
//           };
//         })
//       );

//       setTokens(tokens);
//     } catch (error) {
//       onError(error as Error);
//     }
//   };

//   return (
//     <div className="flex items-center space-x-4">
//       {isConnected ? (
//         <>
//           <span className="text-green-500 font-bold">Подключен</span>
//           <button
//             onClick={fetchDelegatedTokens}
//             className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
//           >
//             Получить токены
//           </button>
//         </>
//       ) : (
//         <button
//           onClick={connectWallet}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
//         >
//           Подключить кошелек
//         </button>
//       )}
//     </div>
//   );
// };

// export default WalletConnect;
