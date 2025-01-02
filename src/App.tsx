import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PublicKey, Transaction, Connection } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, createRevokeInstruction } from '@solana/spl-token';
import { getProvider } from './components/utils/utils';
import WalletConnect from './components/WalletConnect';
import TokenTable from './UI/TokenTable';
import { Token } from 'components/type/Token';
import Footer from 'components/Footer';
import Header from 'components/header';
import FAQBlock from 'components/FAQ';

const App: React.FC = () => {
  const [selectedTokens, setSelectedTokens] = useState<Token[]>([]);
  const [tokens, setTokens] = useState<Token[]>([]);

  const cleanTokenAccounts = async () => {
    if (selectedTokens.length === 0) {
      toast.info('Выберите хотя бы один токен для отзыва аппрува.', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'dark',
      });
      return;
    }

    try {
      const provider = getProvider();
      if (!provider || !provider.isPhantom) {
        throw new Error('Phantom Wallet не подключен.');
      }

      const { publicKey } = await provider.connect();
      if (!publicKey) {
        throw new Error('Не удалось получить публичный ключ кошелька.');
      }

      const connection = new Connection(
        'https://evocative-quiet-field.solana-mainnet.quiknode.pro/42dea1d5cb4751b78f1d7e7dac9e5d628c892fbd/',
        'confirmed'
      );

      const transaction = new Transaction();

      for (const token of selectedTokens) {
        if (!token.address) {
          throw new Error(`Адрес токена отсутствует для ${token.symbol}`);
        }

        const tokenPubkey = new PublicKey(token.address);

        const revokeInstruction = createRevokeInstruction(
          tokenPubkey,
          publicKey,
          [],
          TOKEN_PROGRAM_ID
        );
        transaction.add(revokeInstruction);
      }

      const signedTransaction = await provider.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
        skipPreflight: false,
        preflightCommitment: 'confirmed',
      });

      toast.success(`Удаление токенов успешно! Транзакция: ${signature}`, {
        position: 'top-right',
        autoClose: 5000,
        theme: 'dark',
      });

      setSelectedTokens([]);
    } catch (error) {
      toast.error(`Ошибка: ${(error as Error).message}`, {
        position: 'top-right',
        autoClose: 5000,
        theme: 'dark',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-between">
        <Header setTokens={setTokens} onError={(err) => toast.error(err.message)} />
      <div className="flex-grow flex flex-col items-center p-4">
        <WalletConnect setTokens={setTokens} onError={(err) => toast.error(err.message)} />
        <div className="w-full max-w-4xl mt-6">
          {tokens.length > 0 ? (
            <>
              <TokenTable
                tokens={tokens}
                selectedTokens={selectedTokens}
                setSelectedTokens={setSelectedTokens}
              />
              <button
                onClick={cleanTokenAccounts}
                disabled={selectedTokens.length === 0}
                className={`mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none ${
                  selectedTokens.length === 0 && 'opacity-50 cursor-not-allowed'
                }`}
              >
                Удаление токенов
              </button>
            </>
          ) : (
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <p>Нет токенов для отображения.</p>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
      <FAQBlock/>
      <Footer />
    </div>
  );
};

export default App;
