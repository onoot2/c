import React from 'react';
import { Token } from '../components/type/Token';

const TokenTable: React.FC<{
    tokens: Token[];
    selectedTokens: Token[];
    setSelectedTokens: (tokens: Token[]) => void;
}> = ({ tokens, selectedTokens, setSelectedTokens }) => {
    const toggleSelectToken = (token: Token) => {
        const isSelected = selectedTokens.some((t) => t.mint === token.mint);
        if (isSelected) {
            setSelectedTokens(selectedTokens.filter((t) => t.mint !== token.mint));
        } else {
            setSelectedTokens([...selectedTokens, token]);
        }
    };

    const selectAllTokens = (checked: boolean) => {
        if (checked) {
            setSelectedTokens(tokens);
        } else {
            setSelectedTokens([]);
        }
    };

    return (
        <table className="w-full table-auto bg-gray-800 rounded-lg">
            <thead>
                <tr className="text-left bg-gray-700">
                    <th className="p-4">
                        <input
                            type="checkbox"
                            checked={selectedTokens.length === tokens.length && tokens.length > 0}
                            onChange={(e) => selectAllTokens(e.target.checked)}
                        />
                    </th>
                    <th className="p-4">Адрес</th>
                    <th className="p-4">Название токена</th>
                    <th className="p-4">Баланс</th>
                    <th className="p-4">Картинка</th>
                </tr>
            </thead>
            <tbody>
                {tokens.map((token, index) => (
                    <tr key={index} className="odd:bg-gray-800 even:bg-gray-700">
                        <td className="p-4">
                            <input
                                type="checkbox"
                                checked={selectedTokens.some((t) => t.mint === token.mint)}
                                onChange={() => toggleSelectToken(token)}
                            />
                        </td>
                        <td className="p-4">{token.address}</td>
                        <td className="p-4">{token.name || 'Неизвестный токен'}</td>
                        <td className="p-4">{(token.amount / 10 ** token.decimals).toFixed(2)}</td>
                        <td className="p-4">
                            {token.symbol ? (
                                <img
                                    src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/${token.mint}/logo.png`}
                                    alt={token.name || 'Токен'}
                                    className="w-8 h-8 object-cover"
                                />
                            ) : (
                                <span className="text-gray-400">Нет изображения</span>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TokenTable;
